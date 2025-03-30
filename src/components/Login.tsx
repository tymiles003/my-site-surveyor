import React, { useState } from 'react';
import { useSupabaseAuth } from './AuthContext'; // Use the context hook
import { LogIn } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useSupabaseAuth(); // Get signIn function from context

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: signInError } = await signIn(email, password); // Use context signIn
      if (signInError) throw signInError;
      // Auth state change listener in context will handle session update
      // alert('Login successful!'); // Optional: remove if redundant with UI changes
    } catch (err: any) {
      setError(err.error_description || err.message || 'An unknown error occurred');
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="login-email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="login-password"className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="login-password"
          type="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out"
      >
        <LogIn className="mr-2 h-4 w-4"/>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}

export default Login;
