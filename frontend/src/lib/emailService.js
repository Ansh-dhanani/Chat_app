import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

if (!publicKey) {
  console.error('❌ VITE_EMAILJS_PUBLIC_KEY is not configured');
}

emailjs.init(publicKey);

export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    // Check if EmailJS is properly configured
    if (!publicKey) {
      throw new Error('EmailJS public key not configured');
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      throw new Error('EmailJS service ID or template ID not configured');
    }

    if (import.meta.env.DEV) {
      console.log('📧 EmailJS Configuration:', { serviceId, templateId });
    }

    const templateParams = {
      email: userEmail,           // Most common parameter for recipient email
      name: userName,             // Most common parameter for recipient name
      from_name: 'ChatFlow App',
      app_name: 'ChatFlow',
      client_url: window.location.origin
    };

    console.log('📧 Sending welcome email to:', userEmail);
    if (import.meta.env.DEV) {
      console.log('📧 Template params:', templateParams);
    }
    
    const result = await emailjs.send(serviceId, templateId, templateParams);

    console.log('✅ Welcome email sent successfully:', result);
    return { success: true, data: result };
    
  } catch (error) {
    console.error('❌ EmailJS error object:', error);
    
    // Handle different types of errors
    let errorMessage = 'Unknown error occurred';
    
    if (error.text) {
      errorMessage = error.text;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error.status) {
      errorMessage = `HTTP ${error.status}: ${error.text || 'Request failed'}`;
    }
    
    console.error('❌ Final error message:', errorMessage);
    return { success: false, error: errorMessage };
  }
};