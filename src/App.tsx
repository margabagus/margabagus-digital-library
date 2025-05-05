
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
import ForgotPassword from "./pages/ForgotPassword";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminUsers from "./pages/admin/AdminUsers";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/dashboard/UserProfile";
import ReadingList from "./pages/dashboard/ReadingList";
import Support from "./pages/Support";
import UserSettings from "./pages/dashboard/UserSettings";
import UserRecommendations from "./pages/dashboard/UserRecommendations";
import UserMessages from "./pages/dashboard/UserMessages";
import UserMyBooks from "./pages/dashboard/UserMyBooks";
import UserBookmarks from "./pages/dashboard/UserBookmarks";
import UserReadingProgress from "./pages/dashboard/UserReadingProgress";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";

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
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Navigate to="/admin/analytics" />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          
          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route index element={<Navigate to="/dashboard/profile" />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="my-books" element={<UserMyBooks />} />
            <Route path="reading-list" element={<ReadingList />} />
            <Route path="recommendations" element={<UserRecommendations />} />
            <Route path="messages" element={<UserMessages />} />
            <Route path="bookmarks" element={<UserBookmarks />} />
            <Route path="progress" element={<UserReadingProgress />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
