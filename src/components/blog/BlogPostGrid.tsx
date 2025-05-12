
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types/blog";

interface BlogPostGridProps {
  posts: BlogPost[];
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No posts found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden flex flex-col h-full">
          <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-48">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
          
          <CardContent className="pt-6 flex-1 flex flex-col">
            <div className="mb-2">
              <Link
                to={`/blog?category=${encodeURIComponent(post.category)}`}
                className="text-sm text-primary hover:underline"
              >
                {post.category}
              </Link>
            </div>
            
            <Link to={`/blog/${post.slug}`} className="group">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </Link>
            
            <p className="text-muted-foreground mb-4 flex-1">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              
              <div className="text-muted-foreground">
                {post.views} views
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="pt-0 border-t flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Link key={index} to={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </Badge>
              </Link>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline">+{post.tags.length - 3}</Badge>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogPostGrid;
