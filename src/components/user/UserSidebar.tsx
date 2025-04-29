
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  BookOpen,
  User,
  BookText,
  BookmarkCheck,
  Clock,
  Settings,
  MessageSquare,
  BookOpen as BookRecommend
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Profile", icon: User, path: "/dashboard/profile" },
  { title: "Settings", icon: Settings, path: "/dashboard/settings" },
  { title: "My Books", icon: BookText, path: "/dashboard/my-books" },
  { title: "Reading List", icon: BookOpen, path: "/dashboard/reading-list" },
  { title: "Recommendations", icon: BookRecommend, path: "/dashboard/recommendations" },
  { title: "Messages", icon: MessageSquare, path: "/dashboard/messages" },
  { title: "Bookmarks", icon: BookmarkCheck, path: "/dashboard/bookmarks" },
  { title: "Reading Progress", icon: Clock, path: "/dashboard/progress" },
];

export function UserSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => isActive ? "text-primary" : ""}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
