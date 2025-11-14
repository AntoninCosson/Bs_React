// BackEnd/mcp/agent/agent.controller.js
const runAgent = require("./agent.runner");

exports.handleAgent = async (req, res) => {
  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: "messages must be an array",
      });
    }

    const result = await runAgent({
      messages,
      user: req.user,
    });

    res.json({ success: true, message: result });
  } catch (err) {
    console.error("[agent.controller] error:", err);
    res.status(500).json({
      success: false,
      message: "Agent internal error",
      error: err.message,
    });
  }
};
