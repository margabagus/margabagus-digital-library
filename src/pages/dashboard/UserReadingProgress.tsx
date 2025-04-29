
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, BarChart } from "lucide-react";

export default function UserReadingProgress() {
  const currentBooks = [
    {
      id: 1,
      title: "Dune",
      author: "Frank Herbert",
      progress: 43,
      totalPages: 688,
      currentPage: 296,
      lastRead: "2024-04-26",
      timeSpent: 430, // minutes
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      progress: 72,
      totalPages: 320,
      currentPage: 230,
      lastRead: "2024-04-25",
      timeSpent: 280, // minutes
    },
  ];

  const completedBooks = [
    {
      id: 3,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      totalPages: 310,
      completedDate: "2024-04-10",
      timeSpent: 520, // minutes
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      totalPages: 279,
      completedDate: "2024-03-22",
      timeSpent: 410, // minutes
    },
  ];

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reading Progress</h1>
      <p className="text-muted-foreground">Track your reading activity and progress.</p>
      
      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Books</TabsTrigger>
          <TabsTrigger value="completed">Completed Books</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-6">
          <div className="grid gap-6">
            {currentBooks.map((book) => (
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
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span>Progress</span>
                      <span>{book.progress}%</span>
                    </div>
                    <Progress value={book.progress} className="h-2" />
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs text-muted-foreground">Page {book.currentPage} of {book.totalPages}</span>
                      <span className="text-xs text-muted-foreground">
                        Last read: {new Date(book.lastRead).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm border-t pt-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Time spent: {formatTime(book.timeSpent)}</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>~{Math.round(book.timeSpent / (book.currentPage / 60))} min/chapter</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          <div className="grid gap-6">
            {completedBooks.map((book) => (
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
                <CardContent className="space-y-4">
                  <div>
                    <Progress value={100} className="h-2" />
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs text-muted-foreground">{book.totalPages} pages</span>
                      <span className="text-xs text-muted-foreground">
                        Completed on: {new Date(book.completedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm border-t pt-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Total time: {formatTime(book.timeSpent)}</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>~{Math.round(book.timeSpent / (book.totalPages / 60))} min/chapter</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
