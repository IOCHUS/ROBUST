import React from 'react';

const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">

      {/* Hero Section - Gradient Bubbles */}
      <div className="absolute top-20 -right-80 w-80 h-80 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[700px] -left-80 w-96 h-96 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-400 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[450px] right-[10%] w-64 h-64 opacity-15">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4">
            <animate attributeName="r" values="70;90;70" dur="8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="absolute top-[200px] right-[15%] opacity-25">
        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
      </div>

      <div className="absolute top-[280px] left-[12%] opacity-22">
        <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
      </div>

      <div className="absolute top-[550px] left-[8%] w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <line x1="0" y1="50" x2="100" y2="50" stroke="#fbbf24" strokeWidth="1" opacity="0.3">
            <animate attributeName="x2" values="0;100;0" dur="6s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      {/* Between Hero and Core Pillars */}
      <div className="absolute top-[1100px] -left-80 w-88 h-88 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[750px] right-[8%] w-40 h-40 opacity-18">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 10 50 Q 50 10 90 50" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.35">
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur="6s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="absolute top-[950px] right-[12%] opacity-20">
        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
      </div>

      <div className="absolute top-[1050px] left-[15%] opacity-22">
        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
      </div>

      {/* Core Pillars Area */}
      <div className="absolute top-[1450px] -right-80 w-96 h-96 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[1800px] -left-80 w-80 h-80 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[1550px] left-[5%] w-40 h-40 opacity-18">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 10 90 L 90 10" stroke="#a855f7" strokeWidth="1" strokeDasharray="3,3" opacity="0.3">
            <animate attributeName="stroke-dashoffset" from="0" to="50" dur="4s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="absolute top-[1700px] right-[18%] opacity-22">
        <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
      </div>

      <div className="absolute top-[1850px] left-[20%] w-36 h-36 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="30;40;30" dur="7s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="absolute top-[1950px] right-[10%] opacity-20">
        <div className="w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
      </div>

      {/* Modules Area */}
      <div className="absolute top-[2250px] -right-80 w-92 h-92 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-bl from-rose-400 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[2200px] left-[6%] w-48 h-48 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="35;45;35" dur="7s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="absolute top-[2450px] left-[10%] opacity-20">
        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
      </div>

      <div className="absolute top-[2550px] right-[14%] opacity-22">
        <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
      </div>

      <div className="absolute top-[3050px] -left-80 w-72 h-72 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[2850px] right-[8%] w-44 h-44 opacity-18">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <line x1="0" y1="0" x2="100" y2="100" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2,2" opacity="0.3">
            <animate attributeName="stroke-dashoffset" from="0" to="40" dur="5s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      <div className="absolute top-[2950px] left-[16%] w-36 h-36 opacity-18">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <line x1="50" y1="0" x2="50" y2="100" stroke="#a855f7" strokeWidth="1" opacity="0.3">
            <animate attributeName="y2" values="0;100;0" dur="5s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      <div className="absolute top-[3100px] right-[20%] opacity-20">
        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
      </div>

      {/* Transformation Area */}
      <div className="absolute top-[3350px] -right-80 w-96 h-96 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-bl from-amber-400 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[3700px] -left-80 w-80 h-80 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[3550px] right-[12%] w-40 h-40 opacity-18">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.35">
            <animate attributeName="r" values="28;42;28" dur="6s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="absolute top-[3650px] left-[12%] opacity-22">
        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
      </div>

      <div className="absolute top-[4150px] -right-80 w-84 h-84 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-bl from-rose-400 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[3850px] left-[8%] w-44 h-44 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 20 50 Q 50 20 80 50" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.35">
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur="6s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="absolute top-[4000px] right-[16%] opacity-20">
        <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
      </div>

      <div className="absolute top-[4100px] left-[18%] opacity-18">
        <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
      </div>

      {/* Guarantee Area */}
      <div className="absolute top-[4600px] -left-80 w-88 h-88 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[4850px] -right-80 w-88 h-88 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-bl from-amber-400 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-[4650px] left-[10%] w-48 h-48 opacity-18">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <line x1="0" y1="50" x2="100" y2="50" stroke="#06b6d4" strokeWidth="1" opacity="0.3">
            <animate attributeName="x2" values="0;100;0" dur="6s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      <div className="absolute top-[4850px] right-[7%] w-40 h-40 opacity-18">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="30;40;30" dur="8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="absolute top-[4750px] left-[14%] opacity-20">
        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
      </div>


      <div className="absolute top-[5200px] right-[14%] opacity-20">
        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
      </div>


    </div>
  );
};

export default GeometricShapes;
