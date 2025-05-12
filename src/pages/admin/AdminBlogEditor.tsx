
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { sampleBlogPosts } from "@/data/sampleBlogPosts";
import { BlogPost } from "@/types/blog";
import { toast } from "@/hooks/use-toast";

// Form validation schema
const postSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  slug: z.string().min(5, { message: "Slug must be at least 5 characters" }).regex(/^[a-z0-9-]+$/, { 
    message: "Slug can only contain lowercase letters, numbers, and hyphens" 
  }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  tags: z.string().optional(),
  coverImage: z.string().url({ message: "Cover image must be a valid URL" }),
  publishDate: z.string().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewPost = !id || id === "new";
  
  // Get existing post data if editing
  const existingPost = isNewPost 
    ? null 
    : sampleBlogPosts.find(post => post.id === id);
  
  // Initialize form with existing values or defaults
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: isNewPost
      ? {
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "",
          tags: "",
          coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
          publishDate: new Date().toISOString().split("T")[0],
        }
      : {
          title: existingPost?.title || "",
          slug: existingPost?.slug || "",
          excerpt: existingPost?.excerpt || "",
          content: existingPost?.content || "",
          category: existingPost?.category || "",
          tags: existingPost?.tags.join(", ") || "",
          coverImage: existingPost?.coverImage || "",
          publishDate: existingPost?.publishDate.split("T")[0] || "",
        },
  });
  
  // Available categories
  const categories = Array.from(
    new Set(sampleBlogPosts.map((post) => post.category))
  );

  const onSubmit = (data: PostFormValues) => {
    // In a real app, this would save to a database
    console.log("Form submitted:", data);
    
    toast({
      title: isNewPost ? "Post created" : "Post updated",
      description: `"${data.title}" has been ${isNewPost ? "created" : "updated"} successfully.`,
    });
    
    // Redirect back to blog posts list
    navigate("/admin/blog");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{isNewPost ? "Create New Post" : "Edit Post"}</h1>
      </div>
      
      <Separator />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="post-url-slug" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be used in the URL (e.g., /blog/post-url-slug)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write a short excerpt for the post" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      A brief summary that appears in post lists and SEO descriptions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your post content here..." 
                        className="min-h-[400px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                              <SelectItem value="new">+ Add new category</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <Input placeholder="reading, books, fiction" {...field} />
                          </FormControl>
                          <FormDescription>
                            Separate tags with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                          {field.value && (
                            <div className="mt-2 rounded-md overflow-hidden">
                              <img 
                                src={field.value} 
                                alt="Cover preview" 
                                className="w-full h-32 object-cover"
                              />
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="publishDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Publish Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => navigate("/admin/blog")}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isNewPost ? "Create Post" : "Update Post"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
