
import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?: string;
}

export default function SearchForm({ searchQuery, setSearchQuery, className }: SearchFormProps) {
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className={`relative ${className || ""}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Input 
        type="search" 
        placeholder="Cari buku..."
        className="pl-9"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}
