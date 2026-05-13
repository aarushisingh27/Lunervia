
import React, { useState } from 'react';
import { User } from '../types';

interface AuthHeaderProps {
  user: User | null;
  onLogin: (user: User) => void;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ user, onLogin }) => {
  const [email, setEmail] = useState('');

  const generateUsername = (email: string) => {
    const adjectives = ['Serene', 'Calm', 'Bright', 'Silent', 'Deep', 'Mindful'];
    const nouns = ['Echo', 'Star', 'River', 'Bloom', 'Cloud', 'Spirit'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 99);
    return `${randomAdj}${randomNoun}${num}`;
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      onLogin({
        email,
        username: generateUsername(email)
      });
    }
  };

  if (user) {
    return (
      <div className="flex items-center justify-between mb-8 p-4 bg-white/20 backdrop-blur-[10px] rounded-2xl border border-white/40 animate-in fade-in duration-700 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-200 to-purple-200 flex items-center justify-center text-indigo-700 font-bold">
            {user.username.charAt(0)}
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Welcome back</p>
            <p className="text-slate-800 font-semibold">{user.username}</p>
          </div>
        </div>
        <button 
          onClick={() => location.reload()} 
          className="text-xs text-indigo-600/70 hover:text-indigo-800 transition-colors uppercase tracking-widest font-bold"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8 p-6 bg-white/15 backdrop-blur-[10px] rounded-2xl border border-white/30 shadow-2xl">
      <form onSubmit={handleJoin} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for anonymous access"
            className="w-full p-4 rounded-xl bg-white/25 border border-white/40 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-200/20 outline-none transition-all text-slate-800 placeholder:text-slate-500"
            required
          />
        </div>
        <button
          type="submit"
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-200/40 transition-all active:scale-95 whitespace-nowrap"
        >
          Join Lunervia
        </button>
      </form>
    </div>
  );
};

export default AuthHeader;
