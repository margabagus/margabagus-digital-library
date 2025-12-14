import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Captcha } from "@/components/auth/Captcha";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaValid) {
      toast({
        title: "Error",
        description: "Please complete the captcha correctly",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
              Selamat Datang Kembali
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Masuk untuk melanjutkan membaca
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@example.com" 
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-library-600 hover:text-library-800 dark:text-library-400 dark:hover:text-library-300"
                    >
                      Lupa password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                </div>
                
                <Captcha onValidate={setIsCaptchaValid} />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !isCaptchaValid}
                >
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Belum memiliki akun?{" "}
              <Link 
                to="/register" 
                className="text-library-600 hover:text-library-800 dark:text-library-400 dark:hover:text-library-300 font-medium"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;