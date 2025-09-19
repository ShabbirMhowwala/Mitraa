import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, MessageCircle, Users, BookOpen, Calendar, Brain, Shield, ArrowRight, Target, TrendingUp, Zap } from 'lucide-react';
import { ProminentBackground } from './ProminentBackground';
import mitraaLogo from "figma:asset/86c32a97fc21f48bd0dea3175dadadd59af70f52.png";

interface LandingPageProps {
  onNavigate: (page: string) => void;
  user: any;
}

export function LandingPage({ onNavigate, user }: LandingPageProps) {
  const features = [
    {
      icon: Target,
      title: "Progress Tracking",
      description: "Set personal challenges, track daily progress with photos, and celebrate achievements",
      action: "Start Journey",
      page: "Progress",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Brain,
      title: "Self-Assessment",
      description: "Take confidential mental health screening with PHQ-9, GAD-7 tools",
      action: "Start Assessment",
      page: "Self-Assessment",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: MessageCircle,
      title: "AI First-Aid Support",
      description: "24/7 AI chat companion for immediate coping strategies and guidance",
      action: "Chat Now",
      page: "AI-Chat",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: Users,
      title: "Talk to Volunteers",
      description: "Connect with trained student peer supporters in a safe space",
      action: "Find Volunteer",
      page: "Volunteers",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Users,
      title: "Community & Social Support",
      description: "Join events, groups, and share your feelings in a supportive community space",
      action: "Join Community",
      page: "Community",
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: Zap,
      title: "Specialized Help",
      description: "Targeted tools for ADHD, anxiety, depression, autism, insomnia, and more",
      action: "Find Your Tools",
      page: "Specialized-Help",
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: BookOpen,
      title: "Resources & Counseling",
      description: "Access wellness resources, book counselor appointments, and get professional support",
      action: "Explore Resources",
      page: "Resources",
      color: "bg-teal-50 text-teal-600"
    }
  ];

  return (
    <ProminentBackground variant="hero" className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-12 pb-12">
        <div className="text-center mb-16">
          {/* Personalized Welcome */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                {user?.isAnonymous ? 'Anonymous session active' : `Welcome back, ${user?.name?.split(' ')[0] || 'Friend'}`}
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
            Your Safe Space at <span style={{ color: 'var(--primary-blue)' }}>Mitraa</span>
          </h1>
          <p className="text-2xl mb-6" style={{ color: 'var(--primary-blue)' }}>
            A Friend Who Cares • A Community That Understands
          </p>
          <p className="text-lg max-w-3xl mx-auto mb-8" style={{ color: 'var(--text-light)' }}>
            Take a breath. You're not alone. Whether you're feeling overwhelmed, anxious, or just need someone to talk to, 
            we're here to support you with compassionate, confidential care designed specifically for students like you.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-md">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--light-blue)' }}>
                <Shield className="w-4 h-4" style={{ color: 'var(--primary-blue)' }} />
              </div>
              <span className="font-medium" style={{ color: 'var(--text-dark)' }}>100% Confidential</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-md">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--lavender)' }}>
                <Heart className="w-4 h-4 fill-current" style={{ color: 'var(--amber)' }} />
              </div>
              <span className="font-medium" style={{ color: 'var(--text-dark)' }}>Stigma-Free Zone</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-md">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(109, 213, 161, 0.1)' }}>
                <Users className="w-4 h-4" style={{ color: 'var(--green)' }} />
              </div>
              <span className="font-medium" style={{ color: 'var(--text-dark)' }}>Peer Community</span>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--text-dark)' }}>
            How are you feeling today?
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            
            {/* New Specialized Help Quick Access Card */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-0 h-full" 
                  style={{ boxShadow: 'var(--card-shadow)' }}
                  onClick={() => onNavigate("Specialized-Help")}>
              <div className="text-center h-full flex flex-col">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
                     style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <Zap className="w-8 h-8" style={{ color: '#f97316' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>
                  "I have specific challenges (ADHD, anxiety, etc.)"
                </h3>
                <p style={{ color: 'var(--text-light)' }} className="mb-4 flex-grow">
                  Access specialized tools designed for ADHD, depression, autism, OCD, and more
                </p>
                <Button 
                  className="w-full rounded-xl h-12 font-semibold transition-all duration-300 mt-auto"
                  style={{ backgroundColor: '#f97316', color: 'white' }}
                >
                  Find My Tools <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-0 h-full" 
                  style={{ boxShadow: 'var(--card-shadow)' }}
                  onClick={() => onNavigate("Self-Assessment")}>
              <div className="text-center h-full flex flex-col">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
                     style={{ backgroundColor: 'var(--light-blue)' }}>
                  <Brain className="w-8 h-8" style={{ color: 'var(--primary-blue)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>
                  "I want to understand how I'm doing"
                </h3>
                <p style={{ color: 'var(--text-light)' }} className="mb-4 flex-grow">
                  Take a gentle, confidential check-in to understand your mental wellness
                </p>
                <Button 
                  className="w-full rounded-xl h-12 font-semibold transition-all duration-300 mt-auto"
                  style={{ backgroundColor: 'var(--primary-blue)', color: 'white' }}
                >
                  Start Self-Check <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-0 h-full" 
                  style={{ boxShadow: 'var(--card-shadow)' }}
                  onClick={() => onNavigate("AI-Chat")}>
              <div className="text-center h-full flex flex-col">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
                     style={{ backgroundColor: 'rgba(109, 213, 161, 0.1)' }}>
                  <MessageCircle className="w-8 h-8" style={{ color: 'var(--green)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>
                  "I need someone to talk to right now"
                </h3>
                <p style={{ color: 'var(--text-light)' }} className="mb-4 flex-grow">
                  Chat with our AI companion for immediate support and coping strategies
                </p>
                <Button 
                  className="w-full rounded-xl h-12 font-semibold transition-all duration-300 mt-auto"
                  style={{ backgroundColor: 'var(--green)', color: 'white' }}
                >
                  Start Chatting <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-0 h-full" 
                  style={{ boxShadow: 'var(--card-shadow)' }}
                  onClick={() => onNavigate("Volunteers")}>
              <div className="text-center h-full flex flex-col">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
                     style={{ backgroundColor: 'var(--lavender)' }}>
                  <Users className="w-8 h-8" style={{ color: 'var(--amber)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>
                  "I want to connect with peers"
                </h3>
                <p style={{ color: 'var(--text-light)' }} className="mb-4 flex-grow">
                  Talk to trained student volunteers who truly understand your experience
                </p>
                <Button 
                  className="w-full rounded-xl h-12 font-semibold transition-all duration-300 mt-auto"
                  style={{ backgroundColor: 'var(--amber)', color: 'white' }}
                >
                  Find Support <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-0 h-full" 
                  style={{ boxShadow: 'var(--card-shadow)' }}
                  onClick={() => onNavigate("Progress")}>
              <div className="text-center h-full flex flex-col">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" 
                     style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                  <Target className="w-8 h-8" style={{ color: '#8b5cf6' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>
                  "I want to track my progress"
                </h3>
                <p style={{ color: 'var(--text-light)' }} className="mb-4 flex-grow">
                  Set personal challenges, build healthy habits, and celebrate your achievements
                </p>
                <Button 
                  className="w-full rounded-xl h-12 font-semibold transition-all duration-300 mt-auto"
                  style={{ backgroundColor: '#8b5cf6', color: 'white' }}
                >
                  Start Journey <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Feature Grid */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Comprehensive Mental Health Support
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our complete range of evidence-based mental health tools and resources 
            designed specifically for students
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => onNavigate(feature.page)}
                >
                  <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                  >
                    {feature.action}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Emergency Section */}
        <div className="mt-16 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            In Crisis? Need Immediate Help?
          </h3>
          <p className="text-red-700 mb-4">
            If you're having thoughts of self-harm or suicide, please reach out immediately
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => window.open('tel:9152987821', '_self')}
            >
              Call Crisis Helpline: 9152987821
            </Button>
            <Button 
              variant="outline" 
              className="border-red-300 text-red-700 hover:bg-red-100"
              onClick={() => onNavigate("AI-Chat")}
            >
              Emergency Chat Support
            </Button>
          </div>
        </div>
      </div>
    </ProminentBackground>
  );
}