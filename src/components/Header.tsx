import React, { useState } from 'react';
import { Film, Ticket, ShieldCheck, User, LogOut, Search, Compass, Sparkles, BookOpen } from 'lucide-react';
import { useCinema } from '../context/CinemaContext';

export const Header: React.FC = () => {
  const {
    currentUser,
    bookings,
    searchQuery,
    setSearchQuery,
    setModalView,
    logoutUser,
    selectedCategory,
    setSelectedCategory
  } = useCinema();

  const [showUserMenu, setShowUserMenu] = useState(false);

  const activeBookingsCount = bookings.filter((b) => b.status === 'confirmed').length;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => {
            setSelectedCategory('all');
            setModalView('none');
          }}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 p-0.5 shadow-lg shadow-rose-500/25 group-hover:shadow-rose-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Film className="w-6 h-6 text-rose-500 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display">
                I<span className="text-rose-500">MOVIES</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight hidden sm:block">
              Premium Cinema Ticket Reservation
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md items-center relative">
          <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search movies, directors, genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Project Architecture & 6 Epics button */}
          <button
            onClick={() => setModalView('project_docs')}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide transition-all shadow-sm"
            title="View Epics, Tasks, and MERN Architecture Documentation"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Epics & Architecture</span>
            <span className="bg-emerald-500/30 text-emerald-300 px-1.5 py-0.2 rounded text-[10px]">
              6 Epics
            </span>
          </button>

          {/* Admin Mode Toggle */}
          <button
            onClick={() => setModalView('admin')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-medium transition-all"
            title="Access Cinema Manager Dashboard"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Manager Portal</span>
          </button>

          {/* My Tickets / Bookings */}
          <button
            onClick={() => setModalView('my_bookings')}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium transition-all group"
          >
            <Ticket className="w-4 h-4 text-rose-500 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">My Tickets</span>
            {activeBookingsCount > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-rose-600 text-white text-[11px] font-bold shadow-md shadow-rose-600/40">
                {activeBookingsCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-500/40"
                />
                <div className="text-left hidden xl:block">
                  <div className="text-xs font-semibold text-white leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-amber-400 font-medium">
                    {currentUser.membershipLevel}
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-white">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] bg-slate-800/70 px-2 py-1 rounded-lg">
                      <span className="text-slate-400">Loyalty Points:</span>
                      <span className="font-bold text-amber-400">{currentUser.loyaltyPoints} pts</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setModalView('my_bookings');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Ticket className="w-3.5 h-3.5 text-rose-400" />
                    <span>My Cinema Bookings</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setModalView('admin');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Manager Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setModalView('project_docs');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Project Specs & Epics (19 Tasks)</span>
                  </button>

                  <div className="border-t border-slate-800 my-1"></div>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logoutUser();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setModalView('auth')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-600/30 transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
