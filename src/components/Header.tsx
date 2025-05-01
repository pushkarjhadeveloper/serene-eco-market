import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  return <header className="border-b border-eco-sand/30 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="eco-container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center">
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-eco-moss">
            Serene<span className="text-eco-sage">Eco</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {categories.map(category => <Link key={category.name} to={category.path} className="text-eco-bark hover:text-eco-moss transition-colors mx-[11px] my-0 px-0 py-px\nMake their outlining in bubble">
              {category.name}
            </Link>)}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5 text-eco-moss" />
            <span className="absolute -top-1 -right-1 bg-eco-sage text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Button>
          
          <Button variant="ghost" className="eco-button hidden lg:flex">
            Sign In
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="lg:hidden">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <div className="lg:hidden bg-white border-t border-eco-sand/30 animate-fade-in">
          <nav className="eco-container py-4 flex flex-col space-y-3">
            {categories.map(category => <Link key={category.name} to={category.path} className="text-eco-bark hover:text-eco-moss transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                {category.name}
              </Link>)}
            <Button variant="ghost" className="eco-button w-full mt-4">
              Sign In
            </Button>
          </nav>
        </div>}
    </header>;
};
export default Header;