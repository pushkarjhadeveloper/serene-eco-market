
import { Link } from "react-router-dom";
import { lightingCategories } from "@/data/lightingProducts";
import { doorsWindowsCategories } from "@/data/doorsWindowsProducts";
import { flooringCategories } from "@/data/flooringProducts";
import { furnitureSubcategories } from "@/data/furnitureProducts";
import { kitchenCategories } from "@/data/kitchenProducts";
import { bathroomCategories } from "@/data/bathroomProducts";
import { decorCategories } from "@/data/decorProducts";

// Original categories + all subcategories
const allCategories = [
  {
    name: "Furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1216&auto=format&fit=crop",
    path: "/category/furniture",
    subcategories: furnitureSubcategories.slice(0, 6),
  },
  {
    name: "Lighting",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1170&auto=format&fit=crop",
    path: "/category/lighting",
    subcategories: lightingCategories.slice(0, 6), 
  },
  {
    name: "Doors & Windows",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1170&auto=format&fit=crop",
    path: "/category/doors-windows",
    subcategories: doorsWindowsCategories.slice(0, 6),
  },
  {
    name: "Flooring",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format",
    path: "/category/flooring",
    subcategories: flooringCategories.slice(0, 6),
  },
  {
    name: "Kitchen",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1469&auto=format&fit=crop",
    path: "/category/kitchen",
    subcategories: kitchenCategories.slice(0, 6),
  },
  {
    name: "Bathroom",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop",
    path: "/category/bathroom",
    subcategories: bathroomCategories.slice(0, 6),
  },
  {
    name: "Decor",
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=1170&auto=format&fit=crop",
    path: "/category/decor",
    subcategories: decorCategories.slice(0, 6),
  },
  {
    name: "Themes",
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?q=80&w=1287&auto=format&fit=crop",
    path: "/themes", 
  },
];

const Categories = () => {
  return (
    <section className="eco-container py-16">
      <h2 className="section-title text-center mb-4">Sustainable Living Categories</h2>
      <p className="text-eco-bark text-center mx-auto max-w-2xl mb-12">
        Explore our curated collections of eco-friendly home products, all designed with sustainability and style in mind.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCategories.map((category) => (
          <div key={category.name} className="eco-card overflow-hidden">
            <Link to={category.path} className="block group">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <h3 className="absolute bottom-6 left-6 text-white font-serif text-2xl font-medium">{category.name}</h3>
              </div>
            </Link>
            
            {/* Display subcategories if they exist */}
            {category.subcategories && (
              <div className="p-4 bg-eco-sand/10">
                <h4 className="text-eco-moss font-medium mb-2">Featured {category.name} Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.map((subcat) => (
                    <Link
                      key={subcat.path}
                      to={`/category/${category.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}/${subcat.path}`}
                      className="text-sm bg-white px-3 py-1 rounded-full border border-eco-sage text-eco-bark hover:bg-eco-sage hover:text-white transition-colors"
                    >
                      {subcat.name}
                    </Link>
                  ))}
                  <Link
                    to={`/category/${category.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                    className="text-sm bg-white px-3 py-1 rounded-full border border-eco-moss/30 text-eco-moss hover:bg-eco-moss hover:text-white transition-colors"
                  >
                    View All →
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
