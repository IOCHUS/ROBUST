// src/components/SJ/tabs/BudgetTab.tsx
'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useSJ, type Timeframe } from '@/context/SJContext';
import { ENERGY_RATES } from '@/data/energyRates';

const CATEGORIES = [
  { id: 'food', name: 'Food', color: 'text-emerald-400' },
  { id: 'drink', name: 'Drink', color: 'text-amber-400' },
  { id: 'home', name: 'Home', color: 'text-orange-400' },
  { id: 'energy', name: 'Energy', color: 'text-yellow-400' },
  { id: 'move', name: 'Move', color: 'text-red-400' },
  { id: 'joy', name: 'Joy', color: 'text-purple-400' },
  { id: 'learn', name: 'Learn', color: 'text-blue-400' },
  { id: 'give', name: 'Give', color: 'text-lime-400' },
];

const COMPARE_DATA = [
  { label: 'Average American', sj: 18.2 },
  { label: 'Digital Nomad', sj: 10.1 },
  { label: 'Vanlifer', sj: 6.8 },
  { label: 'Monk Mode', sj: 3.2 },
];

const CompareBar = ({ label, sj, userSj }: { label: string; sj: number; userSj: number }) => {
  const ratio = userSj / sj;
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 text-sm text-gray-300">{label}</span>
      <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden relative">
        <div
          className="absolute h-full bg-amber-500 transition-all"
          style={{ width: `${Math.min(ratio * 100, 100)}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
          {sj.toFixed(1)} SJ
        </span>
      </div>
    </div>
  );
};

export default function BudgetTab() {
  const {
    outflows,
    addOutflow,
    updateOutflow,
    deleteOutflow,
    countryRate,
    setCountryRate,
    current,
  } = useSJ();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    amount: '',
    period: 'month' as Timeframe,
    category: 'food',
  });

  const handleSubmit = () => {
    if (!form.name || !form.amount) return;
    const payload = {
      name: form.name,
      amount: Number(form.amount),
      period: form.period,
      category: form.category,
    };
    if (editing) {
      updateOutflow(editing, payload);
      setEditing(null);
    } else {
      addOutflow(payload);
    }
    setForm({ ...form, name: '', amount: '' });
    setShowAdd(false);
  };

  const grouped = CATEGORIES.map(cat => ({
    ...cat,
    items: outflows.filter(o => o.category === cat.id),
    total: outflows.filter(o => o.category === cat.id).reduce((s, o) => s + o.dailySJ, 0),
  }));

  const userSj = current?.lifeSJ ?? 0;

  return (
    <div className="space-y-8">
      {/* Live Total */}
      <div className="text-center p-6 bg-gradient-to-r from-amber-600 to-orange-700 rounded-2xl">
        <p className="text-5xl font-black">{userSj.toFixed(2)}</p>
        <p className="text-sm opacity-80">SJ per day</p>
        <p className="text-xs mt-2">Your life, in energy.</p>
      </div>

      {/* Country selector */}
      <div className="bg-slate-800 rounded-xl p-4">
        <label className="text-sm text-gray-400">Your Country ($ to kWh rate)</label>
        <select
          className="w-full mt-2 bg-slate-700 rounded-lg px-3 py-2 text-white"
          value={ENERGY_RATES.find(r => r.rate === countryRate)?.code || ''}
          onChange={e => {
            const rate = ENERGY_RATES.find(r => r.code === e.target.value)?.rate ?? 0.0858;
            setCountryRate(rate);
          }}
        >
          {ENERGY_RATES.map(r => (
            <option key={r.code} value={r.code}>
              {r.name} — $1 = {r.rate} kWh
            </option>
          ))}
        </select>
      </div>

      {/* Outflows */}
      <div className="space-y-4">
        {grouped.map(cat =>
          cat.items.length > 0 && (
            <div key={cat.id} className="bg-slate-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className={`text-lg font-bold ${cat.color}`}>{cat.name}</h3>
                <span className="font-bold text-orange-400">
                  {cat.total.toFixed(2)} SJ
                </span>
              </div>
              {cat.items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-t border-slate-700">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      ${item.amount} / {item.period}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-400">{item.dailySJ} SJ</span>
                    <button
                      onClick={() => {
                        setEditing(item.id);
                        setForm({
                          name: item.name,
                          amount: item.amount.toString(),
                          period: item.period,
                          category: item.category,
                        });
                        setShowAdd(true);
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteOutflow(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Add button */}
      <button
        onClick={() => setShowAdd(true)}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-all"
      >
        <Plus className="w-5 h-5" /> Add Outflow
      </button>

      {/* Compare Panel */}
      <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl">
        <h3 className="text-xl font-bold text-amber-400 mb-4">How You Compare</h3>
        <div className="space-y-4">
          {COMPARE_DATA.map(d => (
            <CompareBar key={d.label} label={d.label} sj={d.sj} userSj={userSj} />
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{editing ? 'Edit' : 'Add'} Outflow</h3>

            <input
              placeholder="Name (e.g., Rent)"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full mb-3 bg-slate-700 rounded-lg px-3 py-2"
            />

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="number"
                placeholder="Amount ($)"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                className="bg-slate-700 rounded-lg px-3 py-2"
              />
              <select
                value={form.period}
                onChange={e => setForm({ ...form, period: e.target.value as Timeframe })}
                className="bg-slate-700 rounded-lg px-3 py-2"
              >
                <option value="day">Per Day</option>
                <option value="month">Per Month</option>
                <option value="year">Per Year</option>
                <option value="meal">Per Meal</option>
                <option value="km">Per KM</option>
              </select>
            </div>

            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full mb-3 bg-slate-700 rounded-lg px-3 py-2"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-emerald-600 text-black font-bold py-2 rounded-lg"
              >
                {editing ? 'Update' : 'Add'}
              </button>
              <button
                onClick={() => { setShowAdd(false); setEditing(null); }}
                className="flex-1 bg-slate-700 text-white font-bold py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}