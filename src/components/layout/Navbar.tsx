
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import Logo from "./navbar/Logo";
import DesktopNavigation from "./navbar/DesktopNavigation";
import ThemeToggle from "./navbar/ThemeToggle";
import UserMenu from "./navbar/UserMenu";
import MobileMenu from "./navbar/MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />

        <DesktopNavigation />

        <div className="flex items-center space-x-4">
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            
            <Button 
              variant="ghost" 
              size="icon"
              asChild
            >
              <Link to="/search" aria-label="Search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            
            <UserMenu />
          </div>
          
          {/* Mobile Menu */}
          <MobileMenu 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSignOut={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
}
