// src/components/SJ/tabs/BudgetTab.tsx
'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Sparkles, X, ChevronDown, Search } from 'lucide-react';
import { useSJ, type Timeframe } from '@/context/SJContext';

interface Category {
  id: string;
  name: string;
  icon: string;
}

export default function BudgetTab() {
  const { outflows, addOutflow, updateOutflow, deleteOutflow, current } = useSJ();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', amount: '', period: 'month' as Timeframe, category: '' });
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

const [categories, setCategories] = useState<Category[]>([
  { id: 'food', name: 'Food', icon: '🍎' },
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'move', name: 'Move', icon: '🚗' },
  { id: 'joy', name: 'Joy', icon: '😊' },
  { id: 'learn', name: 'Learn', icon: '📖' },
]);

  const [showCatModal, setShowCatModal] = useState(false);
const [newCat, setNewCat] = useState({ name: '', icon: '🍎' });

const ALL_EMOJIS = [
  '🍎', '🏠', '🚗', '😊', '📖',
  '🍕', '☕', '🍺', '👕', '💻',
  '✈️', '🎉', '🐕', '💸', '💎',
  '☀️', '⭐', '❤️', '📷', '🎧', '🌮', '🍣'
];
  // === kWh PRICE ===
  const getKwhPrice = () => {
    const saved = localStorage.getItem('kwhPrice');
    const price = saved ? Number(saved) : 0.15;
    return price > 0 ? price : 0.15;
  };

  const saveKwhPrice = (price: number) => {
    localStorage.setItem('kwhPrice', price.toString());
  };

  // === CALCULATE DAILY SJ ===
  const calculateDailySJ = (amount: number, period: Timeframe): number => {
    const price = getKwhPrice();
    const kwh = amount / price;
    if (period === 'day') return kwh;
    if (period === 'month') return kwh / 30;
    if (period === 'year') return kwh / 365;
    return 0;
  };

  // === ENRICHED OUTFLOWS + SEARCH ===
  const enrichedOutflows = outflows
    .map(item => ({
      ...item,
      dailySJ: calculateDailySJ(item.amount, item.period),
    }))
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  const grouped = categories.map(cat => {
    const items = enrichedOutflows.filter(o => o.category === cat.id);
    const total = items.reduce((sum, o) => sum + o.dailySJ, 0);
    return { ...cat, items, total };
  });

  // === TOTAL DAILY SJ — MATCHES HERO ===
  const totalDailySJ = enrichedOutflows.reduce((sum, o) => sum + o.dailySJ, 0);

  const toggleCollapse = (id: string) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.amount || !form.category) return;
    const amount = Number(form.amount);
    const dailySJ = calculateDailySJ(amount, form.period);
    const payload = { name: form.name.trim(), amount, period: form.period, category: form.category, dailySJ };
    editing ? updateOutflow(editing, payload) : addOutflow(payload);
    setForm({ name: '', amount: '', period: 'month', category: '' });
    setShowAdd(false);
    setEditing(null);
  };

  const handleSaveCategory = () => {
    if (!newCat.name.trim()) return;
    const id = newCat.name.toLowerCase().replace(/\s+/g, '-');
    setCategories(prev => {
      const exists = prev.some(c => c.id === id);
      if (exists) {
        return prev.map(c => (c.id === id ? { ...c, name: newCat.name, icon: newCat.icon } : c));
      }
      return [...prev, { id, name: newCat.name, icon: newCat.icon }];
    });
    setShowCatModal(false);
    setNewCat({ name: '', icon: 'Apple' });
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">

      {/* HERO — TOTAL DAILY SJ */}
      <div className="bg-gradient-to-br from-amber-500 to-rose-500 rounded-3xl p-6 text-center shadow-xl border border-white/20">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-yellow-200 animate-pulse" />
          <p className="text-5xl font-black text-white">{totalDailySJ.toFixed(0)}</p>
          <Sparkles className="w-8 h-8 text-yellow-200 animate-pulse" />
        </div>
        <p className="text-sm uppercase tracking-widest text-yellow-100 font-medium">SJ per day</p>
      </div>

      {/* kWh PRICE + SEARCH */}
      <div className="bg-slate-800/90 rounded-2xl p-4 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400">kWh Price ($)</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-white bg-slate-600 border border-r-0 border-slate-600 rounded-l-xl">$</span>
              <input
                type="number"
                step="0.001"
                placeholder="0.15"
                defaultValue={getKwhPrice()}
                onChange={(e) => saveKwhPrice(e.target.value === '' ? 0 : Number(e.target.value))}
                className="flex-1 bg-slate-700 border border-slate-600 rounded-r-xl px-4 py-3 text-white"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400">Search Expenses</label>
            <div className="flex">
              <Search className="w-5 h-5 text-gray-400 absolute ml-3 mt-3" />
              <input
                type="text"
                placeholder="Find..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES HEADER + ADD BUTTON */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Categories</h3>
        <button
          onClick={() => setShowCatModal(true)}
          className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-sm"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* CATEGORIES GRID */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="bg-slate-800/90 rounded-2xl p-3 flex flex-col items-center justify-center border border-white/10 hover:border-amber-400/50 transition-all group h-24"
          >
            <div className="text-3xl mb-1">{cat.icon}</div>
            <p className="text-xs font-semibold text-white text-center w-full line-clamp-1">{cat.name}</p>
            <div className="opacity-0 group-hover:opacity-100 flex gap-1 mt-1">
              <button
                onClick={() => {
                  setNewCat({ name: cat.name, icon: cat.icon });
                  setShowCatModal(true);
                }}
                className="text-gray-400 hover:text-amber-400"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={() => setCategories(prev => prev.filter(c => c.id !== cat.id))}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EXPENSES LIST — COLLAPSIBLE */}
      <div className="space-y-3">
        {grouped.filter(g => g.items.length > 0).map(g => (
          <div key={g.id} className="bg-slate-800/90 rounded-2xl border border-white/10">
            <button
              onClick={() => toggleCollapse(g.id)}
              className="w-full p-4 flex justify-between items-center hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{g.icon}</span>
                <h4 className="font-bold text-white">{g.name} ({g.items.length})</h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-amber-400">{g.total.toFixed(1)} SJ</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${collapsed[g.id] ? '' : 'rotate-180'}`} />
              </div>
            </button>
            {!collapsed[g.id] && (
              <div className="px-4 pb-4 space-y-2 border-t border-white/10">
                {g.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div className="flex-1">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-xs text-gray-400">${item.amount} / {item.period}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <span className="text-xs font-bold text-amber-400 bg-amber-900/30 px-2 py-1 rounded-full">
                        {item.dailySJ.toFixed(1)}
                      </span>
                      <button
                        onClick={() => {
                          setEditing(item.id);
                          setForm({ name: item.name, amount: item.amount.toString(), period: item.period, category: item.category });
                          setShowAdd(true);
                        }}
                        className="text-gray-400 hover:text-amber-400"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteOutflow(item.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ADD EXPENSE BUTTON */}
      <button
        onClick={() => setShowAdd(true)}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg"
      >
        <Plus className="w-6 h-6" /> Add Expense
      </button>

      {/* ADD/EDIT MODAL */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-amber-500/20 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-amber-400">{editing ? 'Edit' : 'Add'} Expense</h3>
              <button onClick={() => { setShowAdd(false); setEditing(null); }} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full mb-3 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400" />
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input type="number" placeholder="Amount ($)" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} className="bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white" />
              <select value={form.period} onChange={e => setForm({ ...form, period: e.target.value as Timeframe })} className="bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white">
                <option value="day">Daily</option>
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select>
            </div>

            {form.amount && !isNaN(Number(form.amount)) && (
              <p className="text-sm text-amber-400 mb-3">
                → <strong>{calculateDailySJ(Number(form.amount), form.period).toFixed(1)} SJ per day</strong>
              </p>
            )}

            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full mb-4 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>

            <div className="flex gap-3">
              <button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold py-3 rounded-xl">{editing ? 'Update' : 'Add'}</button>
              <button onClick={() => { setShowAdd(false); setEditing(null); }} className="flex-1 bg-slate-700 text-white font-bold py-3 rounded-xl border border-slate-600">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY MODAL */}
      {showCatModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-amber-500/20 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-amber-400">Add Category</h3>
              <button onClick={() => setShowCatModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input placeholder="Category name" value={newCat.name} onChange={e => setNewCat({ ...newCat, name: e.target.value })} className="w-full mb-4 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400" />
            <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto p-3 bg-slate-700/50 rounded-xl">
              {ALL_EMOJIS.map(emoji => (
                <button key={emoji} onClick={() => setNewCat({ ...newCat, icon: emoji })} className={`p-2 rounded-lg text-2xl transition-all hover:scale-110 ${newCat.icon === emoji ? 'bg-amber-500 text-black shadow-lg' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
                  {emoji}
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSaveCategory} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold py-3 rounded-xl">Save</button>
              <button onClick={() => setShowCatModal(false)} className="flex-1 bg-slate-700 text-white font-bold py-3 rounded-xl border border-slate-600">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}