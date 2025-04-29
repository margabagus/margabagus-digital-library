
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock messages data
const mockMessages = [
  {
    id: 1,
    from: "Admin",
    message: "Welcome to our ebook platform! If you have any questions, feel free to ask.",
    date: "2024-04-25T10:30:00",
    read: true,
  },
  {
    id: 2,
    from: "Admin",
    message: "We've added some new books to our Science Fiction collection that match your reading preferences.",
    date: "2024-04-26T14:15:00",
    read: false,
  },
  {
    id: 3,
    from: "System",
    message: "Your account has been verified successfully.",
    date: "2024-04-27T09:45:00",
    read: true,
  },
];

export default function UserMessages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const handleMessageClick = (id: number) => {
    setSelectedMessage(id);
    // Mark message as read
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to an API
    toast({
      title: "Message sent",
      description: "Your message has been sent to the admin.",
    });
    
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Inbox
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 border rounded-md cursor-pointer hover:bg-accent ${
                    selectedMessage === msg.id ? "bg-accent" : ""
                  }`}
                  onClick={() => handleMessageClick(msg.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{msg.from}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(msg.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm truncate">{msg.message}</div>
                  {!msg.read && (
                    <div className="mt-2">
                      <Badge>New</Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Message</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div>
                {/* Message details */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-medium">
                        {messages.find(m => m.id === selectedMessage)?.from}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(messages.find(m => m.id === selectedMessage)?.date || "").toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-md bg-muted">
                    {messages.find(m => m.id === selectedMessage)?.message}
                  </div>
                </div>
                
                {/* Reply form */}
                <div className="space-y-4">
                  <div>
                    <Textarea
                      placeholder="Type your reply here..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button onClick={handleSendMessage}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Reply
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Select a message to read
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
