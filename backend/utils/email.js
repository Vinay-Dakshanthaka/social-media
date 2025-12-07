const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify().then(() => {
  console.log("SMTP transporter verified");
}).catch((err) => {
  console.warn("Warning: SMTP verification failed - emails may not send.", err.message);
});

async function sendVerificationEmail(to, name, link) {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6;">
      <h2>Hello ${name},</h2>
      <p>Thanks for signing up. Please click the link below to verify your email address:</p>
      <p><a href="${link}">Verify email</a></p>
      <p>If the link doesn't work copy-paste this URL into your browser:</p>
      <p>${link}</p>
      <p>Note: After verification, an admin must approve your account before you can access the app.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject: "Please verify your email",
    html,
  };

  // console.log("mail options : ", mailOptions)
  return transporter.sendMail(mailOptions);
}

async function sendApprovalEmail(to, name, loginLink = "") {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6;">
      <h2>Hello ${name},</h2>
      <p>Your account has been <strong>approved</strong> by the administrator.</p>
      <p>You can now log in and access the application.</p>
      ${loginLink ? `<p><a href="${loginLink}">Go to login</a></p>` : `<p>Please visit the app to login.</p>`}
      <p>If you did not request this, please contact support.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject: "Your account has been approved",
    html,
  };

  return transporter.sendMail(mailOptions);
}

async function sendRevokeEmail(to, name) {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.6;">
      <h2>Hello ${name},</h2>
      <p>We want to inform you that your account access has been <strong>revoked</strong> by the administrator.</p>
      <p>You will no longer be able to log in or access the application.</p>
      <p>If you believe this is a mistake or want more information, please contact admin.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject: "Your account access has been revoked",
    html,
  };

  return transporter.sendMail(mailOptions);
}

async function sendAdminCreatedUserEmail(to, { name, email, role, password, loginLink }) {
  const html = `
    <div style="font-family: Arial; line-height:1.6;">
      <h2>Hello ${name},</h2>

      <p>Your account has been <strong>created and approved</strong> by the administrator.</p>

      <p><strong>Account Details:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Role:</strong> ${role}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>

      <p style="color:red;"><strong>⚠ IMPORTANT:</strong> Please change your password immediately after logging in.</p>

      <p>
        <a href="${loginLink}" 
           style="background-color:#1a73e8;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;">
           Login Now
        </a>
      </p>

      <hr>
      <p style="font-size:12px;color:gray;">If you did not expect this email, please contact admin.</p>
    </div>
  `;

  return transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject: "Your New Account Details",
    html,
  });
}

module.exports = {
  sendVerificationEmail,
  sendApprovalEmail,
  sendRevokeEmail,
  sendAdminCreatedUserEmail
};



