import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PlusCircle } from 'lucide-react';

export default function ComponentManager() {
  const { supabase, session } = useAuth();
  const [components, setComponents] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) fetchComponents();
  }, [session]);

  async function fetchComponents() {
    setLoading(true);
    const { data, error } = await supabase.from('components').select('*');
    if (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } else {
      setComponents(data || []);
    }
    setLoading(false);
  }

  async function addComponent() {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from('components').insert({
        name: newName,
        description: newDesc,
        user_id: session.user.id
      });
      if (error) {
        setError(error.message);
      } else {
        fetchComponents();
        setNewName('');
        setNewDesc('');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-amber-400 mb-6">Manage Components</h2>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <div className="bg-gradient-to-br from-slate-900 to-black border border-amber-500/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <input
            className="bg-slate-800 border border-amber-500/20 rounded w-full p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Component Name"
            disabled={loading}
          />
        </div>
        <div className="flex items-center space-x-3 mb-4">
          <input
            className="bg-slate-800 border border-amber-500/20 rounded w-full p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description"
            disabled={loading}
          />
        </div>
        <button
          className="bg-amber-500 text-black font-semibold p-3 rounded w-full hover:bg-amber-600 transition disabled:bg-gray-600 flex items-center justify-center space-x-2"
          onClick={addComponent}
          disabled={loading}
        >
          <PlusCircle size={20} />
          <span>{loading ? 'Loading...' : 'Add Component'}</span>
        </button>
        {loading ? (
          <p className="text-gray-500 mt-4">Loading components...</p>
        ) : (
          <ul className="mt-6 space-y-2">
            {components.map((comp) => (
              <li key={comp.id} className="p-3 bg-slate-800 border border-amber-500/20 rounded text-gray-300">
                {comp.name} - {comp.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}