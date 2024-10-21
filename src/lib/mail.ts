import nodemailer from "nodemailer";
const domain = process.env.DOMAIN || "http://localhost:3000";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async (
  email: string,
  subject: string,
  token: string
) => {
  const confirmationLink = `${domain}/verify-email?token=${token}`;
  const mailOptions = {
    from: "<onboardin@gmail.com>",
    to: email,
    subject: subject,
    html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return { success: "Email sent" };
  } catch (error: any) {
    return { error: error.message };
  }
};
