
import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { books } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Calendar, Heart, Share, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Buku tidak ditemukan</h1>
          <p className="mb-6">Maaf, buku yang Anda cari tidak ditemukan.</p>
          <Button asChild>
            <Link to="/books">Kembali ke katalog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/books">
              <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
              <img
                src={book.coverImage}
                alt={`Cover buku ${book.title}`}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>

            <div className="mt-6 space-y-4">
              <Button className="w-full" asChild>
                <Link to={`/books/read/${book.id}`}>
                  <BookOpen className="h-5 w-5 mr-2" />
                  Baca Sekarang
                </Link>
              </Button>

              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
              {book.author}
            </p>

            <div className="flex items-center mb-6">
              <div className="flex items-center bg-library-50 dark:bg-library-900/50 px-3 py-1.5 rounded-full">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-medium">{book.rating.toFixed(1)}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">
                  (120 ulasan)
                </span>
              </div>
              <span className="mx-3 text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                2023
              </span>
              <span className="mx-3 text-gray-400">•</span>
              <span className="bg-library-100 dark:bg-library-900 text-library-600 dark:text-library-400 px-3 py-1 rounded-full text-sm">
                {book.category}
              </span>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
              <h3 className="text-xl font-semibold mb-3">Deskripsi</h3>
              <p>{book.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-xl font-semibold mb-4">Detail Buku</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Jumlah Halaman</p>
                  <p className="font-medium">286 halaman</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Penerbit</p>
                  <p className="font-medium">Penerbit Marga Bagus</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Bahasa</p>
                  <p className="font-medium">Indonesia</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Tahun Terbit</p>
                  <p className="font-medium">2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 className="text-2xl font-semibold mb-6">Ulasan Pembaca</h3>
          
          {/* Review Item */}
          {[1, 2, 3].map((i) => (
            <div key={i} className={cn(
              "py-6",
              i < 3 ? "border-b border-gray-200 dark:border-gray-800" : ""
            )}>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-library-100 dark:bg-library-900 flex items-center justify-center text-library-600 dark:text-library-400 font-semibold">
                  U{i}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">User{i}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, j) => (
                        <Star 
                          key={j}
                          className={cn(
                            "h-4 w-4", 
                            j < 5 - i % 2 
                              ? "text-yellow-500 fill-yellow-500" 
                              : "text-gray-300 dark:text-gray-600"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    2 bulan yang lalu
                  </p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {
                      i === 1 
                        ? "Buku yang sangat menarik! Ceritanya mengalir dan karakternya dikembangkan dengan baik. Sangat direkomendasikan untuk semua pembaca." 
                        : i === 2 
                        ? "Saya menikmati membaca buku ini. Plot ceritanya unik dan membuat saya terus membaca sampai selesai. Meskipun ada beberapa bagian yang sedikit lambat, secara keseluruhan ini adalah buku yang bagus." 
                        : "Buku yang luar biasa! Saya tidak bisa berhenti membacanya. Penulis berhasil menciptakan dunia yang begitu hidup dan karakter yang relateable. Saya akan membaca karya penulis ini lagi."
                    }
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-6 text-center">
            <Button variant="outline">Lihat semua ulasan</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetail;
