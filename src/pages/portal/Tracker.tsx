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
}: {
  item: any;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const daysLeft = item.daysLeft;
  let badge: JSX.Element | null = null;

  if (daysLeft !== null) {
    const cls =
      daysLeft <= 0
        ? 'bg-red-900/50 text-red-400'
        : daysLeft <= 7
        ? 'bg-red-900/30 text-red-400'
        : daysLeft <= 30
        ? 'bg-amber-900/30 text-amber-400'
        : 'bg-gray-900/30 text-gray-400';

    const txt =
      daysLeft <= 0 ? 'Expired' : `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left`;

    badge = (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${cls} mr-2`}>
        {txt}
      </span>
    );
  }

  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-slate-700/50 transition"
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

        for (const c of defaults) {
          const id = c.name.toLowerCase().replace(/\s+/g, '-');
          try {
            await addCategory({ id, ...c });
          } catch (e) {
            console.error('Failed to add default category:', e);
          }
        }
        await loadAll();
      }
    })();
  }, [categories.length, addCategory, loadAll]);

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

  const filtered = enriched.filter((i) => {
    const term = search.toLowerCase();
    const cat = categories.find(
      (c) => c.id === i.category || (!i.category && c.id === 'uncategorized')
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
          i.category === cat.id || (!i.category && cat.id === 'uncategorized')
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
    .filter((g) => g.items.length > 0 || g.id !== 'uncategorized');

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

const payload: Omit<Outflow, 'id' | 'user_id' | 'dailyNR' | 'created_at'> = {      name: form.name.trim(),
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

  /* ---------- CATEGORY HANDLERS ---------- */
  const saveCategory = async () => {
    const name = newCat.name.trim();
    if (!name) return;

    const new_id = name.toLowerCase().replace(/\s+/g, '-');
    const payload = { name, icon: newCat.icon };

    try {
      const exists = categories.find((c) => c.id === new_id);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      const uid = user.id;

      if (editingCatId) {
        const old_id = editingCatId;
        if (new_id === old_id) {
          // No name change, just update
          await updateCategory(old_id, payload);
        } else {
          if (exists) {
            alert('Category with this name already exists');
            return;
          }
          // Update outflows to new_id
          const { error: outflowError } = await supabase
            .from('outflows')
            .update({ category: new_id })
            .eq('category', old_id)
            .eq('user_id', uid);
          if (outflowError) throw outflowError;

          // Update category id and payload
          const { error: catError } = await supabase
            .from('categories')
            .update({ id: new_id, ...payload })
            .eq('id', old_id)
            .eq('user_id', uid);
          if (catError) throw catError;
        }
      } else {
        // Add mode
        if (exists) {
          alert('Category with this name already exists');
          return;
        }
        await addCategory({ id: new_id, ...payload });
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
    if (confirm('Delete this category? All items will go to Uncategorized.')) {
      await deleteCategory(id);
      await loadAll();
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

        {/* HERO */}
        <div className="bg-gradient-to-br from-amber-500 to-rose-600 rounded-3xl p-8 text-center shadow-2xl">
          <div className="flex items-center justify-center gap-4 mb-3">
            <Sparkles className="w-10 h-10 text-yellow-200 animate-pulse" />
            <p className="text-7xl font-black text-white">{heroNR}</p>
            <Sparkles className="w-10 h-10 text-yellow-200 animate-pulse" />
          </div>
          <p className="text-lg uppercase tracking-widest text-yellow-100 font-bold">
            NR per day
          </p>
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

        {/* CATEGORIES GRID */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-white">Categories</h3>
          <button
            onClick={() => {
              setShowCatModal(true);
              setEditingCatId(null);
              setNewCat({ name: '', icon: '🍎' });
            }}
            className="text-amber-400 flex items-center gap-2 font-medium"
          >
            <PlusCircle className="w-6 h-6" /> Add
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {categories.map((c) => (
            <div key={c.id} className="relative">
              <button
                onClick={() => startEditCat(c)}
                className="w-full bg-slate-800 rounded-2xl p-4 flex flex-col items-center hover:ring-4 hover:ring-amber-500/50 transition"
              >
                <span className="text-6xl mb-2">{c.icon}</span>
                <p className="text-sm font-medium text-white">{c.name}</p>
              </button>
              {c.id !== 'uncategorized' && (
                <button
                  onClick={() => deleteCat(c.id)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-300 opacity-50 hover:opacity-100 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
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
                    <ChevronDown
                      className={`w-7 h-7 transition ${
                        collapsed.includes(g.id) ? '' : 'rotate-180'
                      }`}
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
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-slate-800 rounded-3xl p-3 sm:p-4 md:p-6 w-full max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-3 sm:mb-4">
                {editingCatId ? 'Edit' : 'Add'} Category
              </h3>

              <input
                placeholder="Name"
                value={newCat.name}
                onChange={(e) =>
                  setNewCat({ ...newCat, name: e.target.value })
                }
                className="w-full mb-3 sm:mb-4 px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 rounded-2xl text-sm sm:text-base md:text-lg"
              />

              <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-1 sm:gap-2 p-1 sm:p-2 bg-slate-700/50 rounded-2xl overflow-y-auto max-h-[40vh] sm:max-h-[50vh]">
                {ALL_EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setNewCat({ ...newCat, icon: e })}
                    className={`p-1 sm:p-2 md:p-3 rounded-xl transition flex items-center justify-center ${
                      newCat.icon === e
                        ? 'ring-2 sm:ring-4 ring-amber-500 bg-amber-900/50'
                        : 'bg-slate-700'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">{e}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-6">
                <button
                  onClick={saveCategory}
                  className="flex-1 bg-amber-500 text-black font-bold text-sm sm:text-base md:text-xl py-2 sm:py-3 md:py-4 rounded-2xl"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowCatModal(false);
                    setNewCat({ name: '', icon: '🍎' });
                    setEditingCatId(null);
                  }}
                  className="flex-1 bg-slate-700 text-white font-bold text-sm sm:text-base md:text-xl py-2 sm:py-3 md:py-4 rounded-2xl"
                >
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