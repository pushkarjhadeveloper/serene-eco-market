
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample cart data
const sampleCartItems = [
  {
    id: 1,
    name: "Bamboo End Table",
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500&auto=format",
    price: 129.99,
    quantity: 1,
    theme: "Earthy Tones"
  },
  {
    id: 2,
    name: "Organic Cotton Throw Pillow",
    image: "/lovable-uploads/09fa2a99-dcb6-44b4-89cc-537a9224092b.png",
    price: 49.99,
    quantity: 2,
    theme: "Earthy Tones"
  },
  {
    id: 3,
    name: "Reclaimed Wood Shelf",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format",
    price: 89.99,
    quantity: 1,
    theme: "Scandinavian Minimalism"
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const { toast } = useToast();

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart."
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <div className="eco-container py-12">
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-eco-moss mb-6">
          Shopping Cart
        </h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Cart Items */}
              <div className="bg-white rounded-lg shadow-sm border border-eco-sand/30 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-eco-moss mb-6">
                    Your Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                  </h2>
                  
                  <div className="space-y-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-eco-sand/30 last:border-0 last:pb-0">
                        <div className="w-full sm:w-24 h-24 bg-eco-cream/20 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="font-medium text-eco-moss">{item.name}</h3>
                              <p className="text-sm text-eco-bark mb-2">Theme: {item.theme}</p>
                            </div>
                            <p className="font-medium text-eco-moss">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border border-eco-sand/30 rounded-md">
                              <button 
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="px-3 py-1 text-eco-bark hover:text-eco-moss"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 py-1 border-x border-eco-sand/30">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="px-3 py-1 text-eco-bark hover:text-eco-moss"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-eco-bark hover:text-eco-moss flex items-center"
                            >
                              <Trash2 size={16} className="mr-1" />
                              <span className="text-sm">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <Button variant="outline" className="border-eco-sage text-eco-moss" asChild>
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-eco-sand/30 p-6 sticky top-24">
                <h2 className="text-xl font-medium text-eco-moss mb-6">Order Summary</h2>
                
                <div className="space-y-3 text-eco-bark">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-eco-sand/30 pt-3 mt-3 flex justify-between font-medium text-eco-moss">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button className="eco-button w-full mt-6">
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Button>
                
                <div className="mt-6 bg-eco-cream/20 p-4 rounded-md">
                  <h3 className="font-medium text-eco-moss mb-2">Sustainability Impact</h3>
                  <p className="text-sm text-eco-bark mb-2">
                    Your purchase helps save approximately:
                  </p>
                  <ul className="text-sm text-eco-bark list-disc pl-5 space-y-1">
                    <li>12 gallons of water</li>
                    <li>5 lbs of CO₂ emissions</li>
                    <li>3 lbs of landfill waste</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-eco-sand/30 p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-eco-cream/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eco-bark">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-eco-moss mb-4">Your Cart is Empty</h2>
            <p className="text-eco-bark mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button className="eco-button" asChild>
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
