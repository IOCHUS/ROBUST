import React from 'react';
import { Calendar, Target, Zap, TrendingUp } from 'lucide-react';

const TimelineSection = () => {
  const phases = [
    {
      icon: Calendar,
      phase: "Week 1-2",
      title: "Clarity & Discovery",
      description: "Answer the soul question: How would you live your final chapter? Complete your Energy Assessment and discover YOUR true needs—not society's programming.",
      outcomes: [
        "Crystal clear vision of your last chapter",
        "Complete F.E.U. Energy Tracker setup",
        "Identify gaps between current reality and desires"
      ],
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Target,
      phase: "Week 3-4",
      title: "Build Capacity Systems",
      description: "Master food production, solar power, water systems, and off-grid fundamentals. Learn what you need to produce vs. what you can buy.",
      outcomes: [
        "Production systems roadmap",
        "Budget efficiency optimization",
        "Energy sovereignty strategy"
      ],
      color: "from-orange-500 to-amber-600"
    },
    {
      icon: Zap,
      phase: "Week 5-6",
      title: "Soul Hustle & Income",
      description: "Discover work you'd do forever for free. Build digital hustles ($500+/mo) and local income streams ($1K+/mo). Monetize your gifts.",
      outcomes: [
        "Soul Hustle identified and validated",
        "First income system in place",
        "Automation & scaling strategies"
      ],
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: TrendingUp,
      phase: "Week 7+",
      title: "Anti-Fragile Stacking",
      description: "Stack multiple crops, energy sources, income streams, and BTC assets. Build Desire Lockers, optimize yield (~15% APY), create your 5-year prosperity roadmap.",
      outcomes: [
        "Diversified income & energy portfolio",
        "Desire Locker activated and funded",
        "Custom 5-year roadmap complete"
      ],
      color: "from-orange-600 to-amber-500"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Your ROBUST Journey
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A clear roadmap from where you are today to your last chapter setup
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500/30 via-orange-500/30 to-amber-500/30 hidden lg:block"></div>

          <div className="space-y-16">
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`relative flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`w-full lg:w-5/12 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 transform hover:-translate-y-1 shadow-xl">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${phase.color} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                          <IconComponent className="text-white" size={24} />
                        </div>
                        <div>
                          <div className="text-amber-400 font-semibold text-sm">{phase.phase}</div>
                          <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {phase.description}
                      </p>

                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-amber-400 uppercase tracking-wider">What You'll Achieve:</div>
                        {phase.outcomes.map((outcome, i) => (
                          <div key={i} className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                            <p className="text-gray-400 text-sm">{outcome}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center border-4 border-amber-500/30 shadow-lg">
                      <div className={`w-8 h-8 bg-gradient-to-br ${phase.color} rounded-full`}></div>
                    </div>
                  </div>

                  <div className="hidden lg:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Lifetime Access. Your Own Pace.
            </h3>
            <p className="text-gray-300 mb-6">
              This is YOUR journey. Move through the phases at your speed. Revisit modules anytime. The portal is yours forever.
            </p>
            <a
              href="#pricing"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Begin Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
