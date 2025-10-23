import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Wallet, TrendingUp, Info } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DeFi = () => {
  const [connected, setConnected] = useState(false);
  const [btcBalance, setBtcBalance] = useState(0.05);
  const [selectedProtocol, setSelectedProtocol] = useState('aave');
  const [showGuide, setShowGuide] = useState(false);

  const protocols = [
    { id: 'aave', name: 'Aave', apy: 5.2 },
    { id: 'compound', name: 'Compound', apy: 4.8 },
    { id: 'curve', name: 'Curve', apy: 6.5 },
    { id: 'yearn', name: 'Yearn', apy: 7.1 },
  ];

  const currentProtocol = protocols.find((p) => p.id === selectedProtocol) || protocols[0];
  const BTC_PRICE = 45000;
  const usdBalance = btcBalance * BTC_PRICE;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const projectedGrowth = months.map((_, i) => {
    const monthlyGrowth = Math.pow(1 + currentProtocol.apy / 100 / 12, i);
    return (btcBalance * monthlyGrowth).toFixed(4);
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'BTC Balance',
        data: projectedGrowth,
        borderColor: '#FCD34D',
        backgroundColor: 'rgba(252, 211, 77, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
      title: {
        display: true,
        text: '6-Month Growth Projection',
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-400 mb-2">DeFi Wallet</h1>
        <p className="text-gray-400">Manage your Bitcoin and maximize yield</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Wallet Status</h2>
            <Wallet className="text-amber-400" size={24} />
          </div>

          {!connected ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-6">Connect your wallet to get started</p>
              <button
                onClick={() => {
                  setConnected(true);
                  alert('Wallet Connected Successfully!');
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Connect Wallet
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">BTC Balance</div>
                <div className="text-3xl font-bold text-white">{btcBalance.toFixed(4)}</div>
                <div className="text-sm text-gray-400 mt-1">${usdBalance.toLocaleString()}</div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                    Connected
                  </span>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Current Yield</span>
                  <span className="text-amber-400 font-bold">{currentProtocol.apy}% APY</span>
                </div>
                <div className="text-xs text-gray-500">
                  Protocol: {currentProtocol.name}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Yield Optimizer</h2>
            <TrendingUp className="text-amber-400" size={24} />
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Select Protocol</label>
              <select
                value={selectedProtocol}
                onChange={(e) => setSelectedProtocol(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              >
                {protocols.map((protocol) => (
                  <option key={protocol.id} value={protocol.id}>
                    {protocol.name} - {protocol.apy}% APY
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">Annual Earnings Estimate</div>
              <div className="text-2xl font-bold text-green-400">
                ${((usdBalance * currentProtocol.apy) / 100).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {((btcBalance * currentProtocol.apy) / 100).toFixed(6)} BTC
              </div>
            </div>

            <button
              onClick={() => setShowGuide(true)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Stake Now</span>
              <Info size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Growth Projection</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 border border-amber-500/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-amber-400 mb-2">🚀 Upgrade to SAAS</h3>
        <p className="text-gray-300 mb-4">
          Get automatic yield optimization, rebalancing, and compound reinvestment for just $29/month.
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded-lg transition-colors">
          Learn More
        </button>
      </div>

      {showGuide && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">Staking Guide</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2">Step 1: Choose Protocol</h3>
                <p className="text-sm">Select {currentProtocol.name} from the dropdown above.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Step 2: Visit Protocol</h3>
                <p className="text-sm">Go to {currentProtocol.name}'s official website.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Step 3: Connect Wallet</h3>
                <p className="text-sm">Connect your Web3 wallet (MetaMask, etc.).</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Step 4: Stake BTC</h3>
                <p className="text-sm">Follow the protocol's staking instructions.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Step 5: Monitor</h3>
                <p className="text-sm">Check back here to track your earnings!</p>
              </div>
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition-colors mt-6"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeFi;
