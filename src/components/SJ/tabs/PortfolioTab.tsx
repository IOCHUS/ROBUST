// src/components/SJ/tabs/PortfolioTab.tsx
'use client';

import { useSJ } from '@/context/SJContext';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function PortfolioTab() {
  const { portfolio, addPortfolio, deletePortfolio, btcPrice, targetBtcPrice } = useSJ();
  const [showBtc1M, setShowBtc1M] = useState(false);
  const [name, setName] = useState('');
  const [sat, setSat] = useState('');

  const handleAdd = () => {
    if (name && sat) {
      addPortfolio({ name, satoshi: Number(sat) });
      setName(''); setSat('');
    }
  };

  const price = showBtc1M ? targetBtcPrice : btcPrice;
  const totalUSD = portfolio.reduce((s, p) => s + (p.satoshi / 100_000_000) * price, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={showBtc1M} onChange={e => setShowBtc1M(e.target.checked)} />
          <span>BTC = $1,000,000</span>
        </label>
      </div>

      <div className="bg-slate-700 rounded-xl p-4">
        <div className="flex gap-2">
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="flex-1 bg-slate-600 rounded px-3 py-2" />
          <input placeholder="Satoshi" value={sat} onChange={e => setSat(e.target.value)} className="w-32 bg-slate-600 rounded px-3 py-2" />
          <button onClick={handleAdd} className="bg-purple-600 px-4 rounded"><Plus className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="space-y-2">
        {portfolio.map(p => (
          <div key={p.id} className="bg-slate-700 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-bold">{p.name}</p>
              <p className="text-sm text-gray-400">{p.satoshi.toLocaleString()} SAT</p>
            </div>
            <div className="text-right">
              <p className="font-bold">${((p.satoshi / 100_000_000) * price).toFixed(2)}</p>
              <button onClick={() => deletePortfolio(p.id)}><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-center">
        <p className="text-4xl font-black">${totalUSD.toFixed(0)}</p>
        <p className="text-sm">Total Value</p>
      </div>
    </div>
  );
}