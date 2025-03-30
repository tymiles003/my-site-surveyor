import React, { useState } from 'react';
import { useSupabaseAuth } from './AuthContext'; // Use the context hook
import { UserPlus } from 'lucide-react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { signUp } = useSupabaseAuth(); // Get signUp function from context

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const { data, error: signUpError } = await signUp(email, password); // Use context signUp

      if (signUpError) throw signUpError;

      // Check if user needs confirmation (should be false based on Supabase project settings)
      // Note: Supabase `signUp` might automatically sign in the user if email confirmation is disabled.
      // The onAuthStateChange listener will handle the session update.
      setMessage('Signup successful! You can now log in.');
      setEmail('');
      setPassword('');

    } catch (err: any) {
      setError(err.error_description || err.message || 'An unknown error occurred');
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {message && <p className="text-green-500 text-sm">{message}</p>}
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="signup-email"
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
        <label htmlFor="signup-password"className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="signup-password"
          type="password"
          required
          minLength={6} // Supabase default minimum
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="•••••••• (min 6 chars)"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out"
      >
         <UserPlus className="mr-2 h-4 w-4"/>
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}

export default Signup;
