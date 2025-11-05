// src/pages/portal/Portfolio.tsx
import { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Zap,
  Sun,
  Edit2,
  X,
} from 'lucide-react';
import { useJoulStore, type Asset, type Category } from '@/store/joul';

const RESERVE_TARGET_SAT = 481_000;
const DAILY_JOUL_NEED = 4;
const SAT_PER_BTC = 100_000_000;
const BTC_USD_PRICE = 110_000; // adjust if you have a live price feed

export default function Portfolio() {
  const {
    assets,
    categories,
    addAsset,
    deleteAsset,
    addCategory,
    satPerJoul,
  } = useJoulStore();

  const [showAdd, setShowAdd] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: '',
    usd: '',
    yieldUsd: '',
    notes: '',
    category: 'crypto',
  });
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('');
  const [f4Eta, setF4Eta] = useState('∞');

  /* ────────────────────── CORE METRICS ────────────────────── */
  const totalSat = assets.reduce((s, a) => s + a.satValue, 0);
  const passiveSatPerDay = assets.reduce(
    (s, a) => s + (a.yieldSatPerDay || 0),
    0
  );
  const passiveJoul = passiveSatPerDay / satPerJoul;
  const reservePct = Math.min(100, (totalSat / RESERVE_TARGET_SAT) * 100);

  /* ────────────────────── F4 ETA ────────────────────── */
  useEffect(() => {
    if (passiveJoul >= DAILY_JOUL_NEED && reservePct >= 100) {
      setF4Eta('NOW');
    } else if (passiveSatPerDay > 0) {
      const needed = RESERVE_TARGET_SAT - totalSat;
      const days = needed <= 0 ? 0 : Math.ceil(needed / passiveSatPerDay);
      setF4Eta(days === 0 ? 'NOW' : `${days}d`);
    } else {
      setF4Eta('∞');
    }
  }, [totalSat, passiveSatPerDay, satPerJoul, reservePct]);

  /* ────────────────────── GROUP BY CATEGORY ────────────────────── */
  const grouped = categories.map((cat) => ({
    ...cat,
    assets: assets.filter((a) => a.category === cat.id),
    totalSat: assets
      .filter((a) => a.category === cat.id)
      .reduce((s, a) => s + a.satValue, 0),
    passive: assets
      .filter((a) => a.category === cat.id)
      .reduce((s, a) => s + (a.yieldSatPerDay || 0), 0),
  }));

  /* ────────────────────── ADD ASSET HANDLER ────────────────────── */
  const handleAddAsset = () => {
    const usd = parseFloat(newAsset.usd) || 0;
    const yieldUsd = parseFloat(newAsset.yieldUsd) || 0;
    if (!newAsset.name || usd <= 0) return;

    let finalCategory = newAsset.category;

    // ---- create new category if needed ----
    if (isNewCategory && newCatName) {
      const newId = newCatName.toLowerCase().replace(/ /g, '_');
      const newCat: Category = {
        id: newId,
        name: newCatName.toUpperCase(),
        icon: newCatIcon || newCatName[0],
        color: 'from-gray-500 to-gray-700',
      };
      addCategory(newCat);
      finalCategory = newId;
    }

    const sat = Math.floor((usd * SAT_PER_BTC) / BTC_USD_PRICE);
    const yieldSatPerDay = Math.floor((yieldUsd * SAT_PER_BTC) / BTC_USD_PRICE);

    addAsset({
      id: Date.now().toString(),
      category: finalCategory,
      name: newAsset.name,
      amount: sat,
      satValue: sat,
      yieldSatPerDay: yieldSatPerDay > 0 ? yieldSatPerDay : undefined,
      notes: newAsset.notes,
      dateAdded: new Date().toISOString(),
    });

    // reset modal
    setShowAdd(false);
    setNewAsset({ name: '', usd: '', yieldUsd: '', notes: '', category: 'crypto' });
    setIsNewCategory(false);
    setNewCatName('');
    setNewCatIcon('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white p-6">
      {/* ───── HEADER ───── */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Sun className="w-10 h-10 text-yellow-500" />
              SAT VAULT
            </h1>
            <p className="text-zinc-400 mt-1">F4 = Permanent Freedom</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-500">F4 ETA</p>
            <p className="text-5xl font-bold text-orange-500">{f4Eta}</p>
          </div>
        </div>
      </div>

      {/* ───── F4 STATUS BAR ───── */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-zinc-500">Total Reserve</p>
                <p className="text-3xl font-bold">
                  {(totalSat / SAT_PER_BTC).toFixed(6)} BTC
                </p>
              </div>
              <div className="h-12 w-px bg-zinc-700" />
              <div>
                <p className="text-sm text-zinc-500">Passive Income</p>
                <p className="text-3xl font-bold text-green-400">
                  {passiveJoul.toFixed(2)} JOUL/d
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-500">F4 Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 and-3 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-1000"
                    style={{ width: `${reservePct}%` }}
                  />
                </div>
                <span className="text-xl font-bold w-16">
                  {reservePct.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───── CATEGORY GRID ───── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {grouped.map((cat) => {
          const pct = totalSat > 0 ? (cat.totalSat / totalSat) * 100 : 0;
          return (
            <div
              key={cat.id}
              className="group relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl font-bold text-white shadow-lg`}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{cat.name}</h3>
                    <p className="text-sm text-zinc-500">
                      {cat.assets.length} asset{cat.assets.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                {cat.passive > 0 && <Zap className="w-5 h-5 text-green-400" />}
              </div>

              {/* BTC */}
              <div className="mb-2">
                <p className="text-2xl font-bold">
                  {(cat.totalSat / SAT_PER_BTC).toFixed(6)} BTC
                </p>
                <p className="text-sm text-zinc-500">{pct.toFixed(1)}% of vault</p>
              </div>

              {/* Passive */}
              {cat.passive > 0 && (
                <p className="text-sm text-green-400 font-medium">
                  +{cat.passive.toLocaleString()} SAT/d →{' '}
                  {(cat.passive / satPerJoul).toFixed(2)} JOUL/d
                </p>
              )}

              {/* Hover Add */}
              <button
                onClick={() => {
                  setNewAsset({ ...newAsset, category: cat.id });
                  setShowAdd(true);
                }}
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-opacity"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          );
        })}
      </div>

      {/* ───── ASSETS BY CATEGORY (collapsible) ───── */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Assets by Category</h2>
        {grouped.map((cat) => (
          <details
            key={cat.id}
            className="mb-4 bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl overflow-hidden"
          >
            <summary className="p-6 flex items-center justify-between cursor-pointer hover:bg-zinc-800/50 transition">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl font-bold text-white shadow-lg`}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-sm text-zinc-500">
                    {cat.assets.length} asset{cat.assets.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {(cat.totalSat / SAT_PER_BTC).toFixed(6)} BTC
                </p>
                {cat.passive > 0 && (
                  <p className="text-sm text-green-400">
                    +{cat.passive.toLocaleString()} SAT/d
                  </p>
                )}
              </div>
            </summary>

            <div className="overflow-x-auto border-t border-zinc-800">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-zinc-500 border-b border-zinc-800">
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium text-right">
                      BTC Amount
                    </th>
                    <th className="px-6 py-3 font-medium text-right">
                      Yield (SAT/d)
                    </th>
                    <th className="px-6 py-3 font-medium text-right">
                      Daily Cash Flow (JOUL/d)
                    </th>
                    <th className="px-6 py-3 font-medium">Notes</th>
                    <th className="px-6 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {cat.assets.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-zinc-600">
                        No assets in this category
                      </td>
                    </tr>
                  ) : (
                    cat.assets.map((asset) => (
                      <tr
                        key={asset.id}
                        className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
                      >
                        <td className="px-6 py-4 font-medium">{asset.name}</td>
                        <td className="px-6 py-4 text-right font-mono">
                          {(asset.satValue / SAT_PER_BTC).toFixed(8)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {asset.yieldSatPerDay ? (
                            <span className="text-green-400">
                              +{asset.yieldSatPerDay}
                            </span>
                          ) : (
                            <span className="text-zinc-600">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {asset.yieldSatPerDay ? (
                            <span className="text-green-400">
                              {(asset.yieldSatPerDay / satPerJoul).toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-zinc-600">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-zinc-400">
                          {asset.notes || '—'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteAsset(asset.id)}
                            className="text-red-400 hover:text-red-300 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </details>
        ))}
      </div>

      {/* ───── ADD ASSET MODAL ───── */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Freeze Asset</h2>

            <input
              type="text"
              placeholder="Name (e.g. BTC Cold, Rice Field)"
              className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white mb-4 placeholder-zinc-500"
              value={newAsset.name}
              onChange={(e) =>
                setNewAsset({ ...newAsset, name: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Dollar Amount"
              className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white mb-4 placeholder-zinc-500 font-mono"
              value={newAsset.usd}
              onChange={(e) =>
                setNewAsset({ ...newAsset, usd: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Daily Yield USD (optional)"
              className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white mb-4 placeholder-zinc-500 font-mono"
              value={newAsset.yieldUsd}
              onChange={(e) =>
                setNewAsset({ ...newAsset, yieldUsd: e.target.value })
              }
            />

            <textarea
              placeholder="Notes (e.g. For travel budget, Dip reinforcement)"
              className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white mb-4 placeholder-zinc-500 resize-none"
              rows={2}
              value={newAsset.notes}
              onChange={(e) =>
                setNewAsset({ ...newAsset, notes: e.target.value })
              }
            />

            {/* ── Category selector ── */}
            <select
              className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white mb-4"
              value={newAsset.category}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'new') {
                  setIsNewCategory(true);
                  setNewAsset({ ...newAsset, category: '' });
                } else {
                  setIsNewCategory(false);
                  setNewAsset({ ...newAsset, category: val });
                }
              }}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
              <option value="new">+ Create new category</option>
            </select>

            {/* ── New-category fields ── */}
            {isNewCategory && (
              <>
                <input
                  type="text"
                  placeholder="New Category Name"
                  className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white mb-4 placeholder-zinc-500"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Icon (emoji or short text)"
                  className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white mb-4 placeholder-zinc-500"
                  value={newCatIcon}
                  onChange={(e) => setNewCatIcon(e.target.value)}
                />
              </>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleAddAsset}
                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-3 rounded-xl transition hover:scale-105"
              >
                FREEZE
              </button>
              <button
                onClick={() => {
                  setShowAdd(false);
                  setIsNewCategory(false);
                  setNewCatName('');
                  setNewCatIcon('');
                }}
                className="flex-1 bg-zinc-800 text-zinc-400 py-3 rounded-xl transition hover:bg-zinc-700"
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