import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addToCart } from "@/store/cartSlice";

// Subcategory data organized by main category
const subcategoriesData = {
  "furniture": [
    { name: "Sofas", path: "sofas", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format" },
    { name: "Beds", path: "beds", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format" },
    { name: "Wardrobes", path: "wardrobes", image: "https://images.unsplash.com/photo-1595515106864-077d30192c56?w=500&auto=format" },
    { name: "Dining", path: "dining", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&auto=format" },
    { name: "Office Chairs", path: "office-chairs", image: "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?w=500&auto=format" },
    { name: "Outdoor", path: "outdoor", image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format" },
  ],
  "lighting": [
    { name: "Ceiling Lights", path: "ceiling-lights", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&auto=format" },
    { name: "Table Lamps", path: "table-lamps", image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=500&auto=format" },
    { name: "Floor Lamps", path: "floor-lamps", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format" },
  ],
  "flooring": [
    { name: "Wooden", path: "wooden", image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=500&auto=format" },
    { name: "Carpets", path: "carpets", image: "https://images.unsplash.com/photo-1584145951017-d9f047e8420c?w=500&auto=format" },
    { name: "Tiles", path: "tiles", image: "https://images.unsplash.com/photo-1635362578680-a95b4c2cef81?w=500&auto=format" },
  ],
  // ... other categories with their subcategories
};

// Sample products organized by category and subcategory
const productsData = {
  "furniture": {
    "sofas": [
      { 
        id: 101, 
        name: "Organic Cotton Sofa", 
        price: 43999, 
        description: "Handcrafted sofa with organic cotton upholstery and sustainable wooden frame. Perfect for eco-conscious homes.",
        material: "Organic cotton, FSC-certified wood",
        deliveryTime: "3-4 weeks",
        images: [
          "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&auto=format",
          "https://images.unsplash.com/photo-1560448075-32314de132c0?w=500&auto=format",
          "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500&auto=format"
        ]
      },
      { 
        id: 102, 
        name: "Bamboo Sectional Sofa", 
        price: 67999, 
        description: "Modern sectional sofa with bamboo frame and recycled polyester fabric. Versatile and environmentally friendly.",
        material: "Bamboo, Recycled polyester",
        deliveryTime: "4-5 weeks",
        images: [
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&auto=format",
          "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=500&auto=format",
          "https://images.unsplash.com/photo-1511389026070-a14ae610a1be?w=500&auto=format"
        ]
      },
      // More products...
    ],
    "beds": [
      { 
        id: 201, 
        name: "Reclaimed Wood King Bed", 
        price: 59999, 
        description: "King-size bed frame crafted from reclaimed wood with a natural finish. Each piece is unique with its own character.",
        material: "Reclaimed wood, Non-toxic finish",
        deliveryTime: "4 weeks",
        images: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format",
          "https://images.unsplash.com/photo-1505693314053-e3e1626c98e6?w=500&auto=format",
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format"
        ]
      },
      // More products...
    ],
    // More subcategories with products...
  },
  // More categories with products...
};

// Helper function to format currency in INR
const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const CategoryPage = () => {
  const { categoryName, subCategory } = useParams<{ categoryName: string; subCategory?: string }>();
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    // Reset image index when product changes
    setCurrentImageIndex(0);
  }, [selectedProduct]);
  
  // Convert categoryName from URL format to display format (e.g., "doors-windows" to "Doors & Windows")
  const formatCategoryName = (name: string) => {
    if (!name) return "";
    
    // Handle special case for doors-windows
    if (name === "doors-windows") return "Doors & Windows";
    
    return name
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Format subcategory name for display
  const formatSubcategoryName = (name: string) => {
    if (!name) return "";
    return name
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const displayCategoryName = formatCategoryName(categoryName || "");
  const displaySubcategoryName = subCategory ? formatSubcategoryName(subCategory) : "";
  
  // Get subcategories for the current category
  const subcategories = categoryName ? subcategoriesData[categoryName as keyof typeof subcategoriesData] || [] : [];
  
  // Get products for the current subcategory
  const products = categoryName && subCategory && productsData[categoryName as keyof typeof productsData] ? 
    productsData[categoryName as keyof typeof productsData][subCategory as keyof typeof productsData[keyof typeof productsData]] || [] : [];

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      theme: "Earthy Tones", // Default theme
      category: categoryName || "Furniture" // Use category from URL or default
    }));
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleShare = (platform?: string) => {
    if (!selectedProduct) return;
    
    if (platform) {
      const shareUrl = `https://sereneeco.com/product/${selectedProduct.id}`;
      const shareText = `I found this amazing sustainable ${selectedProduct.name} that I thought you might like!`;
      
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
    } else {
      setShareDialogOpen(true);
    }
  };

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <Layout>
      <div className="eco-container py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-eco-moss mb-4">
            {displaySubcategoryName || displayCategoryName}
          </h1>
          <div className="flex items-center text-eco-bark text-sm">
            <Link to="/" className="hover:text-eco-moss">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${categoryName}`} className={`hover:text-eco-moss ${subCategory ? '' : 'text-eco-moss'}`}>
              {displayCategoryName}
            </Link>
            {subCategory && (
              <>
                <span className="mx-2">/</span>
                <span className="text-eco-moss">{displaySubcategoryName}</span>
              </>
            )}
          </div>
        </div>
        
        {!subCategory && subcategories.length > 0 ? (
          <>
            <p className="text-eco-bark text-lg mb-8 max-w-3xl">
              Explore our sustainable {displayCategoryName.toLowerCase()} collection, crafted from eco-friendly materials and designed for both beauty and functionality.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {subcategories.map((subcat) => (
                <Link 
                  key={subcat.name} 
                  to={`/category/${categoryName}/${subcat.path}`}
                  className="group overflow-hidden relative rounded-lg aspect-[4/3] eco-card"
                >
                  <img 
                    src={subcat.image} 
                    alt={subcat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-eco-moss/80 to-eco-moss/0"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl text-white font-medium">{subcat.name}</h3>
                    <div className="mt-4 inline-flex items-center text-white gap-2 text-sm">
                      <span>Browse Collection</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="eco-card group">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-medium text-lg text-eco-moss group-hover:text-eco-leaf transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-eco-bark text-sm mt-1 line-clamp-2">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-medium text-eco-moss">{formatINR(product.price)}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full border-eco-sage text-eco-moss hover:bg-eco-sage hover:text-white transition-colors"
                        onClick={() => handleShare(product)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                          <polyline points="16 6 12 2 8 6"></polyline>
                          <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        <span className="sr-only">Share</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full border-eco-sage text-eco-moss hover:bg-eco-sage hover:text-white transition-colors"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Add to cart</span>
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full mt-4 eco-button" onClick={() => setSelectedProduct(product)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-eco-sand/10 rounded-lg p-8 text-center">
            <p className="text-eco-bark text-lg mb-4">
              We're currently curating our {(displaySubcategoryName || displayCategoryName).toLowerCase()} collection.
            </p>
            <p className="text-eco-moss">
              Check back soon to explore our sustainable options.
            </p>
          </div>
        )}
        
        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="font-serif text-2xl font-medium text-eco-moss">{selectedProduct.name}</h2>
                  <button 
                    onClick={() => setSelectedProduct(null)} 
                    className="text-eco-bark hover:text-eco-moss"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-4 border border-eco-sand/30">
                      <img 
                        src={selectedProduct.images[currentImageIndex]} 
                        alt={`${selectedProduct.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {selectedProduct.images.length > 1 && (
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
                    
                    {selectedProduct.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {selectedProduct.images.map((img: string, idx: number) => (
                          <button 
                            key={idx} 
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-16 h-16 rounded border-2 flex-shrink-0 ${idx === currentImageIndex ? 'border-eco-moss' : 'border-eco-sand/30'}`}
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
                    <p className="font-serif text-2xl text-eco-moss mb-4">{formatINR(selectedProduct.price)}</p>
                    <p className="text-eco-bark mb-6">{selectedProduct.description}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="font-medium text-eco-moss">Materials</h3>
                        <p className="text-eco-bark">{selectedProduct.material}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-eco-moss">Estimated Delivery</h3>
                        <p className="text-eco-bark">{selectedProduct.deliveryTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        className="eco-button flex-1"
                        onClick={() => {
                          handleAddToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="flex-1 border-eco-sage text-eco-moss"
                        onClick={() => handleShare(selectedProduct)}
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
              </div>
            </div>
          </div>
        )}
        
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
                      value={`https://sereneeco.com/product/${selectedProduct?.id}`} 
                      className="flex-1 border border-eco-sand/30 rounded-l px-4 py-2 bg-eco-sand/10 text-eco-bark text-sm"
                      readOnly
                    />
                    <Button 
                      className="rounded-l-none"
                      onClick={() => {
                        navigator.clipboard.writeText(`https://sereneeco.com/product/${selectedProduct?.id}`);
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

export default CategoryPage;
