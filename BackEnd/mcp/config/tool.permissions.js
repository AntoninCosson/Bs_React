module.exports = {
    getAvailableSlots: ["user", "assistant", "admin"],
    reserveSlot: ["user", "assistant", "admin"],
    sendConfirmationEmail: ["user","assistant", "admin"],
    sendAdminConfEmail: ["assistant","admin"] // à ajouter au moment de dev nodemailer
  };