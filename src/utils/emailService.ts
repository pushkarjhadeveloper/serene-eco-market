
import emailjs from 'emailjs-com';

// Initialize the EmailJS SDK with a function that checks if we're in a browser environment
const initEmailJS = () => {
  try {
    // Using a dummy key that follows EmailJS format but won't actually work
    // In a real project, you would replace this with your actual public key
    emailjs.init("user_placeholder");
    console.log("EmailJS initialized with placeholder key");
    return true;
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
    return false;
  }
};

// Initialize once when this module is imported
const isInitialized = initEmailJS();

export interface EmailContent {
  to_email: string;
  subject: string;
  message: string;
}

export const sendSubscriptionEmail = async (emailContent: EmailContent): Promise<boolean> => {
  try {
    console.log(`Sending confirmation email to: ${emailContent.to_email}`);
    
    // For demonstration purposes, we'll simulate a successful email sending
    // In a real-world application, you'd actually use the EmailJS API
    console.log("Email content:", emailContent);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log successful email (simulated)
    console.log('Email successfully sent! (simulation)');
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error("Failed to send confirmation email");
  }
};

// Generate a company email for demo purposes
export const getCompanyEmail = (): string => {
  return "newsletter@sereneeco.com";
};
