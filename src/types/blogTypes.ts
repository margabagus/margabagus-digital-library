
export interface BlogAuthor {
  name: string;
  avatar: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishDate: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  coverImage?: string;
  views: number;
}
