
import React from "react";
import Layout from "@/components/layout/Layout";
import { CategoryCard } from "@/components/books/CategoryCard";
import { categories } from "@/services/mockData";
import { 
  BookOpen, Code, DollarSign, BookText, 
  BookMarked, History, Brain, Paintbrush 
} from "lucide-react";

const Categories = () => {
  // Map icons to categories
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "novel":
        return <BookOpen className="h-6 w-6" />;
      case "edukasi":
        return <BookText className="h-6 w-6" />;
      case "bisnis":
        return <DollarSign className="h-6 w-6" />;
      case "teknologi":
        return <Code className="h-6 w-6" />;
      case "agama":
        return <BookMarked className="h-6 w-6" />;
      case "sejarah":
        return <History className="h-6 w-6" />;
      case "psikologi":
        return <Brain className="h-6 w-6" />;
      case "seni":
        return <Paintbrush className="h-6 w-6" />;
      default:
        return <BookOpen className="h-6 w-6" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Kategori Buku
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              icon={getCategoryIcon(category.id)}
              count={category.count}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
