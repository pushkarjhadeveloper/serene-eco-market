
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addToCart } from "@/store/cartSlice";

// Sample products data
const allProducts = [
  { 
    id: "101", 
    name: "Organic Cotton Sofa", 
    price: 43999, 
    description: "Handcrafted sofa with organic cotton upholstery and sustainable wooden frame. Perfect for eco-conscious homes.",
    material: "Organic cotton, FSC-certified wood",
    deliveryTime: "3-4 weeks",
    category: "furniture",
    subcategory: "sofas",
    images: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&auto=format",
      "https://images.unsplash.com/photo-1560448075-32314de132c0?w=500&auto=format",
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500&auto=format"
    ]
  },
  { 
    id: "102", 
    name: "Bamboo Sectional Sofa", 
    price: 67999, 
    description: "Modern sectional sofa with bamboo frame and recycled polyester fabric. Versatile and environmentally friendly.",
    material: "Bamboo, Recycled polyester",
    deliveryTime: "4-5 weeks",
    category: "furniture",
    subcategory: "sofas",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&auto=format",
      "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=500&auto=format",
      "https://images.unsplash.com/photo-1511389026070-a14ae610a1be?w=500&auto=format"
    ]
  },
  { 
    id: "201", 
    name: "Reclaimed Wood King Bed", 
    price: 59999, 
    description: "King-size bed frame crafted from reclaimed wood with a natural finish. Each piece is unique with its own character.",
    material: "Reclaimed wood, Non-toxic finish",
    deliveryTime: "4 weeks",
    category: "furniture",
    subcategory: "beds",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format",
      "https://images.unsplash.com/photo-1505693314053-e3e1626c98e6?w=500&auto=format",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format"
    ]
  },
];

// Helper function to format currency in INR
const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    // In a real app, you'd fetch the product from an API
    const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(foundProduct);
    setCurrentImageIndex(0);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        quantity: 1,
        theme: "Earthy Tones", // Default theme
        category: product.category || "Furniture" // Default category
      }));
      
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const handleShare = (platform: string) => {
    if (!product) return;
    
    const shareUrl = `https://sereneeco.com/product/${product.id}`;
    const shareTitle = `Check out ${product.name} at SereneEco`;
    const shareText = `I found this amazing sustainable ${product.name} that I thought you might like!`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      default:
        // Just copy to clipboard as fallback
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "Product link copied to clipboard.",
        });
    }
    
    setShareDialogOpen(false);
  };

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="eco-container py-12">
          <div className="bg-eco-sand/10 rounded-lg p-8 text-center">
            <p className="text-eco-bark text-lg mb-4">
              Product not found
            </p>
            <p className="text-eco-moss">
              The product you're looking for may have been removed or doesn't exist.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="eco-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4 border border-eco-sand/30">
              <img 
                src={product.images[currentImageIndex]} 
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img: string, idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 rounded border-2 flex-shrink-0 ${idx === currentImageIndex ? 'border-eco-moss' : 'border-eco-sand/30'}`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-eco-moss mb-2">
              {product.name}
            </h1>
            <p className="font-serif text-2xl text-eco-moss mb-6">{formatINR(product.price)}</p>
            <p className="text-eco-bark mb-8 text-lg">{product.description}</p>
            
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-medium text-eco-moss mb-1">Materials</h3>
                <p className="text-eco-bark">{product.material}</p>
              </div>
              <div>
                <h3 className="font-medium text-eco-moss mb-1">Estimated Delivery</h3>
                <p className="text-eco-bark">{product.deliveryTime}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="eco-button flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 border-eco-sage text-eco-moss"
                onClick={() => setShareDialogOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                Share
              </Button>
            </div>
          </div>
        </div>
        
        {/* Share Dialog */}
        {shareDialogOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-xl font-medium text-eco-moss">Share Product</h3>
                  <button 
                    onClick={() => setShareDialogOpen(false)} 
                    className="text-eco-bark hover:text-eco-moss"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleShare('whatsapp')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mb-2">
                      <path d="M22 4.01v16.97a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4.01a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2Z"></path>
                      <path d="M22 8H2"></path>
                      <path d="m19 12-8.5 4.5"></path>
                      <path d="M5 12v4"></path>
                      <path d="M19 12v4"></path>
                    </svg>
                    <span className="text-sm">WhatsApp</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleShare('facebook')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mb-2">
                      <path d="M16 8a6 6 0 0 1 6 6v8H2v-8a6 6 0 0 1 6-6z"></path>
                      <rect x="10" y="2" width="4" height="6"></rect>
                    </svg>
                    <span className="text-sm">Facebook</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleShare('twitter')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400 mb-2">
                      <path d="M22 2s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 13.5 1.3 8 1.3 8S4.5 9 6.5 8c-1.9-1.3-3-3.4-3-5.5C5.5 4.5 8.8 2 12 2c1 0 1.8.2 2.6.5C17.2 1 22 2 22 2z"></path>
                    </svg>
                    <span className="text-sm">Twitter</span>
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-eco-sand/30">
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      value={`https://sereneeco.com/product/${productId}`} 
                      className="flex-1 border border-eco-sand/30 rounded-l px-4 py-2 bg-eco-sand/10 text-eco-bark text-sm"
                      readOnly
                    />
                    <Button 
                      className="rounded-l-none"
                      onClick={() => {
                        navigator.clipboard.writeText(`https://sereneeco.com/product/${productId}`);
                        toast({
                          title: "Link Copied",
                          description: "Product link copied to clipboard.",
                        });
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
