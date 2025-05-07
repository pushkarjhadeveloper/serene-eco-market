
import emailjs from 'emailjs-com';

// Configuration for EmailJS
const EMAIL_SERVICE_ID = "service_development"; // This would be your actual service ID in production
const EMAIL_TEMPLATE_ID = "template_confirmation"; // This would be your actual template ID in production
const EMAIL_PUBLIC_KEY = "your_public_key"; // This would be your actual public key in production

// Domain for sender emails
const DOMAIN = "shubhamupadhyay.online";

// Initialize the EmailJS SDK with a function that checks if we're in a browser environment
const initEmailJS = () => {
  try {
    emailjs.init(EMAIL_PUBLIC_KEY);
    console.log("EmailJS initialized successfully");
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
    
    // In development, we'll simulate sending an email
    if (process.env.NODE_ENV === 'development') {
      console.log("Development mode: Simulating email send");
      console.log("Email content:", emailContent);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Email successfully sent! (simulation)');
      return true;
    } 
    
    // In production, we would use the actual EmailJS service
    const templateParams = {
      to_email: emailContent.to_email,
      subject: emailContent.subject,
      message: emailContent.message,
      from_email: `newsletter@${DOMAIN}`
    };
    
    // Send email using EmailJS
    await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email successfully sent!');
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error("Failed to send confirmation email");
  }
};

// Generate a company email for consistency
export const getCompanyEmail = (): string => {
  return `newsletter@${DOMAIN}`;
};
