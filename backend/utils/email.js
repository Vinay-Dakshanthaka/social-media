const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
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
    from: process.env.EMAIL_FROM,
    to,
    subject: "Your account has been approved",
    html,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail,
  sendApprovalEmail
};
