
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { useLocation } from "react-router-dom";
import { BlogPost } from "@/types/blog";

// Sample blog posts for initial display
import { sampleBlogPosts } from "@/data/sampleBlogPosts";

export default function Blog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const tagParam = queryParams.get("tag");
  
  const [posts, setPosts] = React.useState<BlogPost[]>(sampleBlogPosts);
  const [activeTab, setActiveTab] = React.useState("latest");

  // Filter posts if category or tag parameters are present
  React.useEffect(() => {
    if (categoryParam) {
      const filtered = sampleBlogPosts.filter(post => 
        post.category.toLowerCase() === categoryParam.toLowerCase()
      );
      setPosts(filtered);
      setActiveTab("category");
    } else if (tagParam) {
      const filtered = sampleBlogPosts.filter(post => 
        post.tags.some(tag => tag.toLowerCase() === tagParam.toLowerCase())
      );
      setPosts(filtered);
      setActiveTab("tag");
    } else {
      setPosts(sampleBlogPosts);
    }
  }, [categoryParam, tagParam]);

  // SEO title based on filter
  const getSeoTitle = () => {
    if (categoryParam) {
      return `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Articles | Marga Bagus Library`;
    } else if (tagParam) {
      return `Articles about ${tagParam} | Marga Bagus Library`;
    }
    return "Blog | Marga Bagus Digital Library";
  };

  // SEO description based on filter
  const getSeoDescription = () => {
    if (categoryParam) {
      return `Explore our collection of articles about ${categoryParam}. Find insights, tips, and stories related to books and reading.`;
    } else if (tagParam) {
      return `Browse all articles tagged with ${tagParam}. Discover content curated for readers interested in this topic.`;
    }
    return "Explore articles about books, reading, literature, and more. Stay updated with the latest in the world of digital reading.";
  };

  const filterByPopularity = () => {
    const sorted = [...posts].sort((a, b) => b.views - a.views);
    setPosts(sorted);
    setActiveTab("popular");
  };

  const filterByLatest = () => {
    const sorted = [...posts].sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    setPosts(sorted);
    setActiveTab("latest");
  };

  return (
    <Layout>
      <Helmet>
        <title>{getSeoTitle()}</title>
        <meta name="description" content={getSeoDescription()} />
        <meta property="og:title" content={getSeoTitle()} />
        <meta property="og:description" content={getSeoDescription()} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getSeoTitle()} />
        <meta name="twitter:description" content={getSeoDescription()} />
        {/* Add canonical URL to prevent duplicate content issues */}
        <link rel="canonical" href="https://margabagus.com/blog" />
      </Helmet>

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
