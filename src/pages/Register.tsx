import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Captcha } from "@/components/auth/Captcha";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      alert("Anda harus menyetujui syarat dan ketentuan untuk mendaftar.");
      return;
    }
    
    if (!isCaptchaValid) {
      alert("Please complete the captcha correctly");
      return;
    }
    
    setLoading(true);
    
    // Simulate api call
    setTimeout(() => {
      setLoading(false);
      // Redirect would happen here
    }, 1000);
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
              Buat Akun Baru
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Daftar untuk akses ke ribuan buku digital
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nama Depan</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      autoComplete="off"
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nama Belakang</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      autoComplete="off"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@example.com" 
                    autoComplete="off"
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      autoComplete="off"
                      required 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Password harus minimal 8 karakter
                  </p>
                </div>
                
                <Captcha onValidate={setIsCaptchaValid} />
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)} 
                  />
                  <Label 
                    htmlFor="terms" 
                    className="text-sm leading-none flex-1 pt-0.5"
                  >
                    Saya menyetujui{" "}
                    <Link 
                      to="/terms" 
                      className="text-library-600 hover:text-library-800 dark:text-library-400 dark:hover:text-library-300"
                    >
                      syarat dan ketentuan
                    </Link>
                    {" "}serta{" "}
                    <Link 
                      to="/privacy-policy" 
                      className="text-library-600 hover:text-library-800 dark:text-library-400 dark:hover:text-library-300"
                    >
                      kebijakan privasi
                    </Link>
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !agreed || !isCaptchaValid}
                >
                  {loading ? "Memproses..." : "Daftar"}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Sudah memiliki akun?{" "}
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

export default Register;
