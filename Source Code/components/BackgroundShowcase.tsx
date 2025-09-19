import React, { useState } from 'react';
import { ProminentBackground } from './ProminentBackground';
import { HeroBackground } from './HeroBackground';
import { Button } from './ui/button';

export const BackgroundShowcase: React.FC = () => {
  const [currentBg, setCurrentBg] = useState<'subtle' | 'prominent' | 'hero'>('prominent');
  const [variant, setVariant] = useState<'hero' | 'mental-health' | 'community' | 'ai-chat'>('hero');

  const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
    switch (currentBg) {
      case 'prominent':
        return (
          <ProminentBackground variant={variant} className="min-h-screen">
            {children}
          </ProminentBackground>
        );
      case 'hero':
        return (
          <HeroBackground variant={variant === 'hero' ? 'default' : variant} className="min-h-screen">
            {children}
          </HeroBackground>
        );
      default:
        return (
          <div className="min-h-screen bg-hero-pattern">
            {children}
          </div>
        );
    }
  };

  return (
    <BackgroundWrapper>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="mb-4 text-primary-blue">Mitraa Background Showcase</h1>
          <p className="text-text-light mb-8">Experience different background styles for the Mitraa platform</p>
          
          {/* Background Type Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button
              variant={currentBg === 'subtle' ? 'default' : 'outline'}
              onClick={() => setCurrentBg('subtle')}
            >
              Subtle Background
            </Button>
            <Button
              variant={currentBg === 'prominent' ? 'default' : 'outline'}
              onClick={() => setCurrentBg('prominent')}
            >
              Prominent Background
            </Button>
            <Button
              variant={currentBg === 'hero' ? 'default' : 'outline'}
              onClick={() => setCurrentBg('hero')}
            >
              Hero Background
            </Button>
          </div>
          
          {/* Variant Controls */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="sm"
              variant={variant === 'hero' ? 'default' : 'secondary'}
              onClick={() => setVariant('hero')}
            >
              Default
            </Button>
            <Button
              size="sm"
              variant={variant === 'mental-health' ? 'default' : 'secondary'}
              onClick={() => setVariant('mental-health')}
            >
              Mental Health
            </Button>
            <Button
              size="sm"
              variant={variant === 'community' ? 'default' : 'secondary'}
              onClick={() => setVariant('community')}
            >
              Community
            </Button>
            <Button
              size="sm"
              variant={variant === 'ai-chat' ? 'default' : 'secondary'}
              onClick={() => setVariant('ai-chat')}
            >
              AI Chat
            </Button>
          </div>
        </div>

        {/* Sample Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <div className="glass-morphism p-6 rounded-lg">
            <h3 className="text-primary-blue mb-3">Mental Health Support</h3>
            <p className="text-text-light">
              Our AI-powered chat provides 24/7 emotional support and guidance for students facing mental health challenges.
            </p>
          </div>
          
          <div className="glass-morphism p-6 rounded-lg">
            <h3 className="text-green mb-3">Peer Community</h3>
            <p className="text-text-light">
              Connect with fellow students in a safe, supportive environment where you can share experiences and find understanding.
            </p>
          </div>
          
          <div className="glass-morphism p-6 rounded-lg">
            <h3 className="text-amber mb-3">Professional Help</h3>
            <p className="text-text-light">
              Book confidential sessions with licensed counselors who understand the unique challenges of student life.
            </p>
          </div>
        </div>

        {/* Feature Showcase */}
        <div className="mt-16 text-center">
          <div className="glass-morphism p-8 rounded-xl max-w-2xl mx-auto">
            <h2 className="text-primary-blue mb-4">Background Features</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-dark-blue mb-2">Visual Elements</h4>
                <ul className="text-text-light space-y-1">
                  <li>• High-quality stock images</li>
                  <li>• Animated geometric shapes</li>
                  <li>• Neural network patterns</li>
                  <li>• Glassmorphism effects</li>
                </ul>
              </div>
              <div>
                <h4 className="text-dark-blue mb-2">Brand Integration</h4>
                <ul className="text-text-light space-y-1">
                  <li>• Mitraa color palette</li>
                  <li>• Mental health iconography</li>
                  <li>• Floating animations</li>
                  <li>• Cultural sensitivity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};