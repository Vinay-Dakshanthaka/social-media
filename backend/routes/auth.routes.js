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


const {
  register,
  verifyEmail,
  login
} = require("../controllers/auth.controller");  // MUST MATCH EXACT FILE NAME

router.post('/login', login);

// REGISTER
router.post("/register", register);

// VERIFY EMAIL
router.get("/verify/:token", verifyEmail);

module.exports = router;
