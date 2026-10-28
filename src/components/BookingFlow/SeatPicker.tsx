import React from 'react';
import { X, Clock, ArrowLeft, ArrowRight, Shield, Sparkles, Check, Accessibility } from 'lucide-react';
import { useCinema } from '../../context/CinemaContext';
import { Seat } from '../../types';

export const SeatPicker: React.FC = () => {
  const {
    modalView,
    setModalView,
    selectedMovie,
    selectedShowtime,
    selectedSeats,
    toggleSeat,
    countdownSeconds
  } = useCinema();

  if (modalView !== 'seat_select' || !selectedMovie || !selectedShowtime) return null;

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  const selectedTotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  // Group seats by row
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsByRow: { [row: string]: Seat[] } = {};
  rows.forEach((r) => {
    seatsByRow[r] = selectedShowtime.seats.filter((s) => s.row === r);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
        
        {/* Top Header & Countdown Timer */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalView('showtime_select')}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
              title="Change showtime"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">
                  Step 2 of 4 • Select Seats
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-xs text-amber-400 font-semibold hidden sm:inline">
                  {selectedShowtime.format} • {selectedShowtime.hallName}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white font-display line-clamp-1">
                {selectedMovie.title} — {selectedShowtime.time}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live reservation timer */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              countdownSeconds < 120
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                : 'bg-slate-900 text-amber-400 border-amber-500/30'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatCountdown(countdownSeconds)}</span>
              <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">locked</span>
            </div>

            <button
              onClick={() => setModalView('none')}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auditorium Viewport with Curved Screen */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 select-none">
          
          {/* Curved IMAX Projection Screen */}
          <div className="relative max-w-2xl mx-auto pt-2 pb-6 text-center">
            {/* Ambient projection light glow */}
            <div className="absolute inset-x-8 top-0 h-16 bg-gradient-to-b from-rose-500/15 via-amber-400/10 to-transparent blur-xl pointer-events-none"></div>

            {/* Screen Arc */}
            <div className="relative">
              <svg className="w-full h-12 text-slate-700" viewBox="0 0 600 48" fill="none">
                <path
                  d="M10 40 Q300 0 590 40"
                  stroke="url(#screenGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#64748b" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#64748b" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-[11px] font-extrabold tracking-[0.25em] text-slate-400 uppercase -mt-3">
                All Eyes This Way • {selectedShowtime.format} Laser Screen
              </div>
            </div>
          </div>

          {/* Interactive Seating Grid */}
          <div className="max-w-3xl mx-auto space-y-3">
            {rows.map((rowLetter) => {
              const rowSeats = seatsByRow[rowLetter] || [];
              const isVipRow = rowLetter === 'A' || rowLetter === 'B';
              const isPremiumRow = rowLetter === 'C' || rowLetter === 'D' || rowLetter === 'E';

              return (
                <div key={rowLetter} className="flex items-center justify-center gap-1.5 sm:gap-2">
                  
                  {/* Row Letter Marker Left */}
                  <span className="w-5 text-center text-xs font-bold text-slate-500 shrink-0">
                    {rowLetter}
                  </span>

                  {/* Seats in Row */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    {rowSeats.map((seat, index) => {
                      const isSelected = selectedSeats.some((s) => s.id === seat.id);
                      const isReserved = seat.status === 'reserved';
                      const isWheelchair = seat.tier === 'wheelchair';
                      const addAisle = index === 2 || index === 8; // realistic aisle gaps after seat 3 and seat 9

                      return (
                        <React.Fragment key={seat.id}>
                          <button
                            disabled={isReserved}
                            onClick={() => toggleSeat(seat)}
                            title={`${seat.id} • ${seat.tier.toUpperCase()} • $${seat.price.toFixed(2)}`}
                            className={`relative transition-all duration-150 flex items-center justify-center rounded-lg sm:rounded-xl font-bold cursor-pointer group ${
                              // Size
                              isVipRow
                                ? 'w-6 h-7 sm:w-8 sm:h-9 text-[10px] sm:text-xs'
                                : 'w-5 h-6 sm:w-7 sm:h-8 text-[9px] sm:text-[11px]'
                            } ${
                              // Status styling
                              isSelected
                                ? 'bg-gradient-to-t from-rose-600 to-rose-500 text-white shadow-lg shadow-rose-600/50 scale-110 z-10 ring-2 ring-white/60'
                                : isReserved
                                ? 'bg-slate-800/40 text-slate-600 border border-slate-800/60 cursor-not-allowed opacity-50'
                                : isVipRow
                                ? 'bg-amber-950/40 border border-amber-500/50 text-amber-300 hover:border-amber-400 hover:bg-amber-500/20'
                                : isPremiumRow
                                ? 'bg-indigo-950/40 border border-indigo-500/40 text-indigo-300 hover:border-indigo-400 hover:bg-indigo-500/20'
                                : isWheelchair
                                ? 'bg-sky-950/40 border border-sky-500/50 text-sky-300 hover:border-sky-400'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                            }`}
                          >
                            {isWheelchair ? (
                              <Accessibility className="w-3.5 h-3.5" />
                            ) : isSelected ? (
                              <Check className="w-3 h-3 stroke-[3]" />
                            ) : (
                              <span>{seat.number}</span>
                            )}

                            {/* Recliner indicator for VIP seats */}
                            {isVipRow && !isSelected && !isReserved && (
                              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400/80"></span>
                            )}
                          </button>

                          {/* Aisle Spacer */}
                          {addAisle && <div className="w-3 sm:w-5" />}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Row Letter Marker Right */}
                  <span className="w-5 text-center text-xs font-bold text-slate-500 shrink-0">
                    {rowLetter}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Seat Tiers & Legend */}
          <div className="pt-4 border-t border-slate-800/80 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-800 border border-slate-700"></div>
              <span className="text-slate-400">Available</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-rose-600 border border-rose-500 shadow-sm shadow-rose-500/50"></div>
              <span className="text-white font-medium">Selected</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-800/40 border border-slate-800/60 opacity-50"></div>
              <span className="text-slate-500">Reserved</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-950/50 border border-amber-500 text-amber-300 text-[10px] flex items-center justify-center font-bold">★</div>
              <span className="text-amber-300 font-semibold">VIP Recliner ($24.00+)</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-indigo-950/50 border border-indigo-500 text-indigo-300"></div>
              <span className="text-indigo-300 font-medium">Premium ($19.50+)</span>
            </div>

            <div className="flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-sky-400" />
              <span className="text-sky-300 font-medium">Wheelchair Accessible</span>
            </div>
          </div>

        </div>

        {/* Selected Seats Bottom Drawer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Selected Seat Badges */}
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {selectedSeats.length === 0 ? (
              <span className="text-xs text-slate-400 italic">
                Click on the auditorium map above to pick up to 8 seats.
              </span>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-400">
                  {selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'}:
                </span>
                {selectedSeats.map((seat) => (
                  <span
                    key={seat.id}
                    onClick={() => toggleSeat(seat)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold hover:bg-rose-500/20 cursor-pointer"
                  >
                    <span>{seat.id} (${seat.price.toFixed(2)})</span>
                    <X className="w-3 h-3 text-rose-400 hover:text-white" />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Total & Continue */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                Tickets Total
              </span>
              <span className="text-xl font-black text-white">
                ${selectedTotal.toFixed(2)}
              </span>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              onClick={() => setModalView('snacks_select')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer shadow-lg ${
                selectedSeats.length > 0
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 hover:scale-[1.02]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
              }`}
            >
              <span>Continue to Concessions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
