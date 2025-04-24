
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-library-100 dark:bg-library-900 flex items-center justify-center mx-auto mb-6">
          <BookX className="h-12 w-12 text-library-600 dark:text-library-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Maaf, halaman yang Anda cari tidak ditemukan atau mungkin telah dipindahkan.
        </p>
        <Button asChild className="mx-auto">
          <Link to="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
