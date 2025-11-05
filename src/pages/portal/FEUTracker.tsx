import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DayEntry {
  date: string;
  food: number;
  rent: number;
  utilities: number;
  extras: number;
  kcal: number;
  water: number;
  kwh: number;
  feuJoules: number;
  fds: boolean;
}

const FEUTracker = () => {
  const [food, setFood] = useState(50);
  const [rent, setRent] = useState(300);
  const [utilities, setUtilities] = useState(100);
  const [extras, setExtras] = useState(50);
  const [kcal, setKcal] = useState(2000);
  const [water, setWater] = useState(2);
  const [kwh, setKwh] = useState(5);
  const [history, setHistory] = useState<DayEntry[]>([]);

  const TARGET_JOULES = 168000000;

  useEffect(() => {
    const saved = localStorage.getItem('feu_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const calculateFEU = () => {
    return (kcal * 4184) + (water * 1000) + (kwh * 3600000);
  };

  const totalExpenses = food + rent + utilities + extras;
  const basics = food + rent + utilities;
  const extrasPercent = (extras / totalExpenses) * 100;

  const chartData = {
    labels: ['Food', 'Rent', 'Utilities', 'Extras'],
    datasets: [
      {
        data: [food, rent, utilities, extras],
        backgroundColor: ['#FCD34D', '#FB923C', '#F87171', '#60A5FA'],
        borderColor: '#000',
        borderWidth: 2,
      },
    ],
  };

  const handleSave = () => {
    const feuJoules = calculateFEU();
    const fds = feuJoules >= TARGET_JOULES;

    const entry: DayEntry = {
      date: new Date().toISOString().split('T')[0],
      food,
      rent,
      utilities,
      extras,
      kcal,
      water,
      kwh,
      feuJoules,
      fds,
    };

    const newHistory = [entry, ...history.slice(0, 9)];
    setHistory(newHistory);
    localStorage.setItem('feu_history', JSON.stringify(newHistory));
    localStorage.setItem('feu_joules', feuJoules.toString());
    alert('Data saved and dashboard updated!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-400 mb-2">FEU Budget Tracker</h1>
        <p className="text-gray-400">Track your daily expenses and energy production</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Daily Expenses ($)</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Food</label>
              <input
                type="number"
                value={food}
                onChange={(e) => setFood(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Rent/Housing</label>
              <input
                type="number"
                value={rent}
                onChange={(e) => setRent(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Utilities</label>
              <input
                type="number"
                value={utilities}
                onChange={(e) => setUtilities(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Extras</label>
              <input
                type="number"
                value={extras}
                onChange={(e) => setExtras(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
              />
            </div>
            <div className="pt-4 border-t border-slate-700">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-white">Total</span>
                <span className="text-amber-400">${totalExpenses.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Energy Production</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Food Energy (kcal)</label>
              <input
                type="number"
                value={kcal}
                onChange={(e) => setKcal(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Water (Liters)</label>
              <input
                type="number"
                value={water}
                onChange={(e) => setWater(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Solar/Grid Power (kWh)</label>
              <input
                type="number"
                value={kwh}
                onChange={(e) => setKwh(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
              />
            </div>
            <div className="pt-4 border-t border-slate-700">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-white">FEU Joules</span>
                <span className="text-green-400">{(calculateFEU() / 1000000).toFixed(2)}M</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Target: 168M Joules</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Expense Breakdown</h2>
        <div className="max-w-md mx-auto">
          <Pie data={chartData} options={{ plugins: { legend: { labels: { color: '#fff' } } } }} />
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Extras: <span className={extrasPercent > 20 ? 'text-red-400' : 'text-green-400'}>{extrasPercent.toFixed(1)}%</span>
            {extrasPercent > 20 && ' - Consider reducing extras!'}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-3 px-12 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Save & Update Dashboard
        </button>
      </div>

      {history.length > 0 && (
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-gray-400">Date</th>
                  <th className="text-right py-2 text-gray-400">Total $</th>
                  <th className="text-right py-2 text-gray-400">FEU (M)</th>
                  <th className="text-center py-2 text-gray-400">FDS</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, index) => (
                  <tr key={index} className="border-b border-slate-800">
                    <td className="py-2 text-gray-300">{entry.date}</td>
                    <td className="text-right py-2 text-white">${(entry.food + entry.rent + entry.utilities + entry.extras).toFixed(2)}</td>
                    <td className="text-right py-2 text-green-400">{(entry.feuJoules / 1000000).toFixed(2)}</td>
                    <td className="text-center py-2">
                      <span className={`px-2 py-1 rounded ${entry.fds ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {entry.fds ? 'YES' : 'NO'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FEUTracker;
