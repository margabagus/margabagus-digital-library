
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BookProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  rating: number;
  className?: string;
}

export function BookCard({
  id,
  title,
  author,
  coverImage,
  category,
  rating,
  className
}: BookProps) {
  return (
    <Link to={`/books/${id}`}>
      <div
        className={cn(
          "book-card group bg-white dark:bg-gray-800",
          className
        )}
      >
        <div className="relative overflow-hidden">
          <img
            src={coverImage}
            alt={`Cover of ${title}`}
            className="book-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <span className="category-badge bg-white/80 dark:bg-gray-800/80 text-library-600 dark:text-library-400">
              {category}
            </span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {author}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {rating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center text-xs text-library-600 dark:text-library-400">
              <BookOpen className="h-3.5 w-3.5 mr-1" />
              <span>Baca</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
