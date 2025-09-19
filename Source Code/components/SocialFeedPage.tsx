import { useState, useEffect } from "react";
import { Heart, MessageCircle, Repeat2, Share, Bookmark, MoreHorizontal, Camera, Smile, MapPin, Calendar, Search, Bell, Mail, User, Settings, TrendingUp, Hash, AtSign, ImageIcon, Mic, Send, X, ChevronDown, Shield, AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  bio: string;
  followers: number;
  following: number;
  location?: string;
  joinDate: string;
}

interface Post {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  reposts: number;
  bookmarks: number;
  liked: boolean;
  reposted: boolean;
  bookmarked: boolean;
  images?: string[];
  mood?: string;
  contentWarning?: string;
  hashtags: string[];
  mentions: string[];
  isReply?: boolean;
  replyTo?: string;
  supportLevel?: number; // 1-5 scale for support needed
}

interface SocialFeedPageProps {
  user: any;
  onNavigate: (page: string) => void;
}

export function SocialFeedPage({ user, onNavigate }: SocialFeedPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [contentWarning, setContentWarning] = useState("");
  const [supportLevel, setSupportLevel] = useState(1);
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState("");

  const CHARACTER_LIMIT = 280;
  const remainingChars = CHARACTER_LIMIT - newPost.length;

  const moods = [
    { emoji: "😊", label: "Happy", color: "#4ade80" },
    { emoji: "😢", label: "Sad", color: "#3b82f6" },
    { emoji: "😰", label: "Anxious", color: "#f59e0b" },
    { emoji: "😴", label: "Tired", color: "#6b7280" },
    { emoji: "😡", label: "Angry", color: "#ef4444" },
    { emoji: "🤗", label: "Grateful", color: "#8b5cf6" },
    { emoji: "😌", label: "Peaceful", color: "#10b981" },
    { emoji: "🤔", label: "Confused", color: "#f97316" },
  ];

  const sampleUser: User = {
    id: "current_user",
    name: user?.name || "Anonymous User",
    username: user?.username || "anonymous",
    avatar: user?.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80`,
    verified: false,
    bio: "Mental health advocate | Spreading positivity | Here to support 💙",
    followers: 142,
    following: 89,
    location: "India",
    joinDate: "March 2024"
  };

  const samplePosts: Post[] = [
    {
      id: "1",
      user: {
        id: "user1",
        name: "Sarah Chen",
        username: "sarahc_wellness",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c7fd?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80",
        verified: true,
        bio: "Therapist | Mental Health Advocate",
        followers: 2340,
        following: 456,
        joinDate: "January 2024"
      },
      content: "Today I want to remind everyone that healing isn't linear. Some days are harder than others, and that's completely okay. You're still making progress even when it doesn't feel like it. 💙 #MentalHealthMatters #Healing",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      likes: 187,
      comments: 23,
      reposts: 45,
      bookmarks: 67,
      liked: false,
      reposted: false,
      bookmarked: true,
      images: ["https://images.unsplash.com/photo-1679014844834-e86723f36c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBtZWRpdGF0aW9uJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU4MTE0NzI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      mood: "Peaceful",
      hashtags: ["MentalHealthMatters", "Healing"],
      mentions: [],
      supportLevel: 2
    },
    {
      id: "2",
      user: {
        id: "user2",
        name: "Alex Kumar",
        username: "alex_mindful",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80",
        verified: false,
        bio: "Student | Mindfulness practitioner",
        followers: 89,
        following: 123,
        joinDate: "February 2024"
      },
      content: "Had my first therapy session today. Nervous but excited for this journey of self-discovery. To anyone considering therapy - you're worth the investment in yourself! 🌱",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likes: 94,
      comments: 12,
      reposts: 8,
      bookmarks: 23,
      liked: true,
      reposted: false,
      bookmarked: false,
      images: ["https://images.unsplash.com/photo-1620148222862-b95cf7405a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXB5JTIwc2Vzc2lvbiUyMGNvdW5zZWxpbmclMjBzdXBwb3J0fGVufDF8fHx8MTc1ODEzNDEzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      mood: "Happy",
      contentWarning: "Mental Health Discussion",
      hashtags: ["Therapy", "SelfCare"],
      mentions: [],
      supportLevel: 3
    },
    {
      id: "3",
      user: {
        id: "user3",
        name: "Dr. Priya Sharma",
        username: "dr_priya_mh",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80",
        verified: true,
        bio: "Psychiatrist | Mental Health Researcher",
        followers: 5670,
        following: 234,
        joinDate: "December 2023"
      },
      content: "Quick reminder: It's okay to set boundaries with people, even family. Protecting your mental health isn't selfish - it's necessary. You can be compassionate while still prioritizing your wellbeing. ✨",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      likes: 312,
      comments: 45,
      reposts: 89,
      bookmarks: 156,
      liked: false,
      reposted: true,
      bookmarked: false,
      mood: "Grateful",
      hashtags: ["Boundaries", "MentalHealth", "SelfCare"],
      mentions: [],
      supportLevel: 1
    },
    {
      id: "4",
      user: {
        id: "user4",
        name: "Mindful Maya",
        username: "maya_mindful",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80",
        verified: false,
        bio: "Yoga instructor | Spreading peace",
        followers: 234,
        following: 178,
        joinDate: "January 2024"
      },
      content: "Small reminder: You don't have to be productive every single day. Rest is not lazy. Rest is necessary. Your worth isn't measured by your output. 🌸 #RestIsNotLazy #MentalHealthAwareness",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      likes: 156,
      comments: 18,
      reposts: 32,
      bookmarks: 89,
      liked: false,
      reposted: false,
      bookmarked: false,
      mood: "Peaceful",
      hashtags: ["RestIsNotLazy", "MentalHealthAwareness"],
      mentions: [],
      supportLevel: 1
    },
    {
      id: "5",
      user: {
        id: "user5",
        name: "Anonymous Warrior",
        username: "anon_warrior",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80",
        verified: false,
        bio: "Fighting battles you can't see",
        followers: 56,
        following: 23,
        joinDate: "March 2024"
      },
      content: "Having a really tough day today. Anxiety is through the roof and I feel like I'm drowning. But I'm still here, and I'm trying. That has to count for something, right? 💪 #AnxietySupport #StillFighting",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
      likes: 89,
      comments: 34,
      reposts: 12,
      bookmarks: 45,
      liked: true,
      reposted: false,
      bookmarked: true,
      mood: "Anxious",
      contentWarning: "Anxiety Discussion",
      hashtags: ["AnxietySupport", "StillFighting"],
      mentions: [],
      supportLevel: 4
    },
    {
      id: "6",
      user: {
        id: "user6",
        name: "Hope Believer",
        username: "hope_always",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80",
        verified: false,
        bio: "Survivor | Advocate | Hope spreader",
        followers: 445,
        following: 267,
        joinDate: "February 2024"
      },
      content: "Six months ago I couldn't get out of bed. Today I went for a walk, made breakfast, and called a friend. Recovery isn't linear, but every small step matters. To everyone struggling: you're stronger than you know. 🌈 #Recovery #Depression #Hope",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      likes: 234,
      comments: 67,
      reposts: 45,
      bookmarks: 123,
      liked: false,
      reposted: false,
      bookmarked: false,
      mood: "Grateful",
      hashtags: ["Recovery", "Depression", "Hope"],
      mentions: [],
      supportLevel: 2
    }
  ];

  const trendingSample = [
    { tag: "MentalHealthMatters", posts: 1240 },
    { tag: "SelfCare", posts: 892 },
    { tag: "TherapyHelps", posts: 567 },
    { tag: "AnxietySupport", posts: 445 },
    { tag: "Mindfulness", posts: 389 },
    { tag: "DepressionAwareness", posts: 234 },
    { tag: "StillFighting", posts: 198 },
    { tag: "Recovery", posts: 156 },
    { tag: "RestIsNotLazy", posts: 134 },
    { tag: "YouAreNotAlone", posts: 98 }
  ];

  useEffect(() => {
    setPosts(samplePosts);
    setTrendingTopics(trendingSample);
  }, []);

  const handlePost = () => {
    if (newPost.trim()) {
      const hashtags = newPost.match(/#\w+/g) || [];
      const mentions = newPost.match(/@\w+/g) || [];
      
      const post: Post = {
        id: Date.now().toString(),
        user: sampleUser,
        content: newPost,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        reposts: 0,
        bookmarks: 0,
        liked: false,
        reposted: false,
        bookmarked: false,
        mood: selectedMood,
        contentWarning: contentWarning || undefined,
        hashtags: hashtags.map(tag => tag.slice(1)),
        mentions: mentions.map(mention => mention.slice(1)),
        supportLevel
      };

      setPosts([post, ...posts]);
      setNewPost("");
      setSelectedMood("");
      setContentWarning("");
      setSupportLevel(1);
      setShowComposer(false);
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleRepost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, reposted: !post.reposted, reposts: post.reposted ? post.reposts - 1 : post.reposts + 1 }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked, bookmarks: post.bookmarked ? post.bookmarks - 1 : post.bookmarks + 1 }
        : post
    ));
  };

  const handleReply = (post: Post) => {
    setSelectedPost(post);
    setShowReplyModal(true);
  };

  const submitReply = () => {
    if (replyText.trim() && selectedPost) {
      const reply: Post = {
        id: Date.now().toString(),
        user: sampleUser,
        content: replyText,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        reposts: 0,
        bookmarks: 0,
        liked: false,
        reposted: false,
        bookmarked: false,
        hashtags: [],
        mentions: [selectedPost.user.username],
        isReply: true,
        replyTo: selectedPost.id,
        supportLevel: 1
      };

      setPosts([reply, ...posts]);
      setPosts(posts.map(post => 
        post.id === selectedPost.id 
          ? { ...post, comments: post.comments + 1 }
          : post
      ));
      
      setReplyText("");
      setShowReplyModal(false);
      setSelectedPost(null);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const getMoodColor = (mood: string) => {
    const moodData = moods.find(m => m.label === mood);
    return moodData?.color || "#6b7280";
  };

  const PostComposer = () => (
    <Card className="p-4 border-[var(--primary-blue)] border-opacity-20">
      <div className="flex space-x-3">
        <Avatar className="w-12 h-12">
          <img src={sampleUser.avatar} alt={sampleUser.name} className="rounded-full" />
        </Avatar>
        <div className="flex-1">
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="How are you feeling today? Share your thoughts..."
            className="border-none resize-none p-0 focus:ring-0 text-xl placeholder:text-gray-500"
            rows={3}
            maxLength={CHARACTER_LIMIT}
          />
          
          {contentWarning && (
            <div className="flex items-center space-x-2 mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">Content Warning: {contentWarning}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setContentWarning("")}
                className="ml-auto h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-[var(--primary-blue)] hover:bg-blue-50">
                    <Smile className="w-4 h-4 mr-1" />
                    {selectedMood || "Mood"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {moods.map((mood) => (
                    <DropdownMenuItem
                      key={mood.label}
                      onClick={() => setSelectedMood(mood.label)}
                      className="flex items-center space-x-2"
                    >
                      <span>{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Select value={supportLevel.toString()} onValueChange={(value) => setSupportLevel(parseInt(value))}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Just sharing</SelectItem>
                  <SelectItem value="2">Need comfort</SelectItem>
                  <SelectItem value="3">Seeking advice</SelectItem>
                  <SelectItem value="4">Need support</SelectItem>
                  <SelectItem value="5">Crisis support</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="ghost" size="sm" className="text-gray-500">
                <ImageIcon className="w-4 h-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Shield className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setContentWarning("Mental Health Discussion")}>
                    Mental Health Discussion
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setContentWarning("Sensitive Content")}>
                    Sensitive Content
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setContentWarning("Crisis Discussion")}>
                    Crisis Discussion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                  {remainingChars}
                </span>
                <div className="w-8 h-8 relative">
                  <Progress 
                    value={(newPost.length / CHARACTER_LIMIT) * 100} 
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              </div>
              <Button
                onClick={handlePost}
                disabled={!newPost.trim() || remainingChars < 0}
                className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white px-6 rounded-full"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const PostCard = ({ post }: { post: Post }) => (
    <Card className="p-4 hover:bg-gray-50 transition-colors border-gray-100">
      {post.isReply && (
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MessageCircle className="w-3 h-3 mr-1" />
          Replying to @{posts.find(p => p.id === post.replyTo)?.user.username}
        </div>
      )}
      
      <div className="flex space-x-3">
        <Avatar className="w-12 h-12">
          <img src={post.user.avatar} alt={post.user.name} className="rounded-full" />
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
            {post.user.verified && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                ✓
              </Badge>
            )}
            <span className="text-gray-500">@{post.user.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{formatTime(post.timestamp)}</span>
            {post.mood && (
              <>
                <span className="text-gray-500">·</span>
                <Badge 
                  variant="outline" 
                  style={{ borderColor: getMoodColor(post.mood), color: getMoodColor(post.mood) }}
                  className="text-xs"
                >
                  {moods.find(m => m.label === post.mood)?.emoji} {post.mood}
                </Badge>
              </>
            )}
          </div>

          {post.contentWarning && (
            <div className="flex items-center space-x-2 mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-yellow-800">Content Warning: {post.contentWarning}</span>
            </div>
          )}

          <div className="mt-2">
            <p className="text-gray-900 leading-relaxed">{post.content}</p>
            
            {post.supportLevel > 2 && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    {post.supportLevel === 3 && "Seeking advice"}
                    {post.supportLevel === 4 && "Needs support"}
                    {post.supportLevel === 5 && "Crisis support needed"}
                  </span>
                </div>
              </div>
            )}

            {post.images && post.images.length > 0 && (
              <div className={`mt-3 rounded-2xl overflow-hidden ${post.images.length === 1 ? '' : 'grid grid-cols-2 gap-2'}`}>
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className={`w-full object-cover ${post.images.length === 1 ? 'h-80' : 'h-48'}`}
                  />
                ))}
              </div>
            )}

            {(post.hashtags.length > 0 || post.mentions.length > 0) && (
              <div className="mt-2 flex flex-wrap gap-1">
                {post.hashtags.map(tag => (
                  <span key={tag} className="text-[var(--primary-blue)] hover:underline cursor-pointer">
                    #{tag}
                  </span>
                ))}
                {post.mentions.map(mention => (
                  <span key={mention} className="text-[var(--primary-blue)] hover:underline cursor-pointer">
                    @{mention}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 max-w-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleReply(post)}
              className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRepost(post.id)}
              className={`rounded-full ${post.reposted ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-green-600 hover:bg-green-50'}`}
            >
              <Repeat2 className="w-4 h-4 mr-1" />
              {post.reposts}
            </Button>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={`rounded-full ${post.liked ? 'text-red-600 bg-red-50' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
              >
                <Heart className={`w-4 h-4 mr-1 ${post.liked ? 'fill-current' : ''}`} />
                {post.likes}
              </Button>
              
              {post.supportLevel > 2 && (
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-50 rounded-full px-2">
                    🤗
                  </Button>
                  <Button variant="ghost" size="sm" className="text-purple-500 hover:bg-purple-50 rounded-full px-2">
                    💪
                  </Button>
                  <Button variant="ghost" size="sm" className="text-green-500 hover:bg-green-50 rounded-full px-2">
                    🌟
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleBookmark(post.id)}
              className={`rounded-full ${post.bookmarked ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}
            >
              <Bookmark className={`w-4 h-4 ${post.bookmarked ? 'fill-current' : ''}`} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 rounded-full">
                  <Share className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Share via Link</DropdownMenuItem>
                <DropdownMenuItem>Share via DM</DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Card>
  );

  const Sidebar = () => (
    <div className="space-y-6">
      {/* Search */}
      <Card className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Mitraa"
            className="pl-10 border-gray-200 focus:border-[var(--primary-blue)]"
          />
        </div>
      </Card>

      {/* Trending */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Trending in Mental Health
        </h3>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="flex items-center space-x-2">
                <Hash className="w-3 h-3 text-gray-400" />
                <span className="font-medium text-gray-900">{topic.tag}</span>
              </div>
              <p className="text-sm text-gray-500">{topic.posts} posts</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Who to follow */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Who to follow</h3>
        <div className="space-y-3">
          {[
            {
              name: "Mental Health Foundation",
              username: "mhf_india",
              avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80",
              verified: true
            },
            {
              name: "Mindfulness Guide",
              username: "mindful_living",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80",
              verified: false
            }
          ].map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <img src={user.avatar} alt={user.name} className="rounded-full" />
                </Avatar>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium text-sm">{user.name}</span>
                    {user.verified && <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">✓</Badge>}
                  </div>
                  <span className="text-xs text-gray-500">@{user.username}</span>
                </div>
              </div>
              <Button size="sm" className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white rounded-full px-4">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto flex">
        {/* Left Sidebar - Navigation */}
        <div className="w-64 p-4 border-r border-gray-200 sticky top-0 h-screen">
          <div className="mb-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate("Home")}
              className="w-full justify-start rounded-full text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-3" />
              Back to Mitraa
            </Button>
          </div>
          <div className="space-y-2">
            <Button
              variant={activeTab === "home" ? "default" : "ghost"}
              className={`w-full justify-start rounded-full ${activeTab === "home" ? 'bg-[var(--primary-blue)] text-white' : ''}`}
              onClick={() => setActiveTab("home")}
            >
              <User className="w-4 h-4 mr-3" />
              Home
            </Button>
            <Button
              variant={activeTab === "explore" ? "default" : "ghost"}
              className={`w-full justify-start rounded-full ${activeTab === "explore" ? 'bg-[var(--primary-blue)] text-white' : ''}`}
              onClick={() => setActiveTab("explore")}
            >
              <Search className="w-4 h-4 mr-3" />
              Explore
            </Button>
            <Button
              variant={activeTab === "notifications" ? "default" : "ghost"}
              className={`w-full justify-start rounded-full ${activeTab === "notifications" ? 'bg-[var(--primary-blue)] text-white' : ''}`}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="w-4 h-4 mr-3" />
              Notifications
            </Button>
            <Button
              variant={activeTab === "messages" ? "default" : "ghost"}
              className={`w-full justify-start rounded-full ${activeTab === "messages" ? 'bg-[var(--primary-blue)] text-white' : ''}`}
              onClick={() => setActiveTab("messages")}
            >
              <Mail className="w-4 h-4 mr-3" />
              Messages
            </Button>
            <Button
              variant={activeTab === "bookmarks" ? "default" : "ghost"}
              className={`w-full justify-start rounded-full ${activeTab === "bookmarks" ? 'bg-[var(--primary-blue)] text-white' : ''}`}
              onClick={() => setActiveTab("bookmarks")}
            >
              <Bookmark className="w-4 h-4 mr-3" />
              Bookmarks
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className={`w-full justify-start rounded-full ${activeTab === "profile" ? 'bg-[var(--primary-blue)] text-white' : ''}`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="w-4 h-4 mr-3" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-full"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          </div>

          <Button
            onClick={() => setShowComposer(true)}
            className="w-full mt-6 bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white rounded-full py-3 font-semibold"
          >
            Share Feelings
          </Button>

          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 text-sm mb-2">Need Immediate Help?</h4>
            <p className="text-red-700 text-xs mb-3">If you're having thoughts of self-harm or suicide, please reach out immediately:</p>
            <div className="space-y-2">
              <Button
                size="sm"
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xs"
                onClick={() => window.open('tel:9152987821', '_self')}
              >
                🚨 Crisis Helpline: 915-298-7821
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-red-300 text-red-700 hover:bg-red-50 text-xs"
                onClick={() => onNavigate("AI-Chat")}
              >
                Talk to AI Crisis Support
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 border-r border-gray-200">
          <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Mental Health Community</h1>
                <p className="text-gray-500 text-sm">Share your thoughts and support others</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">3</span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  🟢 Safe Space
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <PostComposer />
            
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 p-4">
          <Sidebar />
        </div>
      </div>

      {/* Reply Modal */}
      <Dialog open={showReplyModal} onOpenChange={setShowReplyModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Reply to {selectedPost?.user.name}</DialogTitle>
          </DialogHeader>
          
          {selectedPost && (
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="w-6 h-6">
                    <img src={selectedPost.user.avatar} alt={selectedPost.user.name} className="rounded-full" />
                  </Avatar>
                  <span className="font-medium text-sm">{selectedPost.user.name}</span>
                  <span className="text-gray-500 text-sm">@{selectedPost.user.username}</span>
                </div>
                <p className="text-sm text-gray-700">{selectedPost.content}</p>
              </div>

              <div className="flex space-x-3">
                <Avatar className="w-10 h-10">
                  <img src={sampleUser.avatar} alt={sampleUser.name} className="rounded-full" />
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${selectedPost.user.name}...`}
                    className="border-none resize-none p-0 focus:ring-0"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={submitReply}
                  disabled={!replyText.trim()}
                  className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white rounded-full px-6"
                >
                  Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Composer Modal */}
      <Dialog open={showComposer} onOpenChange={setShowComposer}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Share your feelings</DialogTitle>
          </DialogHeader>
          <PostComposer />
        </DialogContent>
      </Dialog>
    </div>
  );
}