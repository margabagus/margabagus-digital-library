
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { BookGrid } from "@/components/books/BookGrid";
import { getBooks, getBooksByCategory, getCategories } from "@/services/database";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

const Books = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: books, isLoading, error } = useQuery({
    queryKey: ["books", selectedCategory],
    queryFn: () =>
      selectedCategory === "all"
        ? getBooks()
        : getBooksByCategory(selectedCategory),
  });

  if (isLoading || categoriesLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Koleksi Buku
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Koleksi Buku
          </h1>
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">
              Error loading books. Please try again later.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Koleksi Buku
          </h1>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px] bg-white dark:bg-gray-800">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {books && books.length > 0 ? (
          <BookGrid books={books} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-medium mb-2">Belum ada buku</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Koleksi buku akan segera tersedia.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Books;
