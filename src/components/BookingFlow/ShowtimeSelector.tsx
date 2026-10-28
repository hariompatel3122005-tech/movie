import React, { useState } from 'react';
import { X, MapPin, Calendar, Clock, Sparkles, ChevronRight, Check, Film } from 'lucide-react';
import { useCinema } from '../../context/CinemaContext';
import { getUpcomingDates } from '../../data/mockData';
import { Showtime } from '../../types';

export const ShowtimeSelector: React.FC = () => {
  const {
    modalView,
    setModalView,
    selectedMovie,
    cinemas,
    selectedCinema,
    setSelectedCinema,
    showtimes,
    selectShowtime
  } = useCinema();

  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  if (modalView !== 'showtime_select' || !selectedMovie) return null;

  const dates = getUpcomingDates();

  // Filter showtimes for this movie, cinema, and date
  const availableShowtimes = showtimes.filter((st) => {
    const matchesMovie = st.movieId === selectedMovie.id;
    const matchesCinema = selectedCinema ? st.cinemaId === selectedCinema.id : true;
    return matchesMovie && matchesCinema;
  });

  // Group showtimes by format
  const formatsGrouped: { [format: string]: Showtime[] } = {};
  availableShowtimes.forEach((st) => {
    if (!formatsGrouped[st.format]) {
      formatsGrouped[st.format] = [];
    }
    formatsGrouped[st.format].push(st);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-500">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest">
                  Step 1 of 4 • Select Showtime
                </span>
              </div>
              <h2 className="text-lg font-black text-white font-display">
                {selectedMovie.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setModalView('none')}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* Cinema Multiplex Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Choose Cinema Multiplex
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cinemas.map((cinema) => {
                const isSelected = selectedCinema?.id === cinema.id;
                return (
                  <div
                    key={cinema.id}
                    onClick={() => setSelectedCinema(cinema)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-rose-500/10 border-rose-500 shadow-md shadow-rose-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white line-clamp-1">
                          {cinema.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{cinema.location}</p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                      <span className="text-amber-400 font-semibold">{cinema.distance}</span>
                      <span className="text-slate-400">{cinema.formatsSupported[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 7-Day Rolling Calendar Strip */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              Select Date
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {dates.map((d) => {
                const isSelected = selectedDateStr === d.dateStr;
                return (
                  <button
                    key={d.dateStr}
                    onClick={() => setSelectedDateStr(d.dateStr)}
                    className={`flex flex-col items-center justify-center min-w-[76px] py-3 px-2 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/30'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="text-[11px] font-semibold opacity-80">{d.dayName}</span>
                    <span className="text-sm font-black mt-0.5">{d.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Showtimes List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-rose-500" />
                Available Screenings & Audio/Visual Formats
              </label>
              <span className="text-xs text-slate-400">
                Auditorium capacity tracked in real-time
              </span>
            </div>

            {Object.keys(formatsGrouped).length === 0 ? (
              <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
                <p className="text-sm text-slate-400">
                  No direct screenings at this cinema for the selected date.
                </p>
                <p className="text-xs text-rose-400">
                  Try selecting "IMovies Grand IMAX - Downtown" above for all-day screenings!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(formatsGrouped).map(([formatName, times]) => (
                  <div
                    key={formatName}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-xs font-black bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {formatName}
                        </span>
                        <span className="text-xs text-slate-400 hidden sm:inline">
                          Laser Projection • Immersive Surround Sound
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">
                        From ${(selectedMovie.priceBase * (formatName.includes('IMAX') ? 1.2 : 1)).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {times.map((st) => {
                        const totalSeats = st.seats.length;
                        const availableCount = st.seats.filter((s) => s.status === 'available').length;
                        const isAlmostFull = availableCount < totalSeats * 0.25;

                        return (
                          <button
                            key={st.id}
                            onClick={() => selectShowtime(st)}
                            className="group flex flex-col items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-600 border border-slate-700/80 hover:border-rose-500 transition-all cursor-pointer shadow-sm"
                          >
                            <span className="text-sm font-extrabold text-white group-hover:text-white">
                              {st.time}
                            </span>
                            <span className={`text-[10px] font-medium mt-0.5 ${
                              isAlmostFull
                                ? 'text-rose-400 group-hover:text-rose-100 font-bold'
                                : 'text-slate-400 group-hover:text-rose-100'
                            }`}>
                              {isAlmostFull ? 'Almost Full' : `${availableCount} seats left`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
