import { supabase } from "@/integrations/supabase/client";
import { BookProps } from "@/components/books/BookCard";

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  birth_date?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  description?: string;
  isbn?: string;
  cover_image_url?: string;
  pdf_url?: string;
  total_pages?: number;
  publication_date?: string;
  publisher?: string;
  language: string;
  status: string;
  rating: number;
  view_count: number;
  category?: Category;
  authors?: Author[];
}

export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  role: 'admin' | 'librarian' | 'member';
}

// Categories
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
};

// Books
export const getBooks = async () => {
  const { data, error } = await supabase
    .from('books')
    .select(`
      *,
      category:categories(*),
      book_authors(
        author:authors(*)
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  // Transform the data to match our BookProps interface
  return data?.map((book): BookProps => ({
    id: book.id,
    title: book.title,
    author: book.book_authors?.[0]?.author?.name || 'Unknown Author',
    coverImage: book.cover_image_url || '',
    category: book.category?.name || 'Uncategorized',
    rating: book.rating || 0,
  })) || [];
};

export const getBooksByCategory = async (categoryId: string) => {
  const { data, error } = await supabase
    .from('books')
    .select(`
      *,
      category:categories(*),
      book_authors(
        author:authors(*)
      )
    `)
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data?.map((book): BookProps => ({
    id: book.id,
    title: book.title,
    author: book.book_authors?.[0]?.author?.name || 'Unknown Author',
    coverImage: book.cover_image_url || '',
    category: book.category?.name || 'Uncategorized',
    rating: book.rating || 0,
  })) || [];
};

export const getBookById = async (id: string) => {
  const { data, error } = await supabase
    .from('books')
    .select(`
      *,
      category:categories(*),
      book_authors(
        author:authors(*)
      )
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Authors
export const getAuthors = async () => {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
};

// User Profile
export const getCurrentUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateUserProfile = async (updates: Partial<Omit<Profile, 'id' | 'role'>>) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');
  
  // Explicitly exclude role from updates to prevent privilege escalation
  const { role, ...safeUpdates } = updates as any;
  
  const { data, error } = await supabase
    .from('profiles')
    .update(safeUpdates)
    .eq('id', user.id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Bookmarks
export const getUserBookmarks = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];
  
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`
      *,
      book:books(
        *,
        category:categories(*),
        book_authors(
          author:authors(*)
        )
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const addBookmark = async (bookId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');
  
  const { data, error } = await supabase
    .from('bookmarks')
    .insert({ user_id: user.id, book_id: bookId })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const removeBookmark = async (bookId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');
  
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', user.id)
    .eq('book_id', bookId);
  
  if (error) throw error;
};

// Reading Progress
export const getReadingProgress = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];
  
  const { data, error } = await supabase
    .from('reading_progress')
    .select(`
      *,
      book:books(
        *,
        category:categories(*),
        book_authors(
          author:authors(*)
        )
      )
    `)
    .eq('user_id', user.id)
    .order('last_read_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const updateReadingProgress = async (
  bookId: string, 
  currentPage: number, 
  totalPages: number
) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');
  
  const progressPercentage = (currentPage / totalPages) * 100;
  
  const { data, error } = await supabase
    .from('reading_progress')
    .upsert({
      user_id: user.id,
      book_id: bookId,
      current_page: currentPage,
      total_pages: totalPages,
      progress_percentage: progressPercentage,
      last_read_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
