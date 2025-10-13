import emailjs from '@emailjs/nodejs';
import "dotenv/config";

// Initialize EmailJS with your private key
emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

export const emailjsClient = emailjs;

export const emailConfig = {
  apiKey: process.env.RESEND_API_KEY,
  fromName: process.env.EMAIL_FROM_NAME || "chattttz",
  fromEmail: process.env.EMAIL_FROM || "onboarding@resend.dev",
};