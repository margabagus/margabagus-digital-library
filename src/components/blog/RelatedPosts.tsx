
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types/blog";

interface RelatedPostsProps {
  posts: BlogPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map(post => (
          <Card key={post.id}>
            <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-40">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
            <CardContent className="pt-4">
              <Link 
                to={`/blog?category=${encodeURIComponent(post.category)}`}
                className="text-xs text-primary hover:underline"
              >
                {post.category}
              </Link>
              <Link to={`/blog/${post.slug}`} className="group">
                <h4 className="font-bold my-1 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
              </Link>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
