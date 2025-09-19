import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Trophy, 
  Download, 
  Share2, 
  Star, 
  Heart, 
  Sparkles,
  Calendar,
  Target,
  Flame,
  Medal
} from 'lucide-react';

interface CertificateModalProps {
  challenge: any;
  user: any;
  onClose: () => void;
}

export function CertificateModal({ challenge, user, onClose }: CertificateModalProps) {
  const [showFutureMessage, setShowFutureMessage] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getChallengeIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Target, Calendar, Heart, Trophy, Flame, Star
    };
    const IconComponent = icons[iconName] || Trophy;
    return <IconComponent className="w-6 h-6" />;
  };

  const downloadCertificate = () => {
    // This would typically generate a PDF or image
    // For now, we'll just show an alert
    alert('Certificate download feature coming soon! Screenshot this for now.');
  };

  const shareCertificate = () => {
    if (navigator.share) {
      navigator.share({
        title: `I completed my ${challenge.title} challenge!`,
        text: `Just finished my ${challenge.targetDays}-day ${challenge.title} challenge on Mitraa! 🎉`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `Just completed my ${challenge.targetDays}-day ${challenge.title} challenge on Mitraa! 🎉 #MitraaProgress #MentalHealthJourney`;
      navigator.clipboard.writeText(text);
      alert('Achievement copied to clipboard! Share it on your social media.');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Certificate */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
            <div className="bg-white rounded-lg shadow-2xl border-8 border-double border-primary-blue p-8 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-blue to-dark-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Medal className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-primary-blue mb-2">
                  Certificate of Achievement
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-primary-blue to-purple-500 mx-auto"></div>
              </div>

              {/* Main Content */}
              <div className="text-center mb-8">
                <p className="text-lg text-text-light mb-4">This is to certify that</p>
                <h2 className="text-4xl font-bold text-text-dark mb-4">
                  {user?.name || 'Amazing Individual'}
                </h2>
                <p className="text-lg text-text-light mb-6">has successfully completed the</p>
                
                <div className="bg-gradient-to-r from-primary-blue/10 to-purple-500/10 rounded-lg p-6 mb-6 border border-primary-blue/20">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${challenge.color}20`, color: challenge.color }}
                    >
                      {getChallengeIcon(challenge.icon)}
                    </div>
                    <h3 className="text-2xl font-bold text-text-dark">{challenge.title}</h3>
                  </div>
                  <Badge className="bg-primary-blue text-white">{challenge.category}</Badge>
                </div>

                <p className="text-lg text-text-light mb-6">
                  demonstrating exceptional commitment and perseverance over
                </p>
                <div className="text-5xl font-bold text-green mb-2">{challenge.targetDays}</div>
                <p className="text-xl text-text-light">consecutive days</p>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-primary-blue mx-auto mb-2" />
                  <div className="font-bold text-primary-blue">Started</div>
                  <div className="text-sm text-text-light">{formatDate(challenge.startDate)}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Trophy className="w-8 h-8 text-green mx-auto mb-2" />
                  <div className="font-bold text-green">Completed</div>
                  <div className="text-sm text-text-light">{formatDate(challenge.completedAt)}</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <Flame className="w-8 h-8 text-amber mx-auto mb-2" />
                  <div className="font-bold text-amber">Max Streak</div>
                  <div className="text-sm text-text-light">{challenge.currentStreak} days</div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-text-light">
                <p className="text-sm mb-2">
                  Awarded on {formatDate(challenge.completedAt)} by
                </p>
                <div className="text-primary-blue font-bold text-lg">
                  Mitraa - A Friend Who Cares
                </div>
                <p className="text-xs mt-2">
                  Digital Psychological Intervention System
                </p>
              </div>

              {/* Signature Line */}
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="w-32 h-px bg-gray-400 mb-2"></div>
                    <p className="text-xs text-text-light">Mental Health Platform</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-px bg-gray-400 mb-2"></div>
                    <p className="text-xs text-text-light">Certificate ID: {challenge.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Future Message */}
          {challenge.futureMessage && (
            <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50">
              <Card className="p-6 border-2 border-purple-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-dark">
                    Message from Past You
                  </h3>
                </div>
                <div className="bg-white p-4 rounded-lg italic text-text-dark">
                  "{challenge.futureMessage}"
                </div>
                <p className="text-xs text-text-light mt-2">
                  - Written when you started this challenge
                </p>
              </Card>
            </div>
          )}

          {/* Congratulations */}
          <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green mb-4">
                Congratulations!
              </h2>
              <p className="text-lg text-text-light max-w-2xl mx-auto mb-6">
                You've shown incredible dedication and self-discipline. Your commitment to personal growth 
                and mental wellness is truly inspiring. We're so proud of your achievement!
              </p>
              
              {/* Motivational Messages */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Card className="p-4 bg-white">
                  <h4 className="font-semibold text-text-dark mb-2">What This Means</h4>
                  <p className="text-sm text-text-light">
                    You've proven you can stick to your commitments and build positive habits. 
                    This skill will serve you well in all areas of life.
                  </p>
                </Card>
                <Card className="p-4 bg-white">
                  <h4 className="font-semibold text-text-dark mb-2">Keep Going</h4>
                  <p className="text-sm text-text-light">
                    This is just the beginning! Consider starting a new challenge or 
                    maintaining this healthy habit as part of your routine.
                  </p>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={downloadCertificate}
                  className="bg-primary-blue hover:bg-dark-blue text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
                <Button
                  onClick={shareCertificate}
                  variant="outline"
                  className="border-green text-green hover:bg-green hover:text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Achievement
                </Button>
                <Button
                  onClick={onClose}
                  variant="secondary"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}