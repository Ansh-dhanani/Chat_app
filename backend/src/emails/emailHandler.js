import { emailjsClient, emailConfig } from "../lib/emailjs.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    try {
        // Check if email service is properly configured
        if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID) {
            console.log("EmailJS service not configured, skipping welcome email");
            return { success: false, message: "Email service not configured" };
        }

        console.log("=== EMAIL DEBUG INFO ===");
        console.log(`Attempting to send welcome email to: ${email}`);
        console.log(`Using EmailJS service: ${emailConfig.serviceId}`);
        console.log(`Template ID: ${emailConfig.templateId}`);
        console.log(`Public Key: ${emailConfig.publicKey}`);
        console.log(`From Name: ${emailConfig.fromName}`);

        // Prepare template parameters for EmailJS
                const templateParams = {
            email: email,
            name: fullName,
            from_name: emailConfig.fromName,
            app_name: "chattttz"
        };

        console.log("Template params:", templateParams);
        console.log("========================");

        // Send email using EmailJS
        const response = await emailjsClient.send(
            emailConfig.serviceId,
            emailConfig.templateId,
            templateParams
        );
        
        console.log("Welcome email sent successfully:", response);
        return { success: true, data: response };
        
    } catch (error) {
        console.error("Failed to send welcome Email:", error);
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);
        return { success: false, error: error.message };
    }
};