import React from 'react';
import { Gift, Bot, Users, Calculator, BookOpen, Sparkles } from 'lucide-react';

const BonusesSection = () => {
  const bonuses = [
    {
      icon: Bot,
      title: "30-Day FREE AI Assistant",
      value: "$147",
      description: "Your personal AI guide helps you navigate the masterclass, answer questions 24/7, and keep you accountable. Free for 30 days, then optional $49/month."
    },
    {
      icon: Calculator,
      title: "Interactive ROI Calculator",
      value: "$97",
      description: "See your exact numbers: how much you need to produce, save, and earn. Track your progress toward energy sovereignty in real-time."
    },
    {
      icon: Users,
      title: "Lifetime Community Access",
      value: "$497",
      description: "Connect with members on similar journeys. Share progress, get mentorship, track similar profiles, and receive protocol giveaways for commitment."
    },
    {
      icon: BookOpen,
      title: "5-Year Prosperity Roadmap Builder",
      value: "$297",
      description: "Custom roadmap generator based on YOUR desires and current capacity. Get a clear 5-year plan from where you are to your last chapter."
    },
    {
      icon: Sparkles,
      title: "Desire Locker Tool",
      value: "$197",
      description: "Lock your goals, auto-grow them with optimized yield strategies (~15% APY guidance), and watch your desires get funded automatically."
    },
    {
      icon: Gift,
      title: "F.E.U. Energy Tracker System",
      value: "$247",
      description: "Track food, energy, and utility production. See exactly what you produce vs. buy. Optimize for true energy sovereignty."
    }
  ];

  const totalValue = bonuses.reduce((sum, bonus) => {
    return sum + parseInt(bonus.value.replace('$', '').replace(',', ''));
  }, 0);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.08) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-amber-500/10 border border-amber-500/20 rounded-full px-6 py-2 mb-6">
            <Gift className="w-5 h-5 text-amber-400 mr-2" />
            <span className="text-amber-400 text-sm font-medium">INCLUDED IN YOUR INVESTMENT</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Everything You Get
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            $297 gets you the entire system plus these powerful tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {bonuses.map((bonus, index) => {
            const IconComponent = bonus.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300 transform hover:-translate-y-2 shadow-xl"
              >
                <div className="absolute top-4 right-4">
                  <div className="bg-amber-500/20 border border-amber-500/30 rounded-full px-3 py-1">
                    <span className="text-amber-400 font-bold text-sm">{bonus.value}</span>
                  </div>
                </div>

                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="text-white" size={26} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{bonus.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{bonus.description}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-3xl p-12 border border-amber-500/30 text-center shadow-2xl">
            <div className="mb-8">
              <div className="text-gray-400 text-lg mb-2">Total Value:</div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-5xl md:text-6xl font-bold text-gray-500 line-through">${totalValue.toLocaleString()}</span>
                <div className="text-left">
                  <div className="text-sm text-amber-400 font-semibold">YOU PAY</div>
                  <div className="text-4xl md:text-5xl font-bold text-white">$297</div>
                </div>
              </div>
              <div className="inline-block bg-emerald-500/20 border border-emerald-500/30 rounded-full px-6 py-2">
                <span className="text-emerald-400 font-bold text-lg">Save ${(totalValue - 297).toLocaleString()}</span>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8"></div>

            <h3 className="text-3xl font-bold text-white mb-4">
              One-Time Payment. Lifetime Access.
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              No subscriptions. No hidden fees. Just $297 for everything you see here, plus the 12+ core modules and lifetime community access.
            </p>

            <a
              href="#pricing"
              className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-5 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Get Instant Access Now
            </a>

            <div className="mt-6 text-gray-400 text-sm">
              ✓ 3X Money-Back Guarantee  •  ✓ Instant Login  •  ✓ Web Portal Access
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusesSection;
