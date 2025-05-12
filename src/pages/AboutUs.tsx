
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AboutUs() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to make reading more accessible, enjoyable, and connected.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 2023, our platform began with a simple idea: make digital books more accessible and create a community of readers who can share their love of literature.
            </p>
            <p className="mb-4">
              What started as a small collection of public domain works has grown into a comprehensive library with thousands of titles across all genres, from classic literature to contemporary fiction, academic textbooks to children's stories.
            </p>
            <p>
              Our team of passionate readers and technology experts work together to create the best possible reading experience for our users.
            </p>
          </div>
          <div className="bg-muted rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt="Team working together" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Info className="h-5 w-5" />
              Our Mission
            </CardTitle>
            <CardDescription>
              What drives our work every day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Accessibility</h3>
                <p className="text-muted-foreground">
                  Making reading accessible to everyone, regardless of location or circumstance.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-muted-foreground">
                  Creating connections between readers and fostering a love of literature.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-muted-foreground">
                  Constantly improving the digital reading experience with new technologies.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
