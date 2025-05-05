
import { Link } from "react-router-dom";
import { lightingCategories } from "@/data/lightingProducts";

// Original categories + lighting subcategories
const allCategories = [
  {
    name: "Furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1216&auto=format&fit=crop",
    path: "/category/furniture",
    subcategories: [
      { name: "Sofas", path: "sofas", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format" },
      { name: "Beds", path: "beds", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format" },
      { name: "Wardrobes", path: "wardrobes", image: "https://images.unsplash.com/photo-1595515106864-077d30192c56?w=500&auto=format" },
      { name: "Dining", path: "dining", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&auto=format" },
      { name: "Office Chairs", path: "office-chairs", image: "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?w=500&auto=format" },
      { name: "Outdoor", path: "outdoor", image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&auto=format" },
    ]
  },
  {
    name: "Lighting",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1170&auto=format&fit=crop",
    path: "/category/lighting",
    subcategories: lightingCategories.slice(0, 6), // Show 6 lighting subcategories
  },
  {
    name: "Decor",
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=1170&auto=format&fit=crop",
    path: "/category/decor",
  },
  {
    name: "Kitchen",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1469&auto=format&fit=crop",
    path: "/category/kitchen",
  },
  {
    name: "Outdoors",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1474&auto=format&fit=crop",
    path: "/category/outdoors",
  },
  {
    name: "Themes",
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?q=80&w=1287&auto=format&fit=crop",
    path: "/themes", // This one links to the themes page, not a category
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
                      to={`/category/${category.name.toLowerCase()}/${subcat.path}`}
                      className="text-sm bg-white px-3 py-1 rounded-full border border-eco-sage text-eco-bark hover:bg-eco-sage hover:text-white transition-colors"
                    >
                      {subcat.name}
                    </Link>
                  ))}
                  <Link
                    to={`/category/${category.name.toLowerCase()}`}
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
