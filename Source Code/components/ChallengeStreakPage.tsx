import { useState, useEffect } from "react";
import { 
  Calendar, CheckCircle, Flame, Trophy, Target, ArrowLeft,
  Star, Clock, TrendingUp, Award, Gift, Zap, Heart,
  RefreshCw, Plus, BookOpen, Share2
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface ChallengeStreakPageProps {
  onNavigate: (page: string) => void;
  user: any;
}

interface ChallengeData {
  id: string;
  title: string;
  description: string;
  duration: string;
  startDate: string;
  currentStreak: number;
  completedDays: string[];
  isActive: boolean;
  dailyGoal: string;
  color: string;
}

interface DailyEntry {
  date: string;
  completed: boolean;
  notes?: string;
  mood?: number;
}

export function ChallengeStreakPage({ onNavigate, user }: ChallengeStreakPageProps) {
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Load active challenge from localStorage
    const challenges = Object.keys(localStorage)
      .filter(key => key.startsWith('mitraa_challenge_'))
      .map(key => JSON.parse(localStorage.getItem(key) || '{}'))
      .find(challenge => challenge.isActive);

    if (challenges) {
      setChallengeData(challenges);
      loadDailyEntries(challenges.id);
    }
  }, []);

  const loadDailyEntries = (challengeId: string) => {
    const entries = localStorage.getItem(`mitraa_entries_${challengeId}`);
    if (entries) {
      setDailyEntries(JSON.parse(entries));
    }
  };

  const saveDailyEntries = (entries: DailyEntry[]) => {
    if (challengeData) {
      localStorage.setItem(`mitraa_entries_${challengeData.id}`, JSON.stringify(entries));
      setDailyEntries(entries);
    }
  };

  const markDayComplete = () => {
    if (!challengeData) return;

    const today = new Date().toISOString().split('T')[0];
    const existingEntry = dailyEntries.find(entry => entry.date === today);

    if (!existingEntry) {
      const newEntry: DailyEntry = {
        date: today,
        completed: true,
        mood: 5
      };

      const updatedEntries = [...dailyEntries, newEntry];
      saveDailyEntries(updatedEntries);

      // Update challenge data
      const updatedChallenge = {
        ...challengeData,
        currentStreak: challengeData.currentStreak + 1,
        completedDays: [...challengeData.completedDays, today]
      };

      localStorage.setItem(`mitraa_challenge_${challengeData.id}`, JSON.stringify(updatedChallenge));
      setChallengeData(updatedChallenge);

      // Show celebration for milestones
      if ((updatedChallenge.currentStreak % 7 === 0) || updatedChallenge.currentStreak === 1) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  };

  const getDaysInChallenge = () => {
    if (!challengeData) return 0;
    const duration = parseInt(challengeData.duration.split(' ')[0]);
    return duration;
  };

  const getDaysCompleted = () => {
    return dailyEntries.filter(entry => entry.completed).length;
  };

  const getProgressPercentage = () => {
    const totalDays = getDaysInChallenge();
    const completedDays = getDaysCompleted();
    return Math.round((completedDays / totalDays) * 100);
  };

  const getDaysLeft = () => {
    return getDaysInChallenge() - getDaysCompleted();
  };

  const getTodayEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    return dailyEntries.find(entry => entry.date === today);
  };

  const getStreakMilestone = (streak: number) => {
    if (streak >= 21) return { title: "Habit Master", icon: Trophy, color: "#F59E0B" };
    if (streak >= 14) return { title: "Consistency Champion", icon: Award, color: "#8B5CF6" };
    if (streak >= 7) return { title: "Week Warrior", icon: Star, color: "#3B82F6" };
    if (streak >= 3) return { title: "Momentum Builder", icon: Zap, color: "#10B981" };
    return { title: "Getting Started", icon: Target, color: "#6B7280" };
  };

  const getCalendarDays = () => {
    const days = [];
    const startDate = new Date(challengeData?.startDate || new Date());
    
    for (let i = 0; i < getDaysInChallenge(); i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const entry = dailyEntries.find(e => e.date === dateString);
      const isToday = dateString === new Date().toISOString().split('T')[0];
      const isPast = date < new Date() && !isToday;
      
      days.push({
        date: dateString,
        dayNumber: i + 1,
        completed: entry?.completed || false,
        isToday,
        isPast,
        isFuture: date > new Date()
      });
    }
    
    return days;
  };

  if (!challengeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">No Active Challenge</h2>
          <p className="text-gray-600 mb-6">Start a challenge to track your progress and build lasting habits.</p>
          <Button 
            onClick={() => onNavigate('Challenge-Selection')}
            className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white"
          >
            Choose a Challenge
          </Button>
        </Card>
      </div>
    );
  }

  const todayEntry = getTodayEntry();
  const milestone = getStreakMilestone(challengeData.currentStreak);
  const MilestoneIcon = milestone.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-8 text-center max-w-md mx-4 animate-pulse">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Congratulations! 🎉</h3>
            <p className="text-gray-600 mb-4">
              {challengeData.currentStreak === 1 
                ? "You've started your journey!" 
                : `${challengeData.currentStreak} days streak achieved!`}
            </p>
            <Badge 
              className="text-white border-0"
              style={{ backgroundColor: milestone.color }}
            >
              {milestone.title}
            </Badge>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('Self-Help')}
            className="text-[var(--primary-blue)] hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Challenges
          </Button>
          
          <Button 
            variant="outline"
            className="border-[var(--primary-blue)] text-[var(--primary-blue)]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Progress
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Challenge Header */}
          <Card className="p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2" style={{ color: challengeData.color }}>
                  {challengeData.title}
                </h1>
                <p className="text-gray-600 mb-4">{challengeData.description}</p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-100 text-blue-800">
                    Day {getDaysCompleted() + 1} of {getDaysInChallenge()}
                  </Badge>
                  <Badge 
                    className="text-white border-0"
                    style={{ backgroundColor: milestone.color }}
                  >
                    <MilestoneIcon className="w-4 h-4 mr-1" />
                    {milestone.title}
                  </Badge>
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 mb-2">
                  <Flame className="w-10 h-10 text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-orange-500">{challengeData.currentStreak}</div>
                <div className="text-sm text-gray-600">day streak</div>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Progress Overview */}
            <div className="lg:col-span-2">
              {/* Today's Task */}
              <Card className="p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Today's Goal</h3>
                  <div className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <Target className="w-8 h-8" style={{ color: challengeData.color }} />
                  <div className="flex-1">
                    <p className="font-medium">{challengeData.dailyGoal}</p>
                    <p className="text-sm text-gray-600">Complete this to maintain your streak</p>
                  </div>
                  <Button
                    onClick={markDayComplete}
                    disabled={todayEntry?.completed}
                    className={`${
                      todayEntry?.completed 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)]'
                    } text-white`}
                  >
                    {todayEntry?.completed ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </div>

                {todayEntry?.completed && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Great job! You've completed today's goal.</span>
                    </div>
                  </div>
                )}
              </Card>

              {/* Progress Chart */}
              <Card className="p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Progress Overview</h3>
                  <div className="text-sm text-gray-500">
                    {getDaysCompleted()} of {getDaysInChallenge()} days
                  </div>
                </div>
                
                <Progress value={getProgressPercentage()} className="mb-4" />
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-500">{getDaysCompleted()}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">{challengeData.currentStreak}</div>
                    <div className="text-sm text-gray-600">Current Streak</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-500">{getDaysLeft()}</div>
                    <div className="text-sm text-gray-600">Days Left</div>
                  </div>
                </div>
              </Card>

              {/* Calendar View */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Challenge Calendar</h3>
                <div className="grid grid-cols-7 gap-2">
                  {getCalendarDays().map((day, index) => (
                    <div
                      key={index}
                      className={`
                        w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium
                        ${day.completed 
                          ? 'bg-green-500 text-white' 
                          : day.isToday 
                            ? 'bg-blue-500 text-white' 
                            : day.isPast 
                              ? 'bg-gray-200 text-gray-500' 
                              : 'bg-gray-100 text-gray-400'
                        }
                      `}
                    >
                      {day.dayNumber}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Today</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-200 rounded"></div>
                    <span>Missed</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Success Rate</span>
                    </div>
                    <span className="font-medium">{getProgressPercentage()}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Best Streak</span>
                    </div>
                    <span className="font-medium">{challengeData.currentStreak}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Days Active</span>
                    </div>
                    <span className="font-medium">{getDaysCompleted()}</span>
                  </div>
                </div>
              </Card>

              {/* Achievements */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Achievements</h3>
                <div className="space-y-3">
                  {[
                    { name: "First Step", condition: challengeData.currentStreak >= 1, icon: Target },
                    { name: "3-Day Starter", condition: challengeData.currentStreak >= 3, icon: Zap },
                    { name: "Week Warrior", condition: challengeData.currentStreak >= 7, icon: Star },
                    { name: "Two Week Champion", condition: challengeData.currentStreak >= 14, icon: Award },
                    { name: "Habit Master", condition: challengeData.currentStreak >= 21, icon: Trophy }
                  ].map((achievement, index) => {
                    const AchievementIcon = achievement.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          achievement.condition ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                        }`}
                      >
                        <AchievementIcon 
                          className={`w-5 h-5 ${
                            achievement.condition ? 'text-yellow-500' : 'text-gray-400'
                          }`} 
                        />
                        <span 
                          className={`text-sm ${
                            achievement.condition ? 'text-yellow-800 font-medium' : 'text-gray-500'
                          }`}
                        >
                          {achievement.name}
                        </span>
                        {achievement.condition && (
                          <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => onNavigate('Challenge-Selection')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start New Challenge
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => onNavigate('Resources')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learning Resources
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => onNavigate('Community')}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Join Community
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}