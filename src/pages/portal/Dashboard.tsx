'use client';

import { useNR } from '@/context/NRContext';
import { useDreamStore } from '@/context/DreamContext';
import { Wallet, Zap, Trophy, Sparkles, Shield, Droplet } from 'lucide-react';
import { useEffect, useState } from 'react';

type HoverHandler = (element: string, metrics: string) => void;

const VillaMap = ({
  onHover,
  onLeave,
  budgetNR,
  netNR,
  retirementYear,
  dreamProgress,
}: {
  onHover: HoverHandler;
  onLeave: () => void;
  budgetNR: number;
  netNR: number;
  retirementYear: string | null;
  dreamProgress: number;
}) => (
  <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
      <p className="text-gray-500">Villa Map Loading...</p>
    </div>

    <div
      className="absolute top-10 left-10 group cursor-pointer"
      onMouseEnter={() => onHover('Command Center', `${budgetNR.toFixed(2)} NR/day`)}
      onMouseLeave={onLeave}
    >
      <div className="w-16 h-16 bg-amber-500/20 border-2 border-amber-500 rounded-xl flex items-center justify-center">
        <Zap className="text-amber-400" size={32} />
      </div>
      <span className="ml-2 text-sm text-white font-medium">Command Center</span>
    </div>

    <div
      className="absolute top-10 right-10 group cursor-pointer"
      onMouseEnter={() => onHover('Resource Collector', `${netNR.toFixed(2)} NR/day`)}
      onMouseLeave={onLeave}
    >
      <div className="w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-xl flex items-center justify-center">
        <Wallet className="text-green-400" size={32} />
      </div>
      <span className="ml-2 text-sm text-white font-medium">Resource Collector</span>
    </div>

    <div
      className="absolute bottom-10 left-10 group cursor-pointer"
      onMouseEnter={() => onHover('Retirement Barracks', retirementYear || '—')}
      onMouseLeave={onLeave}
    >
      <div className="w-16 h-16 bg-purple-500/20 border-2 border-purple-500 rounded-xl flex items-center justify-center">
        <Trophy className="text-purple-400" size={32} />
      </div>
      <span className="ml-2 text-sm text-white font-medium">Retirement Barracks</span>
    </div>

    <div
      className="absolute bottom-10 right-10 group cursor-pointer"
      onMouseEnter={() => onHover('Dream Mission', `${dreamProgress}%`)}
      onMouseLeave={onLeave}
    >
      <div className="w-16 h-16 bg-pink-500/20 border-2 border-pink-500 rounded-xl flex items-center justify-center">
        <Sparkles className="text-pink-400" size={32} />
      </div>
      <span className="ml-2 text-sm text-white font-medium">Dream Mission</span>
    </div>

    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
      onMouseEnter={() => onHover('Defense Tower', 'Level 3')}
      onMouseLeave={onLeave}
    >
      <div className="w-20 h-20 bg-blue-500/20 border-2 border-blue-500 rounded-xl flex items-center justify-center">
        <Shield className="text-blue-400" size={40} />
      </div>
      <span className="ml-2 text-sm text-white font-medium">Defense Tower</span>
    </div>

    <div
      className="absolute top-3/4 left-8 group cursor-pointer"
      onMouseEnter={() => onHover('Water Source', '100%')}
      onMouseLeave={onLeave}
    >
      <div className="w-16 h-16 bg-cyan-500/20 border-2 border-cyan-500 rounded-xl flex items-center justify-center">
        <Droplet className="text-cyan-400" size={32} />
      </div>
      <span className="ml-2 text-sm text-white font-medium">Water Source</span>
    </div>
  </div>
);

export default function Dashboard() {
const { outflows } = useNR();  const { goals } = useDreamStore();

  const [showTutorial, setShowTutorial] = useState(true);
  const [hoveredElement, setHoveredElement] = useState<{ element: string; metrics: string } | null>(null);

  // === SAFE VALUES (No incomes/portfolio yet) ===
const budgetNR = Number(outflows.reduce((sum, o) => sum + (o.dailyNR || 0), 0).toFixed(1));  const incomeNR = 0;           // Placeholder: will be >0 when incomes added
  const netNR = incomeNR - budgetNR;

  const portfolioNR = 0;        // Placeholder
  const monthsToFreedom = Infinity;
  const retirementYearStr = null;

  const dreamProgress =
    goals && Array.isArray(goals) && goals.length > 0
      ? Math.round((goals.filter((g: any) => g.done).length / goals.length) * 100)
      : 0;

  // Auto-hide tutorial
  useEffect(() => {
    if (showTutorial) {
      const timer = setTimeout(() => setShowTutorial(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTutorial]);

  const handleHover = (element: string, metrics: string) => {
    setHoveredElement({ element, metrics });
  };

  const handleLeave = () => {
    setHoveredElement(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Freedom OS
            </h1>
            <p className="text-gray-400">Your life, in energy and satoshis.</p>
          </div>
        </div>

        {showTutorial && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-6">
            <p className="text-lg">Welcome to Freedom OS! Hover over zones to see your stats.</p>
          </div>
        )}

        <VillaMap
          onHover={handleHover}
          onLeave={handleLeave}
          budgetNR={budgetNR}
          netNR={netNR}
          retirementYear={retirementYearStr}
          dreamProgress={dreamProgress}
        />

        {hoveredElement && (
          <div className="fixed top-10 left-10 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg border border-amber-500/50 shadow-2xl z-50">
            <h3 className="text-lg font-bold text-amber-400">{hoveredElement.element}</h3>
            <p className="text-sm">{hoveredElement.metrics}</p>
          </div>
        )}
      </div>
    </div>
  );}