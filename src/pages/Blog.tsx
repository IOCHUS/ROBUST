import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Measuring Prosperity in Energy, Not Currency",
    slug: "five-pillars-sustainable-wealth",
    excerpt: "Discover how energy production creates true freedom by meeting YOUR actual needs—not arbitrary financial targets.",
    category: "Energy Sovereignty",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    title: "Breaking Free from the Fiat Illusion",
    slug: "breaking-limiting-money-beliefs",
    excerpt: "Expose the pension system trap and reprogram your mind for true prosperity through self-sufficient energy production.",
    category: "Mindset",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "Your Soul Hustle: Work You'd Do Forever",
    slug: "time-leverage-blueprint",
    excerpt: "Find the one thing you'd do for free, then monetize it to fund the life YOU actually want to live.",
    category: "Soul Hustle",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    title: "From Energy Drain to Energy Sovereignty",
    slug: "burnout-to-balance",
    excerpt: "Build your personal energy systems through solar, farming, and skills to escape dependency forever.",
    category: "Energy Production",
    image: "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    title: "The Compound Effect of Energy Production",
    slug: "compound-effect-massive-results",
    excerpt: "How small daily actions in energy production compound into complete sovereignty and joy.",
    category: "Freedom Building",
    image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 6,
    title: "Building Anti-Fragile Income Systems",
    slug: "multiple-income-streams",
    excerpt: "Stack multiple income sources—Soul Hustle, automation, farming, solar—into unstoppable prosperity.",
    category: "Income Diversity",
    image: "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const Blog: React.FC = () => {
  return (
    <div className="relative w-full bg-black">
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-medium">ROBUST Freedom Library</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Bend Your </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Reality
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Deep insights on energy sovereignty, Soul Hustles, and escaping the fiat system by discovering YOUR true needs and producing the energy to meet them.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <Link to={`/blog/${post.slug}`}>
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl overflow-hidden border border-gray-800/50 hover:border-amber-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-amber-400 text-xs font-medium">{post.category}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-end">
                        <div className="flex items-center text-amber-400 group-hover:translate-x-1 transition-transform">
                          <span className="text-sm mr-1">Read Article</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl p-12 border border-amber-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZiYmYyNCIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
            <div className="max-w-2xl mx-auto text-center relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Build Your Energy Freedom?
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                These articles reveal the path. The ROBUST MasterClass gives you the complete framework to discover your true needs, build energy sovereignty, and escape dependency forever.
              </p>
              <Link
                to="/"
                className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 text-white"
              >
                Discover ROBUST
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
