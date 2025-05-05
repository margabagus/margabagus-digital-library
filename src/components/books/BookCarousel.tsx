
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookCard, BookProps } from "./BookCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookCarouselProps {
  title: string;
  books: BookProps[];
  className?: string;
}

export function BookCarousel({ title, books, className }: BookCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 400; // Increased to match the wider card width
    const container = scrollContainerRef.current;
    
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={cn("w-full py-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <div className="flex space-x-2">
          <Button
            onClick={() => scroll("left")}
            variant="outline"
            size="icon"
            className="hidden md:flex h-8 w-8 rounded-full"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => scroll("right")}
            variant="outline"
            size="icon"
            className="hidden md:flex h-8 w-8 rounded-full"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4 no-scrollbar"
      >
        {books.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            className="flex-shrink-0 w-[280px] min-h-[360px]"
          />
        ))}
      </div>
    </div>
  );
}
