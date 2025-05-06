
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
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
      
      // Simulate sending the actual email
      await sendSubscriptionEmail(email);
      
      // Success notification
      toast({
        title: "Subscription Successful!",
        description: "A confirmation email has been sent to your inbox.",
      });
      
      // Navigate to the confirmation page
      navigate("/newsletter-confirmation");
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: "We couldn't process your subscription. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to send subscription email
  const sendSubscriptionEmail = async (email: string) => {
    try {
      // In a production environment, this would be an actual API call to your email service
      console.log(`Sending confirmation email to: ${email}`);
      
      // For demonstration, we'll use EmailJS or similar service
      // You would replace this with your actual email sending logic
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
          </div>
        `
      };
      
      // In a real implementation, you would call your email service here
      // For now, we'll simulate a successful email send
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error("Failed to send confirmation email");
    }
  };

  return (
    <section className="eco-container py-16">
      <div className="bg-eco-sage/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-eco-sage/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-96 h-96 bg-eco-sand/30 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="section-title text-center">Join Our Sustainable Living Community</h2>
          <p className="text-eco-bark mb-8">
            Subscribe to our newsletter for eco-design inspiration, special offers, and tips for creating a more sustainable home.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-md border border-eco-sand focus:outline-none focus:ring-2 focus:ring-eco-sage"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <Button type="submit" className="eco-button whitespace-nowrap flex items-center gap-2" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : (
                <>
                  Subscribe <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          
          <p className="text-sm text-eco-bark mt-4">
            By subscribing, you agree to our Privacy Policy. We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
