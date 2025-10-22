import React from 'react';
import { Check, Zap, Shield, TrendingUp, Users } from 'lucide-react';

const PricingSection = () => {
  const features = [
    "12+ Modules Masterclass ROBUST",
    "Energy Tracker (F.E.U System)",
    "Dream Locker - Lock goals, auto-grow, delivered",
    "30-Day FREE AI Assistant",
    "Budget Efficiency → Discover True Needs",
    "Digital Hustling → $500+/month systems",
    "Local Hustling → $1K+/month strategies",
    "Energy Flow → Infinite daily production",
    "Yield Optimizer → ~15% APY guidance",
    "Empire Roadmap → 5-year custom plan",
    "Interactive Tools & Live Calculators",
    "Community Access & Profile Tracking"
  ];

  const communityFeatures = [
    {
      icon: Users,
      title: "Gift Another's Dream",
      description: "Fund community members' desires directly to their wallet"
    },
    {
      icon: TrendingUp,
      title: "Track Similar Profiles",
      description: "See progress of members with similar goals and paths"
    },
    {
      icon: Shield,
      title: "Commitment Rewards",
      description: "Protocol giveaways for most committed members"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-amber-400/10 border border-amber-400/20 rounded-full px-6 py-2 mb-6">
            <span className="text-amber-400 text-sm font-medium">LIFETIME ACCESS</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            FREEDOM KIT
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            Build <span className="text-amber-400 font-bold">YOUR</span> Freedom System
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl shadow-amber-500/20">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-center">
              <div className="mb-4">
                <div className="text-6xl md:text-7xl font-bold text-white mb-2">$297</div>
                <div className="text-xl text-white/90 font-medium">ONE-TIME PAYMENT</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <p className="text-2xl text-white font-semibold mb-3">ONE QUESTION</p>
                <p className="text-lg text-white/90 italic">"How would you live your final chapter?"</p>
                <p className="text-white/80 mt-2">Answer it. Build it. Live it.</p>
              </div>
              <button className="w-full bg-white hover:bg-gray-100 text-slate-900 font-bold py-5 px-8 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                BUY $297 → INSTANT LOGIN
              </button>
            </div>

            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">WHAT YOU GET</h3>
                <p className="text-gray-400 mb-2">Web Portal - No Downloads</p>
                <div className="inline-block bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-4 py-1">
                  <span className="text-red-400 line-through text-sm">VALUE: $3,997</span>
                  <span className="text-amber-400 font-bold text-lg ml-3">YOURS: $297</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-500/5 transition-colors">
                    <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-500/20 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">YOUR SYSTEM - CUSTOM</h3>
                <p className="text-center text-gray-300 mb-6">No templates. No copy-paste. YOURS only.</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <h4 className="text-lg font-semibold text-white mb-1">Find YOUR Hustle</h4>
                    <p className="text-sm text-gray-400">What lights you up?</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <h4 className="text-lg font-semibold text-white mb-1">Track YOUR Energy</h4>
                    <p className="text-sm text-gray-400">Food + power = infinite</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <h4 className="text-lg font-semibold text-white mb-1">Build YOUR Buffer</h4>
                    <p className="text-sm text-gray-400">BTC stack</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <h4 className="text-lg font-semibold text-white mb-1">Fund YOUR Dream</h4>
                    <p className="text-sm text-gray-400">Lock & auto-grow</p>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-5 px-8 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                  BUY $297 → INSTANT LOGIN
                </button>
                <p className="text-gray-400 mt-4 text-sm">
                  Lifetime Access + 30-Day FREE AI
                </p>
                <p className="text-gray-500 mt-2 text-xs">
                  AI upgrade: $49/month (optional) • Cancel anytime
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {communityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
