import { useState } from "react";
import { 
  Target, Clock, Trophy, Star, ArrowRight, CheckCircle, 
  Brain, Heart, Moon, Book, Dumbbell, Smile, Users, 
  Calendar, Play, ArrowLeft
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Mental Health' | 'Physical' | 'Social' | 'Academic';
  color: string;
  dailyGoal: string;
  benefits: string[];
  estimatedTime: string;
}

interface ChallengeSelectionPageProps {
  onNavigate: (page: string) => void;
  user: any;
}

const challenges: Challenge[] = [
  {
    id: "mindfulness-21",
    title: "21-Day Mindfulness Journey",
    description: "Build a daily mindfulness practice with guided meditations and breathing exercises to reduce stress and improve focus.",
    icon: Brain,
    duration: "21 days",
    difficulty: "Easy",
    category: "Mental Health",
    color: "#8B5CF6",
    dailyGoal: "10 minutes of mindfulness",
    benefits: ["Reduced stress", "Better focus", "Improved sleep", "Emotional balance"],
    estimatedTime: "10-15 min/day"
  },
  {
    id: "gratitude-30",
    title: "30-Day Gratitude Practice",
    description: "Cultivate positivity and improve mental well-being by writing down three things you're grateful for each day.",
    icon: Heart,
    duration: "30 days",
    difficulty: "Easy",
    category: "Mental Health",
    color: "#EF4444",
    dailyGoal: "Write 3 gratitudes",
    benefits: ["Positive mindset", "Better relationships", "Increased happiness", "Stress reduction"],
    estimatedTime: "5-10 min/day"
  },
  {
    id: "sleep-hygiene",
    title: "Better Sleep Challenge",
    description: "Improve your sleep quality with consistent bedtime routines, screen time limits, and sleep hygiene practices.",
    icon: Moon,
    duration: "14 days",
    difficulty: "Medium",
    category: "Physical",
    color: "#4F46E5",
    dailyGoal: "Follow sleep routine",
    benefits: ["Better sleep quality", "More energy", "Improved mood", "Better focus"],
    estimatedTime: "30 min routine"
  },
  {
    id: "reading-habit",
    title: "Daily Reading Habit",
    description: "Develop a consistent reading practice to improve knowledge, reduce screen time, and enhance mental stimulation.",
    icon: Book,
    duration: "28 days",
    difficulty: "Easy",
    category: "Academic",
    color: "#059669",
    dailyGoal: "Read for 20 minutes",
    benefits: ["Improved vocabulary", "Better focus", "Stress relief", "Knowledge growth"],
    estimatedTime: "20-30 min/day"
  },
  {
    id: "daily-movement",
    title: "Daily Movement Challenge",
    description: "Incorporate physical activity into your daily routine with simple exercises, walks, or stretching sessions.",
    icon: Dumbbell,
    duration: "21 days",
    difficulty: "Medium",
    category: "Physical",
    color: "#DC2626",
    dailyGoal: "30 minutes of movement",
    benefits: ["Increased energy", "Better mood", "Improved health", "Stress relief"],
    estimatedTime: "30-45 min/day"
  },
  {
    id: "mood-tracking",
    title: "Mood Awareness Journey",
    description: "Track your daily moods and emotions to identify patterns and develop better emotional awareness and regulation.",
    icon: Smile,
    duration: "30 days",
    difficulty: "Easy",
    category: "Mental Health",
    color: "#F59E0B",
    dailyGoal: "Log mood & emotions",
    benefits: ["Emotional awareness", "Pattern recognition", "Better self-care", "Mood improvement"],
    estimatedTime: "5-10 min/day"
  },
  {
    id: "social-connection",
    title: "Social Connection Challenge",
    description: "Strengthen relationships and combat loneliness by reaching out to friends, family, or making new connections daily.",
    icon: Users,
    duration: "21 days",
    difficulty: "Medium",
    category: "Social",
    color: "#8B5CF6",
    dailyGoal: "Connect with someone",
    benefits: ["Stronger relationships", "Reduced loneliness", "Better support system", "Improved mood"],
    estimatedTime: "15-30 min/day"
  },
  {
    id: "study-routine",
    title: "Consistent Study Routine",
    description: "Build effective study habits with time blocking, active recall techniques, and consistent daily practice.",
    icon: Calendar,
    duration: "28 days",
    difficulty: "Hard",
    category: "Academic",
    color: "#6366F1",
    dailyGoal: "Follow study schedule",
    benefits: ["Better grades", "Reduced procrastination", "Improved learning", "Time management"],
    estimatedTime: "2-3 hours/day"
  }
];

const difficultyColors = {
  Easy: "#10B981",
  Medium: "#F59E0B", 
  Hard: "#EF4444"
};

const categoryColors = {
  "Mental Health": "#8B5CF6",
  "Physical": "#EF4444",
  "Social": "#3B82F6",
  "Academic": "#059669"
};

