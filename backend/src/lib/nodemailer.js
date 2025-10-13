import nodemailer from 'nodemailer';
import "dotenv/config";

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'your-email@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password'
  }
});

export const emailConfig = {
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT) || 587,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  fromName: process.env.EMAIL_FROM_NAME || "chattttz",
  fromEmail: process.env.EMAIL_FROM || process.env.EMAIL_USER,
};

export { transporter };