
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose 
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import SearchForm from "./SearchForm";
import ThemeToggle from "./ThemeToggle";

interface MobileMenuProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSignOut: () => void;
}

export default function MobileMenu({ searchQuery, setSearchQuery, onSignOut }: MobileMenuProps) {
  const { user } = useAuth();

  const navItems = [
    { title: "Beranda", path: "/" },
    { title: "Kategori", path: "/categories" },
    { title: "Buku", path: "/books" },
    { title: "Blog", path: "/blog" },
    { title: "Tentang", path: "/about-us" },
  ];

  return (
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
            <SearchForm 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          
          <nav className="flex-1 space-y-4 py-4">
            {navItems.map((item) => (
              <SheetClose key={item.path} asChild>
                <Link 
                  to={item.path}
                  className="block px-2 py-3 text-gray-700 dark:text-gray-300 hover:text-library-600 dark:hover:text-library-400 transition-colors"
                >
                  {item.title}
                </Link>
              </SheetClose>
            ))}
          </nav>
          
          <div className="py-4 border-t mt-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
              <ThemeToggle />
            </div>
            
            <div className="flex space-x-2">
              {user ? (
                <>
                  <Button asChild className="w-full">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button onClick={onSignOut} variant="outline" className="w-full">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild className="w-full">
                    <Link to="/login">Masuk</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/register">Daftar</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
