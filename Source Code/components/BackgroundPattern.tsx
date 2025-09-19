import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const BackgroundPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base image background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1620147512372-9e00421556bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1lbnRhbCUyMGhlYWx0aCUyMHdlbGxuZXNzJTIwZ3JhZGllbnR8ZW58MXx8fHwxNzU3Nzg3MDM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mental Health Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/90" />
      </div>
      
      {/* Enhanced gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(240, 245, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 25%, rgba(245, 240, 255, 0.95) 50%, rgba(224, 240, 255, 0.9) 75%, rgba(255, 255, 255, 0.85) 100%)'
        }}
      />
      
      {/* Animated floating elements */}
      <div className="absolute inset-0">
        {/* Large decorative circles - Made more visible */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 animate-pulse"
          style={{
            background: 'radial-gradient(circle, #4a90e2 0%, transparent 70%)',
            top: '10%',
            right: '10%',
            animationDuration: '4s'
          }}
        />
        
        <div 
          className="absolute w-80 h-80 rounded-full opacity-15 animate-pulse"
          style={{
            background: 'radial-gradient(circle, #6dd5a1 0%, transparent 70%)',
            bottom: '15%',
            left: '5%',
            animationDuration: '6s',
            animationDelay: '2s'
          }}
        />
        
        <div 
          className="absolute w-64 h-64 rounded-full opacity-12 animate-pulse"
          style={{
            background: 'radial-gradient(circle, #ff9f43 0%, transparent 70%)',
            top: '40%',
            left: '15%',
            animationDuration: '5s',
            animationDelay: '1s'
          }}
        />
        
        {/* Additional abstract geometric background */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1659959103980-e3a592db195b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHNoYXBlcyUyMGJsdWUlMjBwdXJwbGV8ZW58MXx8fHwxNzU3Nzg3MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Geometric Background"
            className="w-full h-full object-cover opacity-10 mix-blend-overlay"
          />
        </div>
        
        {/* Enhanced Geometric shapes */}
        <div className="absolute top-20 right-1/4 w-32 h-32 opacity-15 animate-spin floating-animation" style={{ animationDuration: '20s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,10 90,90 10,90" fill="#4a90e2" />
          </svg>
        </div>
        
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 opacity-12 animate-spin floating-animation" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="20" y="20" width="60" height="60" fill="#6dd5a1" rx="8" />
          </svg>
        </div>
        
        {/* Mental health themed icons */}
        <div className="absolute top-1/3 left-10 w-20 h-20 opacity-15 floating-animation">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="#4a90e2">
            <path d="M50 15c-19.3 0-35 15.7-35 35 0 25 35 50 35 50s35-25 35-50c0-19.3-15.7-35-35-35zm0 47.5c-6.9 0-12.5-5.6-12.5-12.5s5.6-12.5 12.5-12.5 12.5 5.6 12.5 12.5-5.6 12.5-12.5 12.5z"/>
          </svg>
        </div>
        
        <div className="absolute bottom-1/3 right-20 w-16 h-16 opacity-12 floating-animation" style={{ animationDelay: '2s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="#6dd5a1">
            <path d="M50 10c-4.4 0-8 3.6-8 8v4c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V38c0-8.8-7.2-16-16-16v-4c0-4.4-3.6-8-8-8z"/>
            <circle cx="45" cy="50" r="3"/>
            <circle cx="55" cy="50" r="3"/>
            <path d="M40 60c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#6dd5a1" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        
        {/* Connecting lines pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-3" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="connection-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#4a90e2" opacity="0.3" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="#4a90e2" strokeWidth="0.5" opacity="0.2" />
              <line x1="50" y1="50" x2="100" y2="100" stroke="#6dd5a1" strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#connection-pattern)" />
        </svg>
        
        {/* Enhanced mesh gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, #f5f0ff 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #e0f0ff 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(255, 159, 67, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 60% 60%, rgba(109, 213, 161, 0.1) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Peaceful meditation overlay */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1615414822783-ed5a3b983068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG1lZGl0YXRpb24lMjBhYnN0cmFjdCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU3Nzg3MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Peaceful Background"
            className="w-full h-full object-cover rounded-bl-[100px] mix-blend-soft-light"
          />
        </div>
        
        {/* Enhanced brain/neural network inspired dots */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-pulse"
              style={{
                width: `${1 + (i % 3)}px`,
                height: `${1 + (i % 3)}px`,
                background: i % 3 === 0 ? '#4a90e2' : i % 3 === 1 ? '#6dd5a1' : '#ff9f43',
                left: `${10 + (i * 7) % 80}%`,
                top: `${10 + (i * 11) % 80}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '4s'
              }}
            />
          ))}
        </div>
        
        {/* Connection lines between dots */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-connections" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M50,50 Q100,25 150,50 Q175,100 150,150 Q100,175 50,150 Q25,100 50,50" 
                    stroke="#4a90e2" strokeWidth="1" fill="none" opacity="0.3" />
              <circle cx="50" cy="50" r="2" fill="#4a90e2" opacity="0.5" />
              <circle cx="150" cy="50" r="2" fill="#6dd5a1" opacity="0.5" />
              <circle cx="150" cy="150" r="2" fill="#ff9f43" opacity="0.5" />
              <circle cx="50" cy="150" r="2" fill="#4a90e2" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-connections)" />
        </svg>
        
        {/* Heartbeat line pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-px opacity-5">
          <svg width="100%" height="100" className="absolute bottom-0">
            <path
              d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50"
              stroke="#6dd5a1"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>
      
      {/* Noise texture overlay for added depth */}
      <div 
        className="absolute inset-0 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};