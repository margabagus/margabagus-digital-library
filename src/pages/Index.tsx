
import React from "react";
import Layout from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { BookCarousel } from "@/components/books/BookCarousel";
import { featuredBooks, newReleases, popularBooks } from "@/services/mockData";

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        <BookCarousel
          title="Buku Unggulan"
          books={featuredBooks}
          className="mb-10"
        />
        
        <BookCarousel
          title="Buku Terbaru"
          books={newReleases}
          className="mb-10"
        />
        
        <BookCarousel
          title="Paling Populer"
          books={popularBooks}
          className="mb-10"
        />
      </div>
      
      <Features />
      
      <section className="py-16 bg-library-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Siap Membaca?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Jelajahi ribuan buku digital gratis di Perpustakaan Digital Marga Bagus sekarang juga.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/books" 
              className="px-8 py-3 bg-library-600 hover:bg-library-700 text-white rounded-lg font-medium transition-colors"
            >
              Jelajahi Katalog
            </a>
            <a 
              href="/register" 
              className="px-8 py-3 bg-white hover:bg-gray-50 text-library-600 rounded-lg font-medium border border-library-200 transition-colors dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-library-400 dark:border-gray-700"
            >
              Daftar Sekarang
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
