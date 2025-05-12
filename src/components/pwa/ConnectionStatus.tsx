
import React, { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Koneksi Kembali",
        description: "Anda terhubung kembali ke internet",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Mode Offline",
        description: "Anda sedang dalam mode offline. Beberapa fitur mungkin tidak tersedia.",
        variant: "destructive",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [toast]);

  if (isOnline) return null;

  return (
    <div className="fixed top-16 inset-x-0 flex justify-center z-50 pointer-events-none">
      <div className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-b-lg shadow flex items-center space-x-2 pointer-events-auto">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">Anda sedang offline</span>
      </div>
    </div>
  );
};

export default ConnectionStatus;
