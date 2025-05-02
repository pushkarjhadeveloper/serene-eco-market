
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
    
    // Reset form and close modal
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      message: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-2xl text-eco-moss">Contact Us</h2>
            <button 
              onClick={onClose}
              className="text-eco-bark hover:text-eco-moss p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-eco-bark mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-eco-sand rounded-md focus:outline-none focus:ring-1 focus:ring-eco-sage"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-eco-bark mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-eco-sand rounded-md focus:outline-none focus:ring-1 focus:ring-eco-sage"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-eco-bark mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-eco-sand rounded-md focus:outline-none focus:ring-1 focus:ring-eco-sage"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-eco-bark mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-eco-sand rounded-md focus:outline-none focus:ring-1 focus:ring-eco-sage"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-eco-bark mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-eco-sand rounded-md focus:outline-none focus:ring-1 focus:ring-eco-sage"
                ></textarea>
              </div>
            </div>
            
            <Button type="submit" className="eco-button w-full mt-6">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
