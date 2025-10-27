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
  lessonContent?: { overview: string; concepts: { title: string; text: string }[]; quiz: { question: string; answer: string }; furtherReading: { title: string; link: string }[] };
}

const Learning: React.FC = () => {
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
      description: "Learn the basics of investing with these essential tips.",
      image: "./rsc/img/icon/Default_background_minimalist_seamless_luxury_darkblue_orange_0 (1).jpg",
      video: "https://www.youtube.com/embed/nW5bmRfwLHE",
      link: "https://www.investopedia.com/articles/basics/06/invest1000.asp",
      quickDescription: "Quick insight into investment fundamentals.",
      details: [
        { title: "Starting Out", text: "Understand the basics of investment vehicles." },
        { title: "Investment Strategies", text: "Learn about diversification and asset allocation." },
        { title: "Risk Management", text: "Explore techniques to mitigate investment risks." }
      ],
      difficulty: "Master",
      rating: "★★★☆☆",
      quote: "An investment in knowledge pays the best interest. – Benjamin Franklin",
      category: "Masterclass",
      completed: false,
      lessonContent: {
        overview: "This lesson introduces the fundamentals of investing, helping you understand how to start building wealth through various investment vehicles.",
        concepts: [
          { title: "What is Investing?", text: "Investing involves committing money to an asset with the expectation of generating income or profit. Common vehicles include stocks, bonds, and mutual funds." },
          { title: "Diversification", text: "Spreading investments across different assets to reduce risk. A diversified portfolio might include stocks, bonds, and real estate." },
          { title: "Risk vs. Return", text: "Higher potential returns often come with higher risks. Understanding your risk tolerance is key to choosing investments." }
        ],
        quiz: {
          question: "What is a stock?",
          answer: "A stock represents ownership in a company, entitling the shareholder to a portion of its profits."
        },
        furtherReading: [
          { title: "Investopedia: How to Start Investing", link: "https://www.investopedia.com/articles/basics/06/invest1000.asp" },
          { title: "Investopedia: Diversification", link: "https://www.investopedia.com/terms/d/diversification.asp" }
        ]
      }
    },
    { id: 2, title: "Energy Flow", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Masterclass", completed: false },
    { id: 3, title: "Market Game", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Masterclass", completed: false },
    { id: 4, title: "Strategy Risk Ratio", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Masterclass", completed: false },
    { id: 5, title: "Build Your Monitor", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Masterclass", completed: false },
    { id: 6, title: "Cut All Noise", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Tutorial", completed: false },
    { id: 7, title: "Sovereign Power", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Tutorial", completed: false },
    { id: 8, title: "Daily GM", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Tutorial", completed: false },
    { id: 9, title: "Harmony", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Tutorial", completed: false },
    { id: 10, title: "Create Your Empire", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Tutorial", completed: false },
    { id: 11, title: "Hit Your Target I", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Library", completed: false },
    { id: 12, title: "Hit Your Target II", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Library", completed: false },
    { id: 13, title: "Create Your USP", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Library", completed: false },
    { id: 14, title: "Max Out Your Time", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Library", completed: false },
    { id: 15, title: "Leave Your Mark", description: "Dive into advanced trading strategies.", image: "https://example.com/image2.jpg", video: "https://example.com/video2.mp4", link: "https://example.com/moreinfo2", quickDescription: "Advanced techniques for seasoned traders.", details: [{ title: "Technical Analysis", text: "Learn charting and technical analysis." }, { title: "Leverage Trading", text: "How and when to use leverage." }, { title: "Algorithmic Trading", text: "Using algorithms for trading efficiency." }], difficulty: "Expert", rating: "★★★★☆", quote: "The goal of a successful trader is to make the best trades. Money is secondary. – Alexander Elder", category: "Library", completed: false },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('learning_modules');
    if (saved) {
      const parsed = JSON.parse(saved);
      setModules(modules.map(m => {
        const savedModule = parsed.find((sm: Module) => sm.id === m.id);
        return savedModule ? { ...m, completed: savedModule.completed } : m;
      }));
    }
  }, []);

  const toggleComplete = (id: number) => {
    const updated = modules.map(m => m.id === id ? { ...m, completed: !m.completed } : m);
    setModules(updated);
    localStorage.setItem('learning_modules', JSON.stringify(updated));
  };

  const filteredModules = modules.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (searchTerm !== '' || category === '' || m.category === category)
  );

  const totalPages = Math.ceil(filteredModules.length / modulesPerPage);
  const paginatedModules = filteredModules.slice((currentPage - 1) * modulesPerPage, currentPage * modulesPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen text-white font-['Playfair_Display']">
      {/* Header Section */}
      <div
        className="neon-box bg-gradient-to-b from-gray-700/70 to-gray-900/70 border border-amber-500/20 rounded-xl p-6 text-center shadow-[0_0_10px_rgba(139,125,107,0.3)]"
      >
        <h1
          className="text-4xl font-bold card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
          style={{
            textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
            background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Evolution is cyclical
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center m-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="neon-box w-full max-w-lg p-3 rounded-xl bg-gradient-to-b from-gray-700/60 to-gray-900/60 border border-amber-500/20 text-white text-center text-lg font-bold shadow-[0_0_8px_rgba(139,125,107,0.2)] hover:brightness-140 transition-all focus:outline-none focus:scale-105 placeholder-gray-400 placeholder-opacity-70"
          style={{
            textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
            background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        />
      </div>

      {/* Community Popup */}
      <span className="fixed top-6 right-12 text-4xl z-10" onClick={() => setShowPopup(!showPopup)}>
        <Gift />
      </span>
      {showPopup && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-10"></div>
          <div className="fixed top-1/4 left-4 right-4 sm:left-1/4 sm:right-1/4 bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-amber-500/20 rounded-xl p-4 shadow-lg z-20 max-w-2xl mx-auto">
            <h3
              className="text-2xl font-bold text-center card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
              style={{
                textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Free Component Sheet
            </h3>
            <p
              className="text-lg text-center card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
              style={{
                textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                background: 'linear-gradient(335deg, #065260 4%, #b0e9fb 160%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              By & For The Community
            </p>
            <hr className="border-t-2 border-white my-4" />
            <div className="flex flex-col items-center space-y-4 overflow-y-auto max-h-[60vh]">
              {['Build For Your BrotherHood', 'Share TO Your SisterHood', 'AIRDROP Could Apply for Commitment'].map((text, index) => (
                <div
                  key={index}
                  className="w-4/5 p-4 rounded-lg bg-gradient-to-br from-gray-500/50 to-gray-300/50 text-white text-lg font-bold text-center shadow-lg hover:shadow-xl transition-all flex items-center justify-between"
                >
                  <span>{text}</span>
                  <span className="text-2xl">{['📊', '🤝', '📥'][index % 3]}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Category Filters */}
      <div className="flex justify-center space-x-4 m-4">
        {['Masterclass', 'Tutorial', 'Library'].map(cat => (
          <div
            key={cat}
            className={`neon-box p-4 rounded-xl bg-gradient-to-b ${
              cat === 'Masterclass'
                ? 'from-pink-900/50 to-pink-800/50'
                : cat === 'Tutorial'
                ? 'from-orange-900/50 to-orange-800/50'
                : 'from-teal-700/50 to-teal-600/50'
            } border border-amber-500/20 text-center transition-all hover:brightness-140 hover:scale-105`}
            style={{
              '--neon-color': cat === 'Masterclass' ? '#b76495' : cat === 'Tutorial' ? '#A9692A' : '#2A9D8F',
            } as React.CSSProperties}
            onClick={() => setCategory(cat)}
          >
            <span
              className="text-lg font-bold card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
              style={{
                textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {cat.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {paginatedModules.map(module => (
          <div
            key={module.id}
            className={`neon-box p-4 rounded-xl bg-gradient-to-b ${
              module.category === 'Masterclass'
                ? 'from-pink-900/50 to-pink-800/50'
                : module.category === 'Tutorial'
                ? 'from-orange-900/50 to-orange-800/50'
                : 'from-teal-700/50 to-teal-600/50'
            } border border-amber-500/20 text-white shadow-lg transition-all ${
              module.completed ? 'bg-gradient-to-b from-emerald-600/70 to-emerald-500/70 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : ''
            } hover:brightness-140 hover:scale-105`}
            onClick={() => setOpenModal(module.id)}
          >
            <p
              className="text-center text-lg font-bold card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
              style={{
                textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {module.title}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 m-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="neon-box p-3 min-w-[2.5rem] rounded-xl bg-gradient-to-b from-gray-700/50 to-gray-800/50 border border-amber-500/20 text-white font-bold transition-all hover:brightness-140 hover:scale-105 disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`neon-box p-3 min-w-[2.5rem] rounded-xl bg-gradient-to-b from-gray-700/50 to-gray-800/50 border border-amber-500/20 text-white font-bold transition-all hover:brightness-140 hover:scale-105 ${
              currentPage === page ? 'bg-gradient-to-b from-gray-600/70 to-gray-700/70' : ''
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="neon-box p-3 min-w-[2.5rem] rounded-xl bg-gradient-to-b from-gray-700/50 to-gray-800/50 border border-amber-500/20 text-white font-bold transition-all hover:brightness-140 hover:scale-105 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 backdrop-blur-md"></div>
          <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 w-full max-w-4xl rounded-xl overflow-y-auto relative z-50 max-h-[90vh] shadow-[0_0_15px_rgba(45,94,96,0.274),0_0_20px_rgba(45,94,96,0.245),0_0_25px_rgba(45,94,96,0.241),0_0_30px_rgba(71,71,133,0.413)]">
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-0 right-4 text-4xl sm:text-6xl text-gray-300 hover:text-gray-100 hover:scale-125 transition-transform"
            >
              &times;
            </button>
            {(() => {
              const module = modules.find(m => m.id === openModal);
              if (!module) return null;
              return (
                <>
                  <img src={module.image} alt={module.title} className="w-full h-48 sm:h-64 object-cover" />
                  <div className="shadow-line h-1 bg-gradient-to-b from-transparent to-gray-300/50"></div>
                  <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 p-4">
                    <h1
                      className="text-xl sm:text-3xl font-bold text-center card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                      style={{
                        textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                        background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {module.title}
                    </h1>
                    <p
                      className="text-base sm:text-lg text-center card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                      style={{
                        textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                        background: 'linear-gradient(335deg, #065260 4%, #b0e9fb 160%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {module.description}
                    </p>
                  </div>
                  <div className="shadow-line h-1 bg-gradient-to-b from-transparent to-gray-300/50"></div>
                  <div className="p-4 bg-gradient-to-b from-gray-800/80 to-gray-900/80">
                    {module.details.map((detail, index) => (
                      <div key={index} className="my-4">
                        <h3
                          className="text-lg sm:text-2xl font-bold text-center card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                          style={{
                            textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                            background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {detail.title}
                        </h3>
                        <p
                          className="text-base sm:text-lg text-center card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                          style={{
                            textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                            background: 'linear-gradient(335deg, #065260 4%, #b0e9fb 160%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {detail.text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="shadow-line h-1 bg-gradient-to-b from-transparent to-gray-300/50"></div>
                  <iframe
                    src={module.video}
                    className={`w-full h-64 sm:h-96 ${module.video ? '' : 'hidden'}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="shadow-line h-1 bg-gradient-to-b from-transparent to-gray-300/50"></div>
                  <div className="p-4 bg-gradient-to-b from-gray-800/80 to-gray-900/80 italic border-l-4 border-teal-500">
                    <p
                      className="card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                      style={{
                        textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                        background: 'linear-gradient(335deg, #065260 4%, #b0e9fb 160%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {module.quote}
                    </p>
                  </div>
                  {module.lessonContent && (
                    <>
                      <div className="shadow-line h-1 bg-gradient-to-b from-transparent to-gray-300/50"></div>
                      <div className="p-4 bg-gradient-to-b from-gray-800/80 to-gray-900/80">
                        <h2
                          className="text-xl sm:text-2xl font-bold text-center card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                          style={{
                            textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                            background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          Lesson: Introduction to Investing
                        </h2>
                        <div className="my-4">
                          <h3
                            className="text-lg sm:text-xl font-bold card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                            style={{
                              textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                              background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            Overview
                          </h3>
                          <p
                            className="text-base sm:text-lg card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                            style={{
                              textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                              background: 'linear-gradient(335deg, #065260 4%, #b0e9fb 160%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            {module.lessonContent.overview}
                          </p>
                        </div>
                        <div className="my-4">
                          <h3
                            className="text-lg sm:text-xl font-bold card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                            style={{
                              textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                              background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            Key Concepts
                          </h3>
                          {module.lessonContent.concepts.map((concept, index) => (
                            <div key={index} className="my-4">
                              <h4
                                className="text-base sm:text-lg font-bold card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                                style={{
                                  textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                                  background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                }}
                              >
                                {concept.title}
                              </h4>
                              <p
                                className="text-base sm:text-lg card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                                style={{
                                  textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                                  background: 'linear-gradient(335deg, #065260 4%, #b0e9fb 160%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                }}
                              >
                                {concept.text}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="my-4">
                          <h3
                            className="text-lg sm:text-xl font-bold card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                            style={{
                              textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                              background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            Quiz
                          </h3>
                          <p
                            className="text-base sm:text-lg card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                            style={{
                              textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                              background: 'linear-gradient(335deg, #065260 4%, #b0e9fb 160%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            <strong>Question:</strong> {module.lessonContent.quiz.question}
                          </p>
                          <p
                            className="text-base sm:text-lg card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                            style={{
                              textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                              background: 'linear-gradient(335deg, #065260 4%, #b0e9fb 160%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            <strong>Answer:</strong> {module.lessonContent.quiz.answer}
                          </p>
                        </div>
                        <div className="my-4">
                          <h3
                            className="text-lg sm:text-xl font-bold card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                            style={{
                              textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                              background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            Further Reading
                          </h3>
                          {module.lessonContent.furtherReading.map((resource, index) => (
                            <a
                              key={index}
                              href={resource.link}
                              target="_blank"
                              className="block text-base sm:text-lg text-center card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                              style={{
                                textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                                background: 'linear-gradient(335deg, #065260 4%, #b0e9fb 160%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              {resource.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  <div className="shadow-line h-1 bg-gradient-to-b from-transparent to-gray-300/50"></div>
                  <div className="p-4 bg-gradient-to-b from-gray-800/80 to-gray-900/80">
                    <button
                      onClick={() => {
                        toggleComplete(module.id);
                        setOpenModal(null);
                      }}
                      className="w-full text-lg sm:text-xl card-content bg-gradient-to-b from-gray-300/30 to-gray-400/30 rounded px-2"
                      style={{
                        textShadow: '0.3px 0.3px 0.3px #F8F8FF, 0.8px 0.8px 0.8px #0a0a0a, 1.5px 1.5px 1.5px #000000',
                        background: 'linear-gradient(135deg, #DAA520 30%, #FFD700 70%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Mark as {module.completed ? 'Incomplete' : 'Completed'}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Learning;
