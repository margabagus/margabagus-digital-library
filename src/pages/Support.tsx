
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, FileText, MailIcon, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih! Kami akan menghubungi Anda segera.",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Pusat Bantuan
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-library-600" />
                Chat Bantuan
              </CardTitle>
              <CardDescription>
                Dapatkan bantuan instan melalui layanan chat kami
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Tersedia pada hari kerja pukul 08.00-17.00 WIB
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Mulai Chat
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-library-600" />
                Dokumen Panduan
              </CardTitle>
              <CardDescription>
                Temukan jawaban di dokumentasi pendukung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Panduan pengguna, FAQ, dan tutorial untuk memulai
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Baca Panduan
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-library-600" />
                Hubungi Kami
              </CardTitle>
              <CardDescription>
                Bicara langsung dengan tim dukungan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Telepon: (021) 1234-5678<br />
                Jam Operasional: 09.00-16.00 WIB
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Hubungi Sekarang
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Kirim Pesan</CardTitle>
            <CardDescription>
              Isi formulir di bawah ini untuk mengirim pertanyaan atau permintaan dukungan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nama Lengkap
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subjek
                </label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Judul pertanyaan atau masalah Anda"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Pesan
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Jelaskan pertanyaan atau masalah Anda secara detail"
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Mengirim...</span>
                    <span className="animate-spin">⏳</span>
                  </>
                ) : (
                  <>
                    <MailIcon className="mr-2 h-4 w-4" />
                    Kirim Pesan
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Pertanyaan Umum</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Bagaimana cara meminjam buku?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pilih buku yang ingin Anda pinjam, klik tombol "Pinjam", dan ikuti petunjuk untuk menyelesaikan proses peminjaman.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Berapa lama durasi peminjaman buku?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Durasi peminjaman standar adalah 14 hari. Anda dapat memperpanjang hingga 2 kali jika tidak ada antrean untuk buku tersebut.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Apakah saya bisa membaca buku secara online?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ya, banyak buku tersedia dalam format digital yang dapat dibaca langsung melalui aplikasi kami tanpa perlu meminjam.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Bagaimana jika saya menemukan masalah teknis?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Anda dapat melaporkan masalah teknis melalui formulir di atas atau menghubungi tim dukungan teknis kami secara langsung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
