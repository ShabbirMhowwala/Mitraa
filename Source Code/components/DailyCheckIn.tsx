import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Camera, 
  CheckCircle, 
  X, 
  Smile, 
  Meh, 
  Frown,
  Heart,
  Target,
  Calendar,
  Upload
} from 'lucide-react';

interface DailyCheckInProps {
  challenge: any;
  onClose: () => void;
  onSubmit: (challengeId: string, entry: any) => void;
  existingEntry?: any;
}

const moodEmojis = [
  { value: 1, emoji: '😞', label: 'Very Low', color: '#ef4444' },
  { value: 2, emoji: '😕', label: 'Low', color: '#f97316' },
  { value: 3, emoji: '😐', label: 'Neutral', color: '#eab308' },
  { value: 4, emoji: '😊', label: 'Good', color: '#22c55e' },
  { value: 5, emoji: '😄', label: 'Excellent', color: '#16a34a' }
];

export function DailyCheckIn({ challenge, onClose, onSubmit, existingEntry }: DailyCheckInProps) {
  const [completed, setCompleted] = useState(existingEntry?.completed || false);
  const [note, setNote] = useState(existingEntry?.note || '');
  const [mood, setMood] = useState(existingEntry?.mood || 3);
  const [photo, setPhoto] = useState(existingEntry?.photo || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const entry = {
      completed,
      note,
      mood,
      photo
    };

    onSubmit(challenge.id, entry);
    setIsSubmitting(false);
  };

  const getCurrentMoodEmoji = () => {
    return moodEmojis.find(m => m.value === mood) || moodEmojis[2];
  };

  const getChallengeIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Target, Calendar, Heart
    };
    const IconComponent = icons[iconName] || Target;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary-blue flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${challenge.color}20`, color: challenge.color }}
            >
              {getChallengeIcon(challenge.icon)}
            </div>
            <span>Daily Check-In</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Challenge Info */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-text-dark">{challenge.title}</h3>
              <Badge variant="secondary">{challenge.category}</Badge>
            </div>
            <p className="text-text-light text-sm mb-3">{challenge.description}</p>
            <div className="flex items-center justify-between text-xs text-text-light">
              <span>Current Streak: {challenge.currentStreak} days</span>
              <span>Target: {challenge.targetDays} days</span>
            </div>
          </Card>

          {/* Completion Status */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-3">
              Did you complete your challenge today?
            </label>
            <div className="flex space-x-4">
              <Card 
                className={`p-4 cursor-pointer transition-all ${
                  completed ? 'border-2 border-green bg-green-50' : 'border hover:border-gray-300'
                }`}
                onClick={() => setCompleted(true)}
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className={`w-6 h-6 ${completed ? 'text-green' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-medium text-text-dark">Yes, I did it!</div>
                    <div className="text-xs text-text-light">Keep the streak going</div>
                  </div>
                </div>
              </Card>

              <Card 
                className={`p-4 cursor-pointer transition-all ${
                  !completed ? 'border-2 border-orange-400 bg-orange-50' : 'border hover:border-gray-300'
                }`}
                onClick={() => setCompleted(false)}
              >
                <div className="flex items-center space-x-3">
                  <X className={`w-6 h-6 ${!completed ? 'text-orange-400' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-medium text-text-dark">Not today</div>
                    <div className="text-xs text-text-light">That's okay, try again tomorrow</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Mood Tracking */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-3">
              How are you feeling today?
            </label>
            <div className="space-y-3">
              <div className="flex justify-center items-center space-x-6">
                {moodEmojis.map((moodOption) => (
                  <button
                    key={moodOption.value}
                    type="button"
                    onClick={() => setMood(moodOption.value)}
                    className={`text-4xl transition-all hover:scale-110 ${
                      mood === moodOption.value ? 'scale-125 ring-4 ring-offset-2 rounded-full' : ''
                    }`}
                    style={{ 
                      ringColor: mood === moodOption.value ? moodOption.color : 'transparent' 
                    }}
                  >
                    {moodOption.emoji}
                  </button>
                ))}
              </div>
              <div className="text-center">
                <span className="text-sm font-medium" style={{ color: getCurrentMoodEmoji().color }}>
                  {getCurrentMoodEmoji().label}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Add a note about your progress (optional)
            </label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How did it go? Any insights, challenges, or wins to record?"
              className="w-full h-24"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Add a progress photo (optional)
            </label>
            <div className="space-y-3">
              {photo ? (
                <div className="relative">
                  <ImageWithFallback
                    src={photo}
                    alt="Progress photo"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setPhoto('')}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Card 
                  className="p-8 border-dashed border-2 border-gray-300 hover:border-primary-blue cursor-pointer transition-all"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-text-light">Click to add a progress photo</p>
                    <p className="text-xs text-text-light mt-1">
                      Show your journey visually - before/after, workout pics, healthy meals, etc.
                    </p>
                  </div>
                </Card>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              
              {!photo && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              )}
            </div>
          </div>

          {/* Motivational Section */}
          {completed && (
            <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green" />
                <span className="font-semibold text-green">Awesome work!</span>
              </div>
              <p className="text-sm text-green-700">
                You're {challenge.currentStreak + (completed ? 1 : 0)} day(s) into your {challenge.targetDays}-day journey. 
                Every step counts towards building a healthier, happier you!
              </p>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary-blue hover:bg-dark-blue text-white px-8"
            >
              {isSubmitting ? 'Saving...' : existingEntry ? 'Update Entry' : 'Save Progress'}
            </Button>
          </div>

          {/* Streak Encouragement */}
          <div className="text-center text-xs text-text-light">
            <p>
              💡 Tip: Consistency is key! Even small progress is progress. 
              {challenge.currentStreak > 0 && ` You're on a ${challenge.currentStreak}-day streak - keep it going!`}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}