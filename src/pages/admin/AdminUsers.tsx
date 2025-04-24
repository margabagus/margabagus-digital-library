
import React from "react";
import { Button } from "@/components/ui/button";
import { Users, UserPlus } from "lucide-react";

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <Button>
          <UserPlus className="mr-2" />
          Add New User
        </Button>
      </div>
      
      <div className="rounded-lg border bg-card">
        <div className="p-4">
          <p className="text-muted-foreground">
            Users management interface will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
}
