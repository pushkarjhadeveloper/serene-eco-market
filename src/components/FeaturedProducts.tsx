import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addToCart } from "@/store/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { allLightingProducts } from "@/data/lightingProducts";

// Helper function to format currency in INR
const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Get featured lighting products (first product from each lighting subcategory)
const getFeaturedLightingProducts = () => {
  const categories = [
    "lamps",
    "decorative-lighting",
    "outdoor-lighting",
    "smart-lighting"
  ];
  
  return categories.map((category) => {
    const products = allLightingProducts.filter(p => p.subcategory === category);
    return products[0];
  });
};

// Existing furniture products
const existingProducts = [
  {
    id: 1,
    name: "Bamboo Lounge Chair",
    description: "Handcrafted sustainable bamboo lounge chair with organic cotton cushions.",
    price: 42900,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1074&auto=format&fit=crop",
    category: "Furniture",
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1074&auto=format&fit=crop"]
  },
  {
    id: 2,
    name: "Recycled Glass Pendant Light",
    description: "Modern pendant light made from 100% recycled glass with energy-efficient LED.",
    price: 18900,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1170&auto=format&fit=crop",
    category: "Lighting",
    images: ["https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1170&auto=format&fit=crop"]
  },
  {
    id: 3,
    name: "Reclaimed Wood Coffee Table",
    description: "Rustic coffee table crafted from reclaimed wood with natural finish.",
    price: 34900,
    image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?q=80&w=1074&auto=format&fit=crop",
    category: "Furniture",
    images: ["https://images.unsplash.com/photo-1532372576444-dda954194ad0?q=80&w=1074&auto=format&fit=crop"]
  },
  {
    id: 4,
    name: "Organic Cotton Throw Pillows",
    description: "Set of two throw pillows made from GOTS certified organic cotton.",
    price: 7900,
    image: "https://images.unsplash.com/photo-1584289530046-d0bd5a5db235?q=80&w=1075&auto=format&fit=crop",
    category: "Decor",
    images: ["https://images.unsplash.com/photo-1584289530046-d0bd5a5db235?q=80&w=1075&auto=format&fit=crop"]
  },
];

// Combine existing products with featured lighting products
const featuredLightingProducts = getFeaturedLightingProducts();
const allFeaturedProducts = [...existingProducts, ...featuredLightingProducts];

// Show 8 products max
const displayProducts = allFeaturedProducts.slice(0, 8);

const FeaturedProducts = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleAddToCart = (product: any) => {
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
  };

  return (
    <section className="eco-container py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <h2 className="section-title">Sustainable Favorites</h2>
          <p className="text-eco-bark max-w-xl">
            Discover our most loved eco-friendly pieces that bring beauty and sustainability to any space.
          </p>
        </div>
        <Link to="/category/lighting">
          <Button variant="ghost" className="mt-4 md:mt-0 border border-eco-sage text-eco-moss hover:bg-eco-sage/10">
            View All Lighting Products
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <div key={product.id} className="eco-card group">
            <div className="aspect-square overflow-hidden relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <span className="absolute top-3 left-3 bg-eco-sage text-white text-xs px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-serif font-medium text-lg text-eco-moss group-hover:text-eco-leaf transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-eco-bark text-sm mt-1 line-clamp-2">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-medium text-eco-moss">{formatINR(product.price)}</p>
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
