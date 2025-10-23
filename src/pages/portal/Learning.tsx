import React, { useState, useEffect } from 'react';
import { ChevronDown, Check, Clock } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
}

const Learning = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [modules, setModules] = useState<Module[]>([
    { id: 1, title: 'Budget Efficiency Mastery', description: 'Learn to optimize your spending and maximize FEU production.', duration: '45 min', completed: false },
    { id: 2, title: 'Energy Sovereignty Basics', description: 'Understand food, water, and power production systems.', duration: '60 min', completed: false },
    { id: 3, title: 'Soul Hustle Discovery', description: 'Find work you would do forever and monetize your passion.', duration: '50 min', completed: false },
    { id: 4, title: 'BTC Stacking Strategy', description: 'Build your Bitcoin position systematically.', duration: '40 min', completed: false },
    { id: 5, title: 'DeFi Yield Optimization', description: 'Maximize returns with yield farming and staking.', duration: '55 min', completed: false },
    { id: 6, title: 'Anti-Fragile Systems', description: 'Build resilient income and energy streams.', duration: '50 min', completed: false },
    { id: 7, title: 'Dream Life Architecture', description: 'Design your final chapter with clarity.', duration: '45 min', completed: false },
    { id: 8, title: 'Community Building', description: 'Connect with like-minded freedom seekers.', duration: '30 min', completed: false },
    { id: 9, title: 'Desire Locker Setup', description: 'Automate savings for your goals.', duration: '35 min', completed: false },
    { id: 10, title: 'Time Leverage Blueprint', description: 'Get more done with less effort.', duration: '40 min', completed: false },
    { id: 11, title: 'Multiple Income Streams', description: 'Diversify beyond your main hustle.', duration: '50 min', completed: false },
    { id: 12, title: 'Freedom Maintenance', description: 'Sustain your lifestyle long-term.', duration: '45 min', completed: false },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('learning_modules');
    if (saved) {
      setModules(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      alert('Pomodoro complete! Take a break.');
      setPomodoroActive(false);
      setPomodoroTime(25 * 60);
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime]);

  const toggleModule = (id: number) => {
    setOpenModule(openModule === id ? null : id);
  };

  const toggleComplete = (id: number) => {
    const updated = modules.map((m) =>
      m.id === id ? { ...m, completed: !m.completed } : m
    );
    setModules(updated);
    localStorage.setItem('learning_modules', JSON.stringify(updated));
  };

  const filteredModules = modules.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedCount = modules.filter((m) => m.completed).length;
  const progressPercent = (completedCount / modules.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-400 mb-2">Learning Library</h1>
        <p className="text-gray-400">12 modules to master your freedom journey</p>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Your Progress</h2>
          <span className="text-amber-400 font-bold">{completedCount}/12</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Pomodoro Timer</h2>
          <Clock className="text-amber-400" size={24} />
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold text-amber-400 mb-4">{formatTime(pomodoroTime)}</div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setPomodoroActive(!pomodoroActive)}
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-lg transition-colors"
            >
              {pomodoroActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={() => {
                setPomodoroTime(25 * 60);
                setPomodoroActive(false);
              }}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
        <input
          type="text"
          placeholder="Search modules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
        />
      </div>

      <div className="space-y-4">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComplete(module.id);
                  }}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    module.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-600 hover:border-amber-400'
                  }`}
                >
                  {module.completed && <Check size={16} className="text-white" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                  <p className="text-sm text-gray-400">{module.duration}</p>
                </div>
              </div>
              <ChevronDown
                className={`text-amber-400 transition-transform ${
                  openModule === module.id ? 'rotate-180' : ''
                }`}
                size={20}
              />
            </button>

            {openModule === module.id && (
              <div className="px-6 pb-6 border-t border-slate-800">
                <p className="text-gray-300 mb-4 mt-4">{module.description}</p>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Interactive Content</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Complete the module exercises and mark as complete when done.
                  </p>
                  <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-lg transition-colors text-sm">
                    Start Module
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;
