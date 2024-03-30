require('dotenv').config(); 
const nodemailer = require("nodemailer");

console.log(process.env.SMTP_PASSWORD)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: "reyesleeyh2@gmail.com", // can be list
    subject: "Test from AC-LinkedIn",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
