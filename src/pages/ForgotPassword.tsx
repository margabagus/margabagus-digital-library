
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Captcha } from "@/components/auth/Captcha";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaValid) {
      toast({
        title: "Error",
        description: "Mohon selesaikan captcha dengan benar",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
      toast({
        title: "Email terkirim",
        description: "Instruksi untuk reset password telah dikirim ke email Anda",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-library-100 dark:bg-library-900 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-library-600 dark:text-library-400" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Lupa Password
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Masukkan email Anda untuk reset password
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {!emailSent ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@example.com" 
                      required 
                    />
                  </div>
                  
                  <Captcha onValidate={setIsCaptchaValid} />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading || !isCaptchaValid}
                  >
                    {loading ? "Memproses..." : "Reset Password"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="mb-4 text-library-600 dark:text-library-400">
                  <BookOpen className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-medium mb-2">Email Terkirim</h3>
                <p className="text-muted-foreground mb-4">
                  Instruksi untuk reset password telah dikirim ke email Anda. 
                  Silakan cek inbox atau folder spam Anda.
                </p>
                <Button asChild className="w-full">
                  <Link to="/login">Kembali ke Halaman Login</Link>
                </Button>
              </div>
            )}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Ingat password Anda?{" "}
              <Link 
                to="/login" 
                className="text-library-600 hover:text-library-800 dark:text-library-400 dark:hover:text-library-300 font-medium"
              >
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
