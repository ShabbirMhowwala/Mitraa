import { useState } from "react";
import { ArrowLeft, Heart, Send, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";

interface Discussion {
  id: number;
  title: string;
  author: string;
  content: string;
  replies: number;
  likes: number;
  tags: string[];
  category: string;
  timeAgo: string;
}

interface Reply {
  id: number;
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
}

const mockReplies: Reply[] = [
  {
    id: 1,
    author: "SupportiveFriend",
    content: "I completely understand what you're going through! I had similar anxiety during my finals last semester. What helped me was breaking down my study schedule into smaller, manageable chunks and practicing deep breathing exercises.",
    timeAgo: "1 hour ago",
    likes: 8
  },
  {
    id: 2,
    author: "StudyBuddy",
    content: "Have you tried meditation apps? I use Headspace for 10 minutes every morning and it really helps calm my nerves before big exams. Also, remember that it's normal to feel anxious - you're not alone in this!",
    timeAgo: "45 minutes ago",
    likes: 12
  },
  {
    id: 3,
    author: "MindfulStudent",
    content: "Creating a proper sleep schedule was a game-changer for me. When I'm well-rested, I can handle stress much better. Also, talking to friends about your worries really helps - thanks for sharing this with us!",
    timeAgo: "30 minutes ago",
    likes: 6
  },
  {
    id: 4,
    author: "CalmLearner",
    content: "I recommend visiting the counseling center on campus if you haven't already. They have great resources for exam anxiety and stress management. You've got this! 💪",
    timeAgo: "15 minutes ago",
    likes: 9
  }
];

export function ConversationView({ 
  discussion, 
  onBack 
}: { 
  discussion: Discussion; 
  onBack: () => void; 
}) {
  const [newReply, setNewReply] = useState("");
  const [likedReplies, setLikedReplies] = useState<number[]>([]);
  const [isOriginalLiked, setIsOriginalLiked] = useState(false);

  const handleSendReply = () => {
    if (newReply.trim()) {
      // In a real app, this would send the reply to the backend
      setNewReply("");
    }
  };

  const toggleReplyLike = (replyId: number) => {
    setLikedReplies(prev => 
      prev.includes(replyId) 
        ? prev.filter(id => id !== replyId)
        : [...prev, replyId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            style={{ color: "var(--primary-blue)" }}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold" style={{ color: "var(--text-dark)" }}>
            Discussion Thread
          </h1>
        </div>

        {/* Original Post */}
        <Card 
          className="p-6 mb-6"
          style={{ 
            backgroundColor: "var(--light-blue)",
            boxShadow: "var(--card-shadow)"
          }}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold" style={{ color: "var(--text-dark)" }}>
                  {discussion.title}
                </h2>
                <p className="text-sm mt-1" style={{ color: "var(--text-light)" }}>
                  by {discussion.author} • {discussion.timeAgo}
                </p>
              </div>
              <Badge 
                variant="secondary"
                style={{ 
                  backgroundColor: "var(--primary-blue)",
                  color: "white"
                }}
              >
                {discussion.category}
              </Badge>
            </div>

            <p style={{ color: "var(--text-light)" }}>
              {discussion.content}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {discussion.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="text-xs"
                    style={{ 
                      backgroundColor: "var(--lavender)",
                      color: "var(--text-dark)"
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" style={{ color: "var(--text-light)" }} />
                  <span className="text-sm" style={{ color: "var(--text-light)" }}>
                    {discussion.replies}
                  </span>
                </div>
                <button
                  onClick={() => setIsOriginalLiked(!isOriginalLiked)}
                  className="flex items-center space-x-1 hover:opacity-75 transition-opacity"
                >
                  <Heart 
                    className="w-4 h-4" 
                    style={{ color: isOriginalLiked ? "var(--amber)" : "var(--text-light)" }}
                    fill={isOriginalLiked ? "currentColor" : "none"}
                  />
                  <span 
                    className="text-sm" 
                    style={{ color: isOriginalLiked ? "var(--amber)" : "var(--text-light)" }}
                  >
                    {discussion.likes + (isOriginalLiked ? 1 : 0)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Replies */}
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold" style={{ color: "var(--text-dark)" }}>
            Replies ({mockReplies.length})
          </h3>
          
          {mockReplies.map((reply, index) => (
            <Card 
              key={reply.id}
              className={`p-4 ${index % 2 === 1 ? "ml-8" : ""}`}
              style={{ 
                backgroundColor: index % 2 === 0 ? "white" : "var(--lavender)",
                boxShadow: "var(--card-shadow)"
              }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium" style={{ color: "var(--text-dark)" }}>
                      {reply.author}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-light)" }}>
                      {reply.timeAgo}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleReplyLike(reply.id)}
                    className="flex items-center space-x-1 hover:opacity-75 transition-opacity"
                  >
                    <Heart 
                      className="w-4 h-4" 
                      style={{ 
                        color: likedReplies.includes(reply.id) ? "var(--amber)" : "var(--text-light)" 
                      }}
                      fill={likedReplies.includes(reply.id) ? "currentColor" : "none"}
                    />
                    <span 
                      className="text-sm" 
                      style={{ 
                        color: likedReplies.includes(reply.id) ? "var(--amber)" : "var(--text-light)" 
                      }}
                    >
                      {reply.likes + (likedReplies.includes(reply.id) ? 1 : 0)}
                    </span>
                  </button>
                </div>
                
                <p style={{ color: "var(--text-light)" }}>
                  {reply.content}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Reply Input */}
        <Card className="p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <div className="space-y-4">
            <h4 className="font-semibold" style={{ color: "var(--text-dark)" }}>
              Share your thoughts
            </h4>
            <Textarea
              placeholder="Write a supportive reply..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSendReply}
                disabled={!newReply.trim()}
                className="px-6 rounded-full"
                style={{ 
                  backgroundColor: "var(--primary-blue)",
                  color: "white"
                }}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Reply
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}