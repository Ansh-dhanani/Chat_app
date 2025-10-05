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
  fromName: process.env.EMAIL_FROM_NAME || "ChatFlow App",
  fromEmail: process.env.GMAIL_USER || 'your-email@gmail.com',
};

export { transporter };