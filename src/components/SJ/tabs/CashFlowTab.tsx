// src/components/SJ/tabs/CashFlowTab.tsx
'use client';

import { useSJ } from '@/context/SJContext';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = ['salary', 'crypto', 'dividends', 'rental', 'other'];

export default function CashFlowTab() {
  const { incomes, addIncome, deleteIncome, setSavings, savings } = useSJ();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('month');
  const [cat, setCat] = useState('salary');

  const handleAdd = () => {
    if (name && amount) {
      addIncome({ name, amount: Number(amount), period: period as any, category: cat });
      setName(''); setAmount('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-700 rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="bg-slate-600 rounded px-3 py-2" />
          <input placeholder="Amount ($)" type="number" value={amount} onChange={e => setAmount(e.target.value)} className="bg-slate-600 rounded px-3 py-2" />
          <select value={period} onChange={e => setPeriod(e.target.value)} className="bg-slate-600 rounded px-3 py-2">
            <option value="day">Per Day</option>
            <option value="month">Per Month</option>
            <option value="year">Per Year</option>
          </select>
          <button onClick={handleAdd} className="bg-emerald-600 rounded flex items-center justify-center gap-1">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {incomes.map(i => (
          <div key={i.id} className="bg-slate-700 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-bold">{i.name}</p>
              <p className="text-sm text-gray-400">${i.amount} / {i.period}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-emerald-400">+{i.dailySJ} SJ</p>
              <button onClick={() => deleteIncome(i.id)}><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-emerald-900/50 rounded-2xl">
        <label className="block text-sm mb-2">Savings (USD)</label>
        <input
          type="number"
          value={savings}
          onChange={e => setSavings(Number(e.target.value))}
          className="w-full bg-slate-700 rounded px-4 py-3 text-2xl font-bold"
        />
      </div>
    </div>
  );
}