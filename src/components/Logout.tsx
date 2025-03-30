import React, { useState } from 'react';
import { useSupabaseAuth } from './AuthContext'; // Use the context hook
import { LogOut } from 'lucide-react';

function Logout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signOut } = useSupabaseAuth(); // Get signOut function from context

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: signOutError } = await signOut(); // Use context signOut
      if (signOutError) throw signOutError;
      // Session update handled by AuthContext listener
      // alert('Logged out successfully!'); // Optional: remove if redundant
    } catch (err: any) {
      setError(err.error_description || err.message || 'An unknown error occurred');
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleLogout}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out"
      >
        <LogOut className="mr-2 h-4 w-4"/>
        {loading ? 'Logging out...' : 'Log Out'}
      </button>
    </>
  );
}

export default Logout;
