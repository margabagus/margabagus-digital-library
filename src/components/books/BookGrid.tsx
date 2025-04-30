
import React from "react";
import { BookCard, BookProps } from "./BookCard";
import { cn } from "@/lib/utils";

interface BookGridProps {
  books: BookProps[];
  className?: string;
}

export function BookGrid({ books, className }: BookGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6", className)}>
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </div>
  );
}
