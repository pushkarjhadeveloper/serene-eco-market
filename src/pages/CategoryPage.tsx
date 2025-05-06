import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addToCart } from "@/store/cartSlice";
import { shareProduct } from "@/utils/shareProduct";
import { lightingCategories, lightingProducts } from "@/data/lightingProducts";
import { flooringCategories, flooringProducts } from "@/data/flooringProducts";
import { doorsWindowsCategories, doorsWindowsProducts } from "@/data/doorsWindowsProducts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Furniture subcategories data
const furnitureSubcategories = [
  { name: "Sofas", path: "sofas", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format", description: "Eco-friendly sofas made with sustainable materials" },
  { name: "Beds", path: "beds", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format", description: "Sustainable bedroom furniture for restful sleep" },
  { name: "Wardrobes", path: "wardrobes", image: "https://images.unsplash.com/photo-1595515106864-077d30192c56?w=500&auto=format", description: "Eco-conscious storage solutions for your home" },
  { name: "Dining", path: "dining", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&auto=format", description: "Sustainable dining tables and chairs" },
  { name: "Office Chairs", path: "office-chairs", image: "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?w=500&auto=format", description: "Ergonomic and sustainable office seating" },
  { name: "Outdoor", path: "outdoor", image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format", description: "Weather-resistant eco-friendly outdoor furniture" },
];

// Subcategory data organized by main category
const subcategoriesData = {
  "furniture": furnitureSubcategories,
  "lighting": lightingCategories,
  "flooring": flooringCategories,
  "doors-windows": doorsWindowsCategories,
  // ... other categories with their subcategories
};

// Helper function to generate unique IDs
const generateId = (category: string, subcategory: string, index: number): string => {
  return `${category}-${subcategory}-${index + 1}`;
};

// Generate 15 sofa products
const sofaProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "sofas", index),
  name: [
    "Organic Cotton Sofa", 
    "Bamboo Sectional", 
    "Recycled Polyester Loveseat",
    "Hemp Fabric Couch",
    "Reclaimed Wood Frame Sofa",
    "Jute Upholstered Settee",
    "Non-Toxic L-Shaped Sectional",
    "Sustainable Linen Chaise Lounge",
    "Cork Accent Sofa",
    "Natural Latex Cushion Couch",
    "FSC-Certified Timber Daybed",
    "Upcycled Fabric Convertible Sofa",
    "Organic Wool Stuffed Settee",
    "Bamboo & Hemp Blend Futon",
    "Recycled Ocean Plastic Outdoor Sofa"
  ][index],
  price: 43999 + (index * 5000),
  description: "Handcrafted sofa with organic materials and sustainable wooden frame. Perfect for eco-conscious homes.",
  material: "Organic cotton, FSC-certified wood",
  deliveryTime: "3-4 weeks",
  images: [
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&auto=format",
    "https://images.unsplash.com/photo-1560448075-32314de132c0?w=500&auto=format",
    "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500&auto=format"
  ]
}));

// Generate 15 bed products
const bedProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "beds", index),
  name: [
    "Reclaimed Wood King Bed", 
    "Bamboo Queen Platform Bed", 
    "Organic Cotton Upholstered Bed",
    "Hemp Canopy Bed",
    "FSC-Certified Pine Twin Bed",
    "Upcycled Metal Frame Bed",
    "Natural Latex Mattress & Frame Set",
    "Solid Oak California King",
    "Sustainable Walnut Sleigh Bed",
    "Minimalist Bamboo Platform Bed",
    "Recycled Wood Panel Headboard Bed",
    "Cork & Wood Blend Frame",
    "Zero VOC Finish Maple Bed",
    "Organic Cotton Daybed",
    "Convertible Tatami Style Bed"
  ][index],
  price: 59999 + (index * 4000),
  description: "Eco-friendly bed frame crafted from sustainable materials with a natural finish. Sleep well knowing you've made an environmentally conscious choice.",
  material: "Reclaimed wood, Non-toxic finish",
  deliveryTime: "4 weeks",
  images: [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format",
    "https://images.unsplash.com/photo-1505693314053-e3e1626c98e6?w=500&auto=format",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format"
  ]
}));

