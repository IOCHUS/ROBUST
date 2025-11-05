import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  const { session, supabase } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in → go to dashboard
  if (session) {
    return <Navigate to="/portal/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(
          error.message.includes('rate limit')
            ? 'Too many attempts. Wait 60 seconds.'
            : error.message
        );
      } else {
        localStorage.setItem('fk_logged_in', 'true');
        localStorage.setItem('fk_user_email', email);
      }
    } catch {
      setError('Unexpected error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/portal/dashboard`,
        },
      });

      if (error) {
        setError(
          error.message.includes('rate limit')
            ? 'Too many attempts. Wait 60 seconds.'
            : error.message
        );
      } else {
        setError('Check your email for confirmation link.');
      }
    } catch {
      setError('Unexpected error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">Freedom Kit</h1>
          <p className="text-gray-400">Access Your Dashboard</p>
        </div>

        {error && (
          <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
        )}

        <div className="bg-gradient-to-br from-slate-900 to-black border border-amber-500/20 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="your@email.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white font-semibold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'LOGIN TO DASHBOARD'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <button
              onClick={() => alert('Password reset coming soon!')}
              className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
            >
              Forgot Password?
            </button>

            <div className="pt-4 border-t border-slate-700">
              <p className="text-gray-400 text-sm mb-3">Not a Member?</p>
              <button
                onClick={handleSignUp}
                className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-600"
                disabled={loading}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}