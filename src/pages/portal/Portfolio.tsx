// src/pages/portal/Portfolio.tsx
'use client';

import { useEffect, useState } from 'react';
import { PlusCircle, Trash2, Edit2, X, ChevronDown, Sparkles, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useNR, PortfolioAsset, PortfolioCategory } from '@/context/NRContext';

function AssetItem({
  asset,
  onEdit,
  onDelete,
}: {
  asset: PortfolioAsset;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const formatNumber = (num: number | null | undefined, decimals: number = 0): string => {
    if (num == null) return '';
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    let value: number;
    let suffix = '';
    if (absNum >= 1e9) {
      value = absNum / 1e9;
      suffix = 'B';
    } else if (absNum >= 1e6) {
      value = absNum / 1e6;
      suffix = 'M';
    } else if (absNum >= 1e3) {
      value = absNum / 1e3;
      suffix = 'K';
    } else {
      value = absNum;
    }
    let str = value.toFixed(decimals);
    str = str.replace(/\.?0+$/, '');
    return sign + str + suffix;
  };

  return (
    <div onClick={onEdit} className="cursor-pointer flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-slate-700/50 transition group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-full">
          <p className="font-medium text-lg text-white truncate">{asset.name}</p>
          <div className="flex items-center gap-4">
            <p className="text-gray-400 font-mono">{formatNumber(asset.amount, 0)}</p>
            {asset.notes && <p className="text-gray-300 italic truncate flex-1 min-w-0" title={asset.notes}>{asset.notes}</p>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="px-4 py-2 bg-amber-900/40 text-amber-400 rounded-full font-bold">
          {formatNumber(asset.nr_value, 0)} NR
        </span>
        <span className="px-4 py-2 bg-green-900/40 text-green-400 rounded-full font-bold">
          {asset.yield_nr_per_day ? `+${formatNumber(asset.yield_nr_per_day, 2)}` : '—'}
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

type SortMode = 'none' | 'value-asc' | 'value-desc' | 'yield-asc' | 'yield-desc';

export default function Portfolio() {
  const {
    portfolioCategories,
    portfolioAssets,
    addPortfolioCategory,
    updatePortfolioCategory,
    deletePortfolioCategory,
    addPortfolioAsset,
    updatePortfolioAsset,
    deletePortfolioAsset,
    countryRate,
  } = useNR();

  const [showAddAsset, setShowAddAsset] = useState(false);
  const [showEditAsset, setShowEditAsset] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [editingAsset, setEditingAsset] = useState<PortfolioAsset | null>(null);
  const [editingCategory, setEditingCategory] = useState<PortfolioCategory | null>(null);
  const [deleteConfirmCatId, setDeleteConfirmCatId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [assetForm, setAssetForm] = useState({
    name: '', amount: '', yield_percent: '', notes: '', category_id: '',
  });
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: '💰',
  });
  const [sortModes, setSortModes] = useState<Record<string, SortMode>>({});

  const ALL_EMOJIS = ['₿', '🥇', '💰', '🏦', '🛡️', '🏠', '🚗', '💎', '📈', '🌍', '🔋', '🖼️', '🍷', '📚', '🎨'];

  const DEFAULT_CATEGORIES = new Set(['RESERVE', 'COMMODITIES', 'SECURITIES', 'TGA', 'EMERGENCY', 'UNCATEGORIZED']);

  const formatNumber = (num: number | null | undefined, decimals: number = 0): string => {
    if (num == null) return '';
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    let value: number;
    let suffix = '';
    if (absNum >= 1e9) {
      value = absNum / 1e9;
      suffix = 'B';
    } else if (absNum >= 1e6) {
      value = absNum / 1e6;
      suffix = 'M';
    } else if (absNum >= 1e3) {
      value = absNum / 1e3;
      suffix = 'K';
    } else {
      value = absNum;
    }
    let str = value.toFixed(decimals);
    str = str.replace(/\.?0+$/, '');
    return sign + str + suffix;
  };

  const totalNR = portfolioAssets.reduce((s, a) => s + a.nr_value, 0);
  const passiveNRPerDay = portfolioAssets.reduce((s, a) => s + (a.yield_nr_per_day || 0), 0);

  const term = search.toLowerCase();

  let grouped = portfolioCategories.map(cat => {
    let assets = portfolioAssets.filter(a => a.category_id === cat.id && (cat.name.toLowerCase().includes(term) || a.name.toLowerCase().includes(term)));
    const mode = sortModes[cat.id] || 'none';

    if (mode !== 'none') {
      assets = [...assets].sort((a, b) => {
        if (mode === 'value-asc') return a.nr_value - b.nr_value;
        if (mode === 'value-desc') return b.nr_value - a.nr_value;
        if (mode === 'yield-asc') return (a.yield_nr_per_day || 0) - (b.yield_nr_per_day || 0);
        if (mode === 'yield-desc') return (b.yield_nr_per_day || 0) - (a.yield_nr_per_day || 0);
        return 0;
      });
    }

    return {
      ...cat,
      assets,
      totalNr: assets.reduce((s, a) => s + a.nr_value, 0),
    };
  }).filter(g => g.assets.length > 0 || g.name.toLowerCase().includes(term));

  const uncatAssets = portfolioAssets.filter(a => !a.category_id && a.name.toLowerCase().includes(term));
  if (uncatAssets.length > 0) {
    const uncatCat = portfolioCategories.find(c => c.name.toUpperCase() === 'UNCATEGORIZED');
    if (uncatCat) {
      grouped = grouped.map(g => {
        if (g.id === uncatCat.id) {
          return {
            ...g,
            assets: [...g.assets, ...uncatAssets],
            totalNr: g.totalNr + uncatAssets.reduce((s, a) => s + a.nr_value, 0),
          };
        }
        return g;
      });
    } else {
      grouped.push({
        id: 'uncategorized',
        name: 'Uncategorized',
        icon: '❓',
        assets: uncatAssets,
        totalNr: uncatAssets.reduce((s, a) => s + a.nr_value, 0),
      });
    }
  }

  const reserveGroup = grouped.find(g => g.name.toUpperCase() === 'RESERVE');
  const otherGroups = grouped.filter(g => g.name.toUpperCase() !== 'RESERVE');

  const toggleCollapse = (id: string) =>
    setCollapsed((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleSort = (catId: string, type: 'value' | 'yield') => {
    setSortModes((prev) => {
      const cur = prev[catId] || 'none';
      let next: SortMode = 'none';

      if (type === 'value') {
        if (cur === 'none' || cur.startsWith('yield')) next = 'value-asc';
        else if (cur === 'value-asc') next = 'value-desc';
        else if (cur === 'value-desc') next = 'none';
      } else {
        if (cur === 'none' || cur.startsWith('value')) next = 'yield-asc';
        else if (cur === 'yield-asc') next = 'yield-desc';
        else if (cur === 'yield-desc') next = 'none';
      }

      const copy = { ...prev };
      if (next === 'none') delete copy[catId];
      else copy[catId] = next;
      return copy;
    });
  };

  const handleAddAsset = async () => {
    if (!assetForm.name || !assetForm.amount || !assetForm.category_id) return;
    const amount = Number(assetForm.amount);
    const yield_percent = assetForm.yield_percent ? Number(assetForm.yield_percent) : null;
    const yield_nr_per_day = yield_percent ? (yield_percent / 100 * amount / countryRate) / 365 : null;
    await addPortfolioAsset({
      category_id: assetForm.category_id,
      name: assetForm.name,
      amount,
      yield_nr_per_day,
      notes: assetForm.notes || null,
    });
    setShowAddAsset(false);
    setAssetForm({ name: '', amount: '', yield_percent: '', notes: '', category_id: '' });
  };

  const handleUpdateAsset = async () => {
    if (!editingAsset) return;
    const amount = Number(assetForm.amount);
    const yield_percent = assetForm.yield_percent ? Number(assetForm.yield_percent) : null;
    const yield_nr_per_day = yield_percent ? (yield_percent / 100 * amount / countryRate) / 365 : null;
    await updatePortfolioAsset(editingAsset.id, {
      name: assetForm.name,
      amount,
      yield_nr_per_day,
      notes: assetForm.notes || null,
      category_id: assetForm.category_id,
    });
    setShowEditAsset(false);
    setEditingAsset(null);
    setAssetForm({ name: '', amount: '', yield_percent: '', notes: '', category_id: '' });
  };

  const startEditAsset = (asset: PortfolioAsset) => {
    setEditingAsset(asset);
    const yearly_percent = asset.yield_nr_per_day ? (asset.yield_nr_per_day * 365 * countryRate / asset.amount * 100) : 0;
    setAssetForm({
      name: asset.name,
      amount: asset.amount.toString(),
      yield_percent: yearly_percent ? yearly_percent.toFixed(2) : '',
      notes: asset.notes || '',
      category_id: asset.category_id,
    });
    setShowEditAsset(true);
  };

  const openAddForCategory = (catId: string) => {
    setAssetForm({
      name: '',
      amount: '',
      yield_percent: '',
      notes: '',
      category_id: catId,
    });
    setShowAddAsset(true);
  };

  const handleSaveCategory = async () => {
    if (!categoryForm.name) return;
    if (editingCategory) {
      await updatePortfolioCategory(editingCategory.id, {
        name: categoryForm.name,
        icon: categoryForm.icon,
      });
    } else {
      await addPortfolioCategory({
        name: categoryForm.name,
        icon: categoryForm.icon,
      });
    }
    setShowAddCategory(false);
    setShowEditCategory(false);
    setEditingCategory(null);
    setCategoryForm({ name: '', icon: '💰' });
  };

  const startEditCategory = (cat: PortfolioCategory) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      icon: cat.icon,
    });
    setShowEditCategory(true);
  };

  const confirmDeleteCategory = async () => {
    if (deleteConfirmCatId) {
      await deletePortfolioCategory(deleteConfirmCatId);
      setDeleteConfirmCatId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-indigo-950">
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* MERGED HERO SECTION */}
        <div className="relative bg-slate-950/80 backdrop-blur-2xl rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-green-500" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-6 mb-4">
                <Sparkles className="w-12 h-12 text-orange-400 animate-pulse drop-shadow-lg" />
                <p className="text-8xl font-black tracking-tighter bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                  {formatNumber(totalNR, 0)}
                </p>
                <Sparkles className="w-12 h-12 text-orange-400 animate-pulse drop-shadow-lg" />
              </div>
              <p className="text-xl uppercase tracking-widest font-bold text-orange-200/80">Total Energy Wealth (NR)</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-6 mb-4">
                <Sparkles className="w-12 h-12 text-green-400 animate-pulse drop-shadow-lg" />
                <p className="text-8xl font-black tracking-tighter bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-2xl">
                  +{formatNumber(passiveNRPerDay, 2)}
                </p>
                <Sparkles className="w-12 h-12 text-green-400 animate-pulse drop-shadow-lg" />
              </div>
              <p className="text-xl uppercase tracking-widest font-bold text-green-200/80">Passive Income (NR/day)</p>
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets or categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/50"
          />
        </div>

        {/* SPECIAL RESERVE FRAME */}
        {reserveGroup && (
          <div className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 rounded-3xl overflow-hidden border border-amber-400/30 shadow-xl">
            <button
              onClick={() => toggleCollapse(reserveGroup.id)}
              className="w-full px-8 py-6 flex justify-between items-center hover:bg-indigo-800/30 transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-6xl">{reserveGroup.icon}</span>
                <div className="text-left flex items-center gap-2">
                  <h4 className="text-2xl font-bold text-white">{reserveGroup.name}</h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSort(reserveGroup.id, 'value');
                    }}
                    className="text-gray-400 hover:text-amber-400"
                  >
                    {sortModes[reserveGroup.id]?.startsWith('value') ? (
                      sortModes[reserveGroup.id] === 'value-asc' ? <ArrowUp className="w-6 h-6" /> : <ArrowDown className="w-6 h-6" />
                    ) : (
                      <ArrowUpDown className="w-6 h-6" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSort(reserveGroup.id, 'yield');
                    }}
                    className="text-gray-400 hover:text-green-400"
                  >
                    {sortModes[reserveGroup.id]?.startsWith('yield') ? (
                      sortModes[reserveGroup.id] === 'yield-asc' ? <ArrowUp className="w-6 h-6" /> : <ArrowDown className="w-6 h-6" />
                    ) : (
                      <ArrowUpDown className="w-6 h-6" />
                    )}
                  </button>
                </div>
                <p className="text-base text-gray-300">{reserveGroup.assets.length} assets</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-4xl font-black text-amber-300">{formatNumber(reserveGroup.totalNr, 0)} NR</span>
                <PlusCircle 
                  className="w-8 h-8 text-amber-300 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    openAddForCategory(reserveGroup.id);
                  }}
                />
                <ChevronDown
                  className={`w-8 h-8 transition ${collapsed.includes(reserveGroup.id) ? '' : 'rotate-180'}`}
                />
              </div>
            </button>
            {!collapsed.includes(reserveGroup.id) && (
              <div className="px-8 pb-8 space-y-0 border-t border-amber-400/20">
                {reserveGroup.assets.length === 0 ? (
                  <p className="text-center py-4 text-zinc-500">No assets yet – click + to add</p> // Minimized py-16 to py-4
                ) : (
                  reserveGroup.assets.map((asset) => (
                    <AssetItem
                      key={asset.id}
                      asset={asset}
                      onEdit={() => startEditAsset(asset)}
                      onDelete={() => deletePortfolioAsset(asset.id)}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* OTHER ASSETS BY CATEGORY */}
        <div className="space-y-6">
          {otherGroups.map((g) => (
            <div key={g.id} className="bg-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleCollapse(g.id)}
                className="w-full px-6 py-5 flex justify-between items-center hover:bg-slate-700/50 transition"
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{g.icon}</span>
                  <div className="text-left flex items-center gap-2">
                    <h4 className="text-xl font-bold text-white">{g.name}</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSort(g.id, 'value');
                      }}
                      className="text-gray-400 hover:text-amber-400"
                    >
                      {sortModes[g.id]?.startsWith('value') ? (
                        sortModes[g.id] === 'value-asc' ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />
                      ) : (
                        <ArrowUpDown className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSort(g.id, 'yield');
                      }}
                      className="text-gray-400 hover:text-green-400"
                    >
                      {sortModes[g.id]?.startsWith('yield') ? (
                        sortModes[g.id] === 'yield-asc' ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />
                      ) : (
                        <ArrowUpDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">{g.assets.length} assets</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-black text-amber-400">{formatNumber(g.totalNr, 0)} NR</span>
                  <PlusCircle 
                    className="w-7 h-7 text-amber-400 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      openAddForCategory(g.id);
                    }}
                  />
                  {!DEFAULT_CATEGORIES.has(g.name.toUpperCase()) && (
                    <>
                      <Edit2 
                        className="w-7 h-7 text-blue-400 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditCategory(g as PortfolioCategory);
                        }}
                      />
                      <Trash2 
                        className="w-7 h-7 text-red-400 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmCatId(g.id);
                        }}
                      />
                    </>
                  )}
                  <ChevronDown
                    className={`w-7 h-7 transition ${collapsed.includes(g.id) ? '' : 'rotate-180'}`}
                  />
                </div>
              </button>
              {!collapsed.includes(g.id) && (
                <div className="px-6 pb-6 space-y-0 border-t border-white/10">
                  {g.assets.length === 0 ? (
                    <p className="text-center py-4 text-zinc-500">No assets yet – click + to add</p> // Minimized py-16 to py-4
                  ) : (
                    g.assets.map((asset) => (
                      <AssetItem
                        key={asset.id}
                        asset={asset}
                        onEdit={() => startEditAsset(asset)}
                        onDelete={() => deletePortfolioAsset(asset.id)}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ADD CATEGORY BUTTON */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              setShowAddCategory(true);
              setCategoryForm({ name: '', icon: '💰' });
            }}
            className="bg-slate-800 rounded-full p-4 hover:bg-slate-700 transition"
          >
            <PlusCircle className="w-8 h-8 text-amber-400" />
          </button>
        </div>

        {/* FLOATING ADD ASSET BUTTON */}
        <button
          onClick={() => {
            setShowAddAsset(true);
            setAssetForm({ name: '', amount: '', yield_percent: '', notes: '', category_id: '' });
          }}
          className="fixed bottom-8 right-8 w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition z-50"
        >
          <PlusCircle className="w-10 h-10 text-black" />
        </button>

        {/* ADD/EDIT ASSET MODAL */}
        {(showAddAsset || showEditAsset) && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
            <div className="bg-slate-800 rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-amber-400">
                  {showEditAsset ? 'Edit' : 'Add'} Asset
                </h3>
                <button
                  onClick={() => {
                    setShowAddAsset(false);
                    setShowEditAsset(false);
                    setEditingAsset(null);
                    setAssetForm({ name: '', amount: '', yield_percent: '', notes: '', category_id: '' });
                  }}
                >
                  <X className="w-8 h-8 text-gray-400" />
                </button>
              </div>

              <input
                placeholder="Name"
                value={assetForm.name}
                onChange={(e) => setAssetForm({ ...assetForm, name: e.target.value })}
                className="w-full mb-5 px-6 py-5 bg-slate-700 rounded-2xl text-lg"
              />

              <input
                type="number"
                placeholder="Current value in USD"
                value={assetForm.amount}
                onChange={(e) => setAssetForm({ ...assetForm, amount: e.target.value })}
                className="w-full mb-5 px-6 py-5 bg-slate-700 rounded-2xl text-lg"
              />

              <input
                type="number"
                placeholder="Yearly Yield % (optional)"
                value={assetForm.yield_percent}
                onChange={(e) => setAssetForm({ ...assetForm, yield_percent: e.target.value })}
                className="w-full mb-5 px-6 py-5 bg-slate-700 rounded-2xl text-lg"
              />

              <textarea
                placeholder="Notes (optional)"
                value={assetForm.notes}
                onChange={(e) => setAssetForm({ ...assetForm, notes: e.target.value })}
                className="w-full mb-5 px-6 py-5 bg-slate-700 rounded-2xl text-lg min-h-[80px]"
                maxLength={175}
              />

              <select
                value={assetForm.category_id}
                onChange={(e) => setAssetForm({ ...assetForm, category_id: e.target.value })}
                className="w-full mb-8 px-6 py-5 bg-slate-700 rounded-2xl text-lg"
              >
                <option value="">Select Category</option>
                {portfolioCategories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>

              <button
                onClick={showEditAsset ? handleUpdateAsset : handleAddAsset}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-2xl py-6 rounded-2xl"
              >
                {showEditAsset ? 'Update' : 'Add'} Asset
              </button>
            </div>
          </div>
        )}

        {/* ADD/EDIT CATEGORY MODAL */}
        {(showAddCategory || showEditCategory) && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
            <div className="bg-slate-800 rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-amber-400">
                  {showEditCategory ? 'Edit' : 'Add'} Category
                </h3>
                <button
                  onClick={() => {
                    setShowAddCategory(false);
                    setShowEditCategory(false);
                    setEditingCategory(null);
                    setCategoryForm({ name: '', icon: '💰' });
                  }}
                >
                  <X className="w-8 h-8 text-gray-400" />
                </button>
              </div>

              <input
                placeholder="Name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                className="w-full mb-5 px-6 py-5 bg-slate-700 rounded-2xl text-lg"
              />

              <div className="grid grid-cols-5 gap-2 mb-5">
                {ALL_EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setCategoryForm({ ...categoryForm, icon: e })}
                    className={`p-3 rounded-xl transition ${
                      categoryForm.icon === e
                        ? 'ring-4 ring-amber-500 bg-amber-900/50'
                        : 'bg-slate-700'
                    }`}
                  >
                    <span className="text-3xl">{e}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleSaveCategory}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-2xl py-6 rounded-2xl"
              >
                Save Category
              </button>
            </div>
          </div>
        )}

        {/* DELETE CATEGORY CONFIRM */}
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
                Delete this category? Assets will be uncategorized. This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={confirmDeleteCategory}
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