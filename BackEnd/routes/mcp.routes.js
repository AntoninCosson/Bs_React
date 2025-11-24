// BackEnd/routes/mcp.routes.js
const express = require("express");
const router = express.Router();

const agentController = require("../mcp/agent/agent.controller");
const mcpController = require("../mcp/controller/mcp.controller");

const requireAuth = require("../mcp/middlewares/requireAuth");
const validateBody = require("../mcp/middlewares/validateBody");
const validateSchema = require("../mcp/middlewares/validateSchema");
const mcpLimiter = require("../mcp/middlewares/rateLimit");
const requireToolPermission = require("../mcp/middlewares/requireToolPermission");
// const { checkLlmQuota } = require("../mcp/middlewares/llmQuota");

router.get("/health", (req, res) => res.json({ ok: true }));
router.get("/", mcpController.getConfig);


router.get("/welcome", requireAuth, mcpLimiter, (req, res) => {
  const welcomeMessage = {
    role: "assistant",
    type: "button_response",
    message: "Bienvenue ! Je suis votre assistant de réservation. Que puis-je faire pour vous ?",
    disableInput: true,
    actions: [
      { id: "reserve", label: "🗓️ Réserver un créneau", value: { action: "show_calendar", step: "date_selection" }, style: "primary" },
      { id: "modify", label: "📞 Modifier", value: { action: "get_reservations", step: "modify_selection" }, style: "primary" },
      { id: "free_chat", label: "❓ Poser une question", value: { action: "free_chat", step: "free_chat" }, style: "secondary" },
      { id: "other_domains", label: "📋 Autres domaines →", value: { action: "show_domains", step: "domain_selection" }, style: "secondary" }
    ],
    context: { step: "main_menu", canGoBack: false }
  };
  
  return res.status(200).json({ success: true, data: welcomeMessage });
});

// router.post(
//   "/agent",
//   requireAuth,
//   mcpLimiter,
//   checkLlmQuota,
//   agentController.handleAgent
// );

router.post(
  "/call",
  requireAuth,
  requireToolPermission,
  mcpLimiter,
  validateBody("tool"),
  validateSchema,
  mcpController.callTool
);

module.exports = router;
