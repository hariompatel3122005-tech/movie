import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, Sparkles } from 'lucide-react';
import { useCinema } from '../context/CinemaContext';
import { DEMO_USERS } from '../data/mockData';
import { UserProfile } from '../types';

export const AuthModal: React.FC = () => {
  const { modalView, setModalView, loginUser } = useCinema();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (modalView !== 'auth') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const userProfile: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      membershipLevel: 'Silver Gold',
      loyaltyPoints: 250,
      role: 'user',
      token: `jwt_token_${Date.now()}_${Math.random().toString(36).substring(7)}`
    };

    loginUser(userProfile);
  };

  const handleQuickLogin = (demoUser: UserProfile) => {
    loginUser(demoUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white font-display">
              {tab === 'signin' ? 'Sign In to IMovies' : 'Create Cinema Account'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Access digital tickets, loyalty perks & reserved seating
            </p>
          </div>

          <button
            onClick={() => setModalView('none')}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Logins Banner */}
        <div className="p-4 bg-rose-950/20 border-b border-slate-800 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Quick 1-Click Demo Profiles:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin(DEMO_USERS[0])}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-700/80 transition-all cursor-pointer"
            >
              <span className="text-xs font-bold text-white block">Alex Morgan</span>
              <span className="text-[10px] text-amber-400 font-medium">IMAX VIP Member</span>
            </button>

            <button
              onClick={() => handleQuickLogin(DEMO_USERS[1])}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-left border border-slate-700/80 transition-all cursor-pointer"
            >
              <span className="text-xs font-bold text-white block">Theater Manager</span>
              <span className="text-[10px] text-emerald-400 font-medium">Admin Privileges</span>
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-800 text-xs font-bold">
          <button
            onClick={() => setTab('signin')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              tab === 'signin'
                ? 'text-white border-b-2 border-rose-500 bg-slate-800/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              tab === 'signup'
                ? 'text-white border-b-2 border-rose-500 bg-slate-800/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Custom Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Your Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="Taylor Swift"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                required
                placeholder="you@cinema.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs tracking-wide shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
          >
            {tab === 'signin' ? 'Sign In & Continue' : 'Create Free Account'}
          </button>
        </form>

      </div>
    </div>
  );
};
