import React from 'react';
import { Check, X } from 'lucide-react';

const ComparisonSection = () => {
  const comparisons = [
    {
      feature: "Focus",
      traditional: "Chase money, retirement savings",
      robust: "Energy sovereignty, meet YOUR needs"
    },
    {
      feature: "Approach",
      traditional: "Work until 65, hope pension lasts",
      robust: "Build systems now, design YOUR last chapter"
    },
    {
      feature: "Income",
      traditional: "Single job, wage slavery",
      robust: "Soul Hustle + multiple income streams"
    },
    {
      feature: "Energy",
      traditional: "Buy everything, stay dependent",
      robust: "Produce food, power, water—sovereignty"
    },
    {
      feature: "Mindset",
      traditional: "Do what society says",
      robust: "Discover what YOU actually want"
    },
    {
      feature: "Risk",
      traditional: "All eggs in one basket (job/pension)",
      robust: "Anti-fragile stacking, diversification"
    },
    {
      feature: "Timeline",
      traditional: "Wait 30-40 years to maybe retire",
      robust: "Build freedom systems starting today"
    },
    {
      feature: "Community",
      traditional: "Compete, isolated",
      robust: "Collaborate, collective wisdom, mentorship"
    },
    {
      feature: "Assets",
      traditional: "Fiat savings, inflation erosion",
      robust: "BTC stacking, yield optimization, production"
    },
    {
      feature: "Results",
      traditional: "Burnout, dependency, uncertainty",
      robust: "Energy freedom, clarity, sustainable prosperity"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            The ROBUST Difference
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stop following the broken system. Build YOUR last chapter instead.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-700/30">
              <div className="bg-slate-900/50 p-6 text-center">
                <div className="text-gray-400 font-semibold text-sm uppercase tracking-wider">Category</div>
              </div>
              <div className="bg-slate-800/50 p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <X className="text-slate-400 mr-2" size={20} />
                  <div className="text-slate-400 font-bold text-lg">Traditional Path</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 p-6 text-center border-l-2 border-amber-500/30">
                <div className="flex items-center justify-center mb-2">
                  <Check className="text-amber-400 mr-2" size={20} />
                  <div className="text-amber-400 font-bold text-lg">ROBUST Way</div>
                </div>
              </div>
            </div>

            {comparisons.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-700/30">
                <div className="bg-slate-900/50 p-6">
                  <div className="font-semibold text-white">{item.feature}</div>
                </div>
                <div className="bg-slate-800/50 p-6">
                  <div className="text-gray-400 text-sm">{item.traditional}</div>
                </div>
                <div className="bg-gradient-to-br from-amber-900/10 to-orange-900/10 p-6 border-l-2 border-amber-500/20">
                  <div className="text-amber-100 text-sm font-medium">{item.robust}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Choose Different. Build Better.
              </h3>
              <p className="text-gray-300 mb-6">
                The traditional path is broken. ROBUST gives you a new way—one designed by YOU, for YOUR last chapter.
              </p>
              <a
                href="#pricing"
                className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Start Building Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
