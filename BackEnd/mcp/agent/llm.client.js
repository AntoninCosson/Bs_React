// BackEnd/mcp/agent/llm.client.js
const OpenAI = require("openai");

module.exports = function createLLMClient() {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  });

  async function chatCompletion({ messages, tools }) {
    const payload = {
      model: process.env.MODEL_NAME,
      messages,
    };

    if (tools && Array.isArray(tools) && tools.length > 0) {
      payload.tools = tools;
      payload.tool_choice = "auto";
    }

    const res = await client.chat.completions.create(payload);

    if (res.usage) {
      console.log("[LLM usage] prompt:", res.usage.prompt_tokens,
                  "completion:", res.usage.completion_tokens,
                  "total:", res.usage.total_tokens);
    } else {
      console.log("[LLM usage] pas d'usage retourné");
    }

    return res;
  }

  return { chatCompletion };
};