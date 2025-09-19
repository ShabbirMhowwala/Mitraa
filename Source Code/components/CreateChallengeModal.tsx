import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea as TextareaComponent } from './ui/textarea';
import { 
  Target, 
  Moon, 
  Smartphone, 
  Dumbbell, 
  Book, 
  Heart, 
  Coffee, 
  Smile,
  TreePine,
  Utensils,
  Music,
  Palette
} from 'lucide-react';

interface CreateChallengeModalProps {
  onClose: () => void;
  onCreateChallenge: (challenge: any) => void;
}

const challengeTemplates = [
  {
    title: "Better Sleep Schedule",
    description: "Improve sleep quality by maintaining consistent bedtime",
    category: "Sleep & Rest",
    icon: "Moon",
    color: "#6366f1",
    suggestedDays: 21,
    tips: "Aim for 7-9 hours of sleep, avoid screens 1 hour before bed"
  },
  {
    title: "Digital Detox",
    description: "Reduce screen time and social media usage",
    category: "Digital Wellness",
    icon: "Smartphone",
    color: "#10b981",
    suggestedDays: 14,
    tips: "Set specific times for phone use, try phone-free zones"
  },
  {
    title: "Daily Exercise",
    description: "Build a consistent exercise routine",
    category: "Physical Health",
    icon: "Dumbbell",
    color: "#f59e0b",
    suggestedDays: 30,
    tips: "Start with 15-30 minutes daily, find activities you enjoy"
  },
  {
    title: "Mindful Reading",
    description: "Read for personal growth and relaxation",
    category: "Mental Growth",
    icon: "Book",
    color: "#8b5cf6",
    suggestedDays: 28,
    tips: "Even 15 minutes daily makes a difference"
  },
  {
    title: "Gratitude Practice",
    description: "Daily gratitude journaling for mental wellness",
    category: "Mindfulness",
    icon: "Heart",
    color: "#ef4444",
    suggestedDays: 21,
    tips: "Write 3 things you're grateful for each day"
  },
  {
    title: "Hydration Goal",
    description: "Drink adequate water throughout the day",
    category: "Health",
    icon: "Coffee",
    color: "#06b6d4",
    suggestedDays: 14,
    tips: "Aim for 8 glasses of water daily"
  }
];

const customCategories = [
  "Mental Health", "Physical Health", "Sleep & Rest", "Digital Wellness", 
  "Mindfulness", "Productivity", "Social Connection", "Creative Expression",
  "Learning", "Nutrition", "Self-Care", "Environmental"
];

const iconOptions = [
  { name: "Target", component: Target },
  { name: "Moon", component: Moon },
  { name: "Smartphone", component: Smartphone },
  { name: "Dumbbell", component: Dumbbell },
  { name: "Book", component: Book },
  { name: "Heart", component: Heart },
  { name: "Coffee", component: Coffee },
  { name: "Smile", component: Smile },
  { name: "TreePine", component: TreePine },
  { name: "Utensils", component: Utensils },
  { name: "Music", component: Music },
  { name: "Palette", component: Palette }
];

const colorOptions = [
  "#4a90e2", "#6dd5a1", "#ff9f43", "#8b5cf6", "#ef4444", 
  "#10b981", "#f59e0b", "#6366f1", "#06b6d4", "#ec4899"
];

