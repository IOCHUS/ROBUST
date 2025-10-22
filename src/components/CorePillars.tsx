import React from 'react';
import { Target, Zap, Users, Shield } from 'lucide-react';

const CorePillars = () => {
  const pillars = [
    {
      icon: Target,
      title: "Clarity",
      description: "Crystal clear direction on what you desire. An actionable plan to get there."
    },
    {
      icon: Zap,
      title: "Capacity",
      description: "Build ROBUST systems. Increase strength, time, and resources."
    },
    {
      icon: Users,
      title: "Community",
      description: "Powerful network. Mentorship. Collective wisdom."
    },
    {
      icon: Shield,
      title: "Commitment",
      description: "Honest accountability. Sustainable routines."
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Refined Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl"></div>

        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.08) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            The Four Pillars of
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent"> ROBUST</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            The foundation for understanding where you are and how far you are from your last chapter setup
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-amber-500/10 border border-slate-700/50 hover:border-amber-500/50"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Animated Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-white" size={26} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{pillar.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CorePillars;