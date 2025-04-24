
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  className?: string;
}

export function CategoryCard({
  id,
  name,
  description,
  icon,
  count,
  className
}: CategoryCardProps) {
  return (
    <Link to={`/categories/${id}`}>
      <div
        className={cn(
          "bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 transition-all duration-300 hover:shadow-md hover:border-library-300 dark:hover:border-library-700",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-lg bg-library-100 dark:bg-library-900 flex items-center justify-center text-library-600 dark:text-library-400">
            {icon}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {count} buku
          </div>
        </div>
        
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {name}
        </h3>
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
