import { resultClient, sender } from "../lib/resend.js";
import { createEmailTemplate } from "../emails/emailTemaplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    try {
        // Add a timeout to prevent hanging
        const emailPromise = resultClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Welcome to Chat App",
            html: createEmailTemplate(name, clientURL)
        });

        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
            timeoutId = setTimeout(() => reject(new Error("Email send timeout")), 10000);
        });

        const { data, error } = await Promise.race([
            emailPromise.finally(() => clearTimeout(timeoutId)),
            timeoutPromise
        ]);
        
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