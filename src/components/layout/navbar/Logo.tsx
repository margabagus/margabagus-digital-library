
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Logo() {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2"
    >
      <BookOpen className="h-7 w-7 text-library-600 dark:text-library-400" />
      <span className="font-bold text-lg md:text-xl text-gray-800 dark:text-gray-100">
        Marga Bagus Library
      </span>
    </Link>
  );
}
