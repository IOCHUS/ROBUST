import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, TrendingUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

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

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);
    import(`../posts/${slug}.md`)
      .then((module) => fetch(module.default).then((res) => res.text()))
      .then((text) => {
        setContent(text);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load post:', err);
        setIsLoading(false);
      });
  }, [slug]);

  if (!post) {
    return (
      <div className="relative w-full bg-black min-h-screen">
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-gray-400 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
            <Link to="/blog" className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-2 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black">
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-400 hover:text-amber-400 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="aspect-[21/9] overflow-hidden rounded-2xl mb-8 border border-gray-800/50">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : (
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 md:p-12 rounded-2xl border border-gray-800/50">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4 first:mt-0" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-2xl md:text-3xl font-semibold text-white mt-8 mb-4" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl md:text-2xl font-semibold text-white mt-6 mb-3" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="text-gray-300 mb-6 space-y-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="text-gray-300 mb-6 space-y-2 list-decimal list-inside" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="flex items-start gap-3 mb-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span className="flex-1" {...props} />
                      </li>
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-amber-500 pl-6 py-2 my-6 italic text-gray-300 bg-amber-500/5 rounded-r-lg" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="text-amber-400 font-semibold" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a {...props} className="text-amber-400 hover:text-amber-300 underline transition-colors" target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          )}

          <div className="mt-16 relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl p-12 border border-amber-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZiYmYyNCIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Apply These Insights?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                The ROBUST MasterClass provides the complete framework, strategies, and support you need to transform your financial reality and optimize your life.
              </p>
              <Link
                to="/"
                className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 text-white"
              >
                Discover the MasterClass
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
