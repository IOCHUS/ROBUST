import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  image: string;
  video: string;
  link: string;
  quickDescription: string;
  details: { title: string; text: string }[];
  difficulty: string;
  rating: string;
  quote: string;
  category: string;
  completed: boolean;
  lessonContent?: {
    overview: string;
    concepts: { title: string; text: string }[];
    quiz: { question: string; answer: string };
    furtherReading: { title: string; link: string }[];
  };
}

export default function Learning() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const modulesPerPage = 20;

  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Liquidity Architect",
      description: "Master the flow of capital in DeFi ecosystems.",
      image: "./rsc/img/icon/Default_background_minimalist_seamless_luxury_darkblue_orange_0 (1).jpg",
      video: "https://www.youtube.com/embed/nW5bmRfwLHE",
      link: "https://www.investopedia.com/articles/basics/06/invest1000.asp",
      quickDescription: "Design liquidity pools and yield strategies.",
      details: [
        { title: "Pool Mechanics", text: "How liquidity is provided and priced." },
        { title: "Impermanent Loss", text: "Risks and mitigation strategies." },
        { title: "Yield Optimization", text: "Maximize returns across protocols." }
      ],
      difficulty: "Master",
      rating: "5 stars",
      quote: "Liquidity is the lifeblood of DeFi. – Vitalik Buterin",
      category: "Masterclass",
      completed: false,
      lessonContent: {
        overview: "This masterclass teaches you how to become a liquidity architect in DeFi, designing efficient capital flows.",
        concepts: [
          { title: "AMM Model", text: "Automated Market Makers use x*y=k to price assets." },
          { title: "Slippage", text: "Price impact from large trades in low-liquidity pools." },
          { title: "Fee Structure", text: "0.3% fee on Uniswap — where does it go?" }
        ],
        quiz: {
          question: "What causes impermanent loss?",
          answer: "Price divergence between paired assets in a liquidity pool."
        },
        furtherReading: [
          { title: "Uniswap V3 Whitepaper", link: "https://uniswap.org/whitepaper-v3.pdf" },
          { title: "Impermanent Loss Calculator", link: "https://defi-lab.xyz/impermanent-loss" }
        ]
      }
    },
    {
      id: 2,
      title: "Energy Flow",
      description: "Harness momentum in volatile markets.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/energy",
      quickDescription: "Ride the waves of market energy.",
      details: [
        { title: "Momentum Indicators", text: "RSI, MACD, and volume analysis." },
        { title: "Breakout Trading", text: "Enter on confirmed breakouts." },
        { title: "Risk Control", text: "Stop-loss and position sizing." }
      ],
      difficulty: "Expert",
      rating: "4 stars",
      quote: "The trend is your friend. – Old Wall Street Saying",
      category: "Masterclass",
      completed: false
    },
    {
      id: 3,
      title: "Market Game",
      description: "Play the psychological battlefield of trading.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/marketgame",
      quickDescription: "Win the mental game of markets.",
      details: [
        { title: "Fear & Greed", text: "How emotions drive price action." },
        { title: "Crowd Psychology", text: "Herd behavior and contrarian plays." },
        { title: "Discipline", text: "Stick to your plan, no FOMO." }
      ],
      difficulty: "Expert",
      rating: "4 stars",
      quote: "The market is a device for transferring money from the impatient to the patient. – Warren Buffett",
      category: "Masterclass",
      completed: false
    },
    {
      id: 4,
      title: "Strategy Risk Ratio",
      description: "Build systems with positive expectancy.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/riskratio",
      quickDescription: "Risk 1 to make 3.",
      details: [
        { title: "R-Multiple", text: "Risk 1R to gain 2R, 3R, etc." },
        { title: "Win Rate", text: "You can be profitable at 40% win rate." },
        { title: "Edge", text: "Small edge + large sample = profit." }
      ],
      difficulty: "Expert",
      rating: "4 stars",
      quote: "It's not about being right. It's about how much you make when you're right. – Paul Tudor Jones",
      category: "Masterclass",
      completed: false
    },
    {
      id: 5,
      title: "Build Your Monitor",
      description: "Create your trading dashboard.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/monitor",
      quickDescription: "All your data in one place.",
      details: [
        { title: "Tools", text: "TradingView, Dune, DexScreener." },
        { title: "Alerts", text: "Set price, volume, wallet alerts." },
        { title: "Automation", text: "Zapier, IFTTT, custom scripts." }
      ],
      difficulty: "Expert",
      rating: "4 stars",
      quote: "Information is the oil of the 21st century. – Peter Sondergaard",
      category: "Masterclass",
      completed: false
    },
    {
      id: 6,
      title: "Cut All Noise",
      description: "Focus on signal, ignore the rest.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/noise",
      quickDescription: "Trade with clarity.",
      details: [
        { title: "Filter", text: "Ignore 99% of market chatter." },
        { title: "Focus", text: "One strategy, one market, one edge." },
        { title: "Silence", text: "Trade in a quiet room." }
      ],
      difficulty: "Expert",
      rating: "4 stars",
      quote: "The first principle is that you must not fool yourself. – Richard Feynman",
      category: "Tutorial",
      completed: false
    },
    {
      id: 7,
      title: "Sovereign Power",
      description: "Own your financial future.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/sovereign",
      quickDescription: "Be your own bank.",
      details: [
        { title: "Self-Custody", text: "Hold your own keys." },
        { title: "Privacy", text: "Use mixers, Monero, ZK." },
        { title: "Freedom", text: "No one can freeze your funds." }
      ],
      difficulty: "Expert",
      rating: "4 stars",
      quote: "Not your keys, not your coins. – Andreas Antonopoulos",
      category: "Tutorial",
      completed: false
    },
    {
      id: 8,
      title: "Daily GM",
      description: "Start your day with intention.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/gm",
      quickDescription: "Morning routine for winners.",
      details: [
        { title: "Gratitude", text: "Write 3 things you're thankful for." },
        { title: "Movement", text: "10 min walk or stretch." },
        { title: "Mindset", text: "Affirm your goals." }
      ],
      difficulty: "Beginner",
      rating: "5 stars",
      quote: "The secret of your future is hidden in your daily routine. – Mike Murdock",
      category: "Tutorial",
      completed: false
    },
    {
      id: 9,
      title: "Harmony",
      description: "Align your energy with your goals.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/harmony",
      quickDescription: "Live in flow state.",
      details: [
        { title: "Balance", text: "Work, rest, play in harmony." },
        { title: "Breath", text: "4-7-8 breathing technique." },
        { title: "Nature", text: "Grounding, sunlight, fresh air." }
      ],
      difficulty: "Beginner",
      rating: "5 stars",
      quote: "In the midst of movement and chaos, keep stillness inside of you. – Deepak Chopra",
      category: "Tutorial",
      completed: false
    },
    {
      id: 10,
      title: "Create Your Empire",
      description: "Build systems that scale.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/empire",
      quickDescription: "From trader to tycoon.",
      details: [
        { title: "Systems", text: "Automate, delegate, eliminate." },
        { title: "Team", text: "Hire slow, fire fast." },
        { title: "Scale", text: "10x your impact." }
      ],
      difficulty: "Master",
      rating: "5 stars",
      quote: "The best way to predict the future is to create it. – Peter Drucker",
      category: "Tutorial",
      completed: false
    },
    {
      id: 11,
      title: "Hit Your Target I",
      description: "Precision execution in trading.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/target1",
      quickDescription: "Sniper entries.",
      details: [
        { title: "Entry", text: "Wait for confirmation." },
        { title: "Size", text: "Risk 1% per trade." },
        { title: "Exit", text: "Take profit at 3R." }
      ],
      difficulty: "Expert",
      rating: "4 stars",
      quote: "Plan the trade, trade the plan.",
      category: "Library",
      completed: false
    },
    {
      id: 12,
      title: "Hit Your Target II",
      description: "Advanced position management.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/target2",
      quickDescription: "Scale in, scale out.",
      details: [
        { title: "Pyramiding", text: "Add to winners." },
        { title: "Trailing Stop", text: "Lock in profits." },
        { title: "Break Even", text: "Move stop to entry." }
      ],
      difficulty: "Expert",
      rating: "4 stars",
      quote: "Cut your losses, let your profits run.",
      category: "Library",
      completed: false
    },
    {
      id: 13,
      title: "Create Your USP",
      description: "Stand out in a crowded market.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/usp",
      quickDescription: "Unique Selling Proposition.",
      details: [
        { title: "Niche", text: "Specialize in one thing." },
        { title: "Brand", text: "Be memorable." },
        { title: "Value", text: "Deliver 10x." }
      ],
      difficulty: "Expert",
      rating: "4 stars",
      quote: "If you don't have a competitive advantage, don't compete. – Jack Welch",
      category: "Library",
      completed: false
    },
    {
      id: 14,
      title: "Max Out Your Time",
      description: "80/20 everything.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/time",
      quickDescription: "Work smarter.",
      details: [
        { title: "Pareto", text: "80% results from 20% effort." },
        { title: "Deep Work", text: "2-4 hours of focused work." },
        { title: "Batching", text: "Do similar tasks together." }
      ],
      difficulty: "Beginner",
      rating: "5 stars",
      quote: "Time is what we want most, but what we use worst. – William Penn",
      category: "Library",
      completed: false
    },
    {
      id: 15,
      title: "Leave Your Mark",
      description: "Build a legacy.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://example.com/legacy",
      quickDescription: "Impact > Income.",
      details: [
        { title: "Give", text: "Teach what you know." },
        { title: "Build", text: "Create tools, content, systems." },
        { title: "Inspire", text: "Be the example." }
      ],
      difficulty: "Master",
      rating: "5 stars",
      quote: "The greatest use of life is to spend it for something that will outlast it. – William James",
      category: "Library",
      completed: false
    },
  ]);

  // Load completion status
  useEffect(() => {
    const saved = localStorage.getItem('learning_modules');
    if (saved) {
      const parsed = JSON.parse(saved);
      setModules(prev => prev.map(m => {
        const savedModule = parsed.find((sm: Module) => sm.id === m.id);
        return savedModule ? { ...m, completed: savedModule.completed } : m;
      }));
    }
  }, []);

  // Save completion
  const toggleComplete = (id: number) => {
    const updated = modules.map(m => m.id === id ? { ...m, completed: !m.completed } : m);
    setModules(updated);
    localStorage.setItem('learning_modules', JSON.stringify(updated));
  };

  // Filter
  const filteredModules = modules.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!category || m.category === category)
  );

  // Pagination
  const totalPages = Math.ceil(filteredModules.length / modulesPerPage);
  const paginatedModules = filteredModules.slice(
    (currentPage - 1) * modulesPerPage,
    currentPage * modulesPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen text-white font-['Playfair_Display'] bg-black">
      {/* Header */}
      <div className="neon-box bg-gradient-to-b from-gray-700/70 to-gray-900/70 border border-amber-500/20 rounded-xl p-6 text-center shadow-[0_0_10px_rgba(139,125,107,0.3)] m-4">
        <h1 className="text-4xl font-bold" style={{
          background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000'
        }}>
          Evolution is cyclical
        </h1>
      </div>

      {/* Search */}
      <div className="flex justify-center m-4">
        <input
          type="text"
          placeholder="Search modules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="neon-box w-full max-w-lg p-3 rounded-xl bg-gradient-to-b from-gray-700/60 to-gray-900/60 border border-amber-500/20 text-white text-center text-lg font-bold shadow-[0_0_8px_rgba(139,125,107,0.2)] hover:brightness-140 transition-all focus:outline-none focus:scale-105 placeholder-gray-400"
          style={{
            background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a'
          }}
        />
      </div>

      {/* Gift Popup */}
      <span className="fixed top-6 right-12 text-4xl z-10 cursor-pointer" onClick={() => setShowPopup(!showPopup)}>
        <Gift />
      </span>
      {showPopup && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-40" onClick={() => setShowPopup(false)}></div>
          <div className="fixed top-1/4 left-4 right-4 sm:left-1/4 sm:right-1/4 bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-amber-500/20 rounded-xl p-4 shadow-lg z-50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-center" style={{
              background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Free Component Sheet
            </h3>
            <p className="text-lg text-center" style={{
              background: 'linear-gradient(335deg, #065260 4%, #b0e9fb 160%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              By & For The Community
            </p>
            <hr className="border-t-2 border-white my-4" />
            <div className="flex flex-col items-center space-y-4 overflow-y-auto max-h-[60vh]">
              {['Build For Your BrotherHood', 'Share TO Your SisterHood', 'AIRDROP Could Apply for Commitment'].map((text, i) => (
                <div key={i} className="w-4/5 p-4 rounded-lg bg-gradient-to-br from-gray-500/50 to-gray-300/50 text-white text-lg font-bold text-center shadow-lg flex items-center justify-between">
                  <span>{text}</span>
                  <span className="text-2xl">{['Chart', 'Handshake', 'Inbox'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Category Filters */}
      <div className="flex justify-center space-x-4 m-4 flex-wrap">
        {['Masterclass', 'Tutorial', 'Library'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(category === cat ? '' : cat)}
            className={`neon-box p-4 rounded-xl border border-amber-500/20 transition-all hover:brightness-140 hover:scale-105 m-1 ${
              category === cat ? 'ring-2 ring-amber-400' : ''
            }`}
            style={{
              background: cat === 'Masterclass' ? 'linear-gradient(135deg, #b76495, #8b5a7a)' :
                          cat === 'Tutorial' ? 'linear-gradient(135deg, #A9692A, #8b5a2a)' :
                          'linear-gradient(135deg, #2A9D8F, #2a8b7a)'
            }}
          >
            <span className="text-lg font-bold" style={{
              background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {cat.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {paginatedModules.map(module => (
          <div
            key={module.id}
            onClick={() => setOpenModal(module.id)}
            className={`neon-box p-4 rounded-xl border border-amber-500/20 cursor-pointer transition-all hover:brightness-140 hover:scale-105 ${
              module.completed ? 'ring-2 ring-emerald-400 shadow-lg shadow-emerald-400/50' : ''
            }`}
            style={{
              background: module.category === 'Masterclass' ? 'linear-gradient(135deg, #b7649530, #8b5a7a30)' :
                          module.category === 'Tutorial' ? 'linear-gradient(135deg, #A9692A30, #8b5a2a30)' :
                          'linear-gradient(135deg, #2A9D8F30, #2a8b7a30)'
            }}
          >
            <p className="text-center text-lg font-bold" style={{
              background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {module.title}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 m-4 flex-wrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="neon-box p-3 min-w-[2.5rem] rounded-xl bg-gradient-to-b from-gray-700/50 to-gray-800/50 border border-amber-500/20 text-white font-bold transition-all hover:brightness-140 hover:scale-105 disabled:opacity-50 m-1"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`neon-box p-3 min-w-[2.5rem] rounded-xl border border-amber-500/20 text-white font-bold transition-all hover:brightness-140 hover:scale-105 m-1 ${
              currentPage === page ? 'bg-gradient-to-b from-amber-600 to-amber-700' : 'bg-gradient-to-b from-gray-700/50 to-gray-800/50'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="neon-box p-3 min-w-[2.5rem] rounded-xl bg-gradient-to-b from-gray-700/50 to-gray-800/50 border border-amber-500/20 text-white font-bold transition-all hover:brightness-140 hover:scale-105 disabled:opacity-50 m-1"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {openModal && (() => {
        const module = modules.find(m => m.id === openModal);
        if (!module) return null;

        return (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 w-full max-w-4xl rounded-xl shadow-2xl relative max-h-[95vh] overflow-y-auto">
              <button
                onClick={() => setOpenModal(null)}
                className="absolute top-4 right-6 text-5xl text-gray-400 hover:text-white transition-all"
              >
                ×
              </button>

              <img src={module.image} alt={module.title} className="w-full h-64 object-cover rounded-t-xl" />
              
              <div className="p-6 space-y-6">
                <h1 className="text-3xl font-bold text-center" style={{
                  background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {module.title}
                </h1>

                <p className="text-lg text-center" style={{
                  background: 'linear-gradient(335deg, #065260 4%, #b0e9fb 160%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {module.description}
                </p>

                {module.details.map((d, i) => (
                  <div key={i} className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="font-bold text-amber-400">{d.title}</h3>
                    <p className="text-gray-300">{d.text}</p>
                  </div>
                ))}

                {module.video && (
                  <iframe
                    src={module.video}
                    className="w-full h-96 rounded-lg"
                    allowFullScreen
                  ></iframe>
                )}

                <blockquote className="italic text-center text-gray-400 border-l-4 border-teal-500 pl-4">
                  "{module.quote}"
                </blockquote>

                {module.lessonContent && (
                  <div className="space-y-6 border-t border-gray-700 pt-6">
                    <div>
                      <h2 className="text-2xl font-bold text-amber-400 mb-3">Lesson Content</h2>
                      <p className="text-gray-300">{module.lessonContent.overview}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-amber-400 mb-2">Key Concepts</h3>
                      {module.lessonContent.concepts.map((c, i) => (
                        <div key={i} className="ml-4 mb-3">
                          <h4 className="font-semibold text-teal-400">{c.title}</h4>
                          <p className="text-gray-300 text-sm">{c.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="text-xl font-bold text-amber-400 mb-2">Quiz</h3>
                      <p className="font-medium">Q: {module.lessonContent.quiz.question}</p>
                      <p className="text-teal-400 mt-1">A: {module.lessonContent.quiz.answer}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-amber-400 mb-2">Further Reading</h3>
                      {module.lessonContent.furtherReading.map((r, i) => (
                        <a key={i} href={r.link} target="_blank" rel="noopener noreferrer"
                          className="block text-teal-400 hover:text-teal-300 underline text-sm">
                          {r.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComplete(module.id);
                    setOpenModal(null);
                  }}
                  className="w-full py-3 rounded-lg font-bold text-black transition-all"
                  style={{
                    background: module.completed 
                      ? 'linear-gradient(135deg, #10b981, #059669)' 
                      : 'linear-gradient(135deg, #DAA520, #FFD700)'
                  }}
                >
                  {module.completed ? 'Mark Incomplete' : 'Mark as Completed'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}