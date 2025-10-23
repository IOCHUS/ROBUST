import React, { useState, useEffect } from 'react';
import { Sparkles, Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const Dream = () => {
  const [dreamText, setDreamText] = useState('');
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, title: 'Soul Hustle Discovery', description: 'Find work you\'d do forever', completed: false },
    { id: 2, title: 'Energy Tracking Setup', description: 'Track FEU production daily', completed: false },
    { id: 3, title: 'Income Diversification', description: 'Build 3+ income streams', completed: false },
    { id: 4, title: 'BTC Stacking System', description: 'Auto-save in Bitcoin', completed: false },
    { id: 5, title: 'Legacy Planning', description: 'Document your final chapter', completed: false },
  ]);

  useEffect(() => {
    const savedDream = localStorage.getItem('dream_text');
    const savedSteps = localStorage.getItem('dream_steps');

    if (savedDream) setDreamText(savedDream);
    if (savedSteps) setSteps(JSON.parse(savedSteps));
  }, []);

  const handleSave = () => {
    localStorage.setItem('dream_text', dreamText);
    localStorage.setItem('dream_steps', JSON.stringify(steps));
    alert('Dream Life Plan saved successfully!');
  };

  const toggleStep = (id: number) => {
    const updated = steps.map((step) =>
      step.id === id ? { ...step, completed: !step.completed } : step
    );
    setSteps(updated);
    localStorage.setItem('dream_steps', JSON.stringify(updated));
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = (completedCount / steps.length) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-400 mb-2">Dream Life Plan</h1>
        <p className="text-gray-400">Design your final chapter with clarity and purpose</p>
      </div>

      <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 border border-amber-500/30 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="text-amber-400" size={24} />
          <h2 className="text-xl font-bold text-white">The Soul Question</h2>
        </div>
        <p className="text-gray-300 text-sm mb-4 italic">
          "Dream Life = Preparing Your Death. How would you live your final chapter if you could design it from scratch?"
        </p>
        <textarea
          value={dreamText}
          onChange={(e) => setDreamText(e.target.value)}
          placeholder="Describe your dream life in detail... Where would you live? What would you do daily? Who would you spend time with? What legacy would you leave?"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 min-h-[200px] resize-y"
        />
        <div className="text-xs text-gray-500 mt-2">
          {dreamText.length} characters • Be specific and honest
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">5-Step Builder</h2>
          <span className="text-amber-400 font-bold">{completedCount}/5</span>
        </div>

        <div className="mb-6">
          <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`bg-slate-800/50 rounded-lg p-5 border-2 transition-all ${
                step.completed
                  ? 'border-green-500/50 bg-green-900/10'
                  : 'border-slate-700'
              }`}
            >
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleStep(step.id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                    step.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-600 hover:border-amber-400'
                  }`}
                >
                  {step.completed ? <Check size={18} className="text-white" /> : <span className="text-gray-400">{index + 1}</span>}
                </button>

                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-1 ${step.completed ? 'text-green-400' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-amber-500/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">🌟 Philosophy</h3>
        <div className="space-y-3 text-gray-300 text-sm">
          <p>
            <span className="font-semibold text-amber-400">Dream Life = Preparing Your Death.</span>{' '}
            This isn't morbid—it's clarity. Most people spend their lives chasing what society told them to want.
          </p>
          <p>
            Your final chapter is the most honest version of your life. When you know how you'd live it,
            everything else becomes clear: what to build, what to skip, who to spend time with.
          </p>
          <p>
            Build your systems now. Energy sovereignty, Soul Hustles, BTC stacking—these are the tools
            to fund the life YOU designed, not the one marketed to you.
          </p>
          <p className="font-semibold text-white">
            Legacy isn't what you leave behind. It's how you lived your truth.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={!dreamText.trim()}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed text-black disabled:text-gray-500 font-bold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Save Dream Life Plan
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-amber-500/20 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">✅ Next Actions</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Complete each of the 5 steps in order</li>
            <li>• Revisit your dream text monthly</li>
            <li>• Share progress in the Inspiration Network</li>
            <li>• Adjust systems as clarity increases</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-amber-500/20 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-3">📊 Dashboard Integration</h3>
          <p className="text-gray-300 text-sm mb-3">
            Your completion status ({completedCount}/5) is tracked on the main dashboard.
          </p>
          <p className="text-gray-400 text-xs">
            Update steps as you progress. The system will notify you of milestones and adjust your freedom timeline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dream;
