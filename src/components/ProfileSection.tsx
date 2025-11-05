import React from 'react';
import { User, Calendar, TrendingUp, Monitor } from 'lucide-react';

const ProfileSection = () => {
  const modules = [
    {
      title: "Profile",
      description: "Create Your Unique Persona Designed by the Clan Build Your Reputation",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: User
    },
    {
      title: "Routine",
      description: "Your Profile Life is Code Never Ever Stop the Specific Creation Why Have Fun?",
      image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: Calendar
    },
    {
      title: "Portfolio",
      description: "Never Ever Work the FAST AGAIN Dynamic Asset Selection Getting New Lifestyle",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=400",
      icon: TrendingUp
    },
    {
      title: "Monitor",
      description: "One System to Rule Them ALL Personalized Your Monitor Circle Your GOALS",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: Monitor
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:bg-gray-800 transition-all duration-500 transform hover:scale-105"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center mb-2">
                      <IconComponent className="w-6 h-6 text-cyan-400 mr-2" />
                      <h3 className="text-xl font-bold">{module.title}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
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

export default ProfileSection;