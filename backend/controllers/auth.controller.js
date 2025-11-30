// // controllers/auth.controller.js
// const { User } = require('../models');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// module.exports = {
    
//   // ------------ REGISTER -------------
//   register: async (req, res) => {
//     try {
//       const { firstName, lastName, email, password, phone } = req.body;

//       const existing = await User.findOne({ where: { email } });
//       if (existing) return res.status(400).json({ message: "Email already registered" });

//       const hashed = await bcrypt.hash(password, 10);

//       const user = await User.create({
//         email,
//         passwordHash: hashed,
//         firstName,
//         lastName,
//         phone,
//         isActive: true,
//         isApproved: true,
//         role: 'STUDENT',

//       });

//       return res.status(201).json({ message: "User registered successfully", user });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   },

//   // ------------ LOGIN -------------
//   login: async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       const user = await User.findOne({ where: { email } });
//       if (!user) return res.status(404).json({ message: "Invalid email or password" });

//       const isMatch = await bcrypt.compare(password, user.passwordHash || "");
//       if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//       const token = jwt.sign(
//         { id: user.id, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: '1d' }
//       );

//       return res.json({ message: "Login successful", token, user });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   },

//   // ------------ LOGGED-IN USER PROFILE -------------
//   me: async (req, res) => {
//     try {
//       const user = await User.findByPk(req.user.id, {
//         attributes: { exclude: ['passwordHash'] }
//       });

//       return res.json(user);
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
// };

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { sendVerificationEmail } = require("../utils/email");
const { sendApprovalEmail } = require("../utils/email");
const jwt = require("jsonwebtoken")

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "1d" }
  );
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Missing fields." });

  const user = await User.findOne({ where: { email } });
  if (!user)
    return res.status(401).json({ message: "Invalid credentials." });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match)
    return res.status(401).json({ message: "Invalid credentials." });

  if (!user.isVerified && user.role !== "ADMIN") {
    return res.status(403).json({ message: "Please verify your email first." });
  }

  if (!user.isApproved && user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin approval pending." });
  }

  const token = generateToken(user);

  return res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      role: user.role
    }
  });
};


// ===============================
// REGISTER WITH EMAIL VERIFICATION
// ===============================
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); 

    // Create user with unverified status
    const user = await User.create({
      email,
      passwordHash: hashed,
      firstName,
      lastName,
      phone,
      isActive: false,     // block login until verified
      isApproved: false,   // admin approval after verification
      role: "STUDENT",
      isVerified: false,
      emailVerificationToken: token,
      emailVerificationExpiresAt: expires
    });

    // Create verification token
    // const token = crypto.randomBytes(32).toString("hex");

    // await VerificationToken.create({
    //   token,
    //   userId: user.id,
    //   expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour expiry
    // });

    // Verification link
    const verifyLink = `${process.env.FRONTEND_BASE_URL}/api/auth/verify/${token}`;

    console.log("email verify link : ", verifyLink)

    // Send email
    await sendVerificationEmail(
      user.email,
      user.firstName || "User",
      verifyLink
    );

    return res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account."
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// ===============================
// VERIFY EMAIL ROUTE
// ===============================
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // const record = await VerificationToken.findOne({
    //   where: { token },
    //   include: User
    // });

    // if (!record) {
    //   return res.status(400).send("Invalid or expired verification token.");
    // }

    // if (record.expiresAt < new Date()) {
    //   await record.destroy();
    //   return res.status(400).send("Verification token expired.");
    // }

     const user = await User.findOne({
      where: { emailVerificationToken: token }
    });

    if (!user)
      return res.status(400).send("Invalid or expired verification link.");

    if (user.emailVerificationExpiresAt < new Date())
      return res.status(400).send("Verification link expired.");

    // mark user verified
    // const user = record.User;
    user.isVerified = true;
    user.isActive = true; // allow login after verification
    user.emailVerificationToken = null;
    user.emailVerificationExpiresAt = null;
    await user.save();

    // remove used token
    // await record.destroy();

    return res.send(
      "<h2>Email Verified</h2><p>Your account is now verified. Admin will approve your account shortly.</p>"
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

// Admin: approve user and send approval email
const approveUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (!userId) return res.status(400).json({ message: "Invalid user id." });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.isApproved) {
      return res.status(200).json({ message: "User already approved." });
    }

    user.isApproved = true;
    // optionally set isActive true if you want to allow login immediately after approval
    // user.isActive = true;
    await user.save();

    // Send approval email (best-effort). If sending fails, still return success to admin.
    try {
      const recipientName = user.firstName || user.email;
      const loginLink = `${process.env.FRONTEND_BASE_URL || process.env.BASE_URL || ""}/login`; // use front-end link if available
      await sendApprovalEmail(user.email, recipientName, loginLink);
    } catch (emailErr) {
      // log the email error but don't fail the approval action
      console.warn("Approval email failed to send:", emailErr && emailErr.message ? emailErr.message : emailErr);
    }

    return res.json({ message: "User approved and email (attempted) sent." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  approveUser
};
