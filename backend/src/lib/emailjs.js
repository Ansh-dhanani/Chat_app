import emailjs from '@emailjs/nodejs';
import "dotenv/config";

// Initialize EmailJS with your private key
emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

export const emailjsClient = emailjs;

export const emailConfig = {
  serviceId: process.env.EMAILJS_SERVICE_ID,
  templateId: process.env.EMAILJS_TEMPLATE_ID,
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
  fromName: process.env.EMAIL_FROM_NAME || "chattttz",
  fromEmail: process.env.EMAIL_FROM || "",
};