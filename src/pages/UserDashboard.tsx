
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user/UserSidebar";

export default function UserDashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <UserSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
