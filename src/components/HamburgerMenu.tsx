
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

type MenuItemProps = {
  name: string;
  path: string;
  isActive?: boolean;
  onClick: () => void;
};

const MenuItem = ({ name, path, isActive = false, onClick }: MenuItemProps) => (
  <Link 
    to={path} 
    className={`text-eco-bark hover:text-eco-moss transition-colors py-2 px-4 rounded-full 
    ${isActive 
      ? 'bg-eco-sage/10 border border-eco-sage/30 text-eco-moss' 
      : 'hover:bg-eco-sand/10 border border-transparent hover:border-eco-sand/30'
    }`}
    onClick={onClick}
  >
    {name}
  </Link>
);

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  const categories = [{
    name: "Furniture",
    path: "/category/furniture"
  }, {
    name: "Lighting",
    path: "/category/lighting"
  }, {
    name: "Doors & Windows",
    path: "/category/doors-windows"
  }, {
    name: "Flooring",
    path: "/category/flooring"
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

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[85vw] max-w-sm py-6 overflow-y-auto">
          <div className="flex flex-col space-y-3 pb-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-medium text-eco-moss">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            
            <h3 className="font-medium text-eco-moss mb-2">Product Categories</h3>
            <div className="flex flex-col space-y-2">
              {categories.map(category => (
                <MenuItem 
                  key={category.name}
                  name={category.name}
                  path={category.path}
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
            
            <div className="border-t border-eco-sand/30 my-4 pt-4">
              <h3 className="font-medium text-eco-moss mb-2">Main Navigation</h3>
              <div className="flex flex-col space-y-2">
                {mainNav.map(item => (
                  <MenuItem 
                    key={item.name}
                    name={item.name}
                    path={item.path}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="ghost" className="eco-button w-full" asChild>
                <Link to="/signin" onClick={() => setOpen(false)}>
                  Sign In
                </Link>
              </Button>
              
              <Button variant="default" className="eco-button w-full" asChild>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamburgerMenu;
