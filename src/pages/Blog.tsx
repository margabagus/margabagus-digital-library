
import React from "react";
import Layout from "@/components/layout/Layout";
import { useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { sampleBlogPosts } from "@/data/sampleBlogPosts";

export default function Blog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const tagParam = queryParams.get("tag");
  
  const [posts, setPosts] = React.useState(sampleBlogPosts);
  const [activeTab, setActiveTab] = React.useState("latest");

  // Filter posts if category or tag parameters are present
  React.useEffect(() => {
    if (categoryParam) {
      const filtered = sampleBlogPosts.filter(
        post => post.category.toLowerCase() === categoryParam.toLowerCase()
      );
      setPosts(filtered);
      setActiveTab("category");
    } else if (tagParam) {
      const filtered = sampleBlogPosts.filter(
        post => post.tags.some(tag => tag.toLowerCase() === tagParam.toLowerCase())
      );
      setPosts(filtered);
      setActiveTab("tag");
    } else {
      setPosts(sampleBlogPosts);
    }
  }, [categoryParam, tagParam]);

  const filterByPopularity = () => {
    const sorted = [...posts].sort((a, b) => b.views - a.views);
    setPosts(sorted);
    setActiveTab("popular");
  };

  const filterByLatest = () => {
    const sorted = [...posts].sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    setPosts(sorted);
    setActiveTab("latest");
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and stories from the world of digital reading
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} className="mb-8">
              <TabsList>
                <TabsTrigger value="latest" onClick={filterByLatest}>Latest</TabsTrigger>
                <TabsTrigger value="popular" onClick={filterByPopularity}>Popular</TabsTrigger>
                {categoryParam && <TabsTrigger value="category">Category: {categoryParam}</TabsTrigger>}
                {tagParam && <TabsTrigger value="tag">Tag: {tagParam}</TabsTrigger>}
              </TabsList>
            </Tabs>
            
            <BlogPostGrid posts={posts} />
          </div>
          
          <div>
            <BlogSidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
}
