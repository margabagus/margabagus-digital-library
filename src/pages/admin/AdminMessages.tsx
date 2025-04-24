
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function AdminMessages() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Messages Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Messages management interface will be implemented here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
