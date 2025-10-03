import React from 'react';

const GeometricShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Rotating Rings */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 opacity-10">
        <div className="absolute inset-0 border-2 border-amber-500 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute inset-4 border-2 border-amber-400 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        <div className="absolute inset-8 border-2 border-amber-300 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
      </div>

      {/* Floating Cube - Top Right */}
      <div className="absolute top-20 right-1/4 w-32 h-32 opacity-5">
        <div className="w-full h-full animate-float" style={{ animation: 'float 6s ease-in-out infinite' }}>
          <div className="relative w-full h-full" style={{ transform: 'rotateX(45deg) rotateY(45deg)', transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400"></div>
          </div>
        </div>
      </div>

      {/* Grid Lines - Perspective */}
      <div className="absolute bottom-0 left-0 right-0 h-96 opacity-10" style={{ perspective: '1000px' }}>
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

      {/* Floating Hexagons */}
      <div className="absolute top-1/2 right-1/3 w-24 h-24 opacity-5 animate-bounce" style={{ animationDuration: '8s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="rgb(251, 191, 36)" strokeWidth="2"/>
        </svg>
      </div>

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-emerald-500/5 animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>

      {/* Flowing Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(251, 191, 36)" stopOpacity="0.5"/>
            <stop offset="50%" stopColor="rgb(251, 146, 60)" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.5"/>
          </linearGradient>
        </defs>
        <path d="M0,100 Q250,50 500,100 T1000,100" fill="none" stroke="url(#line-gradient)" strokeWidth="2" className="animate-pulse">
          <animate attributeName="d" dur="10s" repeatCount="indefinite"
            values="M0,100 Q250,50 500,100 T1000,100;
                    M0,100 Q250,150 500,100 T1000,100;
                    M0,100 Q250,50 500,100 T1000,100"/>
        </path>
        <path d="M0,200 Q250,150 500,200 T1000,200" fill="none" stroke="url(#line-gradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1s' }}>
          <animate attributeName="d" dur="8s" repeatCount="indefinite"
            values="M0,200 Q250,150 500,200 T1000,200;
                    M0,200 Q250,250 500,200 T1000,200;
                    M0,200 Q250,150 500,200 T1000,200"/>
        </path>
      </svg>

      {/* 3D Pyramid */}
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 opacity-5" style={{ perspective: '500px' }}>
        <div className="relative w-full h-full animate-spin" style={{ animationDuration: '30s', transformStyle: 'preserve-3d' }}>
          <div className="absolute w-0 h-0 left-1/2 top-0"
            style={{
              borderLeft: '80px solid transparent',
              borderRight: '80px solid transparent',
              borderBottom: '140px solid rgb(251, 191, 36)',
              transform: 'translateX(-50%) rotateX(20deg)'
            }}></div>
        </div>
      </div>
    </div>
  );
};

export default GeometricShapes;
