const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
  try {
    const h = req.headers.authorization || "";
    // console.log('Auth header =', req.headers.authorization);

    const token = h.startsWith("Bearer ") ? h.slice(7) : null;
    if (!token)
      return res.status(401).json({ result: false, error: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role || 'user', username: decoded.username };
    return next();
  } catch (e) {

    // console.error('JWT verify error:', e.name, e.message);

    return res
      .status(401)
      .json({ result: false, error: "Invalid or expired token" });
  }
};
