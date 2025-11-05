import React from 'react';
import { User, Calendar, TrendingUp, Monitor } from 'lucide-react';

const ModulesSection = () => {
  const modules = [
    {
      icon: User,
      title: "Energy Assessment",
      subtitle: "Discover What YOU Actually Need",
      description: "Answer the Soul Question: 'How would you like to live your final chapter?' Your answer reveals your true needs—not what society programmed into you.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: Calendar,
      title: "Production Systems",
      subtitle: "Build Your Energy Sovereignty",
      description: "Master food production (farming, vertical gardens), solar power setup, water harvesting, and off-grid living. Produce what you need instead of buying it.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: TrendingUp,
      title: "Soul Hustle Discovery",
      subtitle: "Monetize Your Passion",
      description: "Find the work you'd do forever for free. Build income from your gifts, not wage slavery. AI automation, Web3 skills, tokenized community trades—your custom path.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: Monitor,
      title: "Anti-Fragile Stacking",
      subtitle: "Diversify and Automate",
      description: "Stack multiple crops, energy sources, income streams, and BTC assets. When one fails, seven hold. Build Desire Lockers, gift to community, create legacy.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  return (
    <section id="modules" className="relative py-32 overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-amber-500 rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-70" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            4 Core Systems
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            A complete framework for discovering your needs, producing your energy, finding your Soul Hustle, and building anti-fragile freedom
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 backdrop-blur-md border border-slate-600/40 hover:border-amber-500/60 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-amber-500/20"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                  {/* Icon */}
                  <div className="absolute top-4 left-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/40 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="text-white" size={24} />
                    </div>
                  </div>

                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{module.title}</h3>
                  <p className="text-amber-400 font-semibold mb-3 text-sm">{module.subtitle}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{module.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;