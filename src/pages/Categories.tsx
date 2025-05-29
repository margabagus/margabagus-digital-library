
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { CategoryCard } from "@/components/books/CategoryCard";
import { getCategories } from "@/services/database";
import { 
  BookOpen, Code, DollarSign, BookText, 
  BookMarked, History, Brain, Paintbrush 
} from "lucide-react";

const Categories = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Map icons to categories
  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case "fiksi":
        return <BookOpen className="h-6 w-6" />;
      case "teknologi":
        return <Code className="h-6 w-6" />;
      case "bisnis":
        return <DollarSign className="h-6 w-6" />;
      case "pendidikan":
        return <BookText className="h-6 w-6" />;
      case "agama":
        return <BookMarked className="h-6 w-6" />;
      case "sejarah":
        return <History className="h-6 w-6" />;
      case "filsafat":
        return <Brain className="h-6 w-6" />;
      case "sains":
        return <Paintbrush className="h-6 w-6" />;
      default:
        return <BookOpen className="h-6 w-6" />;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Kategori Buku
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32 animate-pulse" />
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
            Kategori Buku
          </h1>
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">
              Error loading categories. Please try again later.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Kategori Buku
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              icon={getCategoryIcon(category.slug)}
              count={0} // We'll implement book counting later
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
