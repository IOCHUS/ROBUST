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
    <section id="modules" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Master These 4 Core Modules
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each module is designed to build upon the previous one, creating a comprehensive system for wealth and success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${module.gradient} opacity-80`}></div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <IconComponent className="text-white" size={24} />
                    </div>
                  </div>

                  {/* Module Number */}
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-amber-600 font-semibold mb-3">{module.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
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