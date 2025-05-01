
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1170&auto=format&fit=crop",
    path: "/category/furniture",
    description: "Sustainable seating, tables, and storage solutions"
  },
  {
    name: "Lighting",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1169&auto=format&fit=crop",
    path: "/category/lighting",
    description: "Energy-efficient lamps and fixtures"
  },
  {
    name: "Flooring",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1287&auto=format&fit=crop",
    path: "/category/flooring",
    description: "Eco-friendly flooring materials and options"
  },
  {
    name: "Kitchen",
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=1287&auto=format&fit=crop",
    path: "/category/kitchen",
    description: "Sustainable kitchen fixtures and appliances"
  },
  {
    name: "Bathroom",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1169&auto=format&fit=crop",
    path: "/category/bathroom",
    description: "Water-saving fixtures and eco-friendly accessories"
  },
  {
    name: "Decor",
    image: "https://images.unsplash.com/photo-1586105449897-20b5efeb3233?q=80&w=1287&auto=format&fit=crop",
    path: "/category/decor",
    description: "Sustainable accents and decorative pieces"
  },
];

const Categories = () => {
  return (
    <section className="bg-eco-sand/20 py-16">
      <div className="eco-container">
        <h2 className="section-title text-center">Shop by Category</h2>
        <p className="text-eco-bark text-center max-w-2xl mx-auto mb-12">
          Explore our curated collection of sustainable interior essentials, from furniture to home decor.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={category.path}
              className="group overflow-hidden relative rounded-lg aspect-[4/3] eco-card"
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-eco-moss/80 to-eco-moss/0"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl text-white font-medium">{category.name}</h3>
                <p className="text-white/90 mt-2 text-sm">{category.description}</p>
                <div className="mt-4 inline-flex items-center text-white gap-2 text-sm">
                  <span>Explore</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
