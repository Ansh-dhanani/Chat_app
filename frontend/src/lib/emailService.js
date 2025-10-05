import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'itEg3-s2Rtf9WJEwW';
console.log('🔑 EmailJS public key:', publicKey);

emailjs.init(publicKey);

export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    // Check if EmailJS is properly configured
    if (!publicKey) {
      throw new Error('EmailJS public key not configured');
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_yiyds7j';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_2g8qrsf';

    console.log('📧 EmailJS Configuration:');
    console.log('- Service ID:', serviceId);
    console.log('- Template ID:', templateId);
    console.log('- Public Key:', publicKey);

    const templateParams = {
      email: userEmail,           // Most common parameter for recipient email
      name: userName,             // Most common parameter for recipient name
      from_name: 'ChatFlow App',
      app_name: 'ChatFlow',
      client_url: window.location.origin
    };

    console.log('📧 Sending welcome email to:', userEmail);
    console.log('📧 Template params:', templateParams);
    
    const result = await emailjs.send(serviceId, templateId, templateParams);

    console.log('✅ Welcome email sent successfully:', result);
    return { success: true, data: result };
    
  } catch (error) {
    console.error('❌ EmailJS error object:', error);
    console.error('❌ EmailJS error type:', typeof error);
    console.error('❌ EmailJS error status:', error.status);
    console.error('❌ EmailJS error text:', error.text);
    
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