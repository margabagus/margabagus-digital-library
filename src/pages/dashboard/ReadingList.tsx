
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

export default function ReadingList() {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      progress: 65,
      lastRead: "2024-04-23",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      progress: 30,
      lastRead: "2024-04-22",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Reading List</h1>
      
      <div className="grid gap-4">
        {books.map((book) => (
          <Card key={book.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </div>
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{book.progress}%</span>
                </div>
                <Progress value={book.progress} />
                <p className="text-xs text-muted-foreground">
                  Last read: {new Date(book.lastRead).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
