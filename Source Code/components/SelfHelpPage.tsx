import { Brain, Heart, Lightbulb, BookOpen, Target, Zap, Moon, Users } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface SelfHelpPageProps {
  onNavigate?: (page: string) => void;
}

export function SelfHelpPage({ onNavigate }: SelfHelpPageProps = {}) {
  const selfHelpTools = [
    {
      icon: Target,
      title: "Daily Challenges",
      description: "Build positive habits with structured challenges designed to improve your mental well-being.",
      activities: ["21-day mindfulness", "Gratitude practice", "Sleep hygiene", "Reading habits"],
      action: "Create Challenge",
      page: "Challenge-Selection"
    },
    {
      icon: Zap,
      title: "Specialized Support",
      description: "Evidence-based tools for ADHD, insomnia, autism, anxiety and other specific conditions.",
      activities: ["ADHD focus tools", "Sleep support", "Anxiety management", "Sensory regulation"],
      action: "Explore Tools",
      page: "Specialized-Help"
    },
    {
      icon: Brain,
      title: "Mindfulness Exercises",
      description: "Guided meditation and breathing exercises to help reduce stress and anxiety.",
      activities: ["5-minute breathing", "Body scan meditation", "Mindful walking", "Progressive relaxation"],
      action: "Start Practice"
    },
    {
      icon: Heart,
      title: "Mood Tracking",
      description: "Keep track of your daily emotions and identify patterns in your mental health.",
      activities: ["Daily mood check-in", "Emotion journal", "Trigger identification", "Progress insights"],
      action: "Track Mood"
    },
    {
      icon: Lightbulb,
      title: "Coping Strategies",
      description: "Learn practical techniques to manage stress, anxiety, and difficult emotions.",
      activities: ["Stress management", "Anxiety techniques", "Problem-solving skills", "Crisis coping"],
      action: "Learn Techniques"
    },
    {
      icon: BookOpen,
      title: "Self-Assessment Tools",
      description: "Understand your mental health better with scientifically-backed assessments.",
      activities: ["PHQ-9 Depression", "GAD-7 Anxiety", "Stress assessment", "ADHD screening"],
      action: "Take Assessment",
      page: "Self-Assessment"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--text-dark)" }}>
            Self-Help Resources
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-light)" }}>
            Take charge of your mental wellness with our collection of self-help tools and exercises. 
            These resources are designed to support your journey toward better mental health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {selfHelpTools.map((tool, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--light-blue)" }}
                >
                  <tool.icon 
                    className="w-8 h-8" 
                    style={{ color: "var(--primary-blue)" }} 
                  />
                </div>
                
                <h3 className="font-semibold text-xl mb-3" style={{ color: "var(--text-dark)" }}>
                  {tool.title}
                </h3>
                <p className="mb-6" style={{ color: "var(--text-light)" }}>
                  {tool.description}
                </p>
                
                <div className="space-y-2 mb-6 text-left">
                  {tool.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--green)" }}
                      ></div>
                      <span className="text-sm" style={{ color: "var(--text-light)" }}>
                        {activity}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => tool.page && onNavigate?.(tool.page)}
                  style={{ 
                    backgroundColor: index < 2 ? "var(--primary-blue)" : "var(--green)",
                    color: "white"
                  }}
                >
                  {tool.action || "Explore Tools"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card 
            className="p-8 max-w-2xl mx-auto"
            style={{ 
              backgroundColor: "var(--lavender)",
              boxShadow: "var(--card-shadow)"
            }}
          >
            <h3 className="font-semibold text-xl mb-4" style={{ color: "var(--text-dark)" }}>
              Remember: Self-Help is a Journey
            </h3>
            <p style={{ color: "var(--text-light)" }}>
              These tools are meant to supplement, not replace, professional mental health care. 
              If you're experiencing severe symptoms or crisis situations, please reach out to 
              a counselor or emergency services immediately.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}