// // routes/auth.routes.js
// const express = require("express");
// const router = express.Router();
// const AuthController = require('../controllers/auth.controller');
// const auth = require('../middleware/auth.middleware');

// // Public
// router.post('/register', AuthController.register);
// router.post('/login', AuthController.login);

// // Protected
// router.get('/me', auth, AuthController.me);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { User } = require("../models");

const {
  register,
  verifyEmail,
  login,
  approveUser,
  revokeUser,
  updatePassword,
} = require("../controllers/auth.controller");  // MUST MATCH EXACT FILE NAME
const authMiddleware = require("../middleware/auth.middleware");

router.post('/login', login);

// REGISTER
router.post("/register", register);

// VERIFY EMAIL
router.get("/verify/:token", verifyEmail);

//Approve
router.put("/approve/:userId", approveUser );

//Revoke
router.put("/revoke/:userId", revokeUser);

//update
router.post("/update-password", authMiddleware , updatePassword);

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "firstName","lastName", "email", "role"]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
