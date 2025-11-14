// BackEnd/mcp/service/user.service.js (CommonJS)
const User = require('../../models/users');

async function getUserWithReservations(userId) {
  return User.findById(userId)
    .populate({ path: 'reservationsVirtual' })
    .lean();
}

module.exports = { getUserWithReservations };