import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { ArrowLeft, ArrowRight, Heart, MessageCircle, Calendar, Users, CheckCircle } from "lucide-react";

interface SelfAssessmentPageProps {
  onNavigate: (page: string) => void;
  user: any;
}

export function SelfAssessmentPage({ onNavigate, user }: SelfAssessmentPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Initial feeling categories
  const feelingCategories = [
    {
      id: 'mood',
      title: 'My mood has been different lately',
      description: 'Feeling sad, down, or not enjoying things like I used to',
      icon: '😔',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'anxiety',
      title: 'I\'ve been feeling worried or anxious',
      description: 'Feeling nervous, restless, or having trouble relaxing',
      icon: '😰',
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
    },
    {
      id: 'stress',
      title: 'I\'m feeling overwhelmed by stress',
      description: 'Academic pressure, relationships, or life changes feel too much',
      icon: '😵‍💫',
      color: 'bg-red-50 border-red-200 hover:bg-red-100'
    },
    {
      id: 'social',
      title: 'I\'m having trouble with relationships',
      description: 'Feeling isolated, having conflicts, or struggling to connect',
      icon: '😞',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'general',
      title: 'I\'m not sure, I just don\'t feel like myself',
      description: 'Something feels off but I can\'t quite put my finger on it',
      icon: '🤔',
      color: 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    }
  ];

  // PHQ-9 Questions (reframed more gently)
  const moodQuestions = [
    "Over the past 2 weeks, how often have you felt down, sad, or hopeless?",
    "How often have you had little interest or pleasure in doing things you usually enjoy?",
    "How often have you had trouble falling asleep, staying asleep, or sleeping too much?",
    "How often have you felt tired or had little energy?",
    "How often have you had a poor appetite or been overeating?",
    "How often have you felt bad about yourself, like you're a failure, or that you've let yourself or your family down?",
    "How often have you had trouble concentrating on things like reading, studying, or watching TV?",
    "How often have you moved or spoken so slowly that others noticed, or been so restless that you were moving around more than usual?",
    "How often have you had thoughts that you would be better off dead or thoughts of hurting yourself?"
  ];

  // GAD-7 Questions for anxiety
  const anxietyQuestions = [
    "Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?",
    "How often have you not been able to stop or control worrying?",
    "How often have you been worrying too much about different things?",
    "How often have you had trouble relaxing?",
    "How often have you been so restless that it's hard to sit still?",
    "How often have you become easily annoyed or irritable?",
    "How often have you felt afraid as if something awful might happen?"
  ];

  // Stress-related questions
  const stressQuestions = [
    "How often have you felt overwhelmed by your responsibilities?",
    "How often have you felt like you can't cope with everything you need to do?",
    "How often have you had trouble making decisions?",
    "How often have you felt physically tense or had headaches?",
    "How often have you avoided situations or tasks because they felt too stressful?"
  ];

  // ADHD-related questions (ADHD Self-Report Scale adapted)
  const adhdQuestions = [
    "How often do you have trouble wrapping up the final details of a project?",
    "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
    "How often do you have problems remembering appointments or obligations?",
    "How often do you avoid or delay getting started on tasks that require a lot of thought?",
    "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    "How often do you feel overly active and compelled to do things, like you were driven by a motor?"
  ];

  // Eating attitudes questions (EAT-26 adapted)
  const eatingQuestions = [
    "How often are you terrified about being overweight?",
    "How often do you avoid eating when you are hungry?",
    "How often do you find yourself preoccupied with food?",
    "How often do you feel uncomfortable after eating sweets?",
    "How often do you engage in dieting behavior?",
    "How often do you feel that food controls your life?"
  ];

  // Sleep-related questions (Insomnia Severity Index adapted)
  const sleepQuestions = [
    "How often do you have difficulty falling asleep?",
    "How often do you have difficulty staying asleep?", 
    "How often do you wake up too early?",
    "How often are you satisfied with your current sleep pattern?",
    "How often does your sleep problem interfere with your daily functioning?"
  ];

  const answerOptions = [
    { value: 0, label: "Not at all", color: "bg-green-100 text-green-800" },
    { value: 1, label: "Several days", color: "bg-yellow-100 text-yellow-800" },
    { value: 2, label: "More than half the days", color: "bg-orange-100 text-orange-800" },
    { value: 3, label: "Nearly every day", color: "bg-red-100 text-red-800" }
  ];

  const getQuestions = () => {
    switch (selectedCategory) {
      case 'mood': return moodQuestions;
      case 'anxiety': return anxietyQuestions;
      case 'stress': return stressQuestions;
      case 'adhd': return adhdQuestions;
      case 'eating': return eatingQuestions;
      case 'sleep': return sleepQuestions;
      case 'social': return anxietyQuestions.slice(0, 5); // Social anxiety subset
      default: return moodQuestions.slice(0, 5); // Shorter version for general
    }
  };

  const questions = getQuestions();
  const progress = currentStep === 0 ? 0 : ((currentStep - 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep - 1] = value;
    setAnswers(newAnswers);
    
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = questions.length * 3;
    const percentage = (total / maxScore) * 100;

    if (percentage <= 25) {
      return {
        level: "You're doing well",
        color: "text-green-600",
        bgColor: "bg-green-50",
        description: "Your responses suggest you're managing well. It's great that you're taking time to check in with yourself.",
        recommendations: [
          "Continue your current self-care practices",
          "Stay connected with friends and family",
          "Keep up healthy routines like exercise and good sleep"
        ]
      };
    } else if (percentage <= 50) {
      return {
        level: "Some areas need attention",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        description: "You're experiencing some challenges that are worth addressing. Many students go through similar experiences.",
        recommendations: [
          "Consider talking to someone you trust",
          "Try stress-reduction techniques like meditation or journaling",
          "Focus on maintaining regular sleep and eating patterns"
        ]
      };
    } else if (percentage <= 75) {
      return {
        level: "You could benefit from support",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        description: "Your responses indicate you're facing significant challenges. Seeking support could be really helpful right now.",
        recommendations: [
          "Consider speaking with a counselor or therapist",
          "Reach out to trusted friends, family, or mentors",
          "Look into campus mental health resources"
        ]
      };
    } else {
      return {
        level: "Please consider getting support soon",
        color: "text-red-600",
        bgColor: "bg-red-50",
        description: "You're dealing with significant challenges that could really benefit from professional support. You don't have to face this alone.",
        recommendations: [
          "Consider speaking with a mental health professional",
          "Reach out to campus counseling services",
          "Talk to someone you trust about how you're feeling"
        ]
      };
    }
  };

  const results = showResults ? calculateResults() : null;

  if (showResults && results) {
    return (
      <div className="min-h-screen p-4" style={{ background: 'var(--gradient-bg)' }}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary-blue)' }}>
              Your Wellness Check-In Results
            </h1>
            <p className="text-gray-600">
              Thank you for taking the time to reflect on your mental health
            </p>
          </div>

          {/* Results Card */}
          <Card className={`p-8 mb-8 border-0 ${results.bgColor}`} style={{ boxShadow: 'var(--card-shadow)' }}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-white shadow-lg">
                <CheckCircle className={`w-8 h-8 ${results.color}`} />
              </div>
              <h2 className={`text-2xl font-bold mb-3 ${results.color}`}>
                {results.level}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {results.description}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">
                Here are some gentle suggestions for you:
              </h3>
              <ul className="space-y-3">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--primary-blue)' }}></div>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Next Steps */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1" 
                  onClick={() => onNavigate("Volunteers")}>
              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--lavender)' }}>
                <Users className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>
                Talk to a Volunteer
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Connect with trained peer supporters who understand
              </p>
              <Button 
                className="w-full rounded-xl"
                style={{ backgroundColor: 'var(--primary-blue)', color: 'white' }}
              >
                Find Support
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1" 
                  onClick={() => onNavigate("AI-Chat")}>
              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" 
                   style={{ backgroundColor: 'rgba(109, 213, 161, 0.1)' }}>
                <MessageCircle className="w-6 h-6" style={{ color: 'var(--green)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>
                Chat with AI Support
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Get immediate coping strategies and emotional support
              </p>
              <Button 
                className="w-full rounded-xl"
                style={{ backgroundColor: 'var(--green)', color: 'white' }}
              >
                Start Chat
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1" 
                  onClick={() => onNavigate("Counsellor")}>
              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" 
                   style={{ backgroundColor: 'rgba(255, 159, 67, 0.1)' }}>
                <Calendar className="w-6 h-6" style={{ color: 'var(--amber)' }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>
                Book Counselor
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Schedule a confidential session with a professional
              </p>
              <Button 
                className="w-full rounded-xl"
                style={{ backgroundColor: 'var(--amber)', color: 'white' }}
              >
                Book Session
              </Button>
            </Card>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Button variant="outline" onClick={() => onNavigate("Home")} className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 0) {
    return (
      <div className="min-h-screen p-4" style={{ background: 'var(--gradient-bg)' }}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate("Home")}
              className="absolute left-4 top-4 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary-blue)' }}>
              Let's Check In With You
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This is a safe space to reflect on how you've been feeling. There are no right or wrong answers - 
              just honest responses that help us understand how to best support you.
            </p>
          </div>

          {/* Feeling Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-center mb-6" style={{ color: 'var(--text-dark)' }}>
              Which of these feels most like what you're experiencing?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {feelingCategories.map((category) => (
                <Card 
                  key={category.id}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ${category.color}`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentStep(1);
                  }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-2 text-gray-800">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Trust Message */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Heart className="w-4 h-4" style={{ color: 'var(--amber)' }} />
              <span className="text-sm text-gray-600">
                Your responses are completely confidential and only used to provide you with helpful resources
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4" style={{ background: 'var(--gradient-bg)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentStep(currentStep - 1)}
            className="mb-4 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Question {currentStep} of {questions.length}
            </p>
            <Progress value={progress} className="w-full h-2 mb-4" />
            <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-dark)' }}>
              {questions[currentStep - 1]}
            </h1>
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-4">
          {answerOptions.map((option) => (
            <Card 
              key={option.value}
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-200"
              onClick={() => handleAnswer(option.value)}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-800">
                  {option.label}
                </span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${option.color}`}>
                  {option.value === 0 ? "0 days" : 
                   option.value === 1 ? "1-6 days" :
                   option.value === 2 ? "7-11 days" : "12-14 days"}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Privacy Reminder */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Remember: This information is confidential and used only to provide you with appropriate support resources
          </p>
        </div>
      </div>
    </div>
  );
}