// Generate 15 wardrobe products
const wardrobeProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "wardrobes", index),
  name: [
    "Bamboo Sliding Door Wardrobe", 
    "Reclaimed Wood Armoire", 
    "Modular Sustainable Storage System",
    "FSC-Certified Oak Wardrobe",
    "Hemp Canvas Garment Organizer",
    "Minimalist Eco-Plywood Closet",
    "Recycled Metal Frame Wardrobe",
    "Jute & Wood Storage Cabinet",
    "Natural Oil Finish Pine Wardrobe",
    "Convertible Multi-use Storage",
    "Zero-Waste Birch Ply Wardrobe",
    "Organic Cotton Covered Storage System",
    "Upcycled Door Panel Armoire",
    "Bamboo & Rattan Flexible Storage",
    "Recycled Plastic Outdoor Storage Cabinet"
  ][index],
  price: 72999 + (index * 6000),
  description: "Spacious wardrobe made from sustainable materials, offering ample storage space while minimizing environmental impact.",
  material: "FSC-certified wood, Non-toxic finishes",
  deliveryTime: "5 weeks",
  images: [
    "https://images.unsplash.com/photo-1595515106864-077d30192c56?w=500&auto=format",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format", 
    "https://images.unsplash.com/photo-1595515106864-077d30192c56?w=500&auto=format"
  ]
}));

// Generate 15 dining products
const diningProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "dining", index),
  name: [
    "Reclaimed Wood Dining Table", 
    "Bamboo Extendable Table & Chairs", 
    "Organic Cotton Upholstered Set",
    "Sustainable Teak Dining Set",
    "Hemp Seat Cushion Chairs",
    "FSC-Certified Oak Table",
    "Live Edge Walnut Table",
    "Recycled Metal & Wood Set",
    "Round Bamboo Dining Table",
    "Minimalist Cork Chairs",
    "Natural Oil Finish Dining Set",
    "Upcycled Industrial Dining Table",
    "Zero VOC Pine Dining Set",
    "Handcrafted Rattan Chair Set",
    "Modular Sustainable Dining System"
  ][index],
  price: 85999 + (index * 7500),
  description: "Beautiful dining set crafted from sustainable materials. Perfect for eco-conscious entertaining and family meals.",
  material: "FSC-certified wood, Natural oil finish",
  deliveryTime: "4-6 weeks",
  images: [
    "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&auto=format",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format",
    "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&auto=format"
  ]
}));

// Generate 15 office chair products
const officeChairProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "office-chairs", index),
  name: [
    "Ergonomic Bamboo Office Chair", 
    "Recycled Fabric Task Chair", 
    "Hemp Upholstered Desk Chair",
    "Sustainable Wood & Steel Chair",
    "Organic Cotton Executive Chair",
    "Zero-Waste Manufacturing Chair",
    "Cork Seat Ergonomic Chair",
    "FSC-Certified Wood Frame Chair",
    "Adjustable Eco-Friendly Chair",
    "Recycled Plastic Mesh Back Chair",
    "Natural Latex Cushion Office Chair",
    "Biodegradable Components Chair",
    "Jute & Bamboo Conference Chair",
    "Minimalist Low-Impact Work Chair",
    "Upcycled Materials Designer Chair"
  ][index],
  price: 32999 + (index * 3000),
  description: "Ergonomic office chair made from sustainable materials, designed for comfort during long work sessions with minimal environmental impact.",
  material: "Recycled materials, Ergonomic design",
  deliveryTime: "2-3 weeks",
  images: [
    "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?w=500&auto=format",
    "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?w=500&auto=format",
    "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?w=500&auto=format"
  ]
}));

