import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProminentBackgroundProps {
  children: React.ReactNode;
  variant?: 'hero' | 'mental-health' | 'community' | 'ai-chat';
  className?: string;
  showImage?: boolean;
}

export const ProminentBackground: React.FC<ProminentBackgroundProps> = ({ 
  children, 
  variant = 'hero',
  className = '',
  showImage = true
}) => {
  const getBackgroundImage = () => {
    switch (variant) {
      case 'mental-health':
        return "https://images.unsplash.com/photo-1620147512372-9e00421556bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1lbnRhbCUyMGhlYWx0aCUyMHdlbGxuZXNzJTIwZ3JhZGllbnR8ZW58MXx8fHwxNzU3Nzg3MDM4fDA&ixlib=rb-4.1.0&q=80&w=1080";
      case 'community':
        return "https://images.unsplash.com/photo-1659959103980-e3a592db195b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHNoYXBlcyUyMGJsdWUlMjBwdXJwbGV8ZW58MXx8fHwxNzU3Nzg3MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080";
      case 'ai-chat':
        return "https://images.unsplash.com/photo-1615414822783-ed5a3b983068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG1lZGl0YXRpb24lMjBhYnN0cmFjdCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU3Nzg3MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080";
      default:
        return "https://images.unsplash.com/photo-1620147512372-9e00421556bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1lbnRhbCUyMGhlYWx0aCUyMHdlbGxuZXNzJTIwZ3JhZGllbnR8ZW58MXx8fHwxNzU3Nzg3MDM4fDA&ixlib=rb-4.1.0&q=80&w=1080";
    }
  };

  const getOverlayGradient = () => {
    switch (variant) {
      case 'mental-health':
        return 'linear-gradient(135deg, rgba(245, 240, 255, 0.9) 0%, rgba(224, 240, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%)';
      case 'community':
        return 'linear-gradient(135deg, rgba(224, 240, 255, 0.9) 0%, rgba(245, 240, 255, 0.8) 50%, rgba(255, 245, 230, 0.9) 100%)';
      case 'ai-chat':
        return 'linear-gradient(135deg, rgba(240, 245, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 25%, rgba(245, 240, 255, 0.9) 100%)';
      default:
        return 'linear-gradient(135deg, rgba(240, 245, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 25%, rgba(245, 240, 255, 0.9) 50%, rgba(224, 240, 255, 0.8) 75%, rgba(255, 255, 255, 0.9) 100%)';
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Image Layer */}
      {showImage && (
        <div className="absolute inset-0">
          <ImageWithFallback
            src={getBackgroundImage()}
            alt={`${variant} background`}
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{ background: getOverlayGradient() }}
          />
        </div>
      )}
      
      {/* Animated Elements Layer */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating circles with glassmorphism */}
        <div className="absolute top-20 right-20 w-64 h-64 glass-morphism rounded-full opacity-30 floating-animation">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20" />
        </div>
        
        <div className="absolute bottom-32 left-16 w-48 h-48 glass-morphism rounded-full opacity-25 floating-animation" style={{ animationDelay: '2s' }}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400/20 to-blue-400/20" />
        </div>
        
        <div className="absolute top-1/2 left-1/4 w-32 h-32 glass-morphism rounded-full opacity-20 floating-animation" style={{ animationDelay: '1s' }}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400/20 to-green-400/20" />
        </div>
        
        {/* Mitraa-branded elements */}
        <div className="absolute top-10 left-10 opacity-15">
          <svg width="80" height="80" viewBox="0 0 100 100" className="animate-pulse" style={{ animationDuration: '3s' }}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#4a90e2" strokeWidth="2" strokeDasharray="5,5" />
            <path d="M30,50 Q50,30 70,50 Q50,70 30,50" fill="#6dd5a1" opacity="0.6" />
            <circle cx="40" cy="45" r="3" fill="#4a90e2" />
            <circle cx="60" cy="45" r="3" fill="#4a90e2" />
            <path d="M35,60 Q50,70 65,60" stroke="#ff9f43" strokeWidth="2" fill="none" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-32 opacity-12">
          <svg width="60" height="60" viewBox="0 0 100 100" className="floating-animation" style={{ animationDelay: '1.5s' }}>
            <path d="M20,50 Q30,30 50,40 Q70,30 80,50 Q70,70 50,60 Q30,70 20,50" fill="#4a90e2" opacity="0.4" />
            <circle cx="35" cy="50" r="8" fill="white" opacity="0.6" />
            <circle cx="65" cy="50" r="8" fill="white" opacity="0.6" />
            <path d="M25,65 Q50,75 75,65" stroke="#6dd5a1" strokeWidth="3" fill="none" />
          </svg>
        </div>
        
        {/* Neural network pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`enhanced-neural-${variant}`} x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
              {/* Main nodes */}
              <circle cx="75" cy="75" r="4" fill="#4a90e2" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="225" cy="75" r="3" fill="#6dd5a1" opacity="0.5">
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite" />
              </circle>
              <circle cx="225" cy="225" r="3.5" fill="#ff9f43" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="75" cy="225" r="3" fill="#4a90e2" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="4.5s" repeatCount="indefinite" />
              </circle>
              
              {/* Connection lines */}
              <path d="M75,75 Q150,50 225,75" stroke="#4a90e2" strokeWidth="1" opacity="0.3" fill="none">
                <animate attributeName="opacity" values="0.1;0.4;0.1" dur="6s" repeatCount="indefinite" />
              </path>
              <path d="M225,75 Q250,150 225,225" stroke="#6dd5a1" strokeWidth="1" opacity="0.3" fill="none">
                <animate attributeName="opacity" values="0.1;0.5;0.1" dur="5s" repeatCount="indefinite" />
              </path>
              <path d="M225,225 Q150,250 75,225" stroke="#ff9f43" strokeWidth="1" opacity="0.3" fill="none">
                <animate attributeName="opacity" values="0.1;0.4;0.1" dur="7s" repeatCount="indefinite" />
              </path>
              <path d="M75,225 Q50,150 75,75" stroke="#4a90e2" strokeWidth="1" opacity="0.3" fill="none">
                <animate attributeName="opacity" values="0.1;0.6;0.1" dur="4s" repeatCount="indefinite" />
              </path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#enhanced-neural-${variant})`} />
        </svg>
        
        {/* Flowing particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-pulse floating-animation"
              style={{
                width: `${2 + (i % 4)}px`,
                height: `${2 + (i % 4)}px`,
                background: i % 4 === 0 ? '#4a90e2' : 
                           i % 4 === 1 ? '#6dd5a1' : 
                           i % 4 === 2 ? '#ff9f43' : '#f5f0ff',
                left: `${5 + (i * 6) % 90}%`,
                top: `${5 + (i * 8) % 90}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + (i % 3)}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};