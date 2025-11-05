// src/components/SJ/SJEngine.tsx
'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useSJ } from '@/context/SJContext';
import BudgetTab from './tabs/BudgetTab';

export default function SJEngine() {
  const [tab, setTab] = useState<'budget'>('budget');
  const { current } = useSJ();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
      <div className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <h1 className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              SJ Engine
            </h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Today</p>
            <p className={`text-2xl font-bold ${current?.lifeSJ && current.lifeSJ > 15 ? 'text-red-400' : 'text-emerald-400'}`}>
              {current?.lifeSJ.toFixed(2) ?? '—'} SJ/day
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <BudgetTab />
      </div>
    </div>
  );
}