// BackEnd/mcp/agent/agent.runner.js
const fs = require("fs");
const path = require("path");
const createLLMClient = require("./llm.client");
const mcpService = require("../service/mcp.service");
const { updateLlmUsage } = require("./llm.usage");

const SYSTEM_PROMPT = fs.readFileSync(
  path.join(__dirname, "system-prompt.txt"),
  "utf8"
);

const MCP_TOOLS = [
  {
    type: "function",
    function: {
      name: "getAvailableSlots",
      description: "Obtenir les créneaux disponibles pour une date donnée.",
      parameters: {
        type: "object",
        properties: {
          date: { type: "string" },
        },
        required: ["date"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "reserveSlot",
      description: "Réserver un créneau pour l'utilisateur connecté.",
      parameters: {
        type: "object",
        properties: {
          date: { type: "string" },
          time: { type: "string" },
          service: { type: "string" },
        },
        required: ["date", "time"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "sendConfirmationEmail",
      description: "Envoyer un email de confirmation pour une réservation.",
      parameters: {
        type: "object",
        properties: {
          reservationId: { type: "string" },
        },
        required: ["reservationId"],
        additionalProperties: false,
      },
    },
  },
];

module.exports = async function runAgent({ messages, user }) {
    const llm = createLLMClient();
  
    const first = await llm.chatCompletion({
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      tools: MCP_TOOLS,
    });
  
    const totalUsage = { ...(first.usage || {}) };
  
    const choice = first.choices?.[0]?.message;
    if (!choice) {
      return {
        role: "assistant",
        content: "Erreur: réponse vide du modèle LLM.",
      };
    }
  
    if (!choice.tool_calls || choice.tool_calls.length === 0) {
        if (user?.id && (totalUsage.prompt_tokens || totalUsage.completion_tokens)) {
          try {
            await updateLlmUsage(user.id, totalUsage);
          } catch (e) {
            console.error("[agent.runner] updateLlmUsage error:", e);
          }
        }
        return {
          role: "assistant",
          content: choice.content || "Je n'ai rien à ajouter pour le moment.",
        };
      }
  
    const call = choice.tool_calls[0];
    const toolName = call.function.name;
    const params = JSON.parse(call.function.arguments || "{}");
  
    if (typeof mcpService[toolName] !== "function") {
      return {
        role: "assistant",
        content: `Erreur interne : l’outil '${toolName}' n’existe pas côté serveur.`,
      };
    }
  
    const toolPayload = {};
  
    try {
      const finalParams = { ...params, userId: user?.id };
      const mainResult = await mcpService[toolName](finalParams);
      toolPayload[toolName] = mainResult;
  
      if (
        toolName === "reserveSlot" &&
        mainResult &&
        mainResult.success &&
        mainResult.reservationId &&
        typeof mcpService.createBookingPayment === "function"
      ) {
        const paymentResult = await mcpService.createBookingPayment({
          reservationId: mainResult.reservationId,
          userId: user?.id,
        });
        toolPayload.createBookingPayment = paymentResult;
      }
    } catch (err) {
      console.error("[agent.runner] tool error:", err);
      return {
        role: "assistant",
        content: `L’outil '${toolName}' a échoué : ${err.message}`,
      };
    }
  
    const secondMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
      choice,
      {
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(toolPayload),
      },
    ];
  
    const second = await llm.chatCompletion({
        messages: secondMessages,
      });
    
      if (second.usage) {
        totalUsage.prompt_tokens =
          (totalUsage.prompt_tokens || 0) + (second.usage.prompt_tokens || 0);
        totalUsage.completion_tokens =
          (totalUsage.completion_tokens || 0) + (second.usage.completion_tokens || 0);
      }
      
      if (user && user.id && (totalUsage.prompt_tokens || totalUsage.completion_tokens)) {
        try {
          const summary = await updateLlmUsage(user.id, totalUsage);
          console.log("[agent.runner] llm usage summary:", summary);
        } catch (e) {
          console.error("[agent.runner] updateLlmUsage error:", e);
        }
      }
    
      const finalMsg = second.choices?.[0]?.message;
      if (!finalMsg) {
        return {
          role: "assistant",
          content:
            "La réservation a été traitée, mais une erreur est survenue au moment de formuler la réponse.",
        };
      }
    
      return {
        role: "assistant",
        content: finalMsg.content,
      };
    };
