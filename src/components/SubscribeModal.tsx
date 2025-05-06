
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscribeModal = ({ isOpen, onClose }: SubscribeModalProps) => {
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
      onClose();
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute right-0 top-0 rounded-full p-1 hover:bg-eco-sand/10 transition-colors"
          >
            <X className="h-5 w-5 text-eco-bark" />
            <span className="sr-only">Close</span>
          </button>
          
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-2xl font-medium text-eco-moss mb-2">
              Get Design Inspiration
            </h3>
            <p className="text-eco-bark mb-6">
              Subscribe to receive interior design recommendations from our team regularly.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-eco-sand focus:border-eco-sage"
                required
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="w-full sm:w-1/2 border-eco-sand"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="w-full sm:w-1/2 eco-button flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-xs text-eco-bark mt-4">
              By subscribing, you agree to our Privacy Policy. We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeModal;
