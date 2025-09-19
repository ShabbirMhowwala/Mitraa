import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'mental-health' | 'community' | 'ai-chat';
  className?: string;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ 
  children, 
  variant = 'default',
  className = ''
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'mental-health':
        return {
          background: 'linear-gradient(135deg, #f5f0ff 0%, #e0f0ff 50%, #ffffff 100%)',
          accent: '#6dd5a1'
        };
      case 'community':
        return {
          background: 'linear-gradient(135deg, #e0f0ff 0%, #f5f0ff 50%, #fff5e6 100%)',
          accent: '#ff9f43'
        };
      case 'ai-chat':
        return {
          background: 'linear-gradient(135deg, #f0f5ff 0%, #ffffff 25%, #f5f0ff 100%)',
          accent: '#4a90e2'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #f0f5ff 0%, #ffffff 25%, #f5f0ff 50%, #e0f0ff 75%, #ffffff 100%)',
          accent: '#4a90e2'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{ background: styles.background }}
      />
      
      {/* Advanced pattern overlay */}
      <div className="absolute inset-0">
        {/* Brain-inspired neural network */}
        <svg className="absolute inset-0 w-full h-full opacity-8" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`neural-${variant}`} x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
              {/* Neural nodes */}
              <circle cx="25" cy="25" r="3" fill={styles.accent} opacity="0.3" />
              <circle cx="75" cy="50" r="2" fill="#6dd5a1" opacity="0.4" />
              <circle cx="125" cy="75" r="2.5" fill="#ff9f43" opacity="0.3" />
              <circle cx="50" cy="100" r="2" fill={styles.accent} opacity="0.5" />
              <circle cx="100" cy="125" r="3" fill="#6dd5a1" opacity="0.3" />
              
              {/* Neural connections */}
              <path d="M25,25 Q50,35 75,50" stroke={styles.accent} strokeWidth="1" opacity="0.2" fill="none" />
              <path d="M75,50 Q90,60 125,75" stroke="#6dd5a1" strokeWidth="0.8" opacity="0.25" fill="none" />
              <path d="M125,75 Q85,90 50,100" stroke="#ff9f43" strokeWidth="0.6" opacity="0.2" fill="none" />
              <path d="M50,100 Q75,110 100,125" stroke={styles.accent} strokeWidth="0.8" opacity="0.3" fill="none" />
            </pattern>
            
            {/* Animated gradient */}
            <radialGradient id={`glow-${variant}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={styles.accent} stopOpacity="0.1" />
              <stop offset="100%" stopColor={styles.accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#neural-${variant})`} />
        </svg>
        
        {/* Floating geometric elements */}
        <div className="absolute top-10 right-10 w-20 h-20 opacity-10 animate-spin" style={{ animationDuration: '25s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50,10 L90,35 L90,65 L50,90 L10,65 L10,35 Z" fill={styles.accent} />
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-10 w-16 h-16 opacity-8 animate-pulse" style={{ animationDuration: '4s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#6dd5a1" />
            <circle cx="50" cy="50" r="25" fill="white" fillOpacity="0.3" />
          </svg>
        </div>
        
        {/* Mitraa-inspired heart connections */}
        <div className="absolute top-1/2 left-1/4 w-12 h-12 opacity-12 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full" fill={styles.accent}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        
        {/* Handshake connection symbol */}
        <div className="absolute bottom-1/3 right-1/4 w-14 h-14 opacity-10 animate-bounce" style={{ animationDuration: '6s' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full" fill="#ff9f43">
            <path d="M11 6V4h2v2h-2zm5 0V4h2v2h-2zM7 6V4h2v2H7zm0 6v-2h2v2H7zm8 0v-2h2v2h-2zm-4 0v-2h2v2h-2z"/>
            <path d="M5 8v6c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4V8H5z"/>
          </svg>
        </div>
        
        {/* Flowing wave pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5">
          <svg width="100%" height="100%" className="absolute bottom-0">
            <defs>
              <linearGradient id={`wave-gradient-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={styles.accent} stopOpacity="0.3" />
                <stop offset="100%" stopColor={styles.accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,64 Q120,32 240,64 T480,64 T720,64 T960,64 T1200,64 T1440,64 L1440,128 L0,128 Z"
              fill={`url(#wave-gradient-${variant})`}
              className="animate-pulse"
              style={{ animationDuration: '8s' }}
            />
            <path
              d="M0,80 Q180,48 360,80 T720,80 T1080,80 T1440,80 L1440,128 L0,128 Z"
              fill={`url(#wave-gradient-${variant})`}
              opacity="0.5"
              className="animate-pulse"
              style={{ animationDuration: '6s', animationDelay: '2s' }}
            />
          </svg>
        </div>
        
        {/* Particle system */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-20 animate-pulse"
              style={{
                background: i % 3 === 0 ? styles.accent : i % 3 === 1 ? '#6dd5a1' : '#ff9f43',
                left: `${15 + (i * 12) % 70}%`,
                top: `${10 + (i * 15) % 80}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: '4s'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};