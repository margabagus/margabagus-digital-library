
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; 
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sampleBlogPosts } from "@/data/sampleBlogPosts";

export default function BlogSidebar() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&type=blog`);
    }
  };

  // Get unique categories
  const categories = Array.from(
    new Set(sampleBlogPosts.map(post => post.category))
  ).sort();

  // Get unique tags and count their occurrences
  const tagCounts = sampleBlogPosts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Sort tags by frequency
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearchSubmit} className="flex space-x-2">
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center justify-between">
                <Link 
                  to={`/blog?category=${encodeURIComponent(category)}`}
                  className="text-sm hover:underline flex items-center"
                >
                  <BookOpen className="w-4 h-4 mr-2 text-primary" />
                  {category}
                </Link>
                <span className="text-xs text-muted-foreground">
                  {sampleBlogPosts.filter(post => post.category === category).length}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Popular Tags</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {popularTags.map(([tag, count]) => (
              <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                  <span className="ml-1 text-xs text-muted-foreground">({count})</span>
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Subscribe</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest articles and updates delivered to your inbox.
          </p>
          <form className="space-y-2">
            <Input
              type="email"
              placeholder="your@email.com"
              required
            />
            <Button className="w-full">Subscribe</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
