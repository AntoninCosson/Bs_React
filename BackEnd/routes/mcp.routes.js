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
const { checkLlmQuota } = require("../mcp/middlewares/llmQuota");

router.get("/health", (req, res) => res.json({ ok: true }));
router.get("/", mcpController.getConfig);

router.post(
  "/agent",
  requireAuth,
  mcpLimiter,
  checkLlmQuota,
  agentController.handleAgent
);

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
