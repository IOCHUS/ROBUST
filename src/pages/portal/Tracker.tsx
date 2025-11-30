'use client';

import { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  X,
  ChevronDown,
  Search,
  PlusCircle,
  Calendar,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RotateCw,
} from 'lucide-react';
import { useNR, type Timeframe, type Outflow, type Category } from '@/context/NRContext';
import { supabase } from '@/supabaseClient';

type SortMode = 'none' | 'need-asc' | 'need-desc' | 'nr-asc' | 'nr-desc';

const getPriority = (lvl?: string | null): number => {
  switch (lvl) {
    case 'essential': return 1;
    case 'good-to-have': return 2;
    case 'luxury': return 3;
    case 'cut': return 4;
    default: return 5;
  }
};

function ExpenseItem({
  item,
  onClick,
  onEdit,
  onDelete,
  onRenew,
}: {
  item: any;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onRenew: () => void;
}) {
  const daysLeft = item.daysLeft;
  let badge: JSX.Element | null = null;

  if (daysLeft !== null) {
    const isExpired = daysLeft <= 0;
    const cls = isExpired
      ? 'bg-red-900/60 text-red-300 border border-red-500/50'
      : daysLeft <= 7
      ? 'bg-red-900/30 text-red-400'
      : daysLeft <= 30
      ? 'bg-amber-900/30 text-amber-400'
      : 'bg-gray-900/30 text-gray-400';

    const txt = isExpired
      ? 'EXPIRED'
      : `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left`;

    badge = (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${cls} mr-2`}>
        {txt}
      </span>
    );
  }

  const showRenew = item.runsOutOn && daysLeft !== null && daysLeft <= 0;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-slate-700/50 transition group"
    >
      <div className="flex items-center gap-3">
        <div>
          <p className="font-medium text-lg text-white">{item.name}</p>
          <p className="text-gray-400 flex items-center gap-2">
            ${item.amount} / {item.period} {badge}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="px-4 py-2 bg-amber-900/40 text-amber-400 rounded-full font-bold">
          {item.dailyNR.toFixed(1)} NR
        </span>
        {showRenew && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRenew();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg"
          >
            <RotateCw className="w-5 h-5" />
            Renew
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-gray-400 hover:text-amber-400"
        >
          <Edit2 className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default function Tracker() {
  const nr = useNR();
  const {
    outflows,
    addOutflow,
    updateOutflow,
    deleteOutflow,
    calculateDailyNR,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    loadAll,
  } = nr;

  /* ---------- DEFAULT CATEGORIES ON FIRST LOAD ---------- */
  useEffect(() => {
    (async () => {
      if (categories.length === 0) {
        const defaults = [
          { name: 'Food', icon: '🍎' },
          { name: 'Home', icon: '🏠' },
          { name: 'Move', icon: '🚗' },
          { name: 'Joy', icon: '😊' },
          { name: 'Learn', icon: '📖' },
          { name: 'Uncategorized', icon: '❓' },
        ];

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const records = defaults.map(c => ({
          name: c.name,
          icon: c.icon,
          user_id: user.id,
        }));

        await supabase
          .from('categories')
          .insert(records);

        await loadAll();
      }
    })();
  }, [categories.length, loadAll]);

// === MODAL STATES ===
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [newCat, setNewCat] = useState({ name: '', icon: '🍎' });
  const ALL_EMOJIS = [ '🍎', '🏠', '🚗', '😊', '📖', '🍕', '☕', '🍺', '👕', '💻', '✈️', '🎉', '🐕', '💸', '💎', '☀️', '⭐', '❤️', '📷', '🎧', '🌮', '🍣' ];


  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    amount: '',
    period: 'month' as Timeframe,
    category: '',
    runsOutOn: '',
    marketplace: '',
    optimizerNote: '',
    needLevel: '' as any,
  });

  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [sortModes, setSortModes] = useState<Record<string, SortMode>>({});
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deleteConfirmCatId, setDeleteConfirmCatId] = useState<string | null>(null);

  /* ---------- HELPERS ---------- */
  const toggleCollapse = (id: string) =>
    setCollapsed((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleSort = (catId: string, type: 'need' | 'nr') => {
    setSortModes((prev) => {
      const cur = prev[catId] || 'none';
      let next: SortMode = 'none';

      if (type === 'need') {
        if (cur === 'none' || cur.startsWith('nr')) next = 'need-asc';
        else if (cur === 'need-asc') next = 'need-desc';
        else if (cur === 'need-desc') next = 'none';
      } else {
        if (cur === 'none' || cur.startsWith('need')) next = 'nr-asc';
        else if (cur === 'nr-asc') next = 'nr-desc';
        else if (cur === 'nr-desc') next = 'none';
      }

      const copy = { ...prev };
      if (next === 'none') delete copy[catId];
      else copy[catId] = next;
      return copy;
    });
  };

  /* ---------- DATA PREP ---------- */
  const enriched = (outflows ?? []).map((o) => {
    let daysLeft: number | null = null;
    if (o.runsOutOn) {
      const diff = new Date(o.runsOutOn).getTime() - Date.now();
      daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return { ...o, daysLeft };
  });

  const term = search.toLowerCase();
  const filtered = enriched.filter((i) => {
    const cat = categories.find(
      (c) => c.id === i.category || (!i.category && c.name.toUpperCase() === 'UNCATEGORIZED')
    );
    return (
      i.name.toLowerCase().includes(term) ||
      (cat?.name.toLowerCase().includes(term) ?? false)
    );
  });

  const grouped = categories
    .map((cat) => {
      let items = filtered.filter(
        (i) =>
          i.category === cat.id || (!i.category && cat.name.toUpperCase() === 'UNCATEGORIZED')
      );
      const total = items.reduce((s, i) => s + i.dailyNR, 0);
      const mode = sortModes[cat.id] || 'none';

      if (mode !== 'none') {
        items = [...items].sort((a, b) => {
          if (mode === 'need-asc')
            return getPriority(a.needLevel) - getPriority(b.needLevel);
          if (mode === 'need-desc')
            return getPriority(b.needLevel) - getPriority(a.needLevel);
          if (mode === 'nr-asc') return a.dailyNR - b.dailyNR;
          if (mode === 'nr-desc') return b.dailyNR - a.dailyNR;
          return 0;
        });
      }

      return { ...cat, items, total };
    })
    .filter((g) => g.items.length > 0 || g.name.toLowerCase().includes(term));

  const totalNR = filtered.reduce((s, i) => s + i.dailyNR, 0);
  const heroNR =
    totalNR % 1 === 0 ? totalNR.toFixed(0) : totalNR.toFixed(1);

  const upcoming = filtered
    .filter((i) => i.daysLeft !== null && i.daysLeft > 0 && i.daysLeft <= 10)
    .sort((a, b) => (a.daysLeft ?? 0) - (b.daysLeft ?? 0));

  /* ---------- SAVE EXPENSE ---------- */
  const handleSave = async () => {
    if (!form.name.trim() || !form.amount || !form.category) return;
    const amount = Number(form.amount);
    if (isNaN(amount) || amount <= 0) return;

    const payload: Omit<Outflow, 'id' | 'user_id' | 'dailyNR' | 'created_at'> = {
      name: form.name.trim(),
      amount,
      period: form.period,
      category: form.category,
      runsOutOn: form.runsOutOn === '' ? null : form.runsOutOn,
      marketplace: form.marketplace || null,
      optimizerNote: form.optimizerNote || null,
      needLevel: form.needLevel || null,
    };

    try {
      if (editingId) await updateOutflow(editingId, payload);
      else await addOutflow(payload);

      setForm({
        name: '',
        amount: '',
        period: 'month',
        category: '',
        runsOutOn: '',
        marketplace: '',
        optimizerNote: '',
        needLevel: '',
      });
      setIsAddOpen(false);
      setEditingId(null);
      await loadAll();
    } catch (e: any) {
      console.error('Save expense error:', e.message || e);
    }
  };

  const startEdit = (item: Outflow) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      amount: item.amount.toString(),
      period: item.period,
      category: item.category || '',
      runsOutOn: item.runsOutOn || '',
      marketplace: item.marketplace || '',
      optimizerNote: item.optimizerNote || '',
      needLevel: item.needLevel || '',
    });
    setIsAddOpen(true);
  };

  const openAddForCategory = (catId: string) => {
    setEditingId(null);
    setForm({
      name: '',
      amount: '',
      period: 'month',
      category: catId,
      runsOutOn: '',
      marketplace: '',
      optimizerNote: '',
      needLevel: '',
    });
    setIsAddOpen(true);
  };

  const renewExpense = async (item: any) => {
    if (!item.runsOutOn || !item.created_at) return;
    const originalEnd = new Date(item.runsOutOn);
    const created = new Date(item.created_at);
    const durationMs = originalEnd.getTime() - created.getTime();
    const newEndDate = new Date(Date.now() + durationMs);
    const newEndDateStr = newEndDate.toISOString().split('T')[0];
    await updateOutflow(item.id, { runsOutOn: newEndDateStr });
    await loadAll();
  };

  /* ---------- CATEGORY HANDLERS ---------- */
  const saveCategory = async () => {
    const name = newCat.name.trim();
    if (!name) return;

    const payload = { name, icon: newCat.icon };

    try {
      const exists = categories.find((c) => c.name.toUpperCase() === name.toUpperCase());
      if (exists && !editingCatId) {
        alert('Category with this name already exists');
        return;
      }
      if (editingCatId && exists && exists.id !== editingCatId) {
        alert('Category with this name already exists');
        return;
      }

      if (editingCatId) {
        await updateCategory(editingCatId, payload);
      } else {
        await addCategory(payload);
      }

      setNewCat({ name: '', icon: '🍎' });
      setShowCatModal(false);
      setEditingCatId(null);
      await loadAll();
    } catch (e) {
      console.error('Save category error:', e);
    }
  };

  const startEditCat = (c: Category) => {
    setEditingCatId(c.id);
    setNewCat({ name: c.name, icon: c.icon });
    setShowCatModal(true);
  };

  const deleteCat = async (id: string) => {
    if (id === 'uncategorized') return;
    setDeleteConfirmCatId(id);
  };

  const confirmDeleteCat = async () => {
    if (deleteConfirmCatId) {
      await deleteCategory(deleteConfirmCatId);
      await loadAll();
      setDeleteConfirmCatId(null);
    }
  };

  /* ---------- POPUP STYLES ---------- */
  const popupStyle = (lvl?: string | null) => {
    switch (lvl) {
      case 'essential':
        return { bg: 'blue-900/10', border: 'blue-400/80' };
      case 'good-to-have':
        return { bg: 'green-900/10', border: 'green-400/80' };
      case 'luxury':
        return { bg: 'orange-900/10', border: 'orange-400/80' };
      case 'cut':
        return { bg: 'red-900/10', border: 'red-400/80' };
      default:
        return { bg: 'slate-800', border: 'transparent' };
    }
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-indigo-950">
      <div className="p-6 max-w-5xl mx-auto space-y-8">

{/* HERO – BADASS NR PER DAY FRAME */}
<div className="relative max-w-2xl mx-auto mt-8 mb-12">
  {/* Subtle animated glow background */}
  <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-500/10 to-rose-600/20 blur-3xl animate-pulse" />
  
  {/* Main card with glass + border magic */}
  <div className="relative bg-slate-950/80 backdrop-blur-2xl rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden">
    {/* Top accent bar */}
    <div className="h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600" />
    
    {/* Inner padding */}
    <div className="p-10 text-center">
      {/* Sparkles + Number */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <Sparkles className="w-12 h-12 text-amber-400 animate-pulse drop-shadow-lg" />
        
        <p className="text-8xl md:text-9xl font-black tracking-tighter
                     bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 
                     bg-clip-text text-transparent 
                     drop-shadow-2xl">
          {heroNR}
        </p>
        
        <Sparkles className="w-12 h-12 text-amber-400 animate-pulse drop-shadow-lg" />
      </div>

      {/* Label */}
      <p className="text-xl md:text-2xl uppercase tracking-widest font-bold text-amber-200/80">
        NR per Day
      </p>

      {/* Bottom subtle line */}
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
    </div>
  </div>

  {/* Floating corner accents */}
  <div className="absolute -top-1 -left-1 w-24 h-24 bg-amber-500/20 rounded-full blur-3xl" />
  <div className="absolute -bottom-1 -right-1 w-32 h-32 bg-rose-600/20 rounded-full blur-3xl" />
</div>

        {/* UPCOMING EXPIRIES */}
        {upcoming.length > 0 && (
          <div className="bg-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-amber-400" /> Expires Soon
            </h3>
            {upcoming.map((i) => (
              <div key={i.id} className="flex justify-between items-center">
                <p className="text-white">{i.name}</p>
                <span
                  className={`font-medium ${
                    i.daysLeft! <= 7 ? 'text-red-400' : 'text-amber-400'
                  }`}
                >
                  {i.daysLeft} {i.daysLeft === 1 ? 'day' : 'days'} left
                </span>
              </div>
            ))}
          </div>
        )}

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/50"
          />
        </div>

        {/* EXPENSES BY CATEGORY */}
        <div className="space-y-6">
          {grouped.map((g) => {
            const mode = sortModes[g.id] || 'none';
            return (
              <div key={g.id} className="bg-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleCollapse(g.id)}
                  className="w-full px-6 py-5 flex justify-between items-center hover:bg-slate-700/50 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{g.icon}</span>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-bold text-white">
                          {g.name}
                        </h4>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSort(g.id, 'need');
                          }}
                          role="button"
                          tabIndex={0}
                          className={`cursor-pointer p-1 rounded-md ${
                            mode.includes('need') ? 'bg-gray-700/50' : ''
                          }`}
                        >
                          {mode === 'need-asc' ? (
                            <ArrowUp className="w-4 h-4 text-amber-400" />
                          ) : mode === 'need-desc' ? (
                            <ArrowDown className="w-4 h-4 text-amber-400" />
                          ) : (
                            <ArrowUpDown className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSort(g.id, 'nr');
                          }}
                          role="button"
                          tabIndex={0}
                          className={`cursor-pointer p-1 rounded-md ${
                            mode.includes('nr') ? 'bg-gray-700/50' : ''
                          }`}
                        >
                          {mode === 'nr-asc' ? (
                            <ArrowUp className="w-4 h-4 text-amber-400" />
                          ) : mode === 'nr-desc' ? (
                            <ArrowDown className="w-4 h-4 text-amber-400" />
                          ) : (
                            <span className="text-xs font-bold text-gray-400">
                              NR
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">
                        {g.items.length} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-amber-400">
                      {g.total.toFixed(1)} NR
                    </span>
                    <PlusCircle 
                      className="w-7 h-7 text-amber-400 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        openAddForCategory(g.id);
                      }}
                    />
                    {g.name.toUpperCase() !== 'UNCATEGORIZED' && (
                      <Trash2 
                        className="w-7 h-7 text-red-400 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCat(g.id);
                        }}
                      />
                    )}
                    <ChevronDown
                      className={`w-7 h-7 transition ${collapsed.includes(g.id) ? '' : 'rotate-180'}`}
                    />
                  </div>
                </button>

                {!collapsed.includes(g.id) && (
                  <div className="px-6 pb-6 space-y-0 border-t border-white/10">
                    {g.items.map((i) => (
                      <ExpenseItem
                        key={i.id}
                        item={i}
                        onClick={() => {
                          setSelectedItem(i);
                          setIsPopupOpen(true);
                        }}
                        onEdit={() => startEdit(i)}
                        onDelete={() => deleteOutflow(i.id)}
                        onRenew={() => renewExpense(i)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ADD CATEGORY ICON AT BOTTOM */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              setShowCatModal(true);
              setEditingCatId(null);
              setNewCat({ name: '', icon: '🍎' });
            }}
            className="bg-slate-800 rounded-full p-4 hover:bg-slate-700 transition"
          >
            <PlusCircle className="w-8 h-8 text-amber-400" />
          </button>
        </div>

        {/* FLOATING ADD BUTTON */}
        <button
          onClick={() => setIsAddOpen(true)}
          className="fixed bottom-8 right-8 w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition z-50"
        >
          <Plus className="w-10 h-10 text-black" />
        </button>

        {/* ADD / EDIT EXPENSE MODAL */}
        {isAddOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
            <div className="bg-slate-800 rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-amber-400">
                  {editingId ? 'Edit' : 'Add'} Expense
                </h3>
                <button
                  onClick={() => {
                    setIsAddOpen(false);
                    setEditingId(null);
                    setForm({
                      name: '',
                      amount: '',
                      period: 'month',
                      category: '',
                      runsOutOn: '',
                      marketplace: '',
                      optimizerNote: '',
                      needLevel: '',
                    });
                  }}
                >
                  <X className="w-8 h-8 text-gray-400" />
                </button>
              </div>

              <input
                autoFocus
                placeholder="Expense name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mb-5 px-6 py-5 bg-slate-700 rounded-2xl text-lg"
              />

              <div className="grid grid-cols-2 gap-4 mb-5">
                <input
                  type="number"
                  placeholder="Amount ($)"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="px-6 py-5 bg-slate-700 rounded-2xl text-lg"
                />
                <select
                  value={form.period}
                  onChange={(e) =>
                    setForm({ ...form, period: e.target.value as Timeframe })
                  }
                  className="px-6 py-5 bg-slate-700 rounded-2xl text-lg"
                >
                  <option value="day">Daily</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>

              {form.amount && !isNaN(Number(form.amount)) && (
                <div className="text-center p-6 bg-amber-900/30 rounded-2xl mb-6">
                  <p className="text-5xl font-black text-amber-400">
                    {calculateDailyNR(
                      Number(form.amount),
                      form.period
                    ).toFixed(1)}
                  </p>
                  <p className="text-amber-300">NR per day</p>
                </div>
              )}

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full mb-5 px-6 py-5 bg-slate-700 rounded-2xl text-lg"
              >
                <option value="">Choose category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>

              <div className="mb-5">
                <label className="text-sm text-gray-400 mb-2 block">
                  Runs out on (optional)
                </label>
                <input
                  type="date"
                  value={form.runsOutOn}
                  onChange={(e) =>
                    setForm({ ...form, runsOutOn: e.target.value })
                  }
                  className="w-full px-6 py-5 bg-slate-700 rounded-2xl text-lg"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="mb-5">
                <label className="text-sm text-gray-400 mb-2 block">
                  Marketplace (optional)
                </label>
                <input
                  placeholder="e.g., Amazon"
                  value={form.marketplace}
                  onChange={(e) =>
                    setForm({ ...form, marketplace: e.target.value })
                  }
                  className="w-full px-6 py-5 bg-slate-700 rounded-2xl text-lg"
                />
              </div>

              <div className="mb-8">
                <label className="text-sm text-gray-400 mb-2 block">
                  Optimizer Note (optional)
                </label>
                <textarea
                  placeholder="e.g., Cheaper alternative"
                  value={form.optimizerNote}
                  onChange={(e) =>
                    setForm({ ...form, optimizerNote: e.target.value })
                  }
                  className="w-full px-6 py-5 bg-slate-700 rounded-2xl text-lg min-h-[80px]"
                />
              </div>

              <div className="mb-8">
                <label className="text-sm text-gray-400 mb-2 block">
                  Need Level (optional)
                </label>
                <select
                  value={form.needLevel}
                  onChange={(e) =>
                    setForm({ ...form, needLevel: e.target.value as any })
                  }
                  className="w-full px-6 py-5 bg-slate-700 rounded-2xl text-lg"
                >
                  <option value="">Not Set</option>
                  <option value="essential">Essential</option>
                  <option value="good-to-have">Good-to-Have</option>
                  <option value="luxury">Luxury</option>
                  <option value="cut">Cuttable</option>
                </select>
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-2xl py-6 rounded-2xl"
              >
                {editingId ? 'Update' : 'Add'} Expense
              </button>
            </div>
          </div>
        )}

        {/* ITEM POPUP */}
        {isPopupOpen && selectedItem && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
            <div
              className={`
                rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto
                border-4 shadow-2xl transition-all
                ${selectedItem.needLevel === 'essential' ? 'bg-blue-950/90 border-blue-400' :
                  selectedItem.needLevel === 'good-to-have' ? 'bg-green-950/90 border-green-400' :
                  selectedItem.needLevel === 'luxury' ? 'bg-orange-950/90 border-orange-400' :
                  selectedItem.needLevel === 'cut' ? 'bg-red-950/90 border-red-400' :
                  'bg-slate-900/95 border-amber-500/50'}
              `}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-white">
                  {selectedItem.name}
                </h3>
                <button onClick={() => setIsPopupOpen(false)}>
                  <X className="w-9 h-9 text-gray-300 hover:text-white" />
                </button>
              </div>

              <p className="text-gray-300 text-lg mb-8">
                ${selectedItem.amount} / {selectedItem.period} —{' '}
                <span className="font-black text-amber-400 text-2xl">
                  {selectedItem.dailyNR.toFixed(1)} NR/day
                </span>
              </p>

              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-400">Marketplace</label>
                  <p className="px-6 py-4 bg-white/5 rounded-2xl text-lg text-white mt-1">
                    {selectedItem.marketplace || '—'}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Optimizer Note</label>
                  <p className="px-6 py-4 bg-white/5 rounded-2xl text-lg text-white mt-1 min-h-[60px] whitespace-pre-wrap">
                    {selectedItem.optimizerNote || '—'}
                  </p>
                </div>

                {selectedItem.needLevel && (
                  <div className="text-center">
                    <span className={`
                      inline-block px-6 py-3 rounded-full font-bold text-lg
                      ${selectedItem.needLevel === 'essential' ? 'bg-blue-500/30 text-blue-300' :
                        selectedItem.needLevel === 'good-to-have' ? 'bg-green-500/30 text-green-300' :
                        selectedItem.needLevel === 'luxury' ? 'bg-orange-500/30 text-orange-300' :
                        'bg-red-500/30 text-red-300'}
                    `}>
                      {selectedItem.needLevel === 'good-to-have' ? 'Good to Have' :
                       selectedItem.needLevel === 'cut' ? 'Cuttable' :
                       selectedItem.needLevel.charAt(0).toUpperCase() + selectedItem.needLevel.slice(1)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-10">
                <button
                  onClick={() => {
                    setIsPopupOpen(false);
                    startEdit(selectedItem);
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-xl py-6 rounded-2xl hover:scale-105 transition"
                >
                  Edit Expense
                </button>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="flex-1 bg-white/10 backdrop-blur font-bold text-xl py-6 rounded-2xl hover:bg-white/20 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY MODAL */}
        {showCatModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
            <div className="bg-slate-800 rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-amber-400">
                  {editingCatId ? 'Edit' : 'Add'} Category
                </h3>
                <button
                  onClick={() => {
                    setShowCatModal(false);
                    setNewCat({ name: '', icon: '🍎' });
                    setEditingCatId(null);
                  }}
                >
                  <X className="w-8 h-8 text-gray-400" />
                </button>
              </div>

              <input
                placeholder="Name"
                value={newCat.name}
                onChange={(e) =>
                  setNewCat({ ...newCat, name: e.target.value })
                }
                className="w-full mb-5 px-6 py-5 bg-slate-700 rounded-2xl text-lg"
              />

              <div className="grid grid-cols-5 gap-2 mb-8">
                {ALL_EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setNewCat({ ...newCat, icon: e })}
                    className={`p-3 rounded-xl transition ${
                      newCat.icon === e
                        ? 'ring-4 ring-amber-500 bg-amber-900/50'
                        : 'bg-slate-700'
                    }`}
                  >
                    <span className="text-3xl">{e}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={saveCategory}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-2xl py-6 rounded-2xl"
              >
                Save Category
              </button>
            </div>
          </div>
        )}

        {/* DELETE CATEGORY CONFIRM POPUP */}
        {deleteConfirmCatId && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex justify-center mb-4">
                <Trash2 size={48} className="text-red-400" />
              </div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent text-center mb-4">
                Confirm Deletion?
              </h3>
              <p className="text-gray-400 text-center text-lg mb-8">
                Delete this category? All items will go to Uncategorized. This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={confirmDeleteCat}
                  className="flex-1 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-xl rounded-xl hover:opacity-90 transition shadow-md"
                >
                  Delete
                </button>
                <button onClick={() => setDeleteConfirmCatId(null)} className="flex-1 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold text-xl rounded-xl hover:opacity-90 transition shadow-md">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}