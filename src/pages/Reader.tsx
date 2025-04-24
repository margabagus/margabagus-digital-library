
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { books } from "@/services/mockData";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Settings,
  Bookmark,
  Search,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface ReaderSettings {
  fontSize: number;
  lineSpacing: number;
  theme: "light" | "sepia" | "dark";
}

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const book = books.find((b) => b.id === id);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(20);
  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 18,
    lineSpacing: 1.6,
    theme: "light"
  });
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  // Hide menu after 3 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMenuVisible(false);
    }, 3000);

    // Reset the timer when mouse moves
    const handleMouseMove = () => {
      setIsMenuVisible(true);
      clearTimeout(timer);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [isMenuVisible]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        if (currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  // Save reading progress to service worker for offline
  useEffect(() => {
    if (book && "serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.active?.postMessage({
          type: "CACHE_BOOK",
          bookId: book.id,
          bookContent: { /* Book content would be here */ },
          bookMetadata: {
            id: book.id,
            title: book.title,
            author: book.author,
            coverImage: book.coverImage,
            lastReadPage: currentPage,
            timestamp: new Date().toISOString()
          }
        });
      });
    }
  }, [book, currentPage]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Buku tidak ditemukan</h1>
          <p className="mb-6">Maaf, buku yang Anda cari tidak dapat ditemukan.</p>
          <Button asChild>
            <Link to="/books">Kembali ke katalog</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Handle page change
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Get theme classes
  const getThemeClass = () => {
    switch (settings.theme) {
      case "light":
        return "bg-white text-gray-900";
      case "sepia":
        return "bg-[#f8f2e4] text-[#5b4636]";
      case "dark":
        return "bg-gray-900 text-gray-100";
      default:
        return "bg-white text-gray-900";
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col transition-colors duration-300",
        getThemeClass()
      )}
    >
      {/* Header - visible on hover or tap */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm transition-transform duration-300",
          isMenuVisible ? "transform translate-y-0" : "transform -translate-y-full"
        )}
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/books/${book.id}`}>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="hidden sm:block">
              <h1 className="text-base font-semibold">{book.title}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bookmark className="h-5 w-5" />
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Pengaturan Baca</SheetTitle>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Ukuran Font</h4>
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSettings(prev => ({ ...prev, fontSize: Math.max(14, prev.fontSize - 2) }))}
                      >
                        A-
                      </Button>
                      <span className="text-sm">
                        {settings.fontSize}px
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSettings(prev => ({ ...prev, fontSize: Math.min(24, prev.fontSize + 2) }))}
                      >
                        A+
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Jarak Baris</h4>
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSettings(prev => ({ ...prev, lineSpacing: Math.max(1.2, prev.lineSpacing - 0.2) }))}
                      >
                        -
                      </Button>
                      <span className="text-sm">
                        {settings.lineSpacing.toFixed(1)}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSettings(prev => ({ ...prev, lineSpacing: Math.min(2.4, prev.lineSpacing + 0.2) }))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Tema</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        className={cn(
                          "border rounded-md p-4 text-center flex flex-col items-center justify-center",
                          settings.theme === "light" ? "ring-2 ring-library-600" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                        onClick={() => setSettings(prev => ({ ...prev, theme: "light" }))}
                      >
                        <div className="w-6 h-6 rounded-full bg-white border mb-2"></div>
                        <span className="text-xs">Terang</span>
                      </button>
                      <button
                        className={cn(
                          "border rounded-md p-4 text-center flex flex-col items-center justify-center",
                          settings.theme === "sepia" ? "ring-2 ring-library-600" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                        onClick={() => setSettings(prev => ({ ...prev, theme: "sepia" }))}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#f8f2e4] border mb-2"></div>
                        <span className="text-xs">Sepia</span>
                      </button>
                      <button
                        className={cn(
                          "border rounded-md p-4 text-center flex flex-col items-center justify-center",
                          settings.theme === "dark" ? "ring-2 ring-library-600" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                        onClick={() => setSettings(prev => ({ ...prev, theme: "dark" }))}
                      >
                        <div className="w-6 h-6 rounded-full bg-gray-900 border mb-2"></div>
                        <span className="text-xs">Gelap</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mobile menu button */}
      <button
        className={cn(
          "fixed bottom-4 right-4 z-50 md:hidden p-3 rounded-full bg-library-600 text-white shadow-lg transition-opacity duration-300",
          isMenuVisible ? "opacity-0" : "opacity-100"
        )}
        onClick={() => setIsMenuVisible(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div 
          className="max-w-2xl mx-auto prose dark:prose-invert" 
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineSpacing
          }}
        >
          {/* Book title and chapter */}
          {currentPage === 1 && (
            <>
              <h1>{book.title}</h1>
              <p className="lead">
                <em>Oleh {book.author}</em>
              </p>
              <hr />
              <h2>Bab 1</h2>
            </>
          )}

          {/* Sample content - would be replaced with actual content */}
          <p>
            {currentPage === 1 ? (
              <>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </>
            ) : (
              <>
                Halaman {currentPage} dari buku "{book.title}". Ini adalah konten sample untuk 
                halaman ini. Dalam implementasi sebenarnya, konten buku akan diambil 
                dari database atau API berdasarkan ID buku dan nomor halaman.
                
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
                sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </>
            )}
          </p>

          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore 
            et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, 
            quis nostrum exercitationem ullam corporis suscipit laboriosam, 
            nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure 
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
            vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
          </p>

          {/* Page navigation */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t">
            <Button
              variant="ghost"
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              <ChevronLeft className="h-5 w-5 mr-1" /> Sebelumnya
            </Button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Halaman {currentPage} dari {totalPages}
            </span>
            <Button
              variant="ghost"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Selanjutnya <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer progress bar - visible on hover or tap */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm transition-transform duration-300",
          isMenuVisible ? "transform translate-y-0" : "transform translate-y-full"
        )}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-library-600"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Halaman {currentPage}</span>
            <span>{Math.round((currentPage / totalPages) * 100)}% selesai</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;
