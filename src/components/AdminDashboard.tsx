import React, { useState } from 'react';
import { X, ShieldCheck, DollarSign, Users, Film, Clock, Plus, Trash2, Edit3, RotateCcw, TrendingUp, BarChart3, Check } from 'lucide-react';
import { useCinema } from '../context/CinemaContext';
import { Movie, MovieFormat } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    modalView,
    setModalView,
    movies,
    showtimes,
    bookings,
    addMovie,
    updateMovie,
    deleteMovie,
    resetAllData
  } = useCinema();

  const [activeTab, setActiveTab] = useState<'analytics' | 'movies' | 'halls'>('analytics');
  const [showAddModal, setShowAddModal] = useState(false);

  // New movie form state
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newDirector, setNewDirector] = useState('');
  const [newDuration, setNewDuration] = useState(130);
  const [newRating, setNewRating] = useState(8.5);
  const [newCertificate, setNewCertificate] = useState<Movie['certificate']>('PG-13');
  const [newPrice, setNewPrice] = useState(16.00);
  const [newPosterUrl, setNewPosterUrl] = useState('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80');
  const [newGenreStr, setNewGenreStr] = useState('Sci-Fi, Action, Thriller');

  if (modalView !== 'admin') return null;

  // Calculate box office stats
  const totalGross = bookings
    .filter((b) => b.status === 'confirmed')
    .reduce((acc, b) => acc + b.grandTotal, 0);

  const totalTicketsSold = bookings
    .filter((b) => b.status === 'confirmed')
    .reduce((acc, b) => acc + b.seats.length, 0);

  // Compute average occupancy across all showtimes
  let totalSeatCount = 0;
  let totalReservedSeats = 0;
  showtimes.forEach((st) => {
    totalSeatCount += st.seats.length;
    totalReservedSeats += st.seats.filter((s) => s.status === 'reserved').length;
  });
  const avgOccupancy = totalSeatCount > 0 ? Math.round((totalReservedSeats / totalSeatCount) * 100) : 0;

  const handleCreateMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const createdMovie: Movie = {
      id: `mov-${Date.now()}`,
      title: newTitle.trim(),
      tagline: newTagline.trim() || 'Experience greatness.',
      synopsis: newSynopsis.trim() || 'A sensational cinematic event on the big screen.',
      genre: newGenreStr.split(',').map((g) => g.trim()),
      duration: Number(newDuration),
      rating: Number(newRating),
      voteCount: 1500,
      certificate: newCertificate,
      releaseDate: new Date().toISOString().split('T')[0],
      director: newDirector.trim() || 'Visionary Director',
      cast: [
        { name: 'Lead Actor', role: 'Hero' },
        { name: 'Co-Star', role: 'Partner' }
      ],
      posterUrl: newPosterUrl.trim(),
      bannerUrl: newPosterUrl.trim(),
      trailerYoutubeId: 'Way9Dexny3w',
      formats: ['IMAX 3D', 'Dolby Cinema', 'Standard 2D'],
      language: 'English',
      status: 'now_showing',
      priceBase: Number(newPrice),
      reviews: []
    };

    addMovie(createdMovie);
    setShowAddModal(false);
    // Reset inputs
    setNewTitle('');
    setNewTagline('');
    setNewSynopsis('');
    setNewDirector('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  Manager Portal
                </span>
                <span className="text-xs text-slate-400">IMovies Cinema Operations</span>
              </div>
              <h2 className="text-lg font-black text-white font-display">
                Box Office & Screenings Dashboard
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (confirm('Reset all cinema data and sample bookings back to fresh installation?')) {
                  resetAllData();
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 cursor-pointer transition-all"
              title="Reset data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>

            <button
              onClick={() => setModalView('none')}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-3">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Revenue & Occupancy</span>
          </button>

          <button
            onClick={() => setActiveTab('movies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'movies'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Manage Catalog ({movies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('halls')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'halls'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Screen Occupancy ({showtimes.length} Halls)</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* TAB 1: Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span className="font-semibold">Gross Box Office</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    ${totalGross.toFixed(2)}
                  </div>
                  <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +14.2% vs last week
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span className="font-semibold">Tickets Issued</span>
                    <Film className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {totalTicketsSold}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Across {bookings.filter(b => b.status === 'confirmed').length} successful orders
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span className="font-semibold">Auditorium Occupancy</span>
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {avgOccupancy}%
                  </div>
                  <p className="text-[11px] text-amber-400 font-medium">
                    {totalReservedSeats} seats booked of {totalSeatCount} total
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span className="font-semibold">Active Screenings</span>
                    <Clock className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {showtimes.length}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    IMAX 3D, Dolby, 4DX formats
                  </p>
                </div>
              </div>

              {/* Top Performing Movies Table */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Film className="w-4 h-4 text-rose-500" />
                  Box Office Ranking & Performance
                </h3>

                <div className="divide-y divide-slate-800/80 text-xs">
                  {movies.map((m, idx) => (
                    <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-center font-bold text-slate-500">#{idx + 1}</span>
                        <img src={m.posterUrl} alt={m.title} className="w-8 h-12 rounded object-cover" />
                        <div>
                          <p className="font-bold text-white line-clamp-1">{m.title}</p>
                          <p className="text-[11px] text-slate-400">{m.formats.join(', ')}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Rating</span>
                          <span className="font-bold text-amber-400">★ {m.rating}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Status</span>
                          <span className="capitalize font-semibold text-slate-300">
                            {m.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Base Admission</span>
                          <span className="font-bold text-white">${m.priceBase.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Movies Catalog CRUD */}
          {activeTab === 'movies' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Cinema Movie Catalog</h3>
                  <p className="text-xs text-slate-400">Add, edit pricing, or toggle showing status</p>
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Release</span>
                </button>
              </div>

              {/* Add Movie Form Modal/Box */}
              {showAddModal && (
                <form
                  onSubmit={handleCreateMovie}
                  className="p-5 rounded-2xl bg-slate-950 border border-rose-500/40 space-y-4 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      Add New Movie Title
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 font-semibold block mb-1">Movie Title</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Gladiator II"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 font-semibold block mb-1">Director</label>
                      <input
                        type="text"
                        value={newDirector}
                        onChange={(e) => setNewDirector(e.target.value)}
                        placeholder="Ridley Scott"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 font-semibold block mb-1">Tagline</label>
                      <input
                        type="text"
                        value={newTagline}
                        onChange={(e) => setNewTagline(e.target.value)}
                        placeholder="What we do in life echoes in eternity."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 font-semibold block mb-1">Genres (comma separated)</label>
                      <input
                        type="text"
                        value={newGenreStr}
                        onChange={(e) => setNewGenreStr(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 font-semibold block mb-1">Base Price ($)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 font-semibold block mb-1">Poster Image URL</label>
                      <input
                        type="url"
                        value={newPosterUrl}
                        onChange={(e) => setNewPosterUrl(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                    >
                      Save Movie to Catalog
                    </button>
                  </div>
                </form>
              )}

              {/* Movie Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {movies.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <img src={m.posterUrl} alt={m.title} className="w-14 h-20 rounded-xl object-cover shrink-0" />
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {m.status.replace('_', ' ')}
                        </span>
                        <h4 className="text-sm font-bold text-white line-clamp-1">{m.title}</h4>
                        <p className="text-xs text-slate-400">Dir. {m.director}</p>
                        <p className="text-xs font-bold text-emerald-400">${m.priceBase.toFixed(2)} base</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => {
                          const nextStatus: Movie['status'] =
                            m.status === 'now_showing' ? 'coming_soon' : 'now_showing';
                          updateMovie({ ...m, status: nextStatus });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium"
                      >
                        Toggle Status
                      </button>

                      <button
                        onClick={() => deleteMovie(m.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 flex items-center justify-center"
                        title="Delete movie"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: Screen Occupancy Real-time Tracker */}
          {activeTab === 'halls' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Live Hall Occupancy & Seat Availability</h3>
              
              <div className="space-y-3">
                {showtimes.map((st) => {
                  const bookedSeats = st.seats.filter((s) => s.status === 'reserved').length;
                  const totalSeats = st.seats.length;
                  const pct = Math.round((bookedSeats / totalSeats) * 100);

                  return (
                    <div
                      key={st.id}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-bold text-amber-400 mr-2">{st.format}</span>
                          <span className="text-sm font-bold text-white">{st.hallName}</span>
                          <span className="text-xs text-slate-400 ml-2">({st.time})</span>
                        </div>

                        <div className="text-xs font-semibold text-slate-300">
                          {bookedSeats} / {totalSeats} seats booked ({pct}%)
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            pct > 75
                              ? 'bg-rose-500'
                              : pct > 40
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
