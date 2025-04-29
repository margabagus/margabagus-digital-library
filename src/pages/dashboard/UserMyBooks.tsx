
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, DownloadCloud } from "lucide-react";

export default function UserMyBooks() {
  const books = [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      cover: "/placeholder.svg",
      formats: ["PDF", "EPUB"],
      purchaseDate: "2024-03-15",
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "/placeholder.svg",
      formats: ["PDF"],
      purchaseDate: "2024-02-22",
    },
    {
      id: 3,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      cover: "/placeholder.svg",
      formats: ["PDF", "EPUB", "MOBI"],
      purchaseDate: "2024-01-10",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Books</h1>
      <p className="text-muted-foreground">All books that you have purchased or acquired.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <Card key={book.id} className="flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="aspect-[2/3] w-full bg-muted rounded-md overflow-hidden mb-4">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <CardTitle className="text-xl font-bold">{book.title}</CardTitle>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {book.formats.map((format) => (
                    <Badge key={format} variant="outline">{format}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Added on {new Date(book.purchaseDate).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button className="flex-1">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read
                </Button>
                <Button variant="outline" className="flex-1">
                  <DownloadCloud className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
