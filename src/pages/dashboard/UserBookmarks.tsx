
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Bookmark, X } from "lucide-react";

export default function UserBookmarks() {
  const bookmarks = [
    {
      id: 1,
      bookTitle: "The Great Gatsby",
      chapter: "Chapter 3: The Party",
      page: 42,
      note: "Important scene where Nick meets Gatsby for the first time",
      dateAdded: "2024-04-12",
    },
    {
      id: 2,
      bookTitle: "To Kill a Mockingbird",
      chapter: "Chapter 11: Mrs. Dubose",
      page: 148,
      note: "Atticus's quote about courage",
      dateAdded: "2024-04-10",
    },
    {
      id: 3,
      bookTitle: "Sapiens",
      chapter: "Chapter 5: The Agricultural Revolution",
      page: 87,
      note: "Interesting comparison of hunter-gatherer lifestyle with agricultural societies",
      dateAdded: "2024-04-05",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bookmarks</h1>
      <p className="text-muted-foreground">Manage your saved bookmarks across all books.</p>
      
      <div className="grid gap-4">
        {bookmarks.map((bookmark) => (
          <Card key={bookmark.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{bookmark.bookTitle}</CardTitle>
              <p className="text-sm text-muted-foreground">{bookmark.chapter}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Page {bookmark.page}</p>
                  {bookmark.note && (
                    <p className="text-sm text-muted-foreground mt-1">"{bookmark.note}"</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Added on {new Date(bookmark.dateAdded).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <Button size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Go to page
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive">
                    <X className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
