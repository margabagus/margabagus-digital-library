
import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Search, Tag, Tags } from "lucide-react";
import { sampleBlogPosts } from "@/data/sampleBlogPosts";
import { BlogPost } from "@/types/blog";

const BlogSidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Get all categories from blog posts
  const categories = Array.from(
    new Set(sampleBlogPosts.map((post) => post.category))
  );

  // Get all tags and count occurrences
  const tagCounts: Record<string, number> = {};
  sampleBlogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // Sort tags by count (descending)
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Get top 10 tags

  // Get popular posts
  const popularPosts = [...sampleBlogPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // In a real app, this would navigate to search results
              console.log("Searching for:", searchTerm);
            }}
          >
            <div className="flex gap-2">
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Search className="w-4 h-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={`/blog?category=${encodeURIComponent(category)}`}
              className="flex justify-between hover:text-primary transition-colors"
            >
              <span>{category}</span>
              <span className="text-muted-foreground">
                {sampleBlogPosts.filter(post => post.category === category).length}
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Tags className="w-5 h-5" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {popularTags.map(([tag, count], index) => (
            <Link key={index} to={`/blog?tag=${encodeURIComponent(tag)}`}>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {tag} ({count})
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Popular Articles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularPosts.map((post, index) => (
            <div key={post.id}>
              {index > 0 && <Separator className="my-4" />}
              <Link to={`/blog/${post.slug}`} className="group">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {post.views} views
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;
