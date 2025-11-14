// BackEnd/mcp/service/mail.service.js
const Reservation = require('../../models/Reservation');
const User = require('../../models/users');
const mailer = require('../../utils/mailer');

async function sendBookingConfirmationByReservationId(reservationId) {
  console.log('[MAIL] sendBookingConfirmationByReservationId called with', reservationId);

  const reservation = await Reservation.findById(reservationId).lean();
  if (!reservation) {
    console.warn('[MAIL] Reservation not found for id', reservationId);
    return { success: false, message: 'Reservation not found' };
  }

  const user = await User.findById(reservation.userId).lean();
  if (!user || !user.email) {
    console.warn('[MAIL] User or email not found for reservation', reservationId);
    return { success: false, message: 'User email not found' };
  }

  const mailOptions = {
    to: user.email,
    subject: `Confirmation de votre rendez-vous ${reservation.date} ${reservation.time}`,
    text: `Votre rendez-vous est confirmé le ${reservation.date} à ${reservation.time} (${reservation.service || 'Consultation'}). ID: ${reservation._id}`,
    html: `<p>Votre rendez-vous est confirmé le <strong>${reservation.date}</strong> à <strong>${reservation.time}</strong>.</p>
           <p>Service: <strong>${reservation.service || 'Consultation'}</strong></p>
           <p>ID de réservation: <code>${reservation._id}</code></p>`,
  };

  try {
    console.log('[MAIL] Sending confirmation email via mailer.sendMail...', {
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    await mailer.sendMail(mailOptions);

    console.log('[MAIL] Email sent OK for reservation', reservationId);

    const emailStatus = 'sent';
    const lastEmailAt = new Date();

    await Reservation.findByIdAndUpdate(reservationId, {
      emailStatus,
      lastEmailAt,
    });

    return { success: true, message: 'Confirmation email sent' };
  } catch (err) {
    console.error('[MAIL] Error sending email:', err);
    return { success: false, message: 'Email send failed', error: err.message };
  }
}

module.exports = {
  sendBookingConfirmationByReservationId,
};