const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

// Only authenticated users can manage users
router.post('/create', auth, UserController.CreateUser);
router.get('/', auth, UserController.getAllUsers);
router.get('/:id', auth, UserController.getUserById);

module.exports = router;
