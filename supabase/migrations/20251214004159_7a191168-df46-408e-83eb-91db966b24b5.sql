-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for better data consistency
CREATE TYPE public.book_status AS ENUM ('available', 'borrowed', 'reserved', 'maintenance');
CREATE TYPE public.user_role AS ENUM ('admin', 'librarian', 'member');
CREATE TYPE public.borrowing_status AS ENUM ('active', 'returned', 'overdue', 'renewed');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  role user_role DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create categories table for book categorization
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create authors table
CREATE TABLE public.authors (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  birth_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create books table
CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  isbn TEXT UNIQUE,
  cover_image_url TEXT,
  pdf_url TEXT,
  total_pages INTEGER,
  publication_date DATE,
  publisher TEXT,
  language TEXT DEFAULT 'Indonesian',
  status book_status DEFAULT 'available',
  category_id UUID REFERENCES public.categories(id),
  rating DECIMAL(2,1) DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create book_authors junction table (many-to-many relationship)
CREATE TABLE public.book_authors (
  book_id UUID REFERENCES public.books(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.authors(id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, author_id)
);

-- Create bookmarks table for user favorites
CREATE TABLE public.bookmarks (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES public.books(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, book_id)
);

-- Create reading_progress table to track user progress
CREATE TABLE public.reading_progress (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES public.books(id) ON DELETE CASCADE,
  current_page INTEGER DEFAULT 1,
  total_pages INTEGER,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, book_id)
);

-- Create borrowing_records table for physical book borrowing
CREATE TABLE public.borrowing_records (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES public.books(id) ON DELETE CASCADE,
  borrowed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  due_date TIMESTAMP WITH TIME ZONE,
  returned_at TIMESTAMP WITH TIME ZONE,
  status borrowing_status DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table for book reviews
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES public.books(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, book_id)
);

-- Create blog_posts table for blog functionality
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.borrowing_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- Create RLS policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for categories (public read, admin write)
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert categories" ON public.categories
  FOR INSERT WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Only admins can update categories" ON public.categories
  FOR UPDATE USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Only admins can delete categories" ON public.categories
  FOR DELETE USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for authors (public read, admin write)
CREATE POLICY "Anyone can view authors" ON public.authors
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert authors" ON public.authors
  FOR INSERT WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Only admins can update authors" ON public.authors
  FOR UPDATE USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Only admins can delete authors" ON public.authors
  FOR DELETE USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for books (public read, admin write)
CREATE POLICY "Anyone can view books" ON public.books
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert books" ON public.books
  FOR INSERT WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Only admins can update books" ON public.books
  FOR UPDATE USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Only admins can delete books" ON public.books
  FOR DELETE USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for book_authors (public read, admin write)
CREATE POLICY "Anyone can view book authors" ON public.book_authors
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert book authors" ON public.book_authors
  FOR INSERT WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Only admins can update book authors" ON public.book_authors
  FOR UPDATE USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Only admins can delete book authors" ON public.book_authors
  FOR DELETE USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for bookmarks (users can only access their own)
CREATE POLICY "Users can view their own bookmarks" ON public.bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks" ON public.bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" ON public.bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for reading_progress (users can only access their own)
CREATE POLICY "Users can view their own reading progress" ON public.reading_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reading progress" ON public.reading_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reading progress" ON public.reading_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for borrowing_records
CREATE POLICY "Users can view their own borrowing records" ON public.borrowing_records
  FOR SELECT USING (auth.uid() = user_id OR public.get_user_role(auth.uid()) IN ('admin', 'librarian'));

CREATE POLICY "Users can create borrowing records" ON public.borrowing_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins and librarians can update borrowing records" ON public.borrowing_records
  FOR UPDATE USING (public.get_user_role(auth.uid()) IN ('admin', 'librarian'));

CREATE POLICY "Admins and librarians can delete borrowing records" ON public.borrowing_records
  FOR DELETE USING (public.get_user_role(auth.uid()) IN ('admin', 'librarian'));

-- Create RLS policies for reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON public.reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for blog_posts
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (published = true OR auth.uid() = author_id);

CREATE POLICY "Authors can create blog posts" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own blog posts" ON public.blog_posts
  FOR UPDATE USING (auth.uid() = author_id OR public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Authors or admins can delete blog posts" ON public.blog_posts
  FOR DELETE USING (auth.uid() = author_id OR public.get_user_role(auth.uid()) = 'admin');

-- Create trigger function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'username'
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample categories
INSERT INTO public.categories (name, description, slug) VALUES
  ('Fiksi', 'Novel, cerpen, dan karya fiksi lainnya', 'fiksi'),
  ('Non-Fiksi', 'Biografi, sejarah, dan karya faktual', 'non-fiksi'),
  ('Teknologi', 'Buku tentang teknologi dan programming', 'teknologi'),
  ('Bisnis', 'Buku tentang bisnis dan kewirausahaan', 'bisnis'),
  ('Pengembangan Diri', 'Buku motivasi dan pengembangan diri', 'pengembangan-diri'),
  ('Sains', 'Buku sains dan penelitian', 'sains'),
  ('Filsafat', 'Buku filsafat dan pemikiran', 'filsafat'),
  ('Sejarah', 'Buku sejarah dan peradaban', 'sejarah'),
  ('Agama', 'Buku agama dan spiritualitas', 'agama'),
  ('Pendidikan', 'Buku pendidikan dan pembelajaran', 'pendidikan');

-- Insert sample authors
INSERT INTO public.authors (name, bio) VALUES
  ('Tere Liye', 'Penulis novel Indonesia yang produktif dengan berbagai karya bestseller'),
  ('Andrea Hirata', 'Penulis Indonesia terkenal dengan novel Laskar Pelangi'),
  ('Dewi Lestari', 'Penulis dan musisi Indonesia dengan karya-karya filosofis'),
  ('Raditya Dika', 'Penulis dan komedian Indonesia'),
  ('Fiersa Besari', 'Penulis dan musisi muda Indonesia'),
  ('Leila S. Chudori', 'Penulis dan jurnalis Indonesia'),
  ('Eka Kurniawan', 'Penulis Indonesia dengan gaya penulisan yang unik'),
  ('Ahmad Tohari', 'Penulis Indonesia dengan latar belakang budaya Jawa');