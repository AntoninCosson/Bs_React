// BackEnd/mcp/middlewares/requireAuth.js
const jwt = require('jsonwebtoken')

module.exports = function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const [type, token] = header.split(' ')
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ success: false, message: 'Missing or invalid Authorization header' })
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
    req.user = {
      id: payload.id,
      role: payload.role || 'user',
      scopes: payload.scopes || []
    }
    next()
  } catch (e) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}