import React, { useState, useEffect } from 'react';
import { TrendingUp, Zap, Wallet, Target } from 'lucide-react';

const Dashboard = () => {
  const [kcal, setKcal] = useState(2000);
  const [water, setWater] = useState(2);
  const [kwh, setKwh] = useState(5);
  const [feuJoules, setFeuJoules] = useState(0);
  const [fdsStreak, setFdsStreak] = useState(7);
  const [btcBalance, setBtcBalance] = useState(0.05);
  const [planProgress, setPlanProgress] = useState(40);

  const TARGET_JOULES = 168000000;
  const BTC_PRICE = 45000;

  useEffect(() => {
    calculateFEU();
  }, []);

  const calculateFEU = () => {
    const joules = (kcal * 4184) + (water * 1000) + (kwh * 3600000);
    setFeuJoules(joules);
    localStorage.setItem('feu_joules', joules.toString());
  };

  const feuPercentage = (feuJoules / TARGET_JOULES) * 100;
  const fdsStatus = feuPercentage >= 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-400 mb-2">Welcome Back!</h1>
        <p className="text-gray-400">Your freedom journey at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">FEU Supply</h3>
            <Zap className="text-amber-400" size={24} />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Today's Joules</span>
                <span className={fdsStatus ? 'text-green-400' : 'text-red-400'}>
                  {(feuJoules / 1000000).toFixed(2)}M / 168M
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    fdsStatus ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(feuPercentage, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={kcal}
                  onChange={(e) => setKcal(Number(e.target.value))}
                  className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-sm"
                />
                <span className="text-xs text-gray-400">kcal</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={water}
                  onChange={(e) => setWater(Number(e.target.value))}
                  className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-sm"
                />
                <span className="text-xs text-gray-400">Liters</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={kwh}
                  onChange={(e) => setKwh(Number(e.target.value))}
                  className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-sm"
                />
                <span className="text-xs text-gray-400">kWh</span>
              </div>
            </div>

            <button
              onClick={calculateFEU}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg transition-colors text-sm"
            >
              Calculate & Update
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">FDS Score</h3>
            <TrendingUp className="text-amber-400" size={24} />
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <div
                className={`inline-block px-4 py-2 rounded-full font-bold text-lg ${
                  fdsStatus
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-red-500/20 text-red-400 border border-red-500/50'
                }`}
              >
                {fdsStatus ? 'YES' : 'NO'}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">{fdsStreak}</div>
              <div className="text-sm text-gray-400">Day Streak</div>
            </div>

            <div
              className={`text-center text-sm font-semibold ${
                fdsStatus ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {fdsStatus ? '🎉 On Track!' : '⚠️ Late - Adjust Budget!'}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">SAT Wallet</h3>
            <Wallet className="text-amber-400" size={24} />
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-white">{btcBalance.toFixed(4)} BTC</div>
              <div className="text-sm text-gray-400">${(btcBalance * BTC_PRICE).toLocaleString()}</div>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-slate-800">
              <span className="text-sm text-gray-400">Yield APY</span>
              <span className="text-sm font-semibold text-green-400">5.0%</span>
            </div>

            <button
              onClick={() => alert('Wallet Connected!')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
            >
              Connect Wallet
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Plan Status</h3>
            <Target className="text-amber-400" size={24} />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Goal: 0.1 BTC</span>
                <span className="text-amber-400">{planProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                  style={{ width: `${planProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-slate-800">
              <span className="text-sm text-gray-400">Steps Completed</span>
              <span className="text-sm font-semibold text-white">2/5</span>
            </div>

            <div
              className={`text-center text-sm font-semibold ${
                planProgress >= 50 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {planProgress >= 50 ? '✓ On Track' : '⚠️ Behind Schedule'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-amber-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Budget Tracker', path: '/portal/feu-tracker', icon: '💰' },
            { name: 'Learning', path: '/portal/learning', icon: '📚' },
            { name: 'DeFi Wallet', path: '/portal/defi', icon: '🏦' },
            { name: 'Retirement', path: '/portal/retirement', icon: '🎯' },
          ].map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="flex items-center space-x-3 p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-sm text-gray-300">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