export function ChallengeSelectionPage({ onNavigate, user }: ChallengeSelectionPageProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowDetails(true);
  };

  const handleStartChallenge = () => {
    if (selectedChallenge) {
      // Save challenge to localStorage
      const challengeData = {
        ...selectedChallenge,
        startDate: new Date().toISOString(),
        userId: user.id,
        currentStreak: 0,
        completedDays: [],
        isActive: true
      };
      
      localStorage.setItem(`mitraa_challenge_${selectedChallenge.id}`, JSON.stringify(challengeData));
      
      // Navigate to streak page
      onNavigate('Challenge-Streak');
    }
  };

  const getDifficultyBadge = (difficulty: Challenge['difficulty']) => (
    <Badge 
      variant="outline" 
      className="border-0 text-white"
      style={{ backgroundColor: difficultyColors[difficulty] }}
    >
      {difficulty}
    </Badge>
  );

  const getCategoryBadge = (category: Challenge['category']) => (
    <Badge 
      variant="outline"
      style={{ 
        backgroundColor: `${categoryColors[category]}20`, 
        color: categoryColors[category],
        borderColor: categoryColors[category]
      }}
    >
      {category}
    </Badge>
  );

  if (showDetails && selectedChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-6 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => setShowDetails(false)}
            className="mb-6 text-[var(--primary-blue)] hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Choose Different Challenge
          </Button>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl border-0">
              {/* Header */}
              <div 
                className="p-8 text-white relative overflow-hidden"
                style={{ backgroundColor: selectedChallenge.color }}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                      radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
                    backgroundSize: '100px 100px, 50px 50px'
                  }} />
                </div>
                
                <div className="relative z-10 flex items-start space-x-6">
                  <div className="bg-white/20 p-4 rounded-2xl">
                    <selectedChallenge.icon className="w-12 h-12" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      {getDifficultyBadge(selectedChallenge.difficulty)}
                      {getCategoryBadge(selectedChallenge.category)}
                    </div>
                    <h1 className="text-3xl font-bold mb-3">{selectedChallenge.title}</h1>
                    <p className="text-lg opacity-90">{selectedChallenge.description}</p>
                  </div>
                </div>
              </div>

              {/* Challenge Details */}
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Duration</p>
                        <p className="text-sm text-gray-600">{selectedChallenge.duration}</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-center space-x-3">
                      <Target className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Daily Goal</p>
                        <p className="text-sm text-gray-600">{selectedChallenge.dailyGoal}</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-purple-50 border-purple-200">
                    <div className="flex items-center space-x-3">
                      <Star className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">Time Needed</p>
                        <p className="text-sm text-gray-600">{selectedChallenge.estimatedTime}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    What You'll Gain
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedChallenge.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Start Challenge */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Ready to Begin Your Journey?</h3>
                      <p className="text-gray-600">
                        Start today and build a streak that transforms your daily routine into lasting positive habits.
                      </p>
                    </div>
                    <Button 
                      onClick={handleStartChallenge}
                      className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white px-8 py-3 rounded-xl"
                      size="lg"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Challenge
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--primary-blue)" }}>
            Choose Your Challenge
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Select a challenge that resonates with your goals. Build positive habits, 
            track your progress, and celebrate your achievements along the way.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {challenges.map(challenge => {
            const IconComponent = challenge.icon;
            return (
              <Card 
                key={challenge.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white group hover:-translate-y-1"
                onClick={() => handleChallengeSelect(challenge)}
              >
                {/* Challenge Header */}
                <div 
                  className="p-6 text-white relative overflow-hidden"
                  style={{ backgroundColor: challenge.color }}
                >
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                        radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
                      backgroundSize: '50px 50px, 25px 25px'
                    }} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="w-8 h-8" />
                      {getDifficultyBadge(challenge.difficulty)}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                    <p className="text-sm opacity-90">{challenge.duration}</p>
                  </div>
                </div>

                {/* Challenge Content */}
                <div className="p-6">
                  <div className="mb-4">
                    {getCategoryBadge(challenge.category)}
                  </div>
                  
                  <p className="text-text-light text-sm mb-4 line-clamp-3">
                    {challenge.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-text-light">
                      <Target className="w-4 h-4 mr-2" />
                      {challenge.dailyGoal}
                    </div>
                    <div className="flex items-center text-sm text-text-light">
                      <Clock className="w-4 h-4 mr-2" />
                      {challenge.estimatedTime}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full group-hover:bg-[var(--primary-blue)] group-hover:text-white transition-all"
                    variant="outline"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Ready to Transform Your Life?</h3>
            <p className="text-gray-600 mb-6">
              Choose a challenge that excites you and start building habits that will last a lifetime. 
              Every journey begins with a single step.
            </p>
            <Button 
              variant="outline"
              onClick={() => onNavigate('Self-Help')}
              className="border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white"
            >
              Explore More Wellness Tools
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}