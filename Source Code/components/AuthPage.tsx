import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Eye, EyeOff, Heart, Shield, Users, User } from "lucide-react";
import mitraaLogo from "figma:asset/86c32a97fc21f48bd0dea3175dadadd59af70f52.png";

interface AuthPageProps {
  onAuthenticated: (userData: any) => void;
}

export function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<'choice' | 'anonymous' | 'signup' | 'parent-user-choice' | 'parent-assessment'>('choice');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'user' | 'parent' | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    problem: '',
    password: ''
  });

  // Generate unique anonymous ID
  const generateAnonymousId = () => {
    const prefix = 'MITR';
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 6);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
  };

  const handleAnonymousLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const anonymousId = generateAnonymousId();
      const userData = {
        id: anonymousId,
        email: formData.email,
        isAnonymous: true,
        name: userType === 'parent' ? 'Anonymous Parent' : 'Anonymous User',
        userType: userType,
        concerns: formData.problem
      };
      
      localStorage.setItem('mitraa_user', JSON.stringify(userData));
      onAuthenticated(userData);
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const anonymousId = generateAnonymousId();
      const userData = {
        id: anonymousId,
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        problem: formData.problem,
        isAnonymous: false
      };
      
      localStorage.setItem('mitraa_user', JSON.stringify(userData));
      onAuthenticated(userData);
      setIsLoading(false);
    }, 1500);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (authMode === 'choice') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--gradient-bg)' }}>
        <div className="w-full max-w-4xl">
          {/* Logo and Welcome */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <img 
                  src={mitraaLogo}
                  alt="Mitraa - A Friend Who Cares"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary-blue)' }}>
              Welcome to Mitraa
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-light)' }}>
              A safe space where you matter • Your privacy is our priority
            </p>
          </div>

          {/* Auth Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Anonymous Option */}
            <Card className="p-6 border-2 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3" style={{ backgroundColor: 'var(--lavender)' }}>
                  <Shield className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-blue)' }}>
                  Stay Anonymous
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Get support while keeping your identity completely private. We only need your email to create a secure anonymous ID.
                </p>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--green)' }}></div>
                  <span>100% Anonymous Experience</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--green)' }}></div>
                  <span>Instant Access to Support</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--green)' }}></div>
                  <span>No Personal Information Required</span>
                </div>
              </div>

              <Button 
                onClick={() => setAuthMode('parent-user-choice')}
                className="w-full h-10 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: 'var(--primary-blue)', color: 'white' }}
              >
                Continue Anonymously
              </Button>
            </Card>

            {/* Signup Option */}
            <Card className="p-6 border-2 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3" style={{ backgroundColor: 'var(--lavender)' }}>
                  <Users className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-blue)' }}>
                  Create Account
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Share some basic information to help us provide personalized support and connect you with the right resources.
                </p>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--amber)' }}></div>
                  <span>Personalized Support Experience</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--amber)' }}></div>
                  <span>Anonymous ID Still Generated</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--amber)' }}></div>
                  <span>Better Resource Matching</span>
                </div>
              </div>

              <Button 
                onClick={() => setAuthMode('signup')}
                className="w-full h-10 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: 'var(--amber)', color: 'white' }}
              >
                Create Account
              </Button>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-6 text-xs text-gray-500">
            <p className="flex items-center justify-center space-x-2 mb-1">
              <Heart className="w-3 h-3" />
              <span>Your mental health journey is safe with us</span>
            </p>
            <p>Encrypted • Confidential • Supportive</p>
          </div>
        </div>
      </div>
    );
  }

  if (authMode === 'parent-user-choice') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--gradient-bg)' }}>
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary-blue)' }}>
              Are you a...
            </h2>
            <p className="text-gray-600">
              Please select your role to provide you with the most appropriate support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Student/User Option */}
            <Card className="p-8 border-2 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                  onClick={() => {
                    setUserType('user');
                    setAuthMode('anonymous');
                  }}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--lavender)' }}>
                  <User className="w-8 h-8" style={{ color: 'var(--primary-blue)' }} />
                </div>
                <h3 className="text-2xl font-semibold mb-3" style={{ color: 'var(--primary-blue)' }}>
                  Student/User
                </h3>
                <p className="text-gray-600 mb-6">
                  I'm seeking support for myself and want to access mental health resources, community, and tools.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--green)' }}></div>
                    <span>Access to AI chat support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--green)' }}></div>
                    <span>Join peer support communities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--green)' }}></div>
                    <span>Self-assessment tools</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Parent Option */}
            <Card className="p-8 border-2 hover:border-amber-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                  onClick={() => {
                    setUserType('parent');
                    setAuthMode('parent-assessment');
                  }}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#fff5e6' }}>
                  <Heart className="w-8 h-8" style={{ color: 'var(--amber)' }} />
                </div>
                <h3 className="text-2xl font-semibold mb-3" style={{ color: 'var(--amber)' }}>
                  Parent/Guardian
                </h3>
                <p className="text-gray-600 mb-6">
                  I'm concerned about my child's mental health and want to understand how to support them better.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--amber)' }}></div>
                    <span>Child assessment tools</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--amber)' }}></div>
                    <span>Parenting guidance resources</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--amber)' }}></div>
                    <span>Support strategies</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="ghost"
              onClick={() => setAuthMode('choice')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to Options
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (authMode === 'parent-assessment') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--gradient-bg)' }}>
        <Card className="w-full max-w-lg p-8 shadow-2xl border-0">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#fff5e6' }}>
              <Heart className="w-8 h-8" style={{ color: 'var(--amber)' }} />
            </div>
            <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--amber)' }}>
              Parent Support Access
            </h2>
            <p className="text-gray-600">
              Help us understand your situation to provide the best guidance for supporting your child
            </p>
          </div>

          <form onSubmit={handleAnonymousLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="your.email@example.com"
                className="h-12 rounded-xl border-gray-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send you a personalized support guide and resources
              </p>
            </div>

            <div>
              <Label htmlFor="child-situation" className="text-gray-700 mb-2 block">
                Tell us about your concerns (Optional)
              </Label>
              <Textarea
                id="child-situation"
                value={formData.problem}
                onChange={(e) => updateFormData('problem', e.target.value)}
                placeholder="What behaviors or signs have you noticed in your child that concern you? This helps us provide more specific guidance..."
                className="min-h-[120px] rounded-xl border-gray-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 resize-none"
              />
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <p className="text-sm text-amber-800 flex items-start space-x-2">
                <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Privacy Assurance:</strong> Your information will be used only to provide 
                  personalized support resources. We'll create an anonymous ID for your account.
                </span>
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading || !formData.email}
              className="w-full h-12 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: 'var(--amber)', color: 'white' }}
            >
              {isLoading ? 'Setting up your account...' : 'Continue to Assessment'}
            </Button>
          </form>

          <Button 
            variant="ghost"
            onClick={() => setAuthMode('parent-user-choice')}
            className="w-full mt-4 text-gray-600 hover:text-gray-800"
          >
            ← Back to Role Selection
          </Button>
        </Card>
      </div>
    );
  }

  if (authMode === 'anonymous') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--gradient-bg)' }}>
        <Card className="w-full max-w-md p-8 shadow-2xl border-0">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--lavender)' }}>
              <Shield className="w-8 h-8" style={{ color: 'var(--primary-blue)' }} />
            </div>
            <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--primary-blue)' }}>
              Anonymous Access
            </h2>
            <p className="text-gray-600">
              We'll create a secure anonymous ID for you
            </p>
          </div>

          <form onSubmit={handleAnonymousLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="your.email@example.com"
                className="h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Used only for recovery and important updates
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading || !formData.email}
              className="w-full h-12 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: 'var(--primary-blue)', color: 'white' }}
            >
              {isLoading ? 'Creating Anonymous ID...' : 'Continue Anonymously'}
            </Button>
          </form>

          <Button 
            variant="ghost"
            onClick={() => setAuthMode('choice')}
            className="w-full mt-4 text-gray-600 hover:text-gray-800"
          >
            ← Back to Options
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--gradient-bg)' }}>
      <Card className="w-full max-w-lg p-8 shadow-2xl border-0">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--lavender)' }}>
            <User className="w-8 h-8" style={{ color: 'var(--primary-blue)' }} />
          </div>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--primary-blue)' }}>
            Create Your Account
          </h2>
          <p className="text-gray-600">
            Help us provide you with personalized support
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-gray-700 mb-2 block">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="Your name"
                className="h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-700 mb-2 block">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-700 mb-2 block">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              placeholder="your.email@example.com"
              className="h-12 rounded-xl border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <Label htmlFor="problem" className="text-gray-700 mb-2 block">
              What brings you to Mitraa today? (Optional)
            </Label>
            <Textarea
              id="problem"
              value={formData.problem}
              onChange={(e) => updateFormData('problem', e.target.value)}
              placeholder="Share what you'd like support with... (This helps us connect you with the right resources)"
              className="min-h-[100px] rounded-xl border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 resize-none"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 flex items-start space-x-2">
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Privacy Promise:</strong> We'll still generate an anonymous ID for you. 
                Your personal information is encrypted and only used to provide better support.
              </span>
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !formData.email || !formData.name}
            className="w-full h-12 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50"
            style={{ backgroundColor: 'var(--amber)', color: 'white' }}
          >
            {isLoading ? 'Creating Your Account...' : 'Create Account & Get Anonymous ID'}
          </Button>
        </form>

        <Button 
          variant="ghost"
          onClick={() => setAuthMode('choice')}
          className="w-full mt-4 text-gray-600 hover:text-gray-800"
        >
          ← Back to Options
        </Button>
      </Card>
    </div>
  );
}