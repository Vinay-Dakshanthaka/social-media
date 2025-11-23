// controllers/auth.controller.js
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    
  // ------------ REGISTER -------------
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phone } = req.body;

      const existing = await User.findOne({ where: { email } });
      if (existing) return res.status(400).json({ message: "Email already registered" });

      const hashed = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        passwordHash: hashed,
        firstName,
        lastName,
        phone,
        isActive: true,
        isApproved: true,
        role: 'STUDENT'
      });

      return res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // ------------ LOGIN -------------
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.passwordHash || "");
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.json({ message: "Login successful", token, user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // ------------ LOGGED-IN USER PROFILE -------------
  me: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['passwordHash'] }
      });

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
