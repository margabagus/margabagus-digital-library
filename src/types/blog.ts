
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishDate: string;
  category: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  views: number;
}
