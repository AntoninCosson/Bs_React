// BackEnd/modules/booking/slot.service.js (CommonJS)
const mongoose = require("mongoose");
const Slot = require("./models/Slot");
const Reservation = require("./models/Reservation");
const User = require("../users/models/User");

async function getAvailableSlotsDB(date) {
  const day = await Slot.findOne({ date }).lean();
  if (!day) return [];
  const reservations = await Reservation.find({
    date,
    status: "confirmed",
  }).lean();
  const reservedTimes = new Set(reservations.map((r) => r.time));
  return (day.times || []).filter((t) => !reservedTimes.has(t));
}

async function reserveSlotDB({ userId, date, time, service }) {
  if (!userId) throw new Error("Missing userId from auth context");

  const userObjectId = mongoose.Types.ObjectId.isValid(userId)
    ? new mongoose.Types.ObjectId(userId)
    : userId;

  const day = await Slot.findOne({ date }).lean();
  if (!day) throw new Error("No slots configured for this date");
  if (!Array.isArray(day.times) || !day.times.includes(time)) {
    throw new Error("Time not in day times");
  }

  const already = await Reservation.findOne({
    date,
    time,
    status: "confirmed",
  }).lean();
  if (already) throw new Error("Time already reserved");

  const user = await User.findById(userObjectId).lean();
  if (!user) throw new Error("User not found");

  const doc = await Reservation.create({
    userId: userObjectId,
    userEmail: user.email,
    username: user.username,
    date,
    time,
    service: service || "General Consultation",
    status: "confirmed",
    hasDeposit: false,
    depositAmount: 0,
    depositCurrency: "EUR",
  });

  await User.findByIdAndUpdate(
    userObjectId,
    {
      $push: {
        reservations: {
          reservationId: doc._id,
          userEmail: user.email,
          username: user.username,
          date,
          time,
          status: doc.status,
          hasDeposit: doc.hasDeposit,
          depositAmount: doc.depositAmount,
          depositCurrency: doc.depositCurrency,
          service: doc.service,
          createdAt: doc.createdAt,
        },
      },
    },
    { new: true }
  );

  return {
    success: true,
    message: `Reserved ${date} ${time} for ${userId}`,
    reservationId: doc._id,
  };
}

module.exports = {
  getAvailableSlotsDB,
  reserveSlotDB,
};
