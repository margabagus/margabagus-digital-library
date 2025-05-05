
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Sun, Moon, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose 
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    // Check for system preference or saved preference
    const isDark = localStorage.getItem("darkMode") === "true" || 
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
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
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <BookOpen className="h-7 w-7 text-library-600 dark:text-library-400" />
          <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-gray-100">
            Marga Bagus Library
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/categories" 
            className="text-gray-700 dark:text-gray-300 hover:text-library-600 dark:hover:text-library-400 transition-colors"
          >
            Kategori
          </Link>
          <Link 
            to="/books" 
            className="text-gray-700 dark:text-gray-300 hover:text-library-600 dark:hover:text-library-400 transition-colors"
          >
            Buku
          </Link>
          <Link 
            to="/about-us" 
            className="text-gray-700 dark:text-gray-300 hover:text-library-600 dark:hover:text-library-400 transition-colors"
          >
            Tentang
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Search and Icons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              asChild
            >
              <Link to="/search" aria-label="Search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              asChild
            >
              <Link to="/login" aria-label="User profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-library-600 dark:text-library-400" />
                    <span className="font-bold">MB Library</span>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                
                <div className="py-4">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input 
                      type="search" 
                      placeholder="Cari buku..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>
                
                <nav className="flex-1 space-y-4 py-4">
                  <SheetClose asChild>
                    <Link 
                      to="/"
                      className="block px-2 py-3 text-gray-700 dark:text-gray-300 hover:text-library-600 dark:hover:text-library-400 transition-colors"
                    >
                      Beranda
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/categories"
                      className="block px-2 py-3 text-gray-700 dark:text-gray-300 hover:text-library-600 dark:hover:text-library-400 transition-colors"
                    >
                      Kategori
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/books"
                      className="block px-2 py-3 text-gray-700 dark:text-gray-300 hover:text-library-600 dark:hover:text-library-400 transition-colors"
                    >
                      Buku
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/about-us"
                      className="block px-2 py-3 text-gray-700 dark:text-gray-300 hover:text-library-600 dark:hover:text-library-400 transition-colors"
                    >
                      Tentang
                    </Link>
                  </SheetClose>
                </nav>
                
                <div className="py-4 border-t mt-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={toggleDarkMode}
                    >
                      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button asChild className="w-full">
                      <Link to="/login">Masuk</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/register">Daftar</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
