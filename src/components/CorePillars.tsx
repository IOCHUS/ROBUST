import React from 'react';
import { Target, Zap, Users, Shield } from 'lucide-react';

const CorePillars = () => {
  const pillars = [
    {
      icon: Target,
      title: "Clarity",
      description: "Get a clear direction on what you REALLY desire and a plan ACTIONABLE to make it happen STARTING TODAY",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Capacity",
      description: "Become Rich Enough ROBUST Time to Significantly Increase Means",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Community",
      description: "Team Up with Fellow Mentorship & Q&A",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Commitment",
      description: "Co-Create Honest Approach Accountability Implementation",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Luxury Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.15) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
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
            Our proven framework that has transformed thousands of lives and generated millions in wealth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="group relative bg-black/40 backdrop-blur-sm rounded-xl p-8 transition-all duration-500 transform hover:-translate-y-2 border border-white/5 hover:border-amber-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-lg flex items-center justify-center mb-6 border border-amber-500/20">
                    <IconComponent className="text-amber-500" size={24} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{pillar.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm font-light">{pillar.description}</p>
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