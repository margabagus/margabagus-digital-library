
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/types/blogTypes";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map(post => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <Link to={`/blog/${post.slug}`} className="block hover:opacity-80">
                {post.coverImage && (
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                )}
                <h4 className="font-medium line-clamp-2">{post.title}</h4>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
