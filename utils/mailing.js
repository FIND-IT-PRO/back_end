const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // secure: true,
    // secureConnection: true,
    // logger: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },

    // Activate in gmail "less secure app" option
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Anas ZENAGUI <user@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
