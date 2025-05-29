
import React from "react";
import { Link } from "react-router-dom";

export default function DesktopNavigation() {
  const navItems = [
    { title: "Kategori", path: "/categories" },
    { title: "Buku", path: "/books" },
    { title: "Blog", path: "/blog" },
    { title: "Tentang", path: "/about-us" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link 
          key={item.path}
          to={item.path} 
          className="text-gray-700 dark:text-gray-300 hover:text-library-600 dark:hover:text-library-400 transition-colors"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
