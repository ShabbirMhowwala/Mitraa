import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, MessageCircle, Star, Clock, Users, Heart, Shield } from 'lucide-react';

interface VolunteersPageProps {
  onNavigate: (page: string) => void;
}

interface Volunteer {
  id: string;
  name: string;
  avatar: string;
  year: string;
  course: string;
  specializations: string[];
  rating: number;
  totalChats: number;
  responseTime: string;
  isOnline: boolean;
  bio: string;
  languages: string[];
}

export function VolunteersPage({ onNavigate }: VolunteersPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const volunteers: Volunteer[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b98c?w=150',
      year: '3rd Year',
      course: 'Psychology',
      specializations: ['Anxiety', 'Academic Stress', 'Peer Support'],
      rating: 4.8,
      totalChats: 156,
      responseTime: '< 5 min',
      isOnline: true,
      bio: 'Hi! I understand the pressures of college life and I\'m here to listen without judgment. Having struggled with anxiety myself, I can relate to what you\'re going through.',
      languages: ['Hindi', 'English', 'Punjabi']
    },
    {
      id: '2', 
      name: 'Arjun Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      year: '4th Year',
      course: 'Social Work',
      specializations: ['Depression', 'Loneliness', 'Career Guidance'],
      rating: 4.9,
      totalChats: 203,
      responseTime: '< 3 min',
      isOnline: true,
      bio: 'I believe everyone deserves someone who listens. As someone who has navigated depression, I want to help others find their path to wellness.',
      languages: ['Hindi', 'English', 'Bengali']
    },
    {
      id: '3',
      name: 'Sneha Patel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      year: '2nd Year',
      course: 'Counseling Psychology',
      specializations: ['Relationship Issues', 'Self-Esteem', 'Body Image'],
      rating: 4.7,
      totalChats: 98,
      responseTime: '< 10 min',
      isOnline: false,
      bio: 'College can be overwhelming, especially when dealing with relationships and self-image. I\'m here to provide a safe space to talk through these challenges.',
      languages: ['Hindi', 'English', 'Gujarati']
    },
    {
      id: '4',
      name: 'Rohit Singh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      year: '3rd Year',
      course: 'Mental Health Studies',
      specializations: ['Study Stress', 'Family Pressure', 'Identity Issues'],
      rating: 4.6,
      totalChats: 134,
      responseTime: '< 7 min',
      isOnline: true,
      bio: 'Having faced family pressure and identity struggles myself, I understand how isolating these experiences can feel. Let\'s talk it through together.',
      languages: ['Hindi', 'English', 'Marathi']
    }
  ];

  const categories = ['All', 'Anxiety', 'Depression', 'Academic Stress', 'Relationship Issues', 'Loneliness'];

  const filteredVolunteers = selectedCategory === 'All' 
    ? volunteers 
    : volunteers.filter(volunteer => 
        volunteer.specializations.includes(selectedCategory)
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="outline" 
          onClick={() => onNavigate("Home")} 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Connect with Peer Volunteers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Talk to trained student volunteers who understand what you're going through. 
            All conversations are confidential and supportive.
          </p>
          
          {/* Trust indicators */}
          <div className="flex justify-center items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-green-600">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Trained Volunteers</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Heart className="w-5 h-5 fill-current" />
              <span className="text-sm font-medium">Peer Support</span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">24/7 Available</span>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Specialization:</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Volunteers grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVolunteers.map((volunteer) => (
            <Card key={volunteer.id} className="p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={volunteer.avatar} alt={volunteer.name} />
                    <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {volunteer.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{volunteer.name}</h3>
                  <p className="text-sm text-gray-600">{volunteer.year} • {volunteer.course}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{volunteer.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{volunteer.totalChats} chats</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-3">{volunteer.bio}</p>

              {/* Specializations */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-800 mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-2">
                  {volunteer.specializations.map((spec) => (
                    <Badge key={spec} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-800 mb-2">Languages:</p>
                <div className="flex flex-wrap gap-2">
                  {volunteer.languages.map((lang) => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Responds {volunteer.responseTime}</span>
                </div>
                <span className={volunteer.isOnline ? "text-green-600 font-medium" : "text-gray-500"}>
                  {volunteer.isOnline ? "Online now" : "Offline"}
                </span>
              </div>

              {/* Chat button */}
              <Button 
                className={`w-full ${volunteer.isOnline ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400'}`}
                disabled={!volunteer.isOnline}
                onClick={() => {
                  // In a real app, this would start a chat
                  alert(`Starting chat with ${volunteer.name}...`);
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {volunteer.isOnline ? 'Start Chat' : 'Currently Offline'}
              </Button>
            </Card>
          ))}
        </div>

        {/* How it works section */}
        <div className="mt-16 bg-purple-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How Peer Support Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Choose a Volunteer</h3>
              <p className="text-gray-600 text-sm">Browse volunteers based on specialization, language, and availability</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Start Conversation</h3>
              <p className="text-gray-600 text-sm">Connect instantly through our secure chat platform</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600 fill-current" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Get Support</h3>
              <p className="text-gray-600 text-sm">Receive empathetic support from someone who understands</p>
            </div>
          </div>
        </div>

        {/* Emergency section */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Need Immediate Help?
          </h3>
          <p className="text-red-700 mb-4">
            If you're in crisis or having thoughts of self-harm, please seek immediate professional help
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
              onClick={() => onNavigate("Counsellor")}
            >
              Book Professional Counselor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}