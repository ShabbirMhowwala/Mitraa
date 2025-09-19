import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Send, Bot, User, Heart, Phone } from 'lucide-react';

interface AIChatPageProps {
  onNavigate: (page: string) => void;
  user: any;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isEmergency?: boolean;
}

export function AIChatPage({ onNavigate, user }: AIChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${user?.isAnonymous ? 'friend' : user?.name?.split(' ')[0] || 'there'}! I'm your Mitraa AI companion 🤗 I'm here to listen without judgment and provide support whenever you need it. This is a safe space where you can share anything on your mind. How are you feeling right now?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis keywords detection
    if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || lowerMessage.includes('end it all') || lowerMessage.includes('hurt myself') || lowerMessage.includes('want to die')) {
      return "🚨 I'm very concerned about you right now, and I want you to know that your life has value. These feelings are serious, but you don't have to face them alone. Please reach out to our crisis helpline immediately at 9152987821, or if you're in immediate danger, please contact emergency services at 112. Would you like me to help you connect with a counselor right away? Remember: This feeling is temporary, but ending your life is permanent. You matter. 💙";
    }

    // Anxiety keywords
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('panic') || lowerMessage.includes('nervous')) {
      return "I hear that you're feeling anxious, and that's completely understandable. 💙 Anxiety is your mind trying to protect you, but sometimes it can feel overwhelming. Let's try a quick grounding technique: Take a deep breath and tell me 5 things you can see around you right now. This can help bring you back to the present moment. Would you like to try some breathing exercises together?";
    }

    // Depression keywords
    if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless') || lowerMessage.includes('empty') || lowerMessage.includes('worthless')) {
      return "Thank you for trusting me with these difficult feelings. 🫂 What you're experiencing is real and valid, and you've shown incredible strength by reaching out. Depression can make everything feel harder, but please know that these feelings, while overwhelming right now, can change. Even small steps matter - like having this conversation with me. Would you like some gentle suggestions for tiny things you could do today to care for yourself?";
    }

    // Stress keywords
    if (lowerMessage.includes('stressed') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure') || lowerMessage.includes('exam')) {
      return "Academic stress is incredibly common among students, and you're not alone in feeling this way. Let's break this down together. What feels most overwhelming right now? Sometimes identifying the specific stressors can help us create a manageable plan. Would you like some study techniques or stress management strategies?";
    }

    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      return "Sleep issues can really impact how we feel and cope with daily challenges. Good sleep hygiene can make a significant difference. Try to maintain consistent sleep and wake times, limit screen time before bed, and create a calming bedtime routine. Are there specific things keeping you awake at night?";
    }

    // Loneliness keywords
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated') || lowerMessage.includes('no friends')) {
      return "Feeling lonely, especially in college, is more common than you might think. Many students struggle with making connections. You've already taken a positive step by reaching out here. Our peer support community might be helpful for you - would you like me to help you connect with other students who understand what you're going through?";
    }

    // Positive responses
    if (lowerMessage.includes('better') || lowerMessage.includes('good') || lowerMessage.includes('fine') || lowerMessage.includes('okay')) {
      return "That's wonderful to hear! It's great that you're feeling positive. Remember to celebrate these moments and perhaps think about what's contributing to feeling good today. Is there anything specific you'd like to talk about or any way I can support you further?";
    }

    // Default supportive response
    const responses = [
      "Thank you for sharing that with me. 💙 Your feelings are completely valid, and I'm honored you chose to open up here. Can you tell me more about what's been on your mind lately?",
      "I hear you, and I appreciate you trusting me with this. It takes real courage to reach out. What would feel most supportive for you right now?",
      "I'm here with you through whatever you're experiencing. 🤗 Would you like to explore some gentle coping strategies, or would you prefer to talk more about how you're feeling?",
      "Your wellbeing truly matters, and I'm so glad you reached out today. Sometimes just putting our thoughts and feelings into words can help. What's been weighing on your heart?",
      "You're not alone in this. 💙 I'm here to listen without any judgment. What's been the hardest part of your day today?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--gradient-bg)' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate("Home")}
              size="sm"
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--lavender)' }}>
                <Heart className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} fill="currentColor" />
              </div>
              <div>
                <h1 className="font-semibold" style={{ color: 'var(--text-dark)' }}>Your Mitraa AI Companion</h1>
                <p className="text-sm" style={{ color: 'var(--green)' }}>● Available 24/7 • Safe & Confidential</p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="rounded-xl text-red-600 border-red-300 hover:bg-red-50"
            onClick={() => window.open('tel:9152987821', '_self')}
          >
            <Phone className="w-4 h-4 mr-2" />
            Crisis Helpline
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-4xl space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md shadow-md'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {message.sender === 'ai' && (
                    <div className="bg-blue-100 p-1 rounded-full">
                      <Heart className="w-3 h-3 text-blue-600 fill-current" />
                    </div>
                  )}
                  {message.sender === 'user' && (
                    <div className="bg-blue-800 p-1 rounded-full">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <span className="text-xs opacity-70">
                    {message.sender === 'ai' ? 'Mitraa AI' : 'You'}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-md max-w-xs">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1 rounded-full">
                    <Heart className="w-3 h-3 text-blue-600 fill-current" />
                  </div>
                  <span className="text-xs text-gray-500">Mitraa AI is typing...</span>
                </div>
                <div className="flex gap-1 mt-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... I'm here to listen and support you."
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Quick responses */}
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              "I'm feeling anxious",
              "I'm stressed about exams",
              "I feel lonely",
              "I need coping strategies",
              "I'm having trouble sleeping"
            ].map((quickResponse) => (
              <Button
                key={quickResponse}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(quickResponse)}
                className="text-xs"
                disabled={isTyping}
              >
                {quickResponse}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border-t border-yellow-200 p-3">
        <div className="container mx-auto max-w-4xl">
          <p className="text-xs text-yellow-800 text-center">
            This AI is designed to provide support and coping strategies. In case of emergency or crisis, 
            please call our helpline: 9152987821 or contact emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  );
}