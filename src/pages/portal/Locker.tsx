'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Package, Brain, Star, Settings2, Plus, Trash2, Archive, AlertCircle, Info } from 'lucide-react';

interface Desire {
  id: number;
  name: string;
  costUSD: number;
  costJOUL: number;
  savedUSD: number;
  savedJOUL: number;
  type: 'survival' | 'material' | 'skill' | 'epic' | 'system';
  priority: 'high' | 'med' | 'low';
  funding: string[];
  unlockedDate?: string;
  archived: boolean;
}

const KWH_PRICE = 0.12;

const TYPE_CONFIG = {
  survival: { color: 'red-400', icon: Shield, label: 'Survival' },
  material: { color: 'amber-400', icon: Package, label: 'Material' },
  skill: { color: 'yellow-300', icon: Brain, label: 'Skill' },
  epic: { color: 'emerald-400', icon: Star, label: 'Epic' },
  system: { color: 'blue-400', icon: Settings2, label: 'System' },
} as const;

const PRIORITY_CONFIG = {
  high: {
    border: 'border-l-4 border-orange-500',
    badge: 'bg-orange-900/60 text-orange-200 border border-orange-500/60 shadow-sm',
    label: 'HIGH'
  },
  med: {
    border: 'border-l-4 border-teal-600',
    badge: 'bg-teal-900/50 text-teal-300 border border-teal-600/50 shadow-sm',
    label: 'MEDIUM'
  },
  low: {
    border: 'border-l-4 border-gray-500',
    badge: 'bg-gray-900/60 text-gray-300 border border-gray-500/60 shadow-sm',
    label: 'LOW'
  },
} as const;

const FUNDING_TAGS = ['BTC', 'JOB', 'HUSTLE', 'YIELD', 'LP', 'GIFT', 'CHARITY', 'OTHER'];

const FUNDING_EXPLANATIONS: Record<string, string> = {
  BTC: 'Bitcoin holdings or mining rewards',
  JOB: 'Salary from employment',
  HUSTLE: 'Side gigs, freelance, or entrepreneurship',
  YIELD: 'DeFi farming, staking, or yield strategies',
  LP: 'Liquidity provider rewards',
  GIFT: 'Donations, family, or community support',
  CHARITY: 'Charitable grants or donations',
  OTHER: 'Any other income source'
};

