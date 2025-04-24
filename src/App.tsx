import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Books from "./pages/Books";
import Categories from "./pages/Categories";
import BookDetail from "./pages/BookDetail";
import Reader from "./pages/Reader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminBooks from "./pages/admin/AdminBooks";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/dashboard/UserProfile";
import ReadingList from "./pages/dashboard/ReadingList";

// Register service worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered: ", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed: ", error);
      });
  });
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/read/:id" element={<Reader />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Navigate to="/admin/analytics" />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="books" element={<AdminBooks />} />
          </Route>
          
          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route index element={<Navigate to="/dashboard/profile" />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="reading-list" element={<ReadingList />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
