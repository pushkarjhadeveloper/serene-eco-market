
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import ContactForm from "./ContactForm";
import { useToast } from "@/hooks/use-toast";
import { sendSubscriptionEmail, getCompanyEmail } from "@/utils/emailService";

const Footer = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Store the email in localStorage for future use
      localStorage.setItem("subscribedEmail", email);

      const companyEmail = getCompanyEmail();
      
      // Create email content
      const emailContent = {
        to_email: email,
        subject: "Welcome to EcoHaven - Subscription Confirmation",
        message: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4a6741;">Thank You for Subscribing!</h2>
            <p>Dear Subscriber,</p>
            <p>Thank you for joining our sustainable design community. We're excited to share interior design recommendations tailored to your style preferences.</p>
            <p>You'll start receiving our newsletter with:</p>
            <ul>
              <li>Eco-friendly design tips</li>
              <li>Exclusive product recommendations</li>
              <li>Seasonal decor inspiration</li>
              <li>Special offers for subscribers</li>
            </ul>
            <p>If you have any questions or specific design interests, feel free to reply to this email.</p>
            <p>Warm regards,</p>
            <p>The EcoHaven Design Team</p>
            <p style="color: #888; font-size: 12px;">Sent from: ${companyEmail}</p>
          </div>
        `
      };
      
      // Send the actual email
      await sendSubscriptionEmail(emailContent);
      
      // Success notification
      toast({
        title: "Subscription Successful!",
        description: `A confirmation email has been sent to ${email}`,
      });
      
      // Navigate to confirmation page
      navigate("/newsletter-confirmation");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: "We couldn't process your subscription. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-eco-cream mt-16">
      <div className="eco-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h1 className="font-serif text-2xl font-medium text-eco-moss">
                Serene<span className="text-eco-sage">Eco</span>
              </h1>
            </Link>
            <p className="text-eco-bark mb-4 max-w-sm">
              Creating sustainable, beautiful spaces that nurture both people and the planet. We believe in conscious design that lasts generations.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-eco-moss hover:text-eco-leaf transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://www.pinterest.com/search/pins/?q=interior%20design%20inspiration" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-eco-moss hover:text-eco-leaf transition-colors"
              >
                <span className="sr-only">Pinterest</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/shubhamupadhyaydeveloper" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-eco-moss hover:text-eco-leaf transition-colors"
                title="Founder 1"
              >
                <span className="sr-only">LinkedIn - Founder 1</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/pushkar-jha-2426b52bb" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-eco-moss hover:text-eco-leaf transition-colors ml-1"
                title="Founder 2"
              >
                <span className="sr-only">LinkedIn - Founder 2</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-medium text-eco-moss mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/category/furniture" className="text-eco-bark hover:text-eco-moss transition-colors">Furniture</Link></li>
              <li><Link to="/category/lighting" className="text-eco-bark hover:text-eco-moss transition-colors">Lighting</Link></li>
              <li><Link to="/category/flooring" className="text-eco-bark hover:text-eco-moss transition-colors">Flooring</Link></li>
              <li><Link to="/category/decor" className="text-eco-bark hover:text-eco-moss transition-colors">Decor</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-serif text-lg font-medium text-eco-moss mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-eco-bark hover:text-eco-moss transition-colors">About Us</Link></li>
              <li><Link to="/sustainability" className="text-eco-bark hover:text-eco-moss transition-colors">Sustainability</Link></li>
              <li><Link to="/design-services" className="text-eco-bark hover:text-eco-moss transition-colors">Design Services</Link></li>
              <li>
                <button 
                  onClick={() => setShowContactForm(true)} 
                  className="text-eco-bark hover:text-eco-moss transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-medium text-eco-moss mb-4">Stay Inspired</h3>
            <p className="text-eco-bark mb-4">Subscribe to our newsletter for sustainable design tips and exclusive offers.</p>
            <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 border border-eco-sand rounded-md focus:outline-none focus:ring-1 focus:ring-eco-sage"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="eco-button whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="border-t border-eco-sand/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-eco-bark text-sm">&copy; {new Date().getFullYear()} SereneEco. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-eco-bark text-sm hover:text-eco-moss transition-colors">Terms</Link>
            <Link to="/privacy" className="text-eco-bark text-sm hover:text-eco-moss transition-colors">Privacy</Link>
            <Link to="/shipping" className="text-eco-bark text-sm hover:text-eco-moss transition-colors">Shipping</Link>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </footer>
  );
};

export default Footer;
