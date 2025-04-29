
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen, HelpCircle, MessageSquare, Search, User } from "lucide-react";

export default function FAQ() {
  const generalFaqs = [
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Register' button in the top-right corner of the website. Follow the prompts to enter your details and create your password."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes! Our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store."
    },
    {
      question: "Are there any subscription fees?",
      answer: "We offer both free and premium tiers. The free tier gives you access to our basic library, while the premium subscription unlocks our entire catalog, offline reading, and additional features."
    }
  ];
  
  const readingFaqs = [
    {
      question: "Can I read books offline?",
      answer: "Yes, premium users can download books for offline reading. Simply click the download icon next to any book, and it will be available in your 'Downloads' section."
    },
    {
      question: "How do I bookmark my progress?",
      answer: "Your reading progress is automatically saved as you read. You can also manually add bookmarks by clicking the bookmark icon at the top-right corner of the reader."
    },
    {
      question: "Can I customize the reading experience?",
      answer: "Yes, our reader offers various customization options including font size, font type, background color, and reading mode (day/night)."
    }
  ];
  
  const accountFaqs = [
    {
      question: "How do I update my profile information?",
      answer: "Go to your dashboard and click on 'Settings'. From there, you can update your profile information, change your password, and manage your notification preferences."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription from the 'Settings' page in your dashboard. Click on 'Subscription' and then 'Cancel Subscription'. Your access will continue until the end of your current billing period."
    },
    {
      question: "What happens to my reading lists and bookmarks if I cancel?",
      answer: "Your reading lists, bookmarks, and preferences are saved even if you cancel your premium subscription. If you resubscribe, you'll regain access to all your saved data."
    }
  ];

  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to the most common questions about our platform.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for answers..." 
              className="pl-10" 
            />
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                General
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {generalFaqs.map((faq, index) => (
                  <AccordionItem value={`general-item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {readingFaqs.map((faq, index) => (
                  <AccordionItem value={`reading-item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {accountFaqs.map((faq, index) => (
                  <AccordionItem value={`account-item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center bg-muted rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            If you couldn't find the answer to your question, please reach out to our support team.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <a href="/contact">Contact Support</a>
            </Button>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
