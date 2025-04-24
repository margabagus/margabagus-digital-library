
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { BookGrid } from "@/components/books/BookGrid";
import { books, categories } from "@/services/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter books based on search term and selected category
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? book.category.toLowerCase() === selectedCategory.toLowerCase() : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Katalog Buku
        </h1>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Cari judul atau penulis"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Desktop filter */}
          <div className="hidden md:flex space-x-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              Semua
            </Button>
            {categories.slice(0, 5).map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
            
            {/* More categories button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Lainnya
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="py-4">
                  <h3 className="text-lg font-medium">Pilih Kategori</h3>
                  <div className="mt-4 space-y-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Semua Kategori
                    </Button>
                    {categories.map((category) => (
                      <SheetClose key={category.id} asChild>
                        <Button
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          {category.name} ({category.count})
                        </Button>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile filter button */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Filter Kategori
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh]">
              <div className="py-4 h-full overflow-y-auto">
                <h3 className="text-lg font-medium">Pilih Kategori</h3>
                <div className="mt-4 space-y-2">
                  <SheetClose asChild>
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Semua Kategori
                    </Button>
                  </SheetClose>
                  {categories.map((category) => (
                    <SheetClose key={category.id} asChild>
                      <Button
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name} ({category.count})
                      </Button>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {filteredBooks.length > 0 ? (
          <BookGrid books={filteredBooks} />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Tidak ada buku yang ditemukan. Coba dengan kata kunci lain.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Books;
