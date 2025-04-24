
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function UserProfile() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      
      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>John Doe</CardTitle>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-6 space-y-4">
          <div>
            <h3 className="font-medium">Reading Stats</h3>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-3">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Books Read</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Bookmarks</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
