
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Star } from "lucide-react";

// Mock recommended books data
const recommendedBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "/placeholder.svg",
    categories: ["Fiction", "Fantasy"],
    rating: 4.5,
    description: "Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right."
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "/placeholder.svg",
    categories: ["Sci-Fi", "Adventure"],
    rating: 4.8,
    description: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author."
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/placeholder.svg",
    categories: ["Self-Help", "Psychology"],
    rating: 4.7,
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones. Transform your life with tiny changes in behavior."
  },
];

export default function UserRecommendations() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Recommended for You</h1>
      <p className="text-muted-foreground">Books we think you'll enjoy based on your reading history.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendedBooks.map((book) => (
          <Card key={book.id} className="flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="aspect-[2/3] w-full bg-muted rounded-md overflow-hidden mb-4">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <CardTitle className="text-xl font-bold">{book.title}</CardTitle>
              <CardDescription>by {book.author}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                {book.description}
              </p>
              <div className="flex items-center gap-2 mb-2">
                {book.categories.map((category) => (
                  <Badge key={category} variant="secondary">{category}</Badge>
                ))}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span>{book.rating} rating</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Add to Reading List
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
