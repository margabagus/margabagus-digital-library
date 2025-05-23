
import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, Tag } from "lucide-react";
import { sampleBlogPosts } from "@/data/sampleBlogPosts";
import BlogSidebar from "@/components/blog/BlogSidebar";
import RelatedPosts from "@/components/blog/RelatedPosts";
import NotFound from "./NotFound";
import { formatDate } from "@/lib/utils";

export default function BlogPost() {
  const { slug } = useParams();
  const post = sampleBlogPosts.find(post => post.slug === slug);
  
  // Handle if post not found
  if (!post) {
    return <NotFound />;
  }
  
  // Get related posts based on category or tags
  const relatedPosts = sampleBlogPosts
    .filter(p => p.id !== post.id && 
      (p.category === post.category || p.tags.some(tag => post.tags.includes(tag)))
    )
    .slice(0, 3);
    
  return (
    <Layout>
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div>
              <Link 
                to={`/blog?category=${encodeURIComponent(post.category)}`} 
                className="text-sm text-primary hover:underline inline-flex items-center gap-1 mb-2"
              >
                <BookOpen className="w-4 h-4" />
                {post.category}
              </Link>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{post.author.name}</span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishDate)}</span>
                </div>
                
                <div className="text-muted-foreground text-sm">{post.views} views</div>
              </div>
              
              {post.coverImage && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
              
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link key={index} to={`/blog?tag=${encodeURIComponent(tag)}`}>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            
            <Separator className="my-10" />
            
            <RelatedPosts posts={relatedPosts} />
          </div>
          
          <div>
            <BlogSidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
}
