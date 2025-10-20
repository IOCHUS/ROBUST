import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The 5 Pillars of Sustainable Wealth Creation",
    slug: "five-pillars-sustainable-wealth",
    excerpt: "Discover the foundational principles that separate temporary success from lasting financial abundance.",
    category: "Wealth Building",
    image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Breaking Free from Limiting Money Beliefs",
    slug: "breaking-limiting-money-beliefs",
    excerpt: "Uncover the hidden mental blocks sabotaging your financial growth and learn how to reprogram your success mindset.",
    category: "Mindset",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "The Time Leverage Blueprint for Entrepreneurs",
    slug: "time-leverage-blueprint",
    excerpt: "Master the art of working less while earning more through strategic time management and delegation.",
    category: "Productivity",
    image: "https://images.pexels.com/photos/5439381/pexels-photo-5439381.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "From Burnout to Balance: The High Achiever's Guide",
    slug: "burnout-to-balance",
    excerpt: "Sustainable success requires more than hustle. Learn how to optimize your energy for peak performance.",
    category: "Life Optimization",
    image: "https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "The Compound Effect: Small Actions, Massive Results",
    slug: "compound-effect-massive-results",
    excerpt: "How daily micro-decisions create extraordinary outcomes over time in wealth and wellness.",
    category: "Personal Growth",
    image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "9 min read"
  },
  {
    id: 6,
    title: "Building Multiple Income Streams That Actually Work",
    slug: "multiple-income-streams",
    excerpt: "A practical framework for diversifying your income without spreading yourself too thin.",
    category: "Wealth Building",
    image: "https://images.pexels.com/photos/6120214/pexels-photo-6120214.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "12 min read"
  }
];

const Blog: React.FC = () => {
  return (
    <div className="relative w-full bg-black">
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <span className="text-amber-400 text-sm font-medium">ROBUST Knowledge Hub</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Insights for </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Peak Performance
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Deep-dive articles on wealth creation, mindset mastery, and life optimization strategies from the ROBUST MasterClass.
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
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                        <div className="flex items-center text-amber-400 group-hover:translate-x-1 transition-transform">
                          <span className="text-sm mr-1">Read More</span>
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
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Transform Your Reality?
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                These insights are just the beginning. The ROBUST MasterClass provides the complete system for sustainable wealth creation and life optimization.
              </p>
              <Link
                to="/"
                className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 text-white"
              >
                Explore the MasterClass
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
