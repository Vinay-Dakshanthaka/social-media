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
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & User Access Management
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and receive JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: student@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials or unauthorized
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user and receive a verification email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword@123
 *     responses:
 *       201:
 *         description: User registered successfully, verification email sent
 *       400:
 *         description: Email already registered
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/verify/{token}:
 *   get:
 *     summary: Verify user email using verification token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.get("/verify/:token", verifyEmail);

/**
 * @swagger
 * /api/auth/approve/{userId}:
 *   put:
 *     summary: Approve a user (Admin Only)
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User approved
 *       404:
 *         description: User not found
 */
router.put("/approve/:userId", approveUser);

/**
 * @swagger
 * /api/auth/revoke/{userId}:
 *   put:
 *     summary: Revoke user access (Admin Only)
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User access revoked
 *       404:
 *         description: User not found
 */
router.put("/revoke/:userId", revokeUser);

/**
 * @swagger
 * /api/auth/update-password:
 *   post:
 *     summary: Update logged-in user's password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid or missing fields
 */
router.post("/update-password", authMiddleware, updatePassword);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get profile of logged-in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user profile
 *       404:
 *         description: User not found
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "firstName", "lastName", "email", "role"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
