
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types/blogTypes";

interface BlogPostGridProps {
  posts: BlogPost[];
}

export default function BlogPostGrid({ posts }: BlogPostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-medium mb-2">No posts found</h3>
        <p className="text-muted-foreground">Try a different category or tag.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden flex flex-col h-full">
          {post.coverImage && (
            <div className="aspect-video overflow-hidden">
              <Link to={`/blog/${post.slug}`}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </Link>
            </div>
          )}
          
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-1">
              <Link 
                to={`/blog?category=${encodeURIComponent(post.category)}`}
                className="text-sm text-primary hover:underline"
              >
                {post.category}
              </Link>
              <div className="flex items-center text-muted-foreground text-xs">
                <Eye className="w-3 h-3 mr-1" aria-hidden="true" />
                {post.views}
              </div>
            </div>
            
            <Link to={`/blog/${post.slug}`} className="hover:underline">
              <h3 className="text-xl font-bold leading-tight mb-2">{post.title}</h3>
            </Link>
            
            <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
          </CardHeader>
          
          <CardContent className="pb-2 flex-grow">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, idx) => (
                <Link key={idx} to={`/blog?tag=${encodeURIComponent(tag)}`}>
                  <Badge variant="secondary" className="text-xs flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="pt-2">
            <div className="flex items-center justify-between w-full text-sm">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
