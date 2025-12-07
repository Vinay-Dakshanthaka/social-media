// // // middleware/auth.middleware.js
// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const header = req.headers['authorization'];
//   if (!header) return res.status(401).json({ message: "No token provided" });

//   const token = header.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Invalid token format" });

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = user; // {id, role}
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };



// // middleware/auth.middleware.js
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const header = req.headers["authorization"];
//   if (!header) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = header.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Invalid token format" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // decoded should contain { id, role, ... }
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };


const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
