import React from 'react';

const GeometricShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Tribal Growth Arrow - Top Left */}
      <div className="absolute top-32 left-12 w-64 h-48 opacity-10">
        <svg viewBox="0 0 200 150" className="w-full h-full">
          <defs>
            <linearGradient id="tribal-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(239, 68, 68)" />
              <stop offset="50%" stopColor="rgb(251, 191, 36)" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" />
            </linearGradient>
          </defs>
          {/* Upward growth arrow with tribal elements */}
          <path d="M20,120 L40,100 L40,110 L60,90 L60,100 L80,80 L80,90 L100,70 L100,80 L120,60 L120,70 L140,50 L140,60 L160,40 L160,50 L180,30"
                stroke="url(#tribal-gradient-1)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Tribal diamond markers along the path */}
          <circle cx="40" cy="105" r="3" fill="rgb(251, 191, 36)" />
          <circle cx="80" cy="85" r="3" fill="rgb(251, 191, 36)" />
          <circle cx="120" cy="65" r="3" fill="rgb(251, 191, 36)" />
          <circle cx="160" cy="45" r="3" fill="rgb(16, 185, 129)" />
        </svg>
      </div>

      {/* Tribal Mountain/Peak Symbol - Represents Reaching Goals */}
      <div className="absolute top-1/4 right-16 w-40 h-40 opacity-8">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <linearGradient id="peak-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(16, 185, 129)" />
              <stop offset="100%" stopColor="rgb(251, 191, 36)" />
            </linearGradient>
          </defs>
          {/* Mountain peak with sun */}
          <path d="M60,20 L80,60 L100,60 L60,20 L20,60 L40,60 Z"
                stroke="url(#peak-gradient)" strokeWidth="2.5" fill="none" strokeLinejoin="miter"/>
          {/* Sun/achievement circle */}
          <circle cx="60" cy="15" r="8" stroke="rgb(251, 191, 36)" strokeWidth="2" fill="none" />
          <circle cx="60" cy="15" r="3" fill="rgb(251, 191, 36)" />
          {/* Base line - foundation */}
          <line x1="15" y1="65" x2="105" y2="65" stroke="rgb(251, 191, 36)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Tribal Circular Pattern - Wholeness & Balance */}
      <div className="absolute bottom-1/3 left-16 w-56 h-56 opacity-8">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin" style={{ animationDuration: '40s' }}>
          <defs>
            <linearGradient id="circle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(251, 191, 36)" />
              <stop offset="100%" stopColor="rgb(251, 146, 60)" />
            </linearGradient>
          </defs>
          {/* Outer circle */}
          <circle cx="100" cy="100" r="80" stroke="url(#circle-gradient)" strokeWidth="2" fill="none" />
          {/* Middle circle */}
          <circle cx="100" cy="100" r="60" stroke="url(#circle-gradient)" strokeWidth="1.5" fill="none" />
          {/* Inner circle */}
          <circle cx="100" cy="100" r="40" stroke="url(#circle-gradient)" strokeWidth="1" fill="none" />
          {/* 4 cardinal points - representing 4 pillars */}
          <circle cx="100" cy="20" r="4" fill="rgb(251, 191, 36)" />
          <circle cx="180" cy="100" r="4" fill="rgb(251, 191, 36)" />
          <circle cx="100" cy="180" r="4" fill="rgb(251, 191, 36)" />
          <circle cx="20" cy="100" r="4" fill="rgb(251, 191, 36)" />
          {/* Center point - the self */}
          <circle cx="100" cy="100" r="6" fill="rgb(16, 185, 129)" />
        </svg>
      </div>

      {/* Tribal Connection Lines - Right Side */}
      <div className="absolute top-1/2 right-24 w-48 h-64 opacity-8">
        <svg viewBox="0 0 150 200" className="w-full h-full">
          <defs>
            <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(251, 191, 36)" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" />
            </linearGradient>
          </defs>
          {/* Interconnected paths representing growth journey */}
          <path d="M20,20 Q40,60 20,100 T20,160" stroke="url(#connection-gradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M50,30 Q70,70 50,110 T50,170" stroke="url(#connection-gradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
          <path d="M80,40 Q100,80 80,120 T80,180" stroke="url(#connection-gradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
          {/* Achievement nodes */}
          <circle cx="20" cy="40" r="3" fill="rgb(239, 68, 68)" />
          <circle cx="20" cy="100" r="3" fill="rgb(251, 191, 36)" />
          <circle cx="20" cy="160" r="4" fill="rgb(16, 185, 129)" />
        </svg>
      </div>

      {/* Tribal Strength Symbol - Bottom Right */}
      <div className="absolute bottom-32 right-20 w-32 h-32 opacity-8">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="strength-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(251, 191, 36)" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" />
            </linearGradient>
          </defs>
          {/* Shield/strength symbol */}
          <path d="M50,10 L80,25 L80,55 Q80,75 50,90 Q20,75 20,55 L20,25 Z"
                stroke="url(#strength-gradient)" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
          {/* Inner strength lines */}
          <line x1="50" y1="30" x2="50" y2="70" stroke="rgb(251, 191, 36)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="35" y1="50" x2="65" y2="50" stroke="rgb(251, 191, 36)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Tribal Step Pattern - Left Side Middle */}
      <div className="absolute top-1/2 left-20 w-40 h-56 opacity-8">
        <svg viewBox="0 0 120 180" className="w-full h-full">
          <defs>
            <linearGradient id="steps-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(239, 68, 68)" />
              <stop offset="50%" stopColor="rgb(251, 191, 36)" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" />
            </linearGradient>
          </defs>
          {/* Ascending steps representing progress */}
          <path d="M20,160 L40,160 L40,130 L60,130 L60,100 L80,100 L80,70 L100,70 L100,40"
                stroke="url(#steps-gradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Milestone markers */}
          <circle cx="30" cy="160" r="4" fill="rgb(239, 68, 68)" />
          <circle cx="50" cy="130" r="4" fill="rgb(251, 146, 60)" />
          <circle cx="70" cy="100" r="4" fill="rgb(251, 191, 36)" />
          <circle cx="90" cy="70" r="4" fill="rgb(234, 179, 8)" />
          <circle cx="100" cy="40" r="5" fill="rgb(16, 185, 129)" />
        </svg>
      </div>

      {/* Subtle Grid Lines - Perspective */}
      <div className="absolute bottom-0 left-0 right-0 h-96 opacity-5" style={{ perspective: '1000px' }}>
        <div className="w-full h-full" style={{ transform: 'rotateX(60deg)', transformStyle: 'preserve-3d' }}>
          <div className="grid grid-cols-12 gap-0 w-full h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`v-${i}`} className="border-l border-amber-500/30"></div>
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-12 gap-0 w-full h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`h-${i}`} className="border-t border-amber-500/30"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-emerald-500/5 animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>
    </div>
  );
};

export default GeometricShapes;
