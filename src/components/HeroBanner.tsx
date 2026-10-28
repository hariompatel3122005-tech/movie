import React, { useState, useEffect } from 'react';
import { Play, Ticket, Star, Clock, Sparkles, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { useCinema } from '../context/CinemaContext';

export const HeroBanner: React.FC = () => {
  const { movies, startBooking, openMovieDetails } = useCinema();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Take top 3 movies for the hero showcase
  const featuredMovies = movies.slice(0, 3);
  const currentMovie = featuredMovies[currentIndex] || movies[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  if (!currentMovie) return null;

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 min-h-[480px] lg:min-h-[580px] flex items-center">
      {/* Dynamic Background Image with Depth Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentMovie.bannerUrl}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center filter brightness-40 scale-105 transition-all duration-1000 ease-out"
        />
        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-950/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Movie Details Column */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            
            {/* Format Chips & Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600/30 text-rose-400 border border-rose-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Experience
              </span>
              {currentMovie.formats.map((fmt) => (
                <span
                  key={fmt}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900/80 text-amber-300 border border-amber-500/30 backdrop-blur-sm"
                >
                  {fmt}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {currentMovie.certificate}
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none font-display">
                {currentMovie.title}
              </h1>
              <p className="text-base sm:text-lg text-rose-400/90 italic font-medium">
                "{currentMovie.tagline}"
              </p>
            </div>

            {/* Meta info: Rating, Duration, Genres */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/20">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-base">{currentMovie.rating}</span>
                <span className="text-slate-400 text-xs">/ 10</span>
                <span className="text-slate-500 text-[11px]">({(currentMovie.voteCount / 1000).toFixed(0)}k votes)</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(currentMovie.duration / 60)}h {currentMovie.duration % 60}m</span>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <span className="text-slate-600">•</span>
                <span>{currentMovie.genre.join(', ')}</span>
              </div>
            </div>

            {/* Synopsis Preview */}
            <p className="text-sm sm:text-base text-slate-300/90 line-clamp-3 max-w-2xl leading-relaxed">
              {currentMovie.synopsis}
            </p>

            {/* Cast preview */}
            <div className="text-xs text-slate-400 flex items-center gap-2 flex-wrap">
              <span className="text-slate-200 font-semibold">Starring:</span>
              <span>{currentMovie.cast.slice(0, 3).map((c) => c.name).join(', ')}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-200 font-semibold">Director:</span>
              <span>{currentMovie.director}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => startBooking(currentMovie)}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-rose-600/35 hover:shadow-rose-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Ticket className="w-5 h-5" />
                <span>Book Seats • From ${currentMovie.priceBase.toFixed(2)}</span>
              </button>

              <button
                onClick={() => openMovieDetails(currentMovie)}
                className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 backdrop-blur-md transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Watch Trailer & Details</span>
              </button>
            </div>
          </div>

          {/* Poster Showcase Column */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-600 to-amber-600 opacity-30 group-hover:opacity-60 blur-xl transition duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/60 shadow-2xl w-64 aspect-[2/3] bg-slate-900">
                <img
                  src={currentMovie.posterUrl}
                  alt={currentMovie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                    IMAX LASER
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {currentMovie.language}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Dots & Controls */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800/50">
          <div className="flex items-center gap-2">
            {featuredMovies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-rose-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length)}
              className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all"
              aria-label="Previous movie"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)}
              className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all"
              aria-label="Next movie"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
