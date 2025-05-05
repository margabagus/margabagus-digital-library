
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Command, CommandInput, CommandEmpty, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { BookCard } from "@/components/books/BookCard";
import { Search as SearchIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";

// Sample book data for demonstration
const sampleBooks = [
  {
    id: "1",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1374&auto=format&fit=crop",
    category: "Filsafat",
    rating: 4.5,
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1376&auto=format&fit=crop",
    category: "Pengembangan Diri",
    rating: 4.8,
  },
  {
    id: "3",
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1374&auto=format&fit=crop",
    category: "Fiksi",
    rating: 4.7,
  },
  {
    id: "4",
    title: "Pulang",
    author: "Tere Liye",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1374&auto=format&fit=crop",
    category: "Fiksi",
    rating: 4.6,
  },
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState(sampleBooks);

  useEffect(() => {
    // Update URL with search query
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }

    // Filter books based on query
    const filtered = sampleBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filtered);
  }, [query, setSearchParams]);

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Pencarian Buku
        </h1>

        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
          <Input
            type="search"
            placeholder="Cari judul buku, penulis, atau kategori..."
            className="pl-10 py-6 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {query && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Menampilkan hasil untuk "{query}" ({results.length} buku ditemukan)
          </p>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {results.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Tidak ada buku yang ditemukan untuk pencarian ini.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Coba kata kunci lain atau periksa ejaan Anda.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
