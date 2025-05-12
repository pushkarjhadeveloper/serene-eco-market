
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart, User as UserIcon } from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import HamburgerMenu from "./HamburgerMenu";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Header = () => {
  const location = useLocation();
  const cartItems = useAppSelector(state => state.cart.items);
  const { user, signOut } = useAuth();

  // Calculate total items in cart
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const categories = [
    { name: "Furniture", path: "/category/furniture" },
    { name: "Lighting", path: "/category/lighting" },
    { name: "Flooring", path: "/category/flooring" },
    { name: "Doors & Windows", path: "/category/doors-windows" },
    { name: "Kitchen", path: "/category/kitchen" },
    { name: "Bathroom", path: "/category/bathroom" },
    { name: "Decor", path: "/category/decor" }
  ];

  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Get user initials for the avatar
  const getInitials = () => {
    if (!user) return "?";
    const email = user.email || "";
    return email.substring(0, 2).toUpperCase();
  };
  
  // Handle logout
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="border-b border-eco-sand/30 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
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
                className="px-[10px] py-[4px]"
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
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-eco-sage text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8 border border-eco-sage/20">
                    <AvatarFallback className="bg-eco-sage/10 text-eco-moss">{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Button variant="ghost" className="eco-button" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>

              <Button variant="default" className="eco-button" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Hamburger Menu */}
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
