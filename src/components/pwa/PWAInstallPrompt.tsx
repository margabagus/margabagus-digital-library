
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWAInstallPrompt: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Store the event for later use
      setInstallPrompt(e as BeforeInstallPromptEvent);
      
      // Check if the user has already dismissed or installed
      const pwaInstallState = localStorage.getItem("pwa-install-state");
      const lastPromptTime = localStorage.getItem("pwa-prompt-time");
      const now = new Date().getTime();
      
      // Only show if not dismissed/installed in the last 7 days
      if (
        !pwaInstallState || 
        (pwaInstallState === "dismissed" && 
         lastPromptTime && 
         now - parseInt(lastPromptTime) > 7 * 24 * 60 * 60 * 1000)
      ) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      // App is installed, no need to show install prompt
      localStorage.setItem("pwa-install-state", "installed");
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return;
    }

    // Show the install prompt
    await installPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === "accepted") {
      toast({
        title: "Terima Kasih!",
        description: "Aplikasi berhasil diinstal di perangkat Anda.",
      });
      localStorage.setItem("pwa-install-state", "installed");
    } else {
      localStorage.setItem("pwa-install-state", "dismissed");
      localStorage.setItem("pwa-prompt-time", new Date().getTime().toString());
    }

    // Clear the saved prompt since it can't be used again
    setInstallPrompt(null);
    setShowPrompt(false);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-install-state", "dismissed");
    localStorage.setItem("pwa-prompt-time", new Date().getTime().toString());
  };

  if (!showPrompt) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 p-4 shadow-lg z-50 bg-white dark:bg-gray-900 border-library-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-base mb-1">
            Instal aplikasi kami
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Akses perpustakaan Marga Bagus kapan saja, bahkan saat offline!
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={dismissPrompt}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="default"
          className="bg-library-600 hover:bg-library-700 text-white"
          onClick={handleInstallClick}
        >
          Instal Sekarang
        </Button>
        <Button 
          variant="outline" 
          onClick={dismissPrompt}
        >
          Nanti Saja
        </Button>
      </div>
    </Card>
  );
};

export default PWAInstallPrompt;
