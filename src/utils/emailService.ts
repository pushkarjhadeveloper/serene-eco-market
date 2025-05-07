
import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
// You would need to sign up for EmailJS and get these credentials
const EMAILJS_USER_ID = "user_example123"; // Replace with your actual EmailJS User ID
const EMAILJS_SERVICE_ID = "service_example"; // Replace with your EmailJS Service ID
const EMAILJS_TEMPLATE_ID = "template_example"; // Replace with your EmailJS Template ID

// Initialize the EmailJS SDK
emailjs.init(EMAILJS_USER_ID);

export interface EmailContent {
  to_email: string;
  subject: string;
  message: string;
}

export const sendSubscriptionEmail = async (emailContent: EmailContent): Promise<boolean> => {
  try {
    console.log(`Sending confirmation email to: ${emailContent.to_email}`);
    
    // Prepare the template parameters
    const templateParams = {
      to_email: emailContent.to_email,
      subject: emailContent.subject,
      message: emailContent.message
    };
    
    // Send the email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email successfully sent!', response);
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
