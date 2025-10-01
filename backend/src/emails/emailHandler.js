import { resultClient, sender } from "../lib/resend.js";
import { createEmailTemplate } from "../emails/emailTemaplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    try {
        const { data, error } = await resultClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Welcome to Chat App",
            html: createEmailTemplate(name, clientURL)
        });
        
        if (error) {
            console.error("Error sending welcome email:", error);
            throw new Error("Failed to send welcome email");
        }
        
        console.log("Welcome email sent successfully:", data);
        return data;
    } catch (error) {
        console.error("Failed to send welcome Email:", error);
        throw error;
    }
};