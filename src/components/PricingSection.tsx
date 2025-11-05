import React from 'react';
import { Check, Zap, Shield, TrendingUp, Users, ArrowRight, Compass } from 'lucide-react';

const PricingSection = () => {
  const features = [
    "12+ Modules Masterclass ROBUST",
    "Energy Tracker (F.E.U System)",
    "Desire Locker - Lock goals, auto-grow, delivered",
    "30-Day FREE AI Assistant",
    "Budget Efficiency → Discover True Needs",
    "Digital Hustling → $500+/month systems",
    "Local Hustling → $1K+/month strategies",
    "Energy Flow → Infinite daily production",
    "Yield Optimizer → ~15% APY guidance",
    "Prosperity Roadmap → 5-year custom plan",
    "Interactive Tools & Live Calculators",
    "Community Access & Profile Tracking"
  ];

  const communityFeatures = [
    {
      icon: Users,
      title: "Gift Another's Desire",
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
    <section id="pricing" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.05) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <Compass className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">Your Direction is Crystal Clear</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            ROBUST KIT
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 mb-6">
            Build <span className="text-amber-400 font-bold">YOUR</span> System
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Understand where you are. Measure how far you are from your last chapter setup.
            Take small Desires on your road to fulfill your soul—without shame or confusion.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
            <div className="relative p-12 md:p-16">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="text-center mb-12">
                  <div className="inline-block mb-6">
                    <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl px-8 py-6">
                      <p className="text-2xl md:text-3xl text-white font-semibold mb-3">ONE QUESTION</p>
                      <p className="text-xl text-gray-300 italic mb-2">"How would you live your final chapter?"</p>
                      <p className="text-gray-400">Answer it. Build it. Live it.</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="inline-flex items-baseline gap-3 mb-4">
                      <span className="text-7xl md:text-8xl font-bold text-white">$297</span>
                      <span className="text-2xl text-gray-400">ONE-TIME</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <span className="text-gray-500 line-through text-lg">VALUE: $3,997</span>
                      <div className="h-px w-8 bg-amber-500/50"></div>
                      <span className="text-amber-400 font-bold text-xl">YOURS: $297</span>
                    </div>
                    <p className="text-gray-400 text-sm">Web Portal • No Downloads • Lifetime Access</p>
                  </div>

                  <button className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-5 px-12 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                    BUY $297 → INSTANT LOGIN
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="border-t border-slate-700/50 pt-12 mt-12">
                  <h3 className="text-2xl font-bold text-white mb-8 text-center">WHAT YOU GET</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl hover:bg-amber-500/5 transition-colors group">
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-500/30 transition-colors">
                          <Check className="w-3 h-3 text-amber-400" />
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 p-8 bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-2xl border border-slate-700/30">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">YOUR SYSTEM - CUSTOM</h3>
                  <p className="text-center text-gray-400 mb-8">No templates. No copy-paste. YOURS only.</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 border border-amber-500/30">
                        <Zap className="w-6 h-6 text-amber-400" />
                      </div>
                      <h4 className="text-base font-semibold text-white mb-1">Find YOUR Hustle</h4>
                      <p className="text-xs text-gray-400">What lights you up?</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 border border-amber-500/30">
                        <TrendingUp className="w-6 h-6 text-amber-400" />
                      </div>
                      <h4 className="text-base font-semibold text-white mb-1">Track YOUR Energy</h4>
                      <p className="text-xs text-gray-400">Food + power = infinite</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 border border-amber-500/30">
                        <Shield className="w-6 h-6 text-amber-400" />
                      </div>
                      <h4 className="text-base font-semibold text-white mb-1">Build YOUR Buffer</h4>
                      <p className="text-xs text-gray-400">BTC stack</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 border border-amber-500/30">
                        <Users className="w-6 h-6 text-amber-400" />
                      </div>
                      <h4 className="text-base font-semibold text-white mb-1">Fund YOUR Desire</h4>
                      <p className="text-xs text-gray-400">Lock & auto-grow</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-gray-400 mb-2">30-Day FREE AI • Lifetime Portal Access</p>
                  <p className="text-gray-500 text-sm">AI upgrade: $49/month (optional) • Cancel anytime</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-amber-500/20 px-8 py-6 mb-12">
              <p className="text-xl text-white font-semibold mb-2">Your System is Key</p>
              <p className="text-gray-400 max-w-2xl">
                Follow it blindly to protect yourself from any external mislead. Your direction is crystal clear.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Community Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-slate-900/40 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="text-white" size={26} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
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