export default function Locker() {
  const [desires, setDesires] = useState<Desire[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemUSD, setItemUSD] = useState('');
  const [itemType, setItemType] = useState<'material' | 'survival' | 'skill' | 'epic' | 'system'>('material');
  const [priority, setPriority] = useState<'high' | 'med' | 'low'>('med');
  const [selectedFunding, setSelectedFunding] = useState<string[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showFundingInfo, setShowFundingInfo] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('soul_lockers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const migrated = parsed.map((d: any) => ({
          id: d.id ?? Date.now(),
          name: d.name ?? 'Unnamed',
          costUSD: Number(d.costUSD) || 0,
          costJOUL: Math.ceil((Number(d.costUSD) || 0) / (KWH_PRICE * 1000)),
          savedUSD: Number(d.savedUSD) || 0,
          savedJOUL: Math.ceil((Number(d.savedUSD) || 0) / (KWH_PRICE * 1000)),
          type: d.type in TYPE_CONFIG ? d.type : 'material',
          priority: ['high', 'med', 'low'].includes(d.priority) ? d.priority : 'med',
          funding: Array.isArray(d.funding) ? d.funding.slice(0, 3) : [],
          unlockedDate: d.unlockedDate,
          archived: !!d.archived,
        }));
        setDesires(migrated);
      } catch {
        setDesires([]);
      }
    }
  }, []);

  const saveDesires = (updated: Desire[]) => {
    localStorage.setItem('soul_lockers', JSON.stringify(updated.map(d => ({
      ...d,
      savedJOUL: undefined
    }))));
    setDesires(updated);
  };

  const handleAdd = () => {
    if (!itemName.trim() || !itemUSD || parseFloat(itemUSD) <= 0) return;

    const usd = parseFloat(itemUSD);
    const newDesire: Desire = {
      id: Date.now(),
      name: itemName.trim(),
      costUSD: usd,
      costJOUL: Math.ceil(usd / (KWH_PRICE * 1000)),
      savedUSD: 0,
      savedJOUL: 0,
      type: itemType,
      priority,
      funding: selectedFunding.slice(0, 3),
      archived: false,
    };

    const updated = [...desires, newDesire];
    saveDesires(updated);
    setItemName('');
    setItemUSD('');
    setSelectedFunding([]);
  };

  const handleUpdateSaved = (id: number, amountUSD: number) => {
    if (amountUSD < 0) return;
    const updated = desires.map(d =>
      d.id === id
        ? {
            ...d,
            savedUSD: amountUSD,
            savedJOUL: Math.ceil(amountUSD / (KWH_PRICE * 1000)),
            archived: amountUSD >= d.costUSD,
            unlockedDate: amountUSD >= d.costUSD ? new Date().toLocaleDateString() : d.unlockedDate,
          }
        : d
    );
    saveDesires(updated);
  };

  const handleDelete = (id: number) => {
    const updated = desires.filter(d => d.id !== id);
    saveDesires(updated);
    setDeleteConfirm(null);
  };

  const toggleFunding = (tag: string) => {
    setSelectedFunding(prev => {
      const newTags = prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag];
      return newTags.slice(0, 3);
    });
  };

  const sortedDesires = [...desires]
    .filter(d => !d.archived)
    .sort((a, b) => {
      const order = { high: 0, med: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    });

  const unlockedDesires = desires.filter(d => d.archived);

  const totalSavedJOUL = desires.reduce((sum, d) => sum + d.savedJOUL, 0);
  const totalGoalJOUL = desires.reduce((sum, d) => sum + d.costJOUL, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-400 mb-2">
          Soul Fuel Locker
        </h1>
        <p className="text-gray-400">Lock desires. Fund aliveness.</p>
      </div>

      {/* Add Form */}
      <div className="bg-slate-900/50 border border-amber-500/20 rounded-xl p-6 max-w-2xl mx-auto backdrop-blur-sm">
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Desire"
            className="bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
          />
          <input
            type="number"
            value={itemUSD}
            onChange={(e) => setItemUSD(e.target.value)}
            placeholder="$ Cost"
            className="bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
          />
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value as any)}
            className="bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white"
          >
            <option value="survival">Survival</option>
            <option value="material">Material</option>
            <option value="skill">Skill</option>
            <option value="epic">Epic</option>
            <option value="system">System</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white"
          >
            <option value="high">HIGH</option>
            <option value="med">MEDIUM</option>
            <option value="low">LOW</option>
          </select>
        </div>

        {/* Funding Tags + Info */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-400">Funding Sources (max 3)</span>
            <button
              onClick={() => setShowFundingInfo(true)}
              className="text-gray-500 hover:text-amber-400 transition-colors"
            >
              <Info size={14} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {FUNDING_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => toggleFunding(tag)}
                disabled={selectedFunding.length >= 3 && !selectedFunding.includes(tag)}
                className={`px-3 py-1 text-xs rounded-full transition-all font-medium ${
                  selectedFunding.includes(tag)
                    ? 'bg-amber-500 text-black'
                    : selectedFunding.length >= 3
                    ? 'bg-slate-700/50 text-gray-500 cursor-not-allowed'
                    : 'bg-slate-700/80 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedFunding.length > 0 && (
            <p className="text-xs text-gray-500 mt-2 italic">
              Funded by: {selectedFunding.join(', ')}
            </p>
          )}
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          <span>Add to Locker</span>
        </button>
      </div>

      {/* Funding Info Popup */}
      {showFundingInfo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowFundingInfo(false)}>
          <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-6 max-w-md w-full backdrop-blur-sm" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-amber-400 mb-4">Funding Sources Explained</h3>
            <div className="space-y-2 text-sm">
              {FUNDING_TAGS.map(tag => (
                <div key={tag} className="flex justify-between">
                  <span className="font-medium text-amber-300">{tag}</span>
                  <span className="text-gray-400 text-right">{FUNDING_EXPLANATIONS[tag]}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowFundingInfo(false)}
              className="mt-6 w-full bg-slate-700 text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-slate-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Active Lockers — Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {sortedDesires.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-400">
            <Package className="mx-auto mb-4" size={64} />
            <p>Your vault awaits its first desire.</p>
          </div>
        ) : (
          sortedDesires.map((desire) => {
            const config = TYPE_CONFIG[desire.type];
            const pConfig = PRIORITY_CONFIG[desire.priority];
            const Icon = config.icon;
            const progress = desire.costUSD > 0 ? (desire.savedUSD / desire.costUSD) * 100 : 0;
            const isReady = progress >= 100;

            return (
              <div
                key={desire.id}
                className={`relative rounded-2xl p-6 bg-slate-900/70 border border-slate-700 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 flex h-full backdrop-blur-sm ${pConfig.border}`}
              >
                {/* LEFT: CONTENT */}
                <div className="flex-1 pr-6">
                  {/* Delete — Top Right */}
                  <button
                    onClick={() => setDeleteConfirm(desire.id)}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-300 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* TAGS — CENTERED ON TOP BORDER, SPACED */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {desire.funding.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-full bg-amber-500 text-black font-bold shadow-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Header */}
                  <div className="flex items-center space-x-2 mb-3 mt-6">
                    <Icon className={`text-${config.color}`} size={20} />
                    <h3 className="text-base font-bold text-white truncate flex-1">{desire.name}</h3>
                  </div>

                  {/* Priority & Type */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${pConfig.badge}`}>
                      {pConfig.label}
                    </span>
                    <span className="text-xs text-gray-400">{config.label}</span>
                  </div>

                  {/* JOUL + USD */}
                  <div className="mb-3">
                    <div className="text-lg font-bold text-white">
                      {desire.costJOUL.toLocaleString()} JOUL
                    </div>
                    <div className="text-xs text-gray-500">
                      ${desire.costUSD.toLocaleString()}
                    </div>
                  </div>

                  {/* Saved Input */}
                  <input
                    type="number"
                    value={desire.savedUSD}
                    onChange={(e) => handleUpdateSaved(desire.id, parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500"
                    placeholder="Saved USD"
                  />
                </div>

                {/* RIGHT: PROGRESS CIRCLE */}
                <div className="flex items-center justify-center pr-4">
                  <div className="relative w-28 h-28">
                    <svg className="w-28 h-28 transform -rotate-90">
                      <circle cx="56" cy="56" r="50" stroke="#1e293b" strokeWidth="10" fill="none" />
                      <circle
                        cx="56" cy="56" r="50"
                        stroke="url(#progress-gradient)"
                        strokeWidth="10" fill="none"
                        strokeDasharray="314" strokeDashoffset={314 * (1 - progress / 100)}
                        className="transition-all duration-700 ease-out"
                      />
                      <defs>
                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-amber-400">{Math.round(progress)}%</span>
                    </div>
                  </div>
                </div>

                {isReady && (
                  <div className="absolute bottom-4 right-4 text-green-400 font-bold text-xs flex items-center gap-1">
                    <Archive size={12} />
                    UNLOCKED
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-6 max-w-sm w-full backdrop-blur-sm">
            <div className="flex items-center gap-2 text-red-400 mb-3">
              <AlertCircle size={20} />
              <p className="font-medium">Delete Desire?</p>
            </div>
            <p className="text-sm text-gray-300 mb-5">
              "{desires.find(d => d.id === deleteConfirm)?.name}" will be gone forever.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500/20 text-red-300 border border-red-500/40 py-2 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-slate-700 text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary — JOUL */}
      {desires.length > 0 && (
        <div className="bg-slate-900/50 border border-amber-500/20 rounded-xl p-6 text-center max-w-2xl mx-auto backdrop-blur-sm">
          <p className="text-amber-300 text-sm mb-1">Total Progress</p>
          <p className="text-3xl font-bold text-amber-400">
            {totalSavedJOUL.toLocaleString()} / {totalGoalJOUL.toLocaleString()} JOUL
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {totalGoalJOUL > 0 ? ((totalSavedJOUL / totalGoalJOUL) * 100).toFixed(1) : 0}% of all desires
          </p>
        </div>
      )}

      {/* Unlocked */}
      {unlockedDesires.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6 text-center">Unlocked Desires</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {unlockedDesires.map(d => (
              <div key={d.id} className="bg-emerald-900/20 border border-emerald-500/40 rounded-xl p-6 text-center backdrop-blur-sm">
                <p className="text-white font-medium text-lg">{d.name}</p>
                <p className="text-xs text-emerald-300 mt-1">Unlocked {d.unlockedDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}