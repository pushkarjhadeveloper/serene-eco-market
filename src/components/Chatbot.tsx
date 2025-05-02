
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'bot', content: string}[]>([
    {type: 'bot', content: 'Hello! I\'m your design assistant. How can I help you today?'}
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {type: 'user', content: newMessage}]);
    
    // Simulate bot response based on keywords
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't have information about that yet. Can I help you with something else related to our designs?";
      
      const lowercaseMessage = newMessage.toLowerCase();
      
      if (lowercaseMessage.includes('earthy') || lowercaseMessage.includes('traditional')) {
        botResponse = "Our Earthy Tones theme features traditional designs inspired by Rajasthani palaces and South Indian architecture. Would you like to see some examples?";
      } else if (lowercaseMessage.includes('scandinavian') || lowercaseMessage.includes('minimal')) {
        botResponse = "The Scandinavian Minimalism theme focuses on clean lines, functional spaces, and a light color palette. Is there something specific about this style you'd like to know?";
      } else if (lowercaseMessage.includes('luxury')) {
        botResponse = "Our Luxury Neutrals theme offers premium materials and elegant designs for a sophisticated home. Would you like me to recommend some luxury items?";
      } else if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
        botResponse = "Hello! How can I assist you with your home design needs today?";
      } else if (lowercaseMessage.includes('help')) {
        botResponse = "I can help you find products, explain our design themes, provide sustainability information, or assist with visualizing designs for your space.";
      }
      
      setMessages(prev => [...prev, {type: 'bot', content: botResponse}]);
    }, 1000);
    
    // Clear input
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'bg-eco-moss rotate-90' : 'bg-eco-sage'
        }`}
      >
        {isOpen ? (
          <X className="text-white h-6 w-6" />
        ) : (
          <MessageCircle className="text-white h-6 w-6" />
        )}
      </button>

      {/* Chat window */}
      <div 
        className={`fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 transition-all duration-300 transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-eco-sage p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
              <MessageCircle className="text-eco-sage h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-white">Design Assistant</h3>
              <p className="text-xs text-white/80">Online | Typically replies in a few minutes</p>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="h-80 overflow-y-auto p-4 bg-eco-cream/20">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 max-w-[80%] ${message.type === 'user' ? 'ml-auto' : 'mr-auto'}`}
            >
              <div 
                className={`p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-eco-sage text-white rounded-br-none' 
                    : 'bg-white border border-eco-sand/30 text-eco-bark rounded-bl-none'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="p-3 border-t border-eco-sand/30 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-eco-sand/30 rounded-l-md focus:outline-none focus:ring-1 focus:ring-eco-sage"
          />
          <Button 
            className="rounded-l-none bg-eco-sage hover:bg-eco-moss"
            onClick={handleSendMessage}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
