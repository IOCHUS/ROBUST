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
      {/* Dark Luxury Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}></div>
        </div>
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
                className="group relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/5 hover:border-amber-500/30 transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  {/* Icon */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-amber-500/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-500/20">
                      <IconComponent className="text-amber-500" size={20} />
                    </div>
                  </div>

                  {/* Module Number */}
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-amber-500/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-500/20">
                      <span className="text-amber-500 font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{module.title}</h3>
                  <p className="text-amber-500 font-medium mb-3 text-sm">{module.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{module.description}</p>
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