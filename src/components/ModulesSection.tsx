import React from 'react';
import { User, Calendar, TrendingUp, Monitor } from 'lucide-react';

const ModulesSection = () => {
  const modules = [
    {
      icon: User,
      title: "Profile",
      subtitle: "Create Your Unique Persona",
      description: "Designed by the Clan Build Your Reputation",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      icon: Calendar,
      title: "Routine",
      subtitle: "Your Profile Life is Code",
      description: "Never Ever Stop the Specific Creation Why Have Fun?",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: TrendingUp,
      title: "Portfolio",
      subtitle: "Never Ever Work the FAST AGAIN",
      description: "Dynamic Asset Selection Getting New Lifestyle",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-green-600 to-blue-600"
    },
    {
      icon: Monitor,
      title: "Monitor",
      subtitle: "One System to Rule Them ALL",
      description: "Personalized Your Monitor Circle Your GOALS",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
      gradient: "from-orange-600 to-red-600"
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

        {/* Gradient Orbs */}
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Master These 4 Core Modules
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            Each module is designed to build upon the previous one, creating a comprehensive system for wealth and success
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

                  {/* Module Number */}
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-500/30">
                      <span className="text-amber-400 font-bold text-lg">{index + 1}</span>
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