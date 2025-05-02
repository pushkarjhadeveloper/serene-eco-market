
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Pinterest } from "lucide-react";
import ContactForm from "./ContactForm";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.trim()) {
      // In a real app, you would send this to your backend
      console.log("Subscribing email:", email);
      
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
                <Pinterest className="h-6 w-6" />
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
