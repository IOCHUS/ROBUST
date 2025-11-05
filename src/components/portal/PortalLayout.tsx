import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function PortalLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { session, supabase } = useAuth();
  const navigate = useNavigate();

  const userEmail = session?.user?.email || 'user@example.com';
  const userAvatar = session?.user?.user_metadata?.avatar_url || 'https://via.placeholder.com/32';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('fk_logged_in');
    localStorage.removeItem('fk_user_email');
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', path: '/portal/dashboard', icon: '📊' },
    { label: 'Budget Tracker', path: '/portal/Tracker', icon: '💰' },
    { label: 'Learning Library', path: '/portal/learning', icon: '📚' },
    { label: 'DeFi Wallet', path: '/portal/defi', icon: '🏦' },
    { label: 'Portfolio', path: '/portal/Portfolio', icon: '📈' },
    { label: 'Dream Life Plan', path: '/portal/dream', icon: '✨' },
    { label: 'Soul Fuel Locker', path: '/portal/locker', icon: '🔒' },
    { label: 'Inspiration Network', path: '/portal/network', icon: '🌐' },
    { label: 'Components', path: '/portal/components', icon: '🛠️' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-slate-900 to-black border-b border-amber-500/20 z-50 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-amber-400 hover:text-amber-300 transition-colors lg:hidden"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold text-amber-400">Freedom Kit Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative text-gray-400 hover:text-amber-400 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 text-gray-400 hover:text-amber-400 transition-colors"
            >
              <img
                src={userAvatar}
                alt="User"
                className="w-8 h-8 rounded-full border border-amber-500/50"
              />
              <span className="hidden md:inline text-sm">{userEmail.split('@')[0]}</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-amber-500/20 rounded-lg shadow-xl overflow-hidden">
                <button className="w-full text-left px-4 py-3 hover:bg-slate-800 transition-colors flex items-center space-x-2">
                  <User size={16} />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-slate-800 transition-colors flex items-center space-x-2 text-red-400"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b from-slate-900 to-black border-r border-amber-500/20 transition-transform duration-300 z-40 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-left group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-gray-300 group-hover:text-amber-400">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-600 group-hover:text-amber-400" />
            </button>
          ))}
        </nav>

        <div className="p-4 mt-8">
          <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 border border-amber-500/30 rounded-lg p-4">
            <h3 className="text-sm font-bold text-amber-400 mb-2">Upgrade to SAAS</h3>
            <p className="text-xs text-gray-400 mb-3">Get automation features for $29/mo</p>
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-black text-sm font-bold py-2 rounded-lg transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : ''}`}>
        <div className="p-6 min-h-screen">
          <Outlet />
        </div>

        <footer className="border-t border-amber-500/20 py-6 text-center text-sm text-gray-500">
          <p>
            Powered by Freedom Kit |{' '}
            <a href="/terms" className="hover:text-amber-400 transition-colors">
              Terms
            </a>{' '}
            |{' '}
            <a href="/privacy" className="hover:text-amber-400 transition-colors">
              Privacy
            </a>
          </p>
        </footer>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}