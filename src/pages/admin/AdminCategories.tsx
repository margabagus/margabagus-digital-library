
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";

export default function AdminCategories() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <Button>
          <Plus className="mr-2" />
          Add New Category
        </Button>
      </div>
      
      <div className="rounded-lg border bg-card">
        <div className="p-4">
          <p className="text-muted-foreground">
            Categories management interface will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
}
