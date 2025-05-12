
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash, Eye } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { sampleBlogPosts } from "@/data/sampleBlogPosts";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/utils";

export default function AdminBlogPosts() {
  const [posts, setPosts] = React.useState<BlogPost[]>(sampleBlogPosts);
  
  // Function to handle deleting a post (in a real app, this would connect to an API)
  const handleDeletePost = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <Button as={Link} to="/admin/blog/new">
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>
      
      <Separator />
      
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium">Title</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Author</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {posts.map(post => (
                <tr key={post.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <span className="font-medium">{post.title}</span>
                    </div>
                  </td>
                  <td className="p-4 align-middle">{post.category}</td>
                  <td className="p-4 align-middle">{post.author.name}</td>
                  <td className="p-4 align-middle">{formatDate(post.publishDate)}</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                      Published
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/blog/${post.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/admin/blog/edit/${post.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
