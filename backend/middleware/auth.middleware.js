// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // {id, role}
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
