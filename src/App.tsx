/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CinemaProvider, useCinema } from './context/CinemaContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MovieFilters } from './components/MovieFilters';
import { MovieCard } from './components/MovieCard';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { ShowtimeSelector } from './components/BookingFlow/ShowtimeSelector';
import { SeatPicker } from './components/BookingFlow/SeatPicker';
import { SnacksSelector } from './components/BookingFlow/SnacksSelector';
import { CheckoutModal } from './components/BookingFlow/CheckoutModal';
import { TicketPassModal } from './components/BookingFlow/TicketPassModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ProjectArchitectureModal } from './components/ProjectArchitectureModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Sparkles, Armchair, Ticket, Popcorn, ShieldCheck, MapPin, Search } from 'lucide-react';

const MainCinemaApp: React.FC = () => {
  const {
    movies,
    searchQuery,
    selectedCategory,
    selectedGenre,
    selectedFormat,
    cinemas,
    setModalView,
    snacksCatalog
  } = useCinema();

  // Filter movies
  const filteredMovies = movies.filter((movie) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = movie.title.toLowerCase().includes(q);
      const matchesDirector = movie.director.toLowerCase().includes(q);
      const matchesCast = movie.cast.some((c) => c.name.toLowerCase().includes(q));
      const matchesGenre = movie.genre.some((g) => g.toLowerCase().includes(q));
      if (!matchesTitle && !matchesDirector && !matchesCast && !matchesGenre) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'top_rated') {
        if (movie.rating < 8.5) return false;
      } else if (movie.status !== selectedCategory) {
        return false;
      }
    }

    // Genre filter
    if (selectedGenre !== 'All') {
      if (!movie.genre.includes(selectedGenre)) return false;
    }

    // Format filter
    if (selectedFormat !== 'All') {
      if (!movie.formats.includes(selectedFormat as any)) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Showcase (only shown when not actively searching) */}
        {!searchQuery && <HeroBanner />}

        {/* Feature Highlights Ticker */}
        <div className="border-y border-slate-900 bg-slate-950/60 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex items-center justify-center gap-2.5 text-xs text-slate-300">
                <Armchair className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="font-semibold">Real-Time Seat Mapping</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">IMAX Laser & Dolby Atmos</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-xs text-slate-300">
                <Ticket className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">Instant QR Boarding Pass</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-xs text-slate-300">
                <Popcorn className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="font-semibold">Seat-Side Concessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          
          {/* Header & Filter Controls */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                  Curated Lineup
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Explore Now Showing & Upcoming Films
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'title' : 'titles'}
              </span>
            </div>

            <MovieFilters />
          </div>

          {/* Movies Cards Grid */}
          {filteredMovies.length === 0 ? (
            <div className="p-16 text-center bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
              <Search className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Movies Match Your Criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try adjusting your search terms or selecting "All Titles" to see the full cinema schedule.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

        </section>

        {/* Featured Multiplex Locations Section */}
        <section className="border-t border-slate-900 bg-slate-950/40 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                World-Class Multiplexes
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                Experience Cinema At Its Peak
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Our venues feature dual 4K laser projection, 12-channel surround sound, and luxury heated recliners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cinemas.map((cin) => (
                <div
                  key={cin.id}
                  className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-xl"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{cin.distance}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{cin.name}</h3>
                    <p className="text-xs text-slate-400">{cin.location}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Auditorium Specs & Amenities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cin.amenities.map((am) => (
                        <span
                          key={am}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Concessions Showcase Strip */}
        <section className="border-t border-slate-900 bg-slate-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
                  Gourmet Concessions
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Elevate Your Screening With Cinema Snacks
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Order along with your tickets and pick up straight from the express counter or get direct seat-side delivery.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {snacksCatalog.slice(0, 4).map((snack) => (
                <div
                  key={snack.id}
                  className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video relative overflow-hidden bg-slate-950">
                      <img
                        src={snack.imageUrl}
                        alt={snack.name}
                        className="w-full h-full object-cover"
                      />
                      {snack.isPopular && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500 text-slate-950">
                          Fan Favorite
                        </span>
                      )}
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="text-xs font-bold text-white line-clamp-1">{snack.name}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{snack.description}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between">
                    <span className="text-sm font-black text-white">${snack.price.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400">{snack.calories}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <MovieDetailsModal />
      <ShowtimeSelector />
      <SeatPicker />
      <SnacksSelector />
      <CheckoutModal />
      <TicketPassModal />
      <MyBookingsModal />
      <AdminDashboard />
      <ProjectArchitectureModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <CinemaProvider>
      <MainCinemaApp />
    </CinemaProvider>
  );
}
