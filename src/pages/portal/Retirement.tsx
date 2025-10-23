import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Target, Download } from 'lucide-react';

const Retirement = () => {
  const [currentSAT, setCurrentSAT] = useState(0.05);
  const [dailySavings, setDailySavings] = useState(10);
  const [yieldRate, setYieldRate] = useState(5);
  const [goalSAT, setGoalSAT] = useState(0.1);
  const [fdsBonus, setFdsBonus] = useState(true);

  const BTC_PRICE = 45000;

  const calculateYearsToFreedom = () => {
    const dailySaveBTC = dailySavings / BTC_PRICE;
    const annualRate = yieldRate / 100;
    const dailyRate = annualRate / 365;

    const fdsMultiplier = fdsBonus ? 1.2 : 1;
    const effectiveDailySave = dailySaveBTC * fdsMultiplier;

    let balance = currentSAT;
    let days = 0;
    const maxDays = 365 * 50;

    while (balance < goalSAT && days < maxDays) {
      balance += effectiveDailySave;
      balance += balance * dailyRate;
      days++;
    }

    return (days / 365).toFixed(1);
  };

  const years = parseFloat(calculateYearsToFreedom());

  const generateProjection = () => {
    const data = [];
    const dailySaveBTC = dailySavings / BTC_PRICE;
    const annualRate = yieldRate / 100;
    const dailyRate = annualRate / 365;
    const fdsMultiplier = fdsBonus ? 1.2 : 1;
    const effectiveDailySave = dailySaveBTC * fdsMultiplier;

    let balance = currentSAT;

    for (let year = 0; year <= Math.ceil(years); year++) {
      data.push(parseFloat(balance.toFixed(4)));

      for (let day = 0; day < 365; day++) {
        balance += effectiveDailySave;
        balance += balance * dailyRate;
      }
    }

    return data;
  };

  const projection = generateProjection();

  const chartData = {
    labels: projection.map((_, i) => `Year ${i}`),
    datasets: [
      {
        label: 'BTC Balance',
        data: projection,
        borderColor: '#FCD34D',
        backgroundColor: 'rgba(252, 211, 77, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Goal (0.1 BTC)',
        data: projection.map(() => goalSAT),
        borderColor: '#10B981',
        borderDash: [5, 5],
        tension: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#fff' },
      },
      title: {
        display: true,
        text: 'Path to Financial Freedom',
        color: '#fff',
      },
    },
    scales: {
      x: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  const handleExportPDF = () => {
    alert('PDF export feature coming soon! Use your browser\'s print to PDF for now.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-400 mb-2">Retirement Planner</h1>
        <p className="text-gray-400">Calculate your path to financial freedom</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Your Inputs</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Current SAT (BTC)</label>
              <input
                type="number"
                step="0.001"
                value={currentSAT}
                onChange={(e) => setCurrentSAT(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
              <div className="text-xs text-gray-500 mt-1">
                ${(currentSAT * BTC_PRICE).toLocaleString()}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Daily Savings ($)</label>
              <input
                type="number"
                value={dailySavings}
                onChange={(e) => setDailySavings(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
              <div className="text-xs text-gray-500 mt-1">
                {(dailySavings / BTC_PRICE).toFixed(6)} BTC/day
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Yield Rate (%)</label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={yieldRate}
                onChange={(e) => setYieldRate(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-white font-semibold mt-1">{yieldRate}% APY</div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Freedom Goal (BTC)</label>
              <input
                type="number"
                step="0.01"
                value={goalSAT}
                onChange={(e) => setGoalSAT(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
              <div className="text-xs text-gray-500 mt-1">
                ${(goalSAT * BTC_PRICE).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-3">
            <input
              type="checkbox"
              id="fds"
              checked={fdsBonus}
              onChange={(e) => setFdsBonus(e.target.checked)}
              className="w-5 h-5 rounded"
            />
            <label htmlFor="fds" className="text-white">
              Hit FDS Daily (+20% savings boost)
            </label>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 border border-amber-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Results</h2>
            <Target className="text-amber-400" size={24} />
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-400 mb-2">{years}</div>
              <div className="text-gray-400">Years to Freedom</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Final Balance</div>
              <div className="text-2xl font-bold text-white">{goalSAT.toFixed(4)} BTC</div>
              <div className="text-sm text-gray-400">${(goalSAT * BTC_PRICE).toLocaleString()}</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Total Contributions</div>
              <div className="text-lg font-bold text-white">
                ${(dailySavings * 365 * years).toLocaleString()}
              </div>
            </div>

            {fdsBonus && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                <div className="text-green-400 font-semibold text-sm">
                  FDS Bonus: -{(years * 0.2).toFixed(1)} years!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Growth Projection</h2>
          <button
            onClick={handleExportPDF}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download size={16} />
            <span>Export PDF</span>
          </button>
        </div>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-amber-500/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">💡 Pro Tips</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>• Hitting FDS daily can reduce your timeline by up to 20%</li>
          <li>• Higher yield rates compound faster - explore DeFi options</li>
          <li>• Increase daily savings even by $5 to see dramatic improvements</li>
          <li>• Set up automatic transfers to stay consistent</li>
        </ul>
      </div>
    </div>
  );
};

export default Retirement;
