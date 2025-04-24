
import React from "react";
import { Button } from "@/components/ui/button";
import { BookPlus, Trash2 } from "lucide-react";

export default function AdminBooks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Books</h1>
        <Button>
          <BookPlus className="mr-2" />
          Add New Book
        </Button>
      </div>
      
      <div className="rounded-lg border bg-card">
        <div className="p-4">
          <p className="text-muted-foreground">
            Books management interface will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
}
