
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.trim()) {
      // In a real app, you would send this to your backend
      console.log("Newsletter email:", email);
      
      // Navigate to confirmation page
      navigate("/newsletter-confirmation");
    } else {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
      });
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
            />
            <Button type="submit" className="eco-button whitespace-nowrap">
              Subscribe
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
