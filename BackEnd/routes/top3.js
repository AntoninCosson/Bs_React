const express = require("express");
const router = express.Router();
const Top3 = require("../models/top3"); // ton model

// GET top 3
router.get("/", async (req, res) => {
  let doc = await Top3.findOne();
  if (!doc) return res.json({ result: true, top3: [] });
  res.json({ result: true, top3: doc.scores });
});

// PATCH (ajout ou update du top3)
router.patch("/", async (req, res) => {
  const { username, score } = req.body;
  if (!username || typeof score !== "number") {
    return res.json({ result: false, error: "Missing data" });
  }

  let doc = await Top3.findOne();
  if (!doc) {
    // première insertion
    doc = await Top3.create({ scores: [{ username, score }] });
    return res.json({ result: true, top3: doc.scores });
  }

  // Ajoute ou update
  let found = false;
  doc.scores = doc.scores.map(entry => {
    if (entry.username === username) {
      found = true;
      return { username, score: Math.max(entry.score, score) };
    }
    return entry;
  });
  if (!found) doc.scores.push({ username, score });

  // Trie et limite à 3
  doc.scores = doc.scores.sort((a, b) => b.score - a.score).slice(0, 3);
  await doc.save();

  res.json({ result: true, top3: doc.scores });
});

module.exports = router;