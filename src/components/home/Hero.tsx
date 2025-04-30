
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// A custom hook for animated counters
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * end));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return count;
};

// CounterDisplay component
const CounterDisplay = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const count = useCounter(value);
  
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 text-center">
      <div className="text-3xl md:text-4xl font-bold text-library-600 dark:text-library-400">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  );
};

export function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-library-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Decorative elements */}
      <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-[1400px]">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-library-600/5 dark:bg-library-800/10 rounded-full blur-3xl" />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Perpustakaan Digital{" "}
            <span className="text-library-600 dark:text-library-400">Marga Bagus</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 md:mb-10">
            Akses ribuan buku digital kapanpun dan dimanapun. Baca online atau offline dengan tampilan yang responsif dan mudah digunakan.
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Input 
                type="search" 
                placeholder="Cari judul, penulis, atau kategori..." 
                className="pl-10 h-12 rounded-lg" 
              />
            </div>
            <Button className="h-12 px-8">Cari Buku</Button>
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-6">
            <Link 
              to="/books" 
              className="text-library-600 dark:text-library-400 hover:underline font-medium"
            >
              Jelajahi Katalog
            </Link>
            <span className="text-gray-400">•</span>
            <Link 
              to="/register" 
              className="text-library-600 dark:text-library-400 hover:underline font-medium"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
        
        {/* Stats with animated counters */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <CounterDisplay value={1000} label="Total Buku" suffix="+" />
          <CounterDisplay value={24} label="Kategori" suffix="+" />
          <CounterDisplay value={10000} label="Pengguna" suffix="+" />
          <CounterDisplay value={100} label="Gratis" suffix="%" />
        </div>
      </div>
    </div>
  );
}
