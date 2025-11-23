// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');

// Public
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Protected
router.get('/me', auth, AuthController.me);

module.exports = router;
