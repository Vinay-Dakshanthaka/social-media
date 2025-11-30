// controllers/user.controller.js
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {

  // CREATE USER (Admin Creates)
  CreateUser: async (req, res) => {
    try {
      const { firstName, lastName, email, phone, role, password } = req.body;

      const existing = await User.findOne({ where: { email } });
      if (existing) return res.status(400).json({ message: "Email already exists" });

      const hashed = password ? await bcrypt.hash(password, 10) : null;

      const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        role,
        passwordHash: hashed,
        isActive: true,
        isApproved: true
      });

      return res.status(201).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // GET ALL USERS
  getAllUsers: async (_req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['passwordHash'] }
      });
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // GET USER BY ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['passwordHash'] }
      });
      if (!user) return res.status(404).json({ message: "User not found" });

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