// Generate 15 outdoor furniture products
const outdoorProducts = Array(15).fill(null).map((_, index) => ({
  id: generateId("furniture", "outdoor", index),
  name: [
    "Weather-Resistant Bamboo Set", 
    "Recycled Plastic Adirondack Chair", 
    "Sustainable Teak Patio Table",
    "Hemp Rope Hammock",
    "Reclaimed Wood Garden Bench",
    "Solar-Powered Lounge Set",
    "Biodegradable Rattan Furniture",
    "FSC-Certified Wooden Lounger",
    "Upcycled Metal Outdoor Set",
    "Cork & Bamboo Garden Table",
    "Rainwater-Collecting Planter Bench",
    "Natural Oil Finish Deck Chairs",
    "Recycled Sail Cloth Canopy",
    "Sustainable Outdoor Kitchen Set",
    "Non-Toxic Garden Furniture System"
  ][index],
  price: 49999 + (index * 4500),
  description: "Weather-resistant outdoor furniture made from sustainable materials, designed to withstand the elements while maintaining eco-friendly standards.",
  material: "Weather-resistant sustainable materials",
  deliveryTime: "3-5 weeks",
  images: [
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format"
  ]
}));

// Combine all the furniture products
const furnitureProducts = {
  "sofas": sofaProducts,
  "beds": bedProducts,
  "wardrobes": wardrobeProducts,
  "dining": diningProducts,
  "office-chairs": officeChairProducts,
  "outdoor": outdoorProducts,
};

// Combine all products
const productsData = {
  "furniture": furnitureProducts,
  "lighting": lightingProducts,
  "flooring": flooringProducts,
  "doors-windows": doorsWindowsProducts,
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
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shareDrawerOpen, setShareDrawerOpen] = useState<boolean>(false);
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
  const getProducts = () => {
    if (!categoryName || !subCategory) return [];
    
    const categoryProducts = productsData[categoryName as keyof typeof productsData];
    if (!categoryProducts) return [];
    
    return categoryProducts[subCategory as keyof typeof categoryProducts] || [];
  };
  
  const products = getProducts();

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

  const handleShare = (productOrPlatform: any) => {
    // If it's a product object (has id property), set it as selected product
    if (productOrPlatform && typeof productOrPlatform === 'object' && 'id' in productOrPlatform) {
      setSelectedProduct(productOrPlatform);
      setShareDrawerOpen(true);
      return;
    }
    
    // If it's a string (platform name) and we have a selected product
    const platform = typeof productOrPlatform === 'string' ? productOrPlatform : "";
    
    if (selectedProduct && platform) {
      // Use our utility function to share
      shareProduct(platform, selectedProduct.id, selectedProduct.name);
      setShareDrawerOpen(false);
      
      toast({
        title: "Link Shared",
        description: platform === 'copy' ? "Product link copied to clipboard." : `Sharing via ${platform}...`,
      });
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
                        onClick={() => {
                          setShareDrawerOpen(true);
                        }}
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
        
        {/* Share Drawer */}
        <Drawer open={shareDrawerOpen} onOpenChange={setShareDrawerOpen}>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Share Product</DrawerTitle>
                <DrawerDescription>Share this product with friends and family.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleShare('whatsapp')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mb-2">
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Zm0 0a5 5 0 0 0 5 5"></path>
                    </svg>
                    <span className="text-sm">WhatsApp</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleShare('facebook')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mb-2">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    <span className="text-sm">Facebook</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleShare('twitter')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400 mb-2">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                    <span className="text-sm">Twitter</span>
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-eco-sand/30">
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      value={selectedProduct ? `https://sereneeco.com/product/${selectedProduct.id}` : ''}
                      className="flex-1 border border-eco-sand/30 rounded-l px-4 py-2 bg-eco-sand/10 text-eco-bark text-sm"
                      readOnly
                    />
                    <Button 
                      className="rounded-l-none"
                      onClick={() => handleShare('copy')}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <Button variant="outline" onClick={() => setShareDrawerOpen(false)}>
                  Cancel
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </Layout>
  );
};

export default CategoryPage;
