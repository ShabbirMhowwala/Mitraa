import { useState } from "react";
import { 
  Calendar, MapPin, Clock, Users, 
  Star, UserPlus, Filter, CheckCircle, Sparkles,
  BookOpen, Coffee, Music, Gamepad2, Film, Palette,
  MessageCircle, Heart, Share, Send, Hash
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface CommunityEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  image: string;
  category: string;
  rating: number;
  organizer: string;
  price: string;
}

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  interests: string[];
  image: string;
  isJoined: boolean;
}

interface Interest {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

const communityEvents: CommunityEvent[] = [
  {
    id: 1,
    title: "Mindfulness & Meditation Workshop",
    description: "Learn practical mindfulness techniques to manage stress and anxiety. Join our expert facilitators for a calming session.",
    date: "Feb 25, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Student Wellness Center",
    attendees: 45,
    maxAttendees: 60,
    image: "https://images.unsplash.com/photo-1750425110887-f1e627b35550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwZ3JvdXAlMjBzZXNzaW9ufGVufDF8fHx8MTc1ODEzMzM0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Wellness",
    rating: 4.8,
    organizer: "Dr. Sarah Kumar",
    price: "Free"
  },
  {
    id: 2,
    title: "Mental Health First Aid Training",
    description: "Essential skills to help yourself and others during mental health challenges. Certificate provided upon completion.",
    date: "Feb 28, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Main Auditorium",
    attendees: 78,
    maxAttendees: 100,
    image: "https://images.unsplash.com/photo-1709280859130-a5368e00eca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjB3b3Jrc2hvcCUyMHN0dWRlbnRzfGVufDF8fHx8MTc1ODEzMzM0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Training",
    rating: 4.9,
    organizer: "Mental Health Alliance",
    price: "₹500"
  },
  {
    id: 3,
    title: "Support Circle: Exam Stress",
    description: "A safe space to share experiences and coping strategies for exam-related anxiety with fellow students.",
    date: "Mar 2, 2025",
    time: "6:00 PM - 7:30 PM",
    location: "Room 205, Building A",
    attendees: 23,
    maxAttendees: 25,
    image: "https://images.unsplash.com/photo-1603206004639-22635b71ac08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWxsbmVzcyUyMHN1cHBvcnQlMjBncm91cHxlbnwxfHx8fDE3NTgxMzMzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Support",
    rating: 4.7,
    organizer: "Student Counseling Team",
    price: "Free"
  },
  {
    id: 4,
    title: "Career Anxiety Workshop",
    description: "Navigate career decisions with confidence. Interactive sessions on overcoming career-related stress and uncertainty.",
    date: "Mar 5, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Career Center",
    attendees: 67,
    maxAttendees: 80,
    image: "https://images.unsplash.com/photo-1690192507874-c2aad615b980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY291bnNlbGluZyUyMHNlc3Npb258ZW58MXx8fHwxNzU4MTMzMzUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Career",
    rating: 4.6,
    organizer: "Prof. Ravi Mehta",
    price: "Free"
  }
];

const communityGroups: CommunityGroup[] = [
  {
    id: "wellness-mindfulness",
    name: "Wellness & Mindful Readers",
    description: "Combining wellness practices with love for books. Share book recommendations, meditation practices, and mindful living tips.",
    members: 156,
    interests: ["wellness", "books"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwYm9va3N8ZW58MXx8fHwxNzU4MTMzMzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isJoined: false
  },
  {
    id: "social-music",
    name: "Social Music Lovers",
    description: "Connect through music! Share playlists, discuss artists, and organize listening parties for students who love both socializing and music.",
    members: 234,
    interests: ["social", "music"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZyaWVuZHMlMjBzb2NpYWx8ZW58MXx8fHwxNzU4MTMzMzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isJoined: true
  },
  {
    id: "gaming-tech",
    name: "Gaming & Tech Enthusiasts",
    description: "For students passionate about gaming and technology. Discuss latest games, tech trends, coding projects, and organize gaming sessions.",
    members: 189,
    interests: ["gaming", "academic"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjB0ZWNofGVufDF8fHx8MTc1ODEzMzM0OXww&ixlib=rb-4.1.0&q=80&w=1080",
    isJoined: false
  },
  {
    id: "creative-movies",
    name: "Creative Film Society",
    description: "Unite creativity with cinema! Share creative projects, discuss films, organize movie nights, and explore artistic expression together.",
    members: 167,
    interests: ["creative", "movies"],
    image: "https://images.unsplash.com/photo-1489599573351-e22dc68ad68a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGNyZWF0aXZlfGVufDF8fHx8MTc1ODEzMzM0OXww&ixlib=rb-4.1.0&q=80&w=1080",
    isJoined: false
  }
];

const interests: Interest[] = [
  { id: "books", name: "Reading & Literature", icon: BookOpen, color: "#8B5CF6", description: "Book clubs, reading discussions" },
  { id: "wellness", name: "Wellness & Mindfulness", icon: Sparkles, color: "#10B981", description: "Meditation, yoga, self-care" },
  { id: "social", name: "Social Connections", icon: Coffee, color: "#F59E0B", description: "Making friends, social events" },
  { id: "music", name: "Music & Arts", icon: Music, color: "#EF4444", description: "Music appreciation, creative arts" },
  { id: "gaming", name: "Gaming & Tech", icon: Gamepad2, color: "#3B82F6", description: "Gaming communities, tech talks" },
  { id: "movies", name: "Movies & Entertainment", icon: Film, color: "#8B5CF6", description: "Film discussions, movie nights" },
  { id: "creative", name: "Creative Expression", icon: Palette, color: "#EC4899", description: "Art, writing, creative projects" },
  { id: "academic", name: "Academic Support", icon: Users, color: "#6366F1", description: "Study groups, academic help" }
];

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'events' | 'explore' | 'social'>('events');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showInterestSelection, setShowInterestSelection] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [socialPosts, setSocialPosts] = useState([
    {
      id: 1,
      user: { name: "Anonymous Student", avatar: "AS" },
      content: "Feeling overwhelmed with exams coming up. Anyone else struggling with anxiety right now? 💙",
      timestamp: "2h ago",
      likes: 12,
      comments: 3,
      mood: "😰",
      hashtags: ["ExamStress", "AnxietySupport"]
    },
    {
      id: 2,
      user: { name: "Hope Seeker", avatar: "HS" },
      content: "Had my first therapy session today! It was scary but I'm proud of myself for taking this step. 🌱",
      timestamp: "4h ago",
      likes: 25,
      comments: 8,
      mood: "😊",
      hashtags: ["TherapyJourney", "SelfCare"]
    },
    {
      id: 3,
      user: { name: "Mindful Maya", avatar: "MM" },
      content: "Small reminder: Progress isn't always linear. Be kind to yourself today. You're doing better than you think. ✨",
      timestamp: "6h ago",
      likes: 48,
      comments: 12,
      mood: "🌟",
      hashtags: ["Mindfulness", "SelfCompassion"]
    }
  ]);

  const handleInterestToggle = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  const handleFindCommunities = () => {
    if (selectedInterests.length === 5) {
      setShowMatches(true);
    }
  };

  const getMatchedGroups = () => {
    return communityGroups.filter(group => {
      const intersection = group.interests.filter(interest => 
        selectedInterests.slice(0, 2).includes(interest)
      );
      return intersection.length >= 1;
    });
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const hashtags = newPost.match(/#\w+/g) || [];
      const post = {
        id: Date.now(),
        user: { name: "You", avatar: "YU" },
        content: newPost,
        timestamp: "now",
        likes: 0,
        comments: 0,
        mood: "😊",
        hashtags: hashtags.map(tag => tag.slice(1))
      };
      setSocialPosts([post, ...socialPosts]);
      setNewPost("");
    }
  };

  const handleLike = (postId: number) => {
    setSocialPosts(socialPosts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--primary-blue)" }}>
            Student Community Hub
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Connect with fellow students, join supportive events, and share your journey in a safe space.
          </p>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-2xl mx-auto">
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger value="explore" className="flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Groups</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Social Feed</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-text-dark">Upcoming Events</h2>
              <Button variant="outline" className="border-[var(--primary-blue)] text-[var(--primary-blue)]">
                <Filter className="w-4 h-4 mr-2" />
                Filter Events
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {communityEvents.map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-text-dark border-0 shadow-sm">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 px-2 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">{event.rating}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Badge 
                        className={`${event.price === 'Free' ? 'bg-green-500' : 'bg-[var(--primary-blue)]'} text-white border-0`}
                      >
                        {event.price}
                      </Badge>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-5">
                    <h3 className="font-semibold text-text-dark mb-2 line-clamp-2 text-lg">
                      {event.title}
                    </h3>
                    <p className="text-text-light text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-text-light">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-text-light">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-text-light">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-text-light">
                        <Users className="w-4 h-4 mr-2" />
                        {event.attendees}/{event.maxAttendees} attending
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-text-light">
                        by {event.organizer}
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white rounded-full px-4"
                      >
                        Join Event
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="explore">
            {!showInterestSelection && !showMatches ? (
              <div className="text-center">
                <Card className="max-w-2xl mx-auto p-8 glass-morphism">
                  <div className="mb-6">
                    <UserPlus className="w-16 h-16 text-[var(--primary-blue)] mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-text-dark mb-2">
                      Join Our Community
                    </h2>
                    <p className="text-text-light">
                      Connect with like-minded students based on your interests. We'll match you with supportive groups.
                    </p>
                  </div>
                  <Button 
                    onClick={() => setShowInterestSelection(true)}
                    className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white px-8 py-3"
                  >
                    Get Started
                  </Button>
                </Card>
              </div>
            ) : showMatches ? (
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-text-dark mb-2">
                    Your Perfect Community Matches
                  </h2>
                  <p className="text-text-light">
                    Based on your top interests: <span className="font-medium text-[var(--primary-blue)]">
                      {interests.find(i => i.id === selectedInterests[0])?.name} & {interests.find(i => i.id === selectedInterests[1])?.name}
                    </span>
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {getMatchedGroups().map(group => (
                    <Card key={group.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={group.image}
                          alt={group.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className={`${group.isJoined ? 'bg-green-500' : 'bg-[var(--primary-blue)]'} text-white border-0`}>
                            {group.isJoined ? 'Joined' : 'New Match'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-semibold text-text-dark mb-2 text-lg">{group.name}</h3>
                        <p className="text-text-light text-sm mb-4">{group.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-sm text-text-light">
                            <Users className="w-4 h-4 mr-2" />
                            {group.members} members
                          </div>
                          <div className="flex space-x-1">
                            {group.interests.map(interestId => {
                              const interest = interests.find(i => i.id === interestId);
                              return interest ? (
                                <Badge key={interestId} variant="outline" className="text-xs">
                                  {interest.name.split(' ')[0]}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                        
                        <Button 
                          className={`w-full ${group.isJoined ? 'bg-green-500 hover:bg-green-600' : 'bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)]'} text-white`}
                        >
                          {group.isJoined ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              View Group
                            </>
                          ) : (
                            'Join Group'
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowMatches(false);
                      setShowInterestSelection(false);
                      setSelectedInterests([]);
                    }}
                  >
                    Find Different Communities
                  </Button>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <Card className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-text-dark mb-2">
                      Select Your Interests
                    </h2>
                    <p className="text-text-light">
                      Choose 5 interests to help us find your perfect community matches. 
                      <br />Your top 2 choices will be used for matching with similar students.
                    </p>
                    <div className="mt-4">
                      <Badge variant="outline" className="text-[var(--primary-blue)]">
                        {selectedInterests.length}/5 selected
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {interests.map((interest, index) => {
                      const IconComponent = interest.icon;
                      const isSelected = selectedInterests.includes(interest.id);
                      const selectionOrder = selectedInterests.indexOf(interest.id) + 1;
                      const isTopTwo = selectionOrder <= 2 && selectionOrder > 0;
                      
                      return (
                        <Card
                          key={interest.id}
                          className={`p-4 cursor-pointer transition-all hover:shadow-lg relative ${
                            isSelected 
                              ? `ring-2 ring-[var(--primary-blue)] ${isTopTwo ? 'bg-blue-100' : 'bg-blue-50'}` 
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => handleInterestToggle(interest.id)}
                        >
                          {isSelected && (
                            <div className={`absolute -top-2 -right-2 w-6 h-6 ${isTopTwo ? 'bg-green-500' : 'bg-[var(--primary-blue)]'} text-white rounded-full flex items-center justify-center text-sm font-semibold`}>
                              {selectionOrder}
                            </div>
                          )}
                          {isTopTwo && (
                            <div className="absolute -top-1 -left-1">
                              <Badge className="bg-green-500 text-white border-0 text-xs">
                                Match
                              </Badge>
                            </div>
                          )}
                          <div className="text-center">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                              style={{ backgroundColor: `${interest.color}20`, color: interest.color }}
                            >
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <h3 className="font-medium text-text-dark mb-1">{interest.name}</h3>
                            <p className="text-xs text-text-light">{interest.description}</p>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                    <p className="text-sm text-blue-800 text-center">
                      <strong>How matching works:</strong> We'll match you with groups based on your top 2 interests (marked with green badges). 
                      Other interests help us understand your full profile.
                    </p>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowInterestSelection(false);
                        setSelectedInterests([]);
                      }}
                    >
                      Back
                    </Button>
                    <Button 
                      disabled={selectedInterests.length !== 5}
                      onClick={handleFindCommunities}
                      className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white"
                    >
                      Find My Communities
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="social">
            {/* Social Feed Post Composer */}
            <div className="max-w-2xl mx-auto mb-8">
              <Card className="p-6">
                <div className="flex space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback style={{ backgroundColor: "var(--primary-blue)", color: "white" }}>
                      You
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="How are you feeling today? Share your thoughts with the community... Use #hashtags to connect with others!"
                      className="border-none resize-none p-0 focus:ring-0 placeholder:text-gray-500"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span>💙 Safe space</span>
                        <span>🔒 Anonymous</span>
                        <span># Use hashtags</span>
                      </div>
                      <Button
                        onClick={handlePost}
                        disabled={!newPost.trim()}
                        className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white rounded-full px-6"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Feed Posts */}
            <div className="max-w-2xl mx-auto space-y-6">
              {socialPosts.map((post) => (
                <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback style={{ backgroundColor: "var(--primary-blue)", color: "white" }}>
                        {post.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500 text-sm">{post.timestamp}</span>
                        {post.mood && (
                          <>
                            <span className="text-gray-500">•</span>
                            <span className="text-sm">{post.mood}</span>
                          </>
                        )}
                      </div>
                      
                      <p className="text-gray-900 mb-3 leading-relaxed">{post.content}</p>
                      
                      {post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.hashtags.map((tag, index) => (
                            <Badge 
                              key={index}
                              variant="outline"
                              className="text-[var(--primary-blue)] border-[var(--primary-blue)] cursor-pointer hover:bg-blue-50"
                            >
                              <Hash className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full flex items-center space-x-1"
                        >
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full flex items-center space-x-1"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full flex items-center space-x-1"
                        >
                          <Share className="w-4 h-4" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Community Guidelines */}
            <div className="max-w-2xl mx-auto mt-8">
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Community Guidelines</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Be kind and supportive to fellow community members</li>
                  <li>• Share your experiences to help others feel less alone</li>
                  <li>• Use content warnings for sensitive topics</li>
                  <li>• Respect privacy - avoid sharing personal information</li>
                  <li>• If you're in crisis, please reach out for professional help</li>
                </ul>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}