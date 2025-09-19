import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CreateChallengeModal } from './CreateChallengeModal';
import { DailyCheckIn } from './DailyCheckIn';
import { CertificateModal } from './CertificateModal';
import { ProminentBackground } from './ProminentBackground';
import { 
  Trophy, 
  Target, 
  Calendar, 
  Camera, 
  Flame, 
  Star, 
  Plus, 
  CheckCircle,
  BarChart3,
  Gift,
  Heart,
  Sparkles
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDays: number;
  currentStreak: number;
  totalDays: number;
  isActive: boolean;
  isCompleted: boolean;
  startDate: string;
  endDate?: string;
  color: string;
  icon: string;
  dailyEntries: Array<{
    date: string;
    completed: boolean;
    note?: string;
    photo?: string;
    mood?: number;
  }>;
  futureMessage?: string;
  completedAt?: string;
}

interface ProgressTrackingPageProps {
  user: any;
  onNavigate: (page: string) => void;
}

export function ProgressTrackingPage({ user, onNavigate }: ProgressTrackingPageProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState<Challenge | null>(null);
  const [showCertificate, setShowCertificate] = useState<Challenge | null>(null);
  const [activeTab, setActiveTab] = useState('active');

  // Load challenges from localStorage
  useEffect(() => {
    const savedChallenges = localStorage.getItem(`mitraa_challenges_${user?.id || 'anonymous'}`);
    if (savedChallenges) {
      try {
        setChallenges(JSON.parse(savedChallenges));
      } catch (error) {
        console.error('Error loading challenges:', error);
      }
    }
  }, [user]);

  // Save challenges to localStorage
  const saveChallenges = (updatedChallenges: Challenge[]) => {
    setChallenges(updatedChallenges);
    localStorage.setItem(`mitraa_challenges_${user?.id || 'anonymous'}`, JSON.stringify(updatedChallenges));
  };

  const activeChallenges = challenges.filter(c => c.isActive && !c.isCompleted);
  const completedChallenges = challenges.filter(c => c.isCompleted);
  const totalStreaks = challenges.reduce((sum, c) => sum + c.currentStreak, 0);
  const totalCompletedChallenges = completedChallenges.length;

  const handleCreateChallenge = (newChallenge: Omit<Challenge, 'id' | 'currentStreak' | 'totalDays' | 'isCompleted' | 'dailyEntries' | 'completedAt'>) => {
    const challenge: Challenge = {
      ...newChallenge,
      id: Date.now().toString(),
      currentStreak: 0,
      totalDays: 0,
      isCompleted: false,
      dailyEntries: [],
    };
    saveChallenges([...challenges, challenge]);
    setShowCreateModal(false);
  };

  const handleDailyCheckIn = (challengeId: string, entry: any) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === challengeId) {
        const today = new Date().toDateString();
        const existingEntryIndex = challenge.dailyEntries.findIndex(e => e.date === today);
        
        let updatedEntries = [...challenge.dailyEntries];
        if (existingEntryIndex >= 0) {
          updatedEntries[existingEntryIndex] = { ...entry, date: today };
        } else {
          updatedEntries.push({ ...entry, date: today });
        }

        // Calculate new streak
        let newStreak = 0;
        const sortedEntries = updatedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        for (const entry of sortedEntries) {
          if (entry.completed) {
            newStreak++;
          } else {
            break;
          }
        }

        const updatedChallenge = {
          ...challenge,
          dailyEntries: updatedEntries,
          currentStreak: newStreak,
          totalDays: updatedEntries.filter(e => e.completed).length
        };

        // Check if challenge is completed
        if (updatedChallenge.totalDays >= challenge.targetDays && !challenge.isCompleted) {
          updatedChallenge.isCompleted = true;
          updatedChallenge.isActive = false;
          updatedChallenge.completedAt = new Date().toISOString();
          
          // Show certificate modal
          setTimeout(() => setShowCertificate(updatedChallenge), 1000);
        }

        return updatedChallenge;
      }
      return challenge;
    });

    saveChallenges(updatedChallenges);
    setShowCheckIn(null);
  };

  const getChallengeIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Target, Calendar, Heart, Flame, Star, Trophy
    };
    const IconComponent = icons[iconName] || Target;
    return <IconComponent className="w-5 h-5" />;
  };

  const getTodayEntry = (challenge: Challenge) => {
    const today = new Date().toDateString();
    return challenge.dailyEntries.find(e => e.date === today);
  };

  return (
    <ProminentBackground variant="mental-health" className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--primary-blue)" }}>
            Your Journey Progress
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Track your daily progress, build positive habits, and celebrate your achievements. 
            Every small step counts towards a healthier, happier you.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center glass-morphism">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold" style={{ color: "var(--primary-blue)" }}>{activeChallenges.length}</div>
            <div className="text-text-light">Active Challenges</div>
          </Card>

          <Card className="p-6 text-center glass-morphism">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold" style={{ color: "var(--amber)" }}>{totalStreaks}</div>
            <div className="text-text-light">Total Streak Days</div>
          </Card>

          <Card className="p-6 text-center glass-morphism">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold" style={{ color: "var(--green)" }}>{totalCompletedChallenges}</div>
            <div className="text-text-light">Completed</div>
          </Card>

          <Card className="p-6 text-center glass-morphism">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {challenges.reduce((sum, c) => sum + (c.totalDays || 0), 0)}
            </div>
            <div className="text-text-light">Total Progress Days</div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="active">Active Challenges</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeChallenges.length === 0 ? (
              <Card className="p-12 text-center glass-morphism">
                <Target className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: "var(--primary-blue)" }} />
                <h3 className="text-xl font-semibold text-text-dark mb-2">
                  Start Your First Challenge
                </h3>
                <p className="text-text-light mb-6">
                  Create a personal challenge to begin tracking your progress and building positive habits.
                </p>
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="text-white px-8 py-3"
                  style={{ backgroundColor: "var(--primary-blue)" }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Challenge
                </Button>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-text-dark">Active Challenges</h2>
                  <Button 
                    onClick={() => setShowCreateModal(true)}
                    className="text-white"
                    style={{ backgroundColor: "var(--primary-blue)" }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Challenge
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {activeChallenges.map(challenge => {
                    const todayEntry = getTodayEntry(challenge);
                    const progressPercentage = (challenge.totalDays / challenge.targetDays) * 100;

                    return (
                      <Card key={challenge.id} className="p-6 glass-morphism hover:shadow-xl transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${challenge.color}20`, color: challenge.color }}
                            >
                              {getChallengeIcon(challenge.icon)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-text-dark">{challenge.title}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {challenge.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1" style={{ color: "var(--amber)" }}>
                              <Flame className="w-4 h-4" />
                              <span className="font-bold">{challenge.currentStreak}</span>
                            </div>
                            <div className="text-xs text-text-light">day streak</div>
                          </div>
                        </div>

                        <p className="text-text-light text-sm mb-4">{challenge.description}</p>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-text-light">Progress</span>
                            <span className="font-medium text-text-dark">
                              {challenge.totalDays}/{challenge.targetDays} days
                            </span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {todayEntry?.completed ? (
                              <div className="flex items-center space-x-2" style={{ color: "var(--green)" }}>
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">Completed today!</span>
                              </div>
                            ) : (
                              <span className="text-sm text-text-light">Ready for today's check-in</span>
                            )}
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={() => setShowCheckIn(challenge)}
                            variant={todayEntry?.completed ? "secondary" : "default"}
                            style={!todayEntry?.completed ? { backgroundColor: "var(--primary-blue)", color: "white" } : {}}
                          >
                            {todayEntry?.completed ? "View Entry" : "Check In"}
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedChallenges.length === 0 ? (
              <Card className="p-12 text-center glass-morphism">
                <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: "var(--amber)" }} />
                <h3 className="text-xl font-semibold text-text-dark mb-2">
                  No Completed Challenges Yet
                </h3>
                <p className="text-text-light">
                  Complete your first challenge to see your achievements here!
                </p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {completedChallenges.map(challenge => (
                  <Card key={challenge.id} className="p-6 glass-morphism border-2 border-green/20">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-dark">{challenge.title}</h3>
                          <Badge className="text-xs bg-green text-white">
                            COMPLETED
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: "var(--green)" }}>{challenge.targetDays}</div>
                        <div className="text-xs text-text-light">days achieved</div>
                      </div>
                    </div>

                    <p className="text-text-light text-sm mb-4">{challenge.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-text-light">
                        Completed on {new Date(challenge.completedAt!).toLocaleDateString()}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowCertificate(challenge)}
                        style={{ borderColor: "var(--green)", color: "var(--green)" }}
                        className="hover:text-white"
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--green)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        <Gift className="w-4 h-4 mr-1" />
                        View Certificate
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <Card className="p-6 glass-morphism">
              <h3 className="text-lg font-semibold text-text-dark mb-4">Progress Analytics</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: "var(--primary-blue)" }}>
                    {challenges.length}
                  </div>
                  <div className="text-text-light">Total Challenges</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: "var(--amber)" }}>
                    {Math.max(...challenges.map(c => c.currentStreak), 0)}
                  </div>
                  <div className="text-text-light">Longest Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: "var(--green)" }}>
                    {Math.round((completedChallenges.length / Math.max(challenges.length, 1)) * 100)}%
                  </div>
                  <div className="text-text-light">Success Rate</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        {showCreateModal && (
          <CreateChallengeModal
            onClose={() => setShowCreateModal(false)}
            onCreateChallenge={handleCreateChallenge}
          />
        )}

        {showCheckIn && (
          <DailyCheckIn
            challenge={showCheckIn}
            onClose={() => setShowCheckIn(null)}
            onSubmit={handleDailyCheckIn}
            existingEntry={getTodayEntry(showCheckIn)}
          />
        )}

        {showCertificate && (
          <CertificateModal
            challenge={showCertificate}
            user={user}
            onClose={() => setShowCertificate(null)}
          />
        )}
      </div>
    </ProminentBackground>
  );
}