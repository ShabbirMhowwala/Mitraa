import { ExternalLink, Download, Video, FileText, Phone, Headphones, BookOpen, Globe, Calendar, Clock, MapPin, Star, MessageCircle, Shield, Lock, User } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Crisis Support",
      icon: Phone,
      color: "var(--amber)",
      resources: [
        { name: "Mitraa Crisis Helpline", type: "24/7 Hotline", link: "9152987821", description: "Immediate support for mental health emergencies" },
        { name: "National Suicide Prevention", type: "Crisis Line", link: "Kiran: 1800-599-0019", description: "National helpline for suicide prevention" },
        { name: "Campus Emergency", type: "Emergency", link: "Contact Campus Security", description: "For immediate campus-based emergencies" }
      ]
    },
    {
      title: "Educational Materials (Hindi)",
      icon: FileText,
      color: "var(--primary-blue)",
      resources: [
        { name: "चिंता को समझना (Understanding Anxiety)", type: "PDF Guide", link: "#", description: "Comprehensive guide about anxiety in Hindi" },
        { name: "अवसाद: संकेत और समाधान (Depression Guide)", type: "PDF Guide", link: "#", description: "Signs and solutions for depression" },
        { name: "तनाव प्रबंधन (Stress Management)", type: "Workbook", link: "#", description: "Practical stress management techniques" },
        { name: "स्वस्थ मुकाबला रणनीति (Healthy Coping)", type: "PDF Guide", link: "#", description: "Building healthy coping mechanisms" }
      ]
    },
    {
      title: "Video Resources (Regional Languages)",
      icon: Video,
      color: "var(--green)",
      resources: [
        { name: "ध्यान शुरुआती के लिए (Meditation Basics)", type: "Video Series", link: "#", description: "Meditation techniques in Hindi" },
        { name: "CBT Techniques (English/Hindi)", type: "Educational", link: "#", description: "Cognitive behavioral therapy basics" },
        { name: "लचीलापन निर्माण (Building Resilience)", type: "Workshop", link: "#", description: "Building mental resilience" },
        { name: "मन लगाकर पढ़ाई (Mindful Study)", type: "Tutorial", link: "#", description: "Mindful study techniques in Hindi" }
      ]
    },
    {
      title: "Audio Wellness (Regional)",
      icon: Headphones,
      color: "var(--purple)",
      resources: [
        { name: "गुइडेड मेडिटेशन (Guided Meditation)", type: "Audio", link: "#", description: "Guided meditation in Hindi/English" },
        { name: "शांति संगीत (Relaxation Music)", type: "Audio", link: "#", description: "Calming music and sounds" },
        { name: "नींद की कहानियां (Sleep Stories)", type: "Audio", link: "#", description: "Bedtime stories for better sleep" },
        { name: "सांस की तकनीक (Breathing Exercises)", type: "Audio Guide", link: "#", description: "Breathing techniques for anxiety" }
      ]
    }
  ];

  const professionalResources = [
    {
      title: "Campus Counseling Centers",
      description: "Most universities offer free or low-cost counseling services for students.",
      action: "Find Your Campus Center"
    },
    {
      title: "Online Therapy Platforms",
      description: "Connect with licensed therapists through secure video sessions.",
      action: "Explore Options"
    },
    {
      title: "Mental Health Apps",
      description: "Mobile apps for meditation, mood tracking, and mental wellness.",
      action: "View Recommendations"
    },
    {
      title: "Support Groups",
      description: "Find local or online support groups for specific mental health concerns.",
      action: "Search Groups"
    }
  ];

  const counsellors = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Academic Stress"],
      rating: 4.9,
      experience: "8 years",
      availability: "Available Today",
      image: "SM",
      bio: "Specializes in helping students navigate academic pressures and mental health challenges.",
      sessionTypes: ["Video Call", "In-Person", "Chat"]
    },
    {
      id: 2,
      name: "Dr. James Rodriguez",
      title: "Student Counseling Specialist",
      specialties: ["Peer Pressure", "Self-Esteem", "Career Anxiety"],
      rating: 4.8,
      experience: "6 years",
      availability: "Next Available: Tomorrow",
      image: "JR",
      bio: "Experienced in working with college students on identity and social challenges.",
      sessionTypes: ["Video Call", "In-Person"]
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      title: "Mindfulness & Stress Management Therapist",
      specialties: ["Stress Management", "Mindfulness", "Exam Anxiety"],
      rating: 4.9,
      experience: "10 years",
      availability: "Available Today",
      image: "EC",
      bio: "Integrates mindfulness techniques with traditional therapy for holistic healing.",
      sessionTypes: ["Video Call", "Chat", "Group Sessions"]
    },
    {
      id: 4,
      name: "Dr. Michael Thompson",
      title: "Crisis Intervention Specialist",
      specialties: ["Crisis Support", "Trauma", "Emergency Care"],
      rating: 4.7,
      experience: "12 years",
      availability: "24/7 Emergency",
      image: "MT",
      bio: "Available for immediate crisis support and emergency mental health interventions.",
      sessionTypes: ["Emergency Call", "Video Call", "In-Person"]
    }
  ];

  const sessionOptions = [
    {
      icon: Video,
      title: "Video Session",
      duration: "50 minutes",
      price: "Free for students",
      description: "Secure video call from anywhere"
    },
    {
      icon: MapPin,
      title: "In-Person Session",
      duration: "50 minutes", 
      price: "Free for students",
      description: "Meet at campus counseling center"
    },
    {
      icon: MessageCircle,
      title: "Chat Support",
      duration: "Ongoing",
      price: "Free for students",
      description: "Text-based support and guidance"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--text-dark)" }}>
            Resources & Professional Support
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-light)" }}>
            Access comprehensive mental health resources and book confidential counseling sessions 
            with licensed professionals. Everything you need for your wellness journey.
          </p>
        </div>

        {/* Tabs for Resources and Counseling */}
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Resources & Materials</span>
            </TabsTrigger>
            <TabsTrigger value="counseling" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Professional Counseling</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resources">
            {/* Resource Categories */}
            <div className="space-y-8 mb-12">
              {resourceCategories.map((category, index) => (
                <Card 
                  key={index}
                  className="p-6"
                  style={{ boxShadow: "var(--card-shadow)" }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <category.icon 
                        className="w-6 h-6" 
                        style={{ color: category.color }}
                      />
                    </div>
                    <h2 className="text-xl font-semibold" style={{ color: "var(--text-dark)" }}>
                      {category.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.resources.map((resource, resIndex) => (
                      <div 
                        key={resIndex}
                        className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                        style={{ backgroundColor: "var(--white)" }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm" style={{ color: "var(--text-dark)" }}>
                            {resource.name}
                          </h4>
                          <ExternalLink className="w-4 h-4" style={{ color: "var(--text-light)" }} />
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="text-xs mb-2"
                          style={{ backgroundColor: `${category.color}20`, color: category.color }}
                        >
                          {resource.type}
                        </Badge>
                        <p className="text-xs mb-2" style={{ color: "var(--text-light)" }}>
                          {resource.description}
                        </p>
                        <p className="text-xs font-medium" style={{ color: category.color }}>
                          {resource.link}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Professional Help Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--text-dark)" }}>
                Professional Support Options
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {professionalResources.map((resource, index) => (
                  <Card 
                    key={index}
                    className="p-6"
                    style={{ boxShadow: "var(--card-shadow)" }}
                  >
                    <h3 className="font-semibold text-lg mb-3" style={{ color: "var(--text-dark)" }}>
                      {resource.title}
                    </h3>
                    <p className="mb-4" style={{ color: "var(--text-light)" }}>
                      {resource.description}
                    </p>
                    <Button 
                      variant="outline"
                      className="w-full"
                      style={{ 
                        borderColor: "var(--primary-blue)",
                        color: "var(--primary-blue)"
                      }}
                    >
                      {resource.action}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Emergency Notice */}
            <Card 
              className="p-6 text-center"
              style={{ 
                backgroundColor: "var(--amber)",
                color: "white",
                boxShadow: "var(--card-shadow)"
              }}
            >
              <h3 className="font-semibold text-xl mb-2">
                In Case of Emergency
              </h3>
              <p className="mb-4">
                If you or someone you know is in immediate danger or having thoughts of suicide, 
                please contact emergency services or a crisis hotline immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-red-600 hover:bg-gray-100"
                  onClick={() => window.open('tel:100', '_self')}
                >
                  Call 100 (Emergency)
                </Button>
                <Button 
                  className="bg-white hover:bg-gray-100"
                  style={{ color: "var(--amber)" }}
                  onClick={() => window.open('tel:9152987821', '_self')}
                >
                  Call 9152987821 (Crisis Helpline)
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="counseling">
            {/* Privacy indicators */}
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="flex items-center gap-2 text-green-600">
                <Lock className="w-5 h-5" />
                <span className="text-sm font-medium">100% Confidential</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-purple-600">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">Anonymous Booking</span>
              </div>
            </div>

            {/* Session Options */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text-dark)" }}>
                Session Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sessionOptions.map((option, index) => (
                  <Card 
                    key={index}
                    className="p-6 text-center hover:shadow-lg transition-shadow"
                    style={{ boxShadow: "var(--card-shadow)" }}
                  >
                    <div 
                      className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--light-blue)" }}
                    >
                      <option.icon 
                        className="w-6 h-6" 
                        style={{ color: "var(--primary-blue)" }}
                      />
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--text-dark)" }}>
                      {option.title}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: "var(--text-light)" }}>
                      {option.description}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span style={{ color: "var(--text-light)" }}>{option.duration}</span>
                      <span 
                        className="font-medium"
                        style={{ color: "var(--green)" }}
                      >
                        {option.price}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Available Counsellors */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text-dark)" }}>
                Available Counsellors
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {counsellors.map((counsellor) => (
                  <Card 
                    key={counsellor.id}
                    className="p-6"
                    style={{ boxShadow: "var(--card-shadow)" }}
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback 
                          className="text-lg font-semibold"
                          style={{ 
                            backgroundColor: "var(--primary-blue)",
                            color: "white"
                          }}
                        >
                          {counsellor.image}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold" style={{ color: "var(--text-dark)" }}>
                              {counsellor.name}
                            </h3>
                            <p className="text-sm" style={{ color: "var(--text-light)" }}>
                              {counsellor.title}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star 
                              className="w-4 h-4 fill-current" 
                              style={{ color: "var(--amber)" }}
                            />
                            <span className="text-sm font-medium">{counsellor.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-3" style={{ color: "var(--text-light)" }}>
                          {counsellor.bio}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {counsellor.specialties.map((specialty, index) => (
                            <Badge 
                              key={index}
                              variant="secondary"
                              className="text-xs"
                              style={{ 
                                backgroundColor: "var(--lavender)",
                                color: "var(--text-dark)"
                              }}
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" style={{ color: "var(--text-light)" }} />
                              <span style={{ color: "var(--text-light)" }}>
                                {counsellor.experience}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" style={{ color: "var(--text-light)" }} />
                              <span 
                                style={{ 
                                  color: counsellor.availability.includes("Available Today") 
                                    ? "var(--green)" 
                                    : "var(--text-light)"
                                }}
                              >
                                {counsellor.availability}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            className="flex-1"
                            style={{ 
                              backgroundColor: "var(--primary-blue)",
                              color: "white"
                            }}
                            onClick={() => {
                              // In a real app, this would open booking modal
                              alert(`Booking confidential session with ${counsellor.name}...`);
                            }}
                          >
                            Book Confidential Session
                          </Button>
                          <Button 
                            variant="outline"
                            style={{ 
                              borderColor: "var(--primary-blue)",
                              color: "var(--primary-blue)"
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Emergency Support */}
            <Card 
              className="p-6 text-center"
              style={{ 
                backgroundColor: "var(--amber)",
                color: "white",
                boxShadow: "var(--card-shadow)"
              }}
            >
              <h3 className="font-semibold text-xl mb-2">
                Need Immediate Support?
              </h3>
              <p className="mb-4">
                If you're experiencing a mental health crisis, don't wait for an appointment. 
                Emergency support is available 24/7.
              </p>
              <Button 
                className="bg-white hover:bg-gray-100"
                style={{ color: "var(--amber)" }}
                onClick={() => window.open('tel:9152987821', '_self')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Crisis Helpline: 9152987821
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}