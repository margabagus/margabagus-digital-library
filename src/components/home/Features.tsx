
import React from "react";
import { BookOpen, Smartphone, Wifi, BookMarked, Clock, Users } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Baca Online",
      description: "Akses ribuan buku langsung melalui browser tanpa perlu mengunduh aplikasi tambahan.",
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: "Mode Offline",
      description: "Baca buku yang telah Anda akses sebelumnya tanpa perlu koneksi internet.",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Responsif 100%",
      description: "Tampilan yang menyesuaikan dengan sempurna di semua ukuran layar perangkat.",
    },
    {
      icon: <BookMarked className="h-8 w-8" />,
      title: "Katalog Lengkap",
      description: "Koleksi buku dari berbagai kategori yang selalu diperbarui secara berkala.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Akses 24/7",
      description: "Perpustakaan yang tidak pernah tutup, baca kapanpun dan dimanapun.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Komunitas",
      description: "Bagikan ulasan dan diskusikan buku favorit Anda dengan pengguna lain.",
    },
  ];
  
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Nikmati berbagai fitur yang dirancang untuk memberikan pengalaman membaca digital terbaik
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-library-200 dark:hover:border-library-800"
            >
              <div className="h-14 w-14 rounded-lg bg-library-100 dark:bg-library-900 flex items-center justify-center text-library-600 dark:text-library-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