export function CreateChallengeModal({ onClose, onCreateChallenge }: CreateChallengeModalProps) {
  const [step, setStep] = useState<'template' | 'custom' | 'details'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    targetDays: 21,
    color: '#4a90e2',
    icon: 'Target',
    isActive: true,
    startDate: new Date().toISOString().split('T')[0],
    futureMessage: ''
  });

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setFormData({
      ...formData,
      title: template.title,
      description: template.description,
      category: template.category,
      targetDays: template.suggestedDays,
      color: template.color,
      icon: template.icon
    });
    setStep('details');
  };

  const handleCustomChallenge = () => {
    setSelectedTemplate(null);
    setStep('custom');
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    onCreateChallenge(formData);
  };

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find(i => i.name === iconName);
    return icon ? icon.component : Target;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary-blue">
            {step === 'template' ? 'Choose Your Challenge' : 
             step === 'custom' ? 'Create Custom Challenge' : 'Challenge Details'}
          </DialogTitle>
        </DialogHeader>

        {step === 'template' && (
          <div className="space-y-6">
            <p className="text-text-light">
              Select a proven challenge template or create your own custom challenge
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {challengeTemplates.map((template, index) => {
                const IconComponent = getIconComponent(template.icon);
                return (
                  <Card 
                    key={index}
                    className="p-6 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border-2 hover:border-primary-blue/50"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${template.color}20`, color: template.color }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-dark mb-2">{template.title}</h3>
                        <p className="text-text-light text-sm mb-3">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                          <span className="text-xs text-text-light">
                            {template.suggestedDays} days
                          </span>
                        </div>
                        <p className="text-xs text-blue-600 mt-2 italic">
                          💡 {template.tips}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="text-center pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={handleCustomChallenge}
                className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
              >
                Create Custom Challenge
              </Button>
            </div>
          </div>
        )}

        {step === 'custom' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Challenge Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Morning Meditation"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Description *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe what you want to achieve..."
                    className="w-full h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Category *
                  </label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {customCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Target Days *
                  </label>
                  <Input
                    type="number"
                    value={formData.targetDays}
                    onChange={(e) => setFormData({...formData, targetDays: parseInt(e.target.value)})}
                    min="1"
                    max="365"
                    className="w-full"
                  />
                  <p className="text-xs text-text-light mt-1">
                    Recommended: 14-30 days for habit formation
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Choose Icon
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {iconOptions.map(icon => {
                      const IconComponent = icon.component;
                      return (
                        <button
                          key={icon.name}
                          type="button"
                          onClick={() => setFormData({...formData, icon: icon.name})}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                            formData.icon === icon.name 
                              ? 'bg-primary-blue text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Choose Color
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({...formData, color})}
                        className={`w-10 h-10 rounded-lg transition-all ${
                          formData.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={() => setStep('template')}>
                Back to Templates
              </Button>
              <Button 
                onClick={() => setStep('details')}
                className="bg-primary-blue hover:bg-dark-blue text-white"
                disabled={!formData.title || !formData.description || !formData.category}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-6">
            {/* Preview Card */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-text-dark mb-4">Challenge Preview</h3>
              <Card className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${formData.color}20`, color: formData.color }}
                  >
                    {React.createElement(getIconComponent(formData.icon), { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark">{formData.title}</h4>
                    <Badge variant="secondary" className="text-xs">{formData.category}</Badge>
                  </div>
                </div>
                <p className="text-text-light text-sm mb-2">{formData.description}</p>
                <p className="text-xs text-primary-blue">Target: {formData.targetDays} days</p>
              </Card>
            </div>

            {/* Future Message */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">
                Message to Future You (Optional)
              </label>
              <TextareaComponent
                value={formData.futureMessage}
                onChange={(e) => setFormData({...formData, futureMessage: e.target.value})}
                placeholder="Write an encouraging message that you'll see when you complete this challenge..."
                className="w-full h-24"
              />
              <p className="text-xs text-text-light mt-1">
                This personal message will be shown when you successfully complete your challenge
              </p>
            </div>

            {/* Motivation Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-2">💪 Tips for Success</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Start small - consistency matters more than perfection</li>
                <li>• Track your progress daily with photos and notes</li>
                <li>• Celebrate small wins along the way</li>
                <li>• Don't break the streak, but if you do, restart immediately</li>
                <li>• Share your progress with the Mitraa community for support</li>
              </ul>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => setStep(selectedTemplate ? 'template' : 'custom')}
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-primary-blue hover:bg-dark-blue text-white px-8"
              >
                Start Challenge
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}