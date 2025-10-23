import React, { useState } from 'react';
import { Users, Search, Heart } from 'lucide-react';

interface Profile {
  id: number;
  name: string;
  fdsStreak: number;
  planSnippet: string;
  following: boolean;
  avatar: string;
}

const Network = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: 1,
      name: 'Alex_Freedom',
      fdsStreak: 42,
      planSnippet: 'Building a solar-powered tiny home in Colorado. Focus on energy sovereignty.',
      following: false,
      avatar: '🌄',
    },
    {
      id: 2,
      name: 'Maria_Soul',
      fdsStreak: 28,
      planSnippet: 'Teaching yoga remotely while traveling. Soul Hustle = helping others find peace.',
      following: false,
      avatar: '🧘',
    },
    {
      id: 3,
      name: 'TechNomad',
      fdsStreak: 67,
      planSnippet: 'Software dev + BTC stacking. Goal: 0.5 BTC by 2025. Remote work from anywhere.',
      following: true,
      avatar: '💻',
    },
    {
      id: 4,
      name: 'GreenThumb_Jane',
      fdsStreak: 35,
      planSnippet: 'Permaculture farm with food sovereignty. Selling excess produce locally.',
      following: false,
      avatar: '🌱',
    },
    {
      id: 5,
      name: 'BitcoinBob',
      fdsStreak: 89,
      planSnippet: 'DeFi yield optimization expert. Teaching others to grow their SAT stack.',
      following: false,
      avatar: '₿',
    },
    {
      id: 6,
      name: 'Wellness_Sam',
      fdsStreak: 21,
      planSnippet: 'Health coaching + supplement side hustle. Building passive income streams.',
      following: false,
      avatar: '💪',
    },
    {
      id: 7,
      name: 'VanLife_Chris',
      fdsStreak: 53,
      planSnippet: 'Living in a converted van. Solar setup complete. Freelance writing income.',
      following: true,
      avatar: '🚐',
    },
    {
      id: 8,
      name: 'Artist_Luna',
      fdsStreak: 19,
      planSnippet: 'Digital art NFTs + print sales. Soul Hustle = creating beauty every day.',
      following: false,
      avatar: '🎨',
    },
  ]);

  const toggleFollow = (id: number) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id ? { ...p, following: !p.following } : p
      )
    );
  };

  const filteredProfiles = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.planSnippet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const followingCount = profiles.filter((p) => p.following).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-400 mb-2">Inspiration Network</h1>
        <p className="text-gray-400">Connect with freedom seekers on similar journeys</p>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Users className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">Community</h2>
          </div>
          <div className="text-sm text-gray-400">
            Following: <span className="text-amber-400 font-bold">{followingCount}</span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by name or goal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-2xl">
                  {profile.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{profile.name}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-semibold">
                      {profile.fdsStreak} day streak
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-4 line-clamp-3">{profile.planSnippet}</p>

            <button
              onClick={() => toggleFollow(profile.id)}
              className={`w-full py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                profile.following
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              <Heart size={16} className={profile.following ? 'fill-current' : ''} />
              <span>{profile.following ? 'Following' : 'Follow'}</span>
            </button>
          </div>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-amber-500/20 rounded-xl p-12 text-center">
          <Users className="text-amber-400 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">No Results</h3>
          <p className="text-gray-400">Try a different search term</p>
        </div>
      )}

      <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 border border-amber-500/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-amber-400 mb-3">🌐 Network Features</h3>
        <div className="space-y-3 text-gray-300 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-amber-400">•</span>
            <span><strong>Anonymous Profiles:</strong> Privacy-first. Share only what you want.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-amber-400">•</span>
            <span><strong>Similar Journeys:</strong> Find people with comparable FDS streaks and goals.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-amber-400">•</span>
            <span><strong>Follow Updates:</strong> See milestones from people you follow.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-amber-400">•</span>
            <span><strong>SAAS Bonus:</strong> Upgrade to send protocol gifts (BTC tips) and unlock advanced matching.</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-amber-500/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-3">💡 Community Guidelines</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>• Be supportive - we're all on the same journey</li>
          <li>• Share honestly about your wins and struggles</li>
          <li>• Respect privacy - don't share others' info outside the network</li>
          <li>• Celebrate milestones together</li>
          <li>• Offer help when you can, ask for it when you need it</li>
        </ul>
      </div>
    </div>
  );
};

export default Network;
