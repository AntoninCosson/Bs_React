// BackEnd/routes/payment-confirmed.js
const express = require("express");
const router = express.Router();

// Route appelée par le front (ReservationSuccess)
// après le retour Stripe. Pour l'instant, on ne
// fait que renvoyer success pour débloquer le flux.
router.post("/payment-confirmed", async (req, res) => {
  try {
    const { reservationId } = req.body;

    if (!reservationId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing reservationId" });
    }

    console.log("[payment-confirmed] OK for reservation", reservationId);


    return res.json({ success: true });
  } catch (e) {
    console.error("[payment-confirmed] error:", e);
    return res
      .status(500)
      .json({ success: false, error: "internal_error" });
  }
});

module.exports = router;
