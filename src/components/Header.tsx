
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const categories = [{
    name: "Furniture",
    path: "/category/furniture"
  }, {
    name: "Lighting",
    path: "/category/lighting"
  }, {
    name: "Flooring",
    path: "/category/flooring"
  }, {
    name: "Doors & Windows",
    path: "/category/doors-windows"
  }, {
    name: "Kitchen",
    path: "/category/kitchen"
  }, {
    name: "Bathroom",
    path: "/category/bathroom"
  }, {
    name: "Decor",
    path: "/category/decor"
  }];
  
  const mainNav = [{
    name: "Shop Collection",
    path: "/themes"
  }, {
    name: "Design Services",
    path: "/design-services"
  }, {
    name: "Sustainability",
    path: "/sustainability"
  }, {
    name: "About",
    path: "/about"
  }, {
    name: "Contact",
    path: "/contact"
  }];
  
  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return <header className="border-b border-eco-sand/30 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="eco-container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center">
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-eco-moss">
            Serene<span className="text-eco-sage">Eco</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          {categories.map(category => {
            const active = isActive(category.path);
            return (
              <Link 
                key={category.name} 
                to={category.path} 
                className={`text-eco-bark hover:text-eco-moss transition-colors mx-2 my-1 px-4 py-2 rounded-full 
                ${active 
                  ? 'bg-eco-sage/10 border border-eco-sage/30 text-eco-moss' 
                  : 'hover:bg-eco-sand/10 border border-transparent hover:border-eco-sand/30'
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5 text-eco-moss" />
              <span className="absolute -top-1 -right-1 bg-eco-sage text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
          </Button>
          
          <Button variant="ghost" className="eco-button hidden lg:flex" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="lg:hidden">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-eco-sand/30 animate-fade-in">
          <nav className="eco-container py-4 flex flex-col space-y-3">
            <h3 className="font-medium text-eco-moss mb-2">Product Categories</h3>
            {categories.map(category => {
              const active = isActive(category.path);
              return (
                <Link 
                  key={category.name} 
                  to={category.path} 
                  className={`text-eco-bark hover:text-eco-moss transition-colors py-2 px-4 rounded-full 
                  ${active 
                    ? 'bg-eco-sage/10 border border-eco-sage/30 text-eco-moss' 
                    : 'hover:bg-eco-sand/10 border border-transparent hover:border-eco-sand/30'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              );
            })}
            
            <div className="border-t border-eco-sand/30 my-4 pt-4">
              <h3 className="font-medium text-eco-moss mb-2">Main Navigation</h3>
              {mainNav.map(item => {
                const active = isActive(item.path);
                return (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    className={`block text-eco-bark hover:text-eco-moss transition-colors py-2 px-4 rounded-full 
                    ${active 
                      ? 'bg-eco-sage/10 border border-eco-sage/30 text-eco-moss' 
                      : 'hover:bg-eco-sand/10 border border-transparent hover:border-eco-sand/30'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            <Button variant="ghost" className="eco-button w-full mt-4" asChild>
              <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>;
};

export default Header;
