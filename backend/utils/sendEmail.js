const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Lendly" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;
