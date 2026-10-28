import React from 'react';
import { Star, Clock, Ticket, Play, Info } from 'lucide-react';
import { Movie } from '../types';
import { useCinema } from '../context/CinemaContext';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { startBooking, openMovieDetails } = useCinema();

  const isComingSoon = movie.status === 'coming_soon';

  return (
    <div className="group relative rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden flex flex-col hover:border-slate-700 hover:shadow-2xl hover:shadow-rose-950/20 transition-all duration-300">
      
      {/* Poster Media Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {/* Rating */}
          <div className="flex items-center gap-1 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800/80 shadow-md">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-white">{movie.rating}</span>
          </div>

          {/* Certificate */}
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-950/85 text-slate-300 border border-slate-800/80 backdrop-blur-md">
            {movie.certificate}
          </span>
        </div>

        {/* Bottom format pill on poster */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1">
            {movie.formats.slice(0, 2).map((fmt) => (
              <span
                key={fmt}
                className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-black/80 text-amber-300 border border-amber-500/30 backdrop-blur-sm"
              >
                {fmt}
              </span>
            ))}
          </div>
          <span className="text-[11px] font-semibold text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-sm">
            {movie.language}
          </span>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 gap-3 text-center">
          <p className="text-xs text-slate-200 line-clamp-4 leading-relaxed font-normal">
            {movie.synopsis}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => openMovieDetails(movie)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Trailer</span>
            </button>
            <button
              onClick={() => openMovieDetails(movie)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1">
            <span>{movie.genre.slice(0, 2).join(' • ')}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{movie.duration}m</span>
            </div>
          </div>

          <h3 
            onClick={() => openMovieDetails(movie)}
            className="text-base font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1 cursor-pointer font-display"
          >
            {movie.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
            Dir. {movie.director}
          </p>
        </div>

        {/* Bottom CTA Row */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
              {isComingSoon ? 'Releases' : 'Tickets from'}
            </span>
            <span className="text-sm font-extrabold text-white">
              {isComingSoon ? movie.releaseDate : `$${movie.priceBase.toFixed(2)}`}
            </span>
          </div>

          <button
            onClick={() => {
              if (isComingSoon) {
                openMovieDetails(movie);
              } else {
                startBooking(movie);
              }
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
              isComingSoon
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20 hover:shadow-rose-600/40 hover:scale-[1.02]'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>{isComingSoon ? 'Notify Me' : 'Book Seats'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
