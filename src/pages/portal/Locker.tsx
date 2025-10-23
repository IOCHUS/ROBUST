import React, { useState, useEffect } from 'react';
import { Lock, Plus, Trash2 } from 'lucide-react';

interface Desire {
  id: number;
  name: string;
  costUSD: number;
  costBTC: number;
  saved: number;
  monthsToAfford: number;
}

const Locker = () => {
  const [desires, setDesires] = useState<Desire[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [charityEnabled, setCharityEnabled] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState(1000);

  const BTC_PRICE = 45000;

  useEffect(() => {
    const saved = localStorage.getItem('soul_lockers');
    if (saved) {
      setDesires(JSON.parse(saved));
    } else {
      const initial: Desire[] = [
        {
          id: 1,
          name: 'Solar Panel System',
          costUSD: 5000,
          costBTC: 5000 / BTC_PRICE,
          saved: 1200,
          monthsToAfford: 8,
        },
      ];
      setDesires(initial);
    }
  }, []);

  const calculateMonthsToAfford = (cost: number) => {
    const monthlySave = monthlyIncome * 0.2;
    return Math.ceil((cost - 0) / monthlySave);
  };

  const handleAddDesire = () => {
    if (!itemName || !itemCost) {
      alert('Please enter both item name and cost');
      return;
    }

    const cost = parseFloat(itemCost);
    const newDesire: Desire = {
      id: Date.now(),
      name: itemName,
      costUSD: cost,
      costBTC: cost / BTC_PRICE,
      saved: 0,
      monthsToAfford: calculateMonthsToAfford(cost),
    };

    const updated = [...desires, newDesire];
    setDesires(updated);
    localStorage.setItem('soul_lockers', JSON.stringify(updated));

    setItemName('');
    setItemCost('');
  };

  const handleDelete = (id: number) => {
    const updated = desires.filter((d) => d.id !== id);
    setDesires(updated);
    localStorage.setItem('soul_lockers', JSON.stringify(updated));
  };

  const handleUpdateSaved = (id: number, amount: number) => {
    const updated = desires.map((d) =>
      d.id === id ? { ...d, saved: amount } : d
    );
    setDesires(updated);
    localStorage.setItem('soul_lockers', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-400 mb-2">Soul Fuel Locker</h1>
        <p className="text-gray-400">Lock your desires and watch them get funded automatically</p>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Add New Desire</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Item/Goal Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., Solar Panels, Van, Garden Setup"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Cost (USD)</label>
            <input
              type="number"
              value={itemCost}
              onChange={(e) => setItemCost(e.target.value)}
              placeholder="5000"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
            />
            {itemCost && (
              <div className="text-xs text-gray-500 mt-1">
                ≈ {(parseFloat(itemCost) / BTC_PRICE).toFixed(6)} BTC
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm text-gray-400 mb-2 block">Monthly Income Available</label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
            className="w-full md:w-64 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
          />
          <div className="text-xs text-gray-500 mt-1">
            20% saved monthly: ${(monthlyIncome * 0.2).toFixed(2)}
          </div>
        </div>

        {itemCost && (
          <div className="mt-4 bg-slate-800/50 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Affordability Analysis</div>
            <div className="text-lg font-bold text-white">
              Affordable in {calculateMonthsToAfford(parseFloat(itemCost))} months
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Based on saving 20% of ${monthlyIncome}/mo
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="charity"
              checked={charityEnabled}
              onChange={(e) => setCharityEnabled(e.target.checked)}
              className="w-5 h-5 rounded"
            />
            <label htmlFor="charity" className="text-white text-sm">
              Enable 1% charity on achievement
            </label>
          </div>

          <button
            onClick={handleAddDesire}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-2 px-6 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Add Locker</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {desires.map((desire) => {
          const progressPercent = (desire.saved / desire.costUSD) * 100;
          const isReady = progressPercent >= 100;

          return (
            <div
              key={desire.id}
              className={`bg-gradient-to-br from-slate-900 to-slate-950 border rounded-xl p-6 ${
                isReady ? 'border-green-500/50' : 'border-amber-500/20'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Lock className={isReady ? 'text-green-400' : 'text-amber-400'} size={24} />
                  <h3 className="text-lg font-bold text-white">{desire.name}</h3>
                </div>
                <button
                  onClick={() => handleDelete(desire.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Goal</span>
                    <span className="text-white font-semibold">${desire.costUSD.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {desire.costBTC.toFixed(6)} BTC
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Saved</span>
                    <span className={isReady ? 'text-green-400' : 'text-amber-400'}>
                      ${desire.saved.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={desire.saved}
                    onChange={(e) => handleUpdateSaved(desire.id, parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                  />
                </div>

                <div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden mb-2">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isReady ? 'bg-green-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(progressPercent, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 text-center">
                    {progressPercent.toFixed(1)}% Complete
                  </div>
                </div>

                {!isReady && (
                  <div className="text-center text-sm text-gray-400">
                    {desire.monthsToAfford} months at current rate
                  </div>
                )}

                {isReady && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center">
                    <div className="text-green-400 font-bold text-sm">✓ Ready to Order!</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {desires.length === 0 && (
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-amber-500/20 rounded-xl p-12 text-center">
          <Lock className="text-amber-400 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">No Lockers Yet</h3>
          <p className="text-gray-400">Add your first desire above to get started</p>
        </div>
      )}

      <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 border border-amber-500/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-amber-400 mb-3">🔒 How Soul Fuel Lockers Work</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>• Lock in your desires (goals, items, experiences)</li>
          <li>• Convert costs to SAT (Bitcoin) for inflation protection</li>
          <li>• Auto-fund via yield optimization (~15% APY with DeFi)</li>
          <li>• Track progress toward affordability</li>
          <li>• Optional: 1% charity on achievement</li>
          <li>• <span className="text-amber-400 font-semibold">SAAS users</span> get threshold alerts for auto-ordering</li>
        </ul>
      </div>
    </div>
  );
};

export default Locker;
