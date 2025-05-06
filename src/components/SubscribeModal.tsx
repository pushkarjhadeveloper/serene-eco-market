import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
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

    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to your backend
      console.log("Sending subscription email to:", email);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send confirmation email (simulated)
      console.log("Sending confirmation email to:", email);
      
      // Success notification
      toast({
        title: "Subscription Successful!",
        description: "A confirmation email has been sent to your inbox.",
      });
      
      // Navigate to the confirmation page (keeping the existing page)
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
                className="w-full sm:w-1/2 eco-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
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
