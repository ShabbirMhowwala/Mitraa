import { useState, useEffect } from "react";
import { 
  Brain, Moon, Heart, Eye, Zap, Users, BookOpen, Clock,
  Target, Lightbulb, Activity, Headphones, Calendar, 
  CheckCircle, ArrowRight, Play, Pause, RotateCcw, Timer,
  Volume2, VolumeX, Settings, Star, TrendingUp, Utensils,
  Repeat, Shield, MessageCircle, Smile, Frown, Waves,
  Coffee, Sun, TreePine, Music, Save, Home, Phone
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

interface SpecializedHelpPageProps {
  onNavigate: (page: string) => void;
  user: any;
}

interface Condition {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  prevalence: string;
  tools: Tool[];
}

interface Tool {
  id: string;
  name: string;
  description: string;
  type: 'focus' | 'sleep' | 'anxiety' | 'social' | 'sensory' | 'routine' | 'mood' | 'eating' | 'ocd';
  icon: React.ComponentType<any>;
  interactive?: boolean;
}

const conditions: Condition[] = [
  {
    id: "adhd",
    name: "ADHD Support",
    description: "Tools for focus, time management, and attention regulation",
    icon: Zap,
    color: "#F59E0B",
    prevalence: "5-10% of students",
    tools: [
      {
        id: "pomodoro-focus",
        name: "ADHD Pomodoro Timer",
        description: "Customizable focus intervals with movement breaks designed for ADHD brains",
        type: "focus",
        icon: Timer,
        interactive: true
      },
      {
        id: "fidget-sounds",
        name: "Focus Soundscapes",
        description: "Background sounds and music designed to improve ADHD concentration",
        type: "focus",
        icon: Headphones,
        interactive: true
      },
      {
        id: "task-breakdown",
        name: "Task Breakdown Helper",
        description: "Break overwhelming tasks into manageable ADHD-friendly steps",
        type: "routine",
        icon: Target,
        interactive: true
      },
      {
        id: "dopamine-rewards",
        name: "Dopamine Reward System",
        description: "Gamified reward system designed for ADHD motivation patterns",
        type: "routine",
        icon: Star,
        interactive: true
      },
      {
        id: "focus-booster",
        name: "Quick Focus Boosters",
        description: "2-minute exercises to reset attention and improve concentration",
        type: "focus",
        icon: Zap,
        interactive: true
      }
    ]
  },
  {
    id: "insomnia",
    name: "Sleep Support",
    description: "Evidence-based tools for better sleep hygiene and insomnia management",
    icon: Moon,
    color: "#4F46E5",
    prevalence: "30-40% of students",
    tools: [
      {
        id: "progressive-relaxation",
        name: "Progressive Muscle Relaxation",
        description: "Guided body relaxation technique to prepare for sleep",
        type: "sleep",
        icon: Activity,
        interactive: true
      },
      {
        id: "sleep-sounds",
        name: "Sleep Soundscapes",
        description: "Calming sounds, white noise, and nature sounds for better sleep",
        type: "sleep",
        icon: Volume2,
        interactive: true
      },
      {
        id: "sleep-hygiene-tracker",
        name: "Sleep Hygiene Tracker",
        description: "Track and improve your sleep habits with personalized insights",
        type: "routine",
        icon: Moon,
        interactive: true
      },
      {
        id: "wind-down-routine",
        name: "Wind-Down Routine Builder",
        description: "Create a personalized bedtime routine for better sleep onset",
        type: "routine",
        icon: Clock,
        interactive: true
      }
    ]
  },
  {
    id: "autism",
    name: "Autism Support",
    description: "Sensory tools, social navigation help, and routine management",
    icon: Brain,
    color: "#8B5CF6",
    prevalence: "2-3% of students",
    tools: [
      {
        id: "sensory-toolkit",
        name: "Sensory Regulation Toolkit",
        description: "Tools and techniques for managing sensory overload and stimulation",
        type: "sensory",
        icon: Eye,
        interactive: true
      },
      {
        id: "social-scripts",
        name: "Social Interaction Scripts",
        description: "Helpful templates and practice scenarios for social situations",
        type: "social",
        icon: Users,
        interactive: true
      },
      {
        id: "routine-builder",
        name: "Visual Routine Builder",
        description: "Create visual schedules and routines to reduce anxiety and improve structure",
        type: "routine",
        icon: Calendar,
        interactive: true
      },
      {
        id: "stim-suggestions",
        name: "Positive Stimming Guide",
        description: "Healthy stimming alternatives and sensory break activities",
        type: "sensory",
        icon: Activity,
        interactive: true
      }
    ]
  },
  {
    id: "anxiety",
    name: "Anxiety Support",
    description: "Coping strategies, breathing exercises, and anxiety management tools",
    icon: Heart,
    color: "#EF4444",
    prevalence: "40-60% of students",
    tools: [
      {
        id: "breathing-exercises",
        name: "Guided Breathing Exercises",
        description: "Various breathing techniques for immediate anxiety relief",
        type: "anxiety",
        icon: Activity,
        interactive: true
      },
      {
        id: "grounding-techniques",
        name: "5-4-3-2-1 Grounding Tool",
        description: "Interactive grounding exercise using your five senses",
        type: "anxiety",
        icon: Eye,
        interactive: true
      },
      {
        id: "worry-journal",
        name: "Digital Worry Journal",
        description: "Structured journaling to process and manage anxious thoughts",
        type: "anxiety",
        icon: BookOpen,
        interactive: true
      },
      {
        id: "anxiety-tracker",
        name: "Anxiety Pattern Tracker",
        description: "Identify triggers and patterns in your anxiety responses",
        type: "routine",
        icon: TrendingUp,
        interactive: true
      }
    ]
  },
  {
    id: "depression",
    name: "Depression Support",
    description: "Mood tracking, behavioral activation, and positive psychology tools",
    icon: Sun,
    color: "#10B981",
    prevalence: "20-30% of students",
    tools: [
      {
        id: "mood-tracker",
        name: "Daily Mood Tracker",
        description: "Track your mood patterns and identify triggers with visual insights",
        type: "routine",
        icon: TrendingUp,
        interactive: true
      },
      {
        id: "gratitude-journal",
        name: "Gratitude Practice",
        description: "Daily gratitude exercises to shift focus to positive aspects of life",
        type: "routine",
        icon: Heart,
        interactive: true
      },
      {
        id: "activity-scheduler",
        name: "Behavioral Activation",
        description: "Schedule pleasant and meaningful activities to improve mood",
        type: "routine",
        icon: Calendar,
        interactive: true
      },
      {
        id: "thought-challenger",
        name: "Negative Thought Challenger",
        description: "Cognitive restructuring tool to challenge negative thinking patterns",
        type: "anxiety",
        icon: Brain,
        interactive: true
      }
    ]
  },
  {
    id: "eating-disorders",
    name: "Eating Disorder Support",
    description: "Body image support, meal planning, and recovery tools",
    icon: Utensils,
    color: "#EC4899",
    prevalence: "5-15% of students",
    tools: [
      {
        id: "meal-tracker",
        name: "Mindful Eating Tracker",
        description: "Track eating patterns and emotions without judgment",
        type: "routine",
        icon: Utensils,
        interactive: true
      },
      {
        id: "body-image-affirmations",
        name: "Body Positive Affirmations",
        description: "Daily affirmations to improve body image and self-acceptance",
        type: "routine",
        icon: Heart,
        interactive: true
      },
      {
        id: "urge-surfing",
        name: "Urge Surfing Tool",
        description: "Mindfulness technique to ride out difficult urges and emotions",
        type: "anxiety",
        icon: Waves,
        interactive: true
      },
      {
        id: "recovery-resources",
        name: "Recovery Resources Hub",
        description: "Educational content and recovery-focused tools and strategies",
        type: "routine",
        icon: BookOpen,
        interactive: false
      }
    ]
  },
  {
    id: "ocd",
    name: "OCD Support",
    description: "Exposure response prevention tools and compulsion management",
    icon: Repeat,
    color: "#7C3AED",
    prevalence: "2-5% of students",
    tools: [
      {
        id: "erp-tracker",
        name: "ERP Exercise Tracker",
        description: "Track exposure and response prevention exercises with progress monitoring",
        type: "routine",
        icon: Target,
        interactive: true
      },
      {
        id: "uncertainty-training",
        name: "Uncertainty Training",
        description: "Exercises to build tolerance for uncertainty and ambiguity",
        type: "anxiety",
        icon: Eye,
        interactive: true
      },
      {
        id: "compulsion-delay",
        name: "Compulsion Delay Timer",
        description: "Gradually increase delay between obsession and compulsion",
        type: "routine",
        icon: Timer,
        interactive: true
      },
      {
        id: "ocd-education",
        name: "OCD Education Hub",
        description: "Learn about OCD, treatment options, and self-help strategies",
        type: "routine",
        icon: BookOpen,
        interactive: false
      }
    ]
  },
  {
    id: "social-anxiety",
    name: "Social Anxiety Support",
    description: "Social skills practice, exposure tools, and confidence building",
    icon: Users,
    color: "#F97316",
    prevalence: "15-25% of students",
    tools: [
      {
        id: "social-exposure-ladder",
        name: "Social Exposure Ladder",
        description: "Gradual exposure exercises to build social confidence",
        type: "social",
        icon: Target,
        interactive: true
      },
      {
        id: "conversation-starters",
        name: "Conversation Starter Bank",
        description: "Practice prompts and scripts for various social situations",
        type: "social",
        icon: MessageCircle,
        interactive: true
      },
      {
        id: "social-anxiety-tracker",
        name: "Social Situation Tracker",
        description: "Monitor anxiety levels in different social contexts",
        type: "routine",
        icon: TrendingUp,
        interactive: true
      },
      {
        id: "confidence-builder",
        name: "Daily Confidence Challenges",
        description: "Small daily challenges to gradually build social confidence",
        type: "social",
        icon: Star,
        interactive: true
      }
    ]
  }
];

export function SpecializedHelpPage({ onNavigate, user }: SpecializedHelpPageProps) {
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [showTools, setShowTools] = useState(false);

  // Interactive tool states
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(pomodoroTime * 60);
  const [soundVolume, setSoundVolume] = useState([0.5]);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  
  // New interactive states
  const [moodRating, setMoodRating] = useState(5);
  const [gratitudeEntries, setGratitudeEntries] = useState<string[]>([]);
  const [currentGratitude, setCurrentGratitude] = useState("");
  const [breathingStep, setBreathingStep] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [compulsionDelayTime, setCompulsionDelayTime] = useState(5);
  const [socialChallengeCompleted, setSocialChallengeCompleted] = useState(false);

  // Load saved data
  useEffect(() => {
    const savedGratitude = localStorage.getItem('mitraa_gratitude_entries');
    if (savedGratitude) {
      setGratitudeEntries(JSON.parse(savedGratitude));
    }
  }, []);

  // Save gratitude entries
  const saveGratitudeEntry = () => {
    if (currentGratitude.trim()) {
      const newEntries = [...gratitudeEntries, currentGratitude.trim()];
      setGratitudeEntries(newEntries);
      localStorage.setItem('mitraa_gratitude_entries', JSON.stringify(newEntries));
      setCurrentGratitude("");
    }
  };

  const handleConditionSelect = (condition: Condition) => {
    setSelectedCondition(condition);
    setShowTools(true);
  };

  const handleToolSelect = (tool: Tool) => {
    setActiveTool(tool);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderPomodoroTool = () => (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">ADHD Pomodoro Timer</h3>
        <p className="text-gray-600">Customized for ADHD focus patterns with movement breaks</p>
      </div>

      <div className="text-center mb-8">
        <div className="text-6xl font-bold mb-4" style={{ color: selectedCondition?.color }}>
          {formatTime(currentTime)}
        </div>
        <Progress value={(currentTime / (pomodoroTime * 60)) * 100} className="mb-4" />
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Focus Duration (minutes)</label>
          <Slider
            value={[pomodoroTime]}
            onValueChange={(value) => {
              setPomodoroTime(value[0]);
              setCurrentTime(value[0] * 60);
            }}
            max={45}
            min={10}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>10 min</span>
            <span>45 min</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white"
          >
            {isTimerRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isTimerRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setCurrentTime(pomodoroTime * 60);
              setIsTimerRunning(false);
            }}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h4 className="font-medium text-amber-800 mb-2">ADHD-Friendly Tips:</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Stand or fidget during focus time if needed</li>
            <li>• Take a 5-minute movement break between sessions</li>
            <li>• Adjust duration based on your attention span</li>
            <li>• Use this with background focus sounds for best results</li>
          </ul>
        </div>
      </div>
    </Card>
  );

  const renderSoundscapeTool = () => (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">Focus Soundscapes</h3>
        <p className="text-gray-600">Background sounds designed for ADHD concentration</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "Brown Noise", description: "Deep, rumbling sound for focus" },
            { name: "Rain & Thunder", description: "Natural rain with distant thunder" },
            { name: "Coffee Shop", description: "Ambient café sounds" },
            { name: "Forest Birds", description: "Gentle bird sounds in nature" },
            { name: "Ocean Waves", description: "Rhythmic wave sounds" },
            { name: "White Noise", description: "Classic white noise for blocking distractions" }
          ].map((sound, index) => (
            <Card key={index} className="p-4 cursor-pointer hover:shadow-md transition-all border-gray-200 hover:border-blue-300">
              <div className="text-center">
                <Headphones className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <h4 className="font-medium text-sm mb-1">{sound.name}</h4>
                <p className="text-xs text-gray-600">{sound.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSoundMuted(!isSoundMuted)}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <span className="text-sm font-medium">Volume</span>
          </div>
          <div className="flex-1 mx-4">
            <Slider
              value={soundVolume}
              onValueChange={setSoundVolume}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
              disabled={isSoundMuted}
            />
          </div>
          <span className="text-sm text-gray-500 w-12">
            {isSoundMuted ? '0%' : Math.round(soundVolume[0] * 100) + '%'}
          </span>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">Research-Based Benefits:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Brown noise can improve focus for ADHD individuals</li>
            <li>• Ambient sounds mask distracting noises</li>
            <li>• Natural sounds reduce stress and improve mood</li>
            <li>• Consistent background audio creates focus routine</li>
          </ul>
        </div>
      </div>
    </Card>
  );

  const renderBreathingTool = () => {
    const breathingSteps = ["Breathe In", "Hold", "Breathe Out"];
    const breathingTimes = [4, 7, 8];
    
    return (
      <Card className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold mb-2">Guided Breathing Exercise</h3>
          <p className="text-gray-600">4-7-8 breathing technique for anxiety relief</p>
        </div>

        <div className="text-center mb-8">
          <div className={`w-32 h-32 mx-auto mb-6 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
            isBreathingActive ? 'border-blue-400 scale-110' : 'border-blue-200'
          }`}>
            <div className={`w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center transition-all duration-1000 ${
              isBreathingActive && breathingStep === 0 ? 'scale-125 bg-blue-200' : 
              isBreathingActive && breathingStep === 1 ? 'scale-110 bg-purple-200' :
              isBreathingActive && breathingStep === 2 ? 'scale-95 bg-green-200' : ''
            }`}>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="text-xl font-semibold mb-2">
            {isBreathingActive ? breathingSteps[breathingStep] : "Ready to Begin"}
          </div>
          <div className="text-lg text-gray-600">
            {isBreathingActive ? `${breathingTimes[breathingStep]} seconds` : "Tap start to begin"}
          </div>
          {isBreathingActive && (
            <div className="text-3xl font-bold text-blue-500 mt-2">
              {breathingTimer}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <Button 
              className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white px-8 py-3"
              onClick={() => setIsBreathingActive(!isBreathingActive)}
            >
              {isBreathingActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
              {isBreathingActive ? 'Pause Exercise' : 'Start Breathing Exercise'}
            </Button>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">How 4-7-8 Breathing Works:</h4>
            <div className="space-y-2 text-sm text-red-700">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-xs font-bold">4</div>
                <span>Inhale through nose for 4 seconds</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-xs font-bold">7</div>
                <span>Hold breath for 7 seconds</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-xs font-bold">8</div>
                <span>Exhale through mouth for 8 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const renderGroundingTool = () => (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">5-4-3-2-1 Grounding Technique</h3>
        <p className="text-gray-600">Use your senses to ground yourself in the present moment</p>
      </div>

      <div className="space-y-6">
        {[
          { number: 5, sense: "See", prompt: "Name 5 things you can see around you", color: "blue" },
          { number: 4, sense: "Touch", prompt: "Name 4 things you can touch", color: "green" },
          { number: 3, sense: "Hear", prompt: "Name 3 things you can hear", color: "purple" },
          { number: 2, sense: "Smell", prompt: "Name 2 things you can smell", color: "orange" },
          { number: 1, sense: "Taste", prompt: "Name 1 thing you can taste", color: "red" }
        ].map((step, index) => (
          <Card key={index} className={`p-4 border-l-4 border-l-${step.color}-500`}>
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full bg-${step.color}-100 flex items-center justify-center`}>
                <span className={`text-${step.color}-600 font-bold text-lg`}>{step.number}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{step.sense}</h4>
                <p className="text-sm text-gray-600">{step.prompt}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white">
          Start Grounding Exercise
        </Button>
      </div>
    </Card>
  );

  const renderMoodTrackerTool = () => (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">Daily Mood Tracker</h3>
        <p className="text-gray-600">Track your mood and identify patterns over time</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-4">How are you feeling today?</label>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setMoodRating(mood)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    moodRating === mood 
                      ? 'bg-[var(--primary-blue)] border-[var(--primary-blue)] text-white' 
                      : 'bg-white border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span className="flex items-center"><Frown className="w-4 h-4 mr-1" />Very Low</span>
            <span className="flex items-center"><Smile className="w-4 h-4 mr-1" />Very High</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Anxious', 'Sad', 'Angry', 'Happy', 'Calm', 'Excited', 'Stressed', 'Content'].map((emotion) => (
            <Button
              key={emotion}
              variant="outline"
              className="text-sm hover:bg-blue-50 hover:border-blue-300"
            >
              {emotion}
            </Button>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Today's Mood
          </Button>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-medium text-green-800 mb-2">Mood Tracking Benefits:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Identify patterns and triggers</li>
            <li>• Monitor progress over time</li>
            <li>• Share insights with healthcare providers</li>
            <li>• Develop better self-awareness</li>
          </ul>
        </div>
      </div>
    </Card>
  );

  const renderGratitudeTool = () => (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">Gratitude Practice</h3>
        <p className="text-gray-600">Daily gratitude to shift focus to positive aspects</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">What are you grateful for today?</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentGratitude}
              onChange={(e) => setCurrentGratitude(e.target.value)}
              placeholder="I'm grateful for..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && saveGratitudeEntry()}
            />
            <Button 
              onClick={saveGratitudeEntry}
              className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white"
            >
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {gratitudeEntries.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Your Gratitude List:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {gratitudeEntries.slice(-5).reverse().map((entry, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Heart className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                  <span className="text-sm text-yellow-800">{entry}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{gratitudeEntries.length}</div>
            <div className="text-sm text-blue-700">Total Entries</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">7</div>
            <div className="text-sm text-green-700">Day Streak</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">42%</div>
            <div className="text-sm text-purple-700">Mood Boost</div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-2">Research Shows:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Gratitude practice can increase happiness by 25%</li>
            <li>• Improves sleep quality and immune function</li>
            <li>• Reduces symptoms of depression and anxiety</li>
            <li>• Strengthens social relationships</li>
          </ul>
        </div>
      </div>
    </Card>
  );

  const renderTaskBreakdownTool = () => (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">Task Breakdown Helper</h3>
        <p className="text-gray-600">Break overwhelming tasks into ADHD-friendly steps</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">What task feels overwhelming?</label>
          <input
            type="text"
            placeholder="e.g., Write research paper"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <h4 className="font-medium mb-3">Suggested Breakdown:</h4>
          <div className="space-y-2">
            {[
              "Set up workspace (5 min)",
              "Research topic overview (15 min)",
              "Create outline (10 min)",
              "Write introduction (20 min)",
              "Take movement break (5 min)",
              "Write first main point (25 min)",
              "Take another break (5 min)",
              "Continue with remaining points"
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                  {index + 1}
                </div>
                <span className="flex-1">{step}</span>
                <CheckCircle className="w-5 h-5 text-gray-400 cursor-pointer hover:text-green-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h4 className="font-medium text-amber-800 mb-2">ADHD-Friendly Tips:</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Keep each step under 30 minutes</li>
            <li>• Include movement breaks every 25-45 minutes</li>
            <li>• Celebrate completing each small step</li>
            <li>• Use timers to stay focused on one step at a time</li>
          </ul>
        </div>
      </div>
    </Card>
  );

  const renderFocusBoosterTool = () => (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">Quick Focus Boosters</h3>
        <p className="text-gray-600">2-minute exercises to reset attention and improve concentration</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {[
          {
            name: "Deep Breathing Reset",
            description: "5 deep breaths to reset your nervous system",
            icon: Activity,
            color: "blue"
          },
          {
            name: "Body Movement",
            description: "Quick stretches or jumping jacks",
            icon: Zap,
            color: "green"
          },
          {
            name: "Sensory Reset",
            description: "Focus on 5 things you can see, 4 you can touch",
            icon: Eye,
            color: "purple"
          },
          {
            name: "Cold Water Splash",
            description: "Splash cold water on face or hold ice cube",
            icon: Waves,
            color: "cyan"
          }
        ].map((booster, index) => (
          <Card key={index} className="p-4 cursor-pointer hover:shadow-md transition-all">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg bg-${booster.color}-100 flex items-center justify-center`}>
                <booster.icon className={`w-5 h-5 text-${booster.color}-600`} />
              </div>
              <div>
                <h4 className="font-medium">{booster.name}</h4>
                <p className="text-sm text-gray-600">{booster.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white">
          <Timer className="w-4 h-4 mr-2" />
          Start 2-Minute Focus Reset
        </Button>
      </div>
    </Card>
  );

  const renderSocialExposureTool = () => (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">Social Exposure Ladder</h3>
        <p className="text-gray-600">Gradual exposure exercises to build social confidence</p>
      </div>

      <div className="space-y-4">
        {[
          { level: 1, task: "Make eye contact with cashier", difficulty: "Very Easy", color: "green" },
          { level: 2, task: "Say 'thank you' to service worker", difficulty: "Easy", color: "green" },
          { level: 3, task: "Ask a question in a store", difficulty: "Easy", color: "green" },
          { level: 4, task: "Make small talk with classmate", difficulty: "Medium", color: "yellow" },
          { level: 5, task: "Participate in group discussion", difficulty: "Medium", color: "yellow" },
          { level: 6, task: "Initiate conversation with stranger", difficulty: "Hard", color: "orange" },
          { level: 7, task: "Attend social event alone", difficulty: "Very Hard", color: "red" }
        ].map((exposure, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className={`w-8 h-8 rounded-full bg-${exposure.color}-100 flex items-center justify-center`}>
              <span className={`text-${exposure.color}-600 font-bold text-sm`}>{exposure.level}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{exposure.task}</h4>
              <Badge variant="outline" className={`text-xs bg-${exposure.color}-50 text-${exposure.color}-600 border-${exposure.color}-200`}>
                {exposure.difficulty}
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              {socialChallengeCompleted ? <CheckCircle className="w-4 h-4 text-green-500" /> : "Try"}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-orange-50 p-4 rounded-lg border border-orange-200">
        <h4 className="font-medium text-orange-800 mb-2">Social Exposure Tips:</h4>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• Start with easier challenges and work your way up</li>
          <li>• Practice self-compassion - progress isn't always linear</li>
          <li>• Celebrate small wins along the way</li>
          <li>• Use breathing exercises before challenging situations</li>
        </ul>
      </div>
    </Card>
  );

  const renderActiveTool = () => {
    if (!activeTool) return null;

    switch (activeTool.id) {
      case 'pomodoro-focus':
        return renderPomodoroTool();
      case 'fidget-sounds':
        return renderSoundscapeTool();
      case 'breathing-exercises':
        return renderBreathingTool();
      case 'grounding-techniques':
        return renderGroundingTool();
      case 'mood-tracker':
        return renderMoodTrackerTool();
      case 'gratitude-journal':
        return renderGratitudeTool();
      case 'task-breakdown':
        return renderTaskBreakdownTool();
      case 'focus-booster':
        return renderFocusBoosterTool();
      case 'social-exposure-ladder':
        return renderSocialExposureTool();
      default:
        return (
          <Card className="p-6 text-center">
            <activeTool.icon className="w-12 h-12 mx-auto mb-4" style={{ color: selectedCondition?.color }} />
            <h3 className="text-xl font-semibold mb-2">{activeTool.name}</h3>
            <p className="text-gray-600 mb-4">{activeTool.description}</p>
            <Button className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white">
              Coming Soon
            </Button>
          </Card>
        );
    }
  };

  if (showTools && selectedCondition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="ghost" 
              onClick={() => {
                if (activeTool) {
                  setActiveTool(null);
                } else {
                  setShowTools(false);
                  setSelectedCondition(null);
                }
              }}
              className="text-[var(--primary-blue)] hover:bg-blue-50"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              {activeTool ? 'Back to Tools' : 'Back to Conditions'}
            </Button>
            
            <Badge 
              className="text-white"
              style={{ backgroundColor: selectedCondition.color }}
            >
              {selectedCondition.name}
            </Badge>
          </div>

          {activeTool ? (
            <div className="max-w-4xl mx-auto">
              {renderActiveTool()}
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {/* Condition Header */}
              <Card className="p-8 mb-8" style={{ background: `linear-gradient(135deg, ${selectedCondition.color}20, #ffffff)` }}>
                <div className="flex items-center space-x-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${selectedCondition.color}30` }}
                  >
                    <selectedCondition.icon className="w-8 h-8" style={{ color: selectedCondition.color }} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{selectedCondition.name}</h1>
                    <p className="text-gray-600 text-lg mb-2">{selectedCondition.description}</p>
                    <Badge variant="outline" className="text-gray-600">
                      Affects {selectedCondition.prevalence}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Tools Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCondition.tools.map(tool => {
                  const ToolIcon = tool.icon;
                  return (
                    <Card 
                      key={tool.id}
                      className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white group hover:-translate-y-1"
                      onClick={() => handleToolSelect(tool)}
                    >
                      <div className="flex items-start space-x-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${selectedCondition.color}20` }}
                        >
                          <ToolIcon className="w-6 h-6" style={{ color: selectedCondition.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{tool.name}</h3>
                            {tool.interactive && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
                                Interactive
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                          <Button 
                            variant="outline"
                            className="w-full group-hover:bg-[var(--primary-blue)] group-hover:text-white group-hover:border-[var(--primary-blue)] transition-all"
                          >
                            {tool.interactive ? 'Try Tool' : 'Learn More'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
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
            Specialized Mental Health Support
          </h1>
          <p className="text-text-light text-lg max-w-3xl mx-auto">
            Evidence-based tools and resources for specific mental health conditions. 
            Find personalized support for ADHD, insomnia, autism, anxiety, and more.
          </p>
        </div>

        {/* Quick Access Tools */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {[
            { name: "Quick Breathing", icon: Activity, onClick: () => handleToolSelect({ id: 'breathing-exercises', name: 'Guided Breathing', description: '', type: 'anxiety', icon: Activity }) },
            { name: "Focus Timer", icon: Timer, onClick: () => handleToolSelect({ id: 'pomodoro-focus', name: 'ADHD Pomodoro Timer', description: '', type: 'focus', icon: Timer }) },
            { name: "Mood Check", icon: Heart, onClick: () => handleToolSelect({ id: 'mood-tracker', name: 'Daily Mood Tracker', description: '', type: 'routine', icon: TrendingUp }) },
            { name: "Gratitude", icon: Sun, onClick: () => handleToolSelect({ id: 'gratitude-journal', name: 'Gratitude Practice', description: '', type: 'routine', icon: Heart }) }
          ].map((tool, index) => (
            <Card 
              key={index}
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 text-center group border-0 bg-white hover:-translate-y-1"
              onClick={tool.onClick}
            >
              <tool.icon className="w-8 h-8 mx-auto mb-2 text-[var(--primary-blue)] group-hover:scale-110 transition-transform" />
              <div className="font-medium text-sm">{tool.name}</div>
            </Card>
          ))}
        </div>

        {/* Conditions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {conditions.map(condition => {
            const ConditionIcon = condition.icon;
            return (
              <Card 
                key={condition.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-white group hover:-translate-y-2"
                onClick={() => handleConditionSelect(condition)}
              >
                {/* Condition Header */}
                <div 
                  className="p-8 text-white relative overflow-hidden"
                  style={{ backgroundColor: condition.color }}
                >
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                        radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
                      backgroundSize: '60px 60px, 30px 30px'
                    }} />
                  </div>
                  
                  <div className="relative z-10 flex items-center space-x-4">
                    <ConditionIcon className="w-12 h-12" />
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{condition.name}</h3>
                      <p className="opacity-90">{condition.description}</p>
                    </div>
                  </div>
                </div>

                {/* Condition Content */}
                <div className="p-8">
                  <div className="mb-6">
                    <Badge variant="outline" className="mb-4" style={{
                      backgroundColor: `${condition.color}10`,
                      color: condition.color,
                      borderColor: condition.color
                    }}>
                      {condition.prevalence}
                    </Badge>
                    
                    <h4 className="font-semibold mb-3">Available Tools:</h4>
                    <div className="space-y-2">
                      {condition.tools.slice(0, 3).map((tool, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{tool.name}</span>
                          {tool.interactive && (
                            <Badge variant="outline" className="text-xs ml-auto bg-green-50 text-green-600 border-green-200">
                              Interactive
                            </Badge>
                          )}
                        </div>
                      ))}
                      {condition.tools.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{condition.tools.length - 3} more tools
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full group-hover:bg-[var(--primary-blue)] group-hover:text-white transition-all"
                    variant="outline"
                  >
                    Explore Tools
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Emergency Resources */}
        <div className="mb-12">
          <Card className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-100">
            <div className="flex items-center space-x-4 mb-4">
              <Shield className="w-8 h-8 text-red-500" />
              <h3 className="font-semibold text-red-900 text-lg">Crisis Support & Emergency Resources</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <Phone className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="font-medium text-red-900">Crisis Hotline</div>
                <div className="text-red-700 text-sm">988 (24/7)</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-medium text-blue-900">Crisis Text Line</div>
                <div className="text-blue-700 text-sm">Text HOME to 741741</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Home className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="font-medium text-green-900">Campus Counseling</div>
                <div className="text-green-700 text-sm">Contact your campus</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
            <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Support</h3>
            <p className="text-gray-600 mb-6">
              These tools are designed based on research and user feedback. Remember that everyone's experience 
              is unique - find what works best for you and don't hesitate to seek professional help when needed.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                variant="outline"
                onClick={() => onNavigate('Self-Assessment')}
                className="border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-white"
              >
                Take Assessment
              </Button>
              <Button 
                onClick={() => onNavigate('Counsellor')}
                className="bg-[var(--primary-blue)] hover:bg-[var(--dark-blue)] text-white"
              >
                Find Professional Help
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('Community')}
                className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
              >
                Join Community
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}