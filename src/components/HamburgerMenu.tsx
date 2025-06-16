import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Palette, Zap, Layers, PenTool, Sparkles, Cube, Scan, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

type MenuItemProps = {
  name: string;
  path: string;
  isActive?: boolean;
  onClick: () => void;
  external?: boolean;
};

const MenuItem = ({ name, path, isActive = false, onClick, external = false }: MenuItemProps) => (
  external ? (
    <a 
      href={path}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-eco-bark hover:text-eco-moss transition-colors py-3 px-4 rounded-lg block
      ${isActive 
        ? 'bg-eco-sage/10 border border-eco-sage/30 text-eco-moss' 
        : 'hover:bg-eco-sand/10 border border-transparent hover:border-eco-sand/30'
      }`}
      onClick={onClick}
    >
      {name}
    </a>
  ) : (
    <Link 
      to={path} 
      className={`text-eco-bark hover:text-eco-moss transition-colors py-3 px-4 rounded-lg block
      ${isActive 
        ? 'bg-eco-sage/10 border border-eco-sage/30 text-eco-moss' 
        : 'hover:bg-eco-sand/10 border border-transparent hover:border-eco-sand/30'
      }`}
      onClick={onClick}
    >
      {name}
    </Link>
  )
);

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

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

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[90vw] max-w-sm py-6 overflow-y-auto bg-white">
          <div className="flex flex-col space-y-4 pb-24">
            <h2 className="font-serif text-lg font-medium text-eco-moss">Menu</h2>
            
            <div>
              <h3 className="font-medium text-eco-moss mb-3">Product Categories</h3>
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
            </div>
            
            <div className="border-t border-eco-sand/30 pt-4">
              <h3 className="font-medium text-eco-moss mb-3">Main Navigation</h3>
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

            <div className="border-t border-eco-sand/30 pt-4">
              <Link 
                to="/designer-space"
                className="text-eco-bark hover:text-eco-moss transition-colors py-3 px-4 rounded-lg block hover:bg-eco-sand/10 border border-transparent hover:border-eco-sand/30"
                onClick={() => setOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-eco-sage">
                    <PenTool className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-lg bg-gradient-to-r from-eco-sage to-eco-moss bg-clip-text text-transparent">
                      Designer Space
                    </div>
                    <div className="text-xs text-eco-bark/70 mt-1">Professional design tools & workspace</div>
                  </div>
                </div>
              </Link>
            </div>
            
            {user ? (
              <div className="border-t border-eco-sand/30 pt-4">
                <h3 className="font-medium text-eco-moss mb-3">Account</h3>
                <div className="flex flex-col space-y-2">
                  <MenuItem 
                    name="Profile"
                    path="/profile"
                    onClick={() => setOpen(false)}
                  />
                  <MenuItem 
                    name="Orders"
                    path="/orders"
                    onClick={() => setOpen(false)}
                  />
                  <button 
                    onClick={handleLogout}
                    className="text-eco-bark hover:text-eco-moss transition-colors py-3 px-4 rounded-lg text-left hover:bg-eco-sand/10 border border-transparent hover:border-eco-sand/30"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4 border-t border-eco-sand/30 pt-4">
                <Button variant="ghost" className="eco-button w-full justify-center" asChild>
                  <Link to="/signin" onClick={() => setOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                
                <Button variant="default" className="eco-button w-full justify-center" asChild>
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamburgerMenu;
