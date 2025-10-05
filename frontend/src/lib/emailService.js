import emailjs from '@emailjs/browser';


// Get EmailJS configuration from environment variables
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

// Log configuration status (not the actual values)
if (import.meta.env.DEV) {
  console.log('📧 EmailJS Config Status:', {
    publicKey: publicKey ? '✅ Set' : '❌ Missing',
    serviceId: serviceId ? '✅ Set' : '❌ Missing',
    templateId: templateId ? '✅ Set' : '❌ Missing'
  });
}

// Initialize EmailJS if all required config is present
if (publicKey && serviceId && templateId) {
  emailjs.init(publicKey);
} else {
  console.error('❌ EmailJS configuration incomplete:', {
    publicKey: !!publicKey,
    serviceId: !!serviceId,
    templateId: !!templateId
  });
}

export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    // Check if EmailJS is properly configured
    if (!publicKey || !serviceId || !templateId) {
      throw new Error('EmailJS configuration incomplete - check environment variables');
    }

    const templateParams = {
      email: userEmail,           // Most common parameter for recipient email
      name: userName,             // Most common parameter for recipient name
      from_name: 'ChatFlow App',
      app_name: 'ChatFlow',
      client_url: window.location.origin
    };

    if (import.meta.env.DEV) {
      console.log('📧 Sending welcome email to:', userEmail);
      console.log('📧 Template params:', templateParams);
    }
    
    const result = await emailjs.send(serviceId, templateId, templateParams);

    console.log('✅ Welcome email sent successfully');
    return { success: true, data: result };
    
  } catch (error) {
    console.error('❌ EmailJS error:', error.message || error);
    
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
    
    return { success: false, error: errorMessage };
  }
};