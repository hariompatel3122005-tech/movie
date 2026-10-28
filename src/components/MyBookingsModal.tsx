import React, { useState } from 'react';
import { X, Ticket, Calendar, Clock, MapPin, Eye, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { useCinema } from '../context/CinemaContext';
import { Booking } from '../types';

export const MyBookingsModal: React.FC = () => {
  const { modalView, setModalView, bookings, viewTicket, cancelBooking } = useCinema();
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  if (modalView !== 'my_bookings') return null;

  const handleConfirmCancel = (id: string) => {
    cancelBooking(id);
    setCancellingBookingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-500">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white font-display">
                My Cinema Tickets & Bookings
              </h2>
              <p className="text-xs text-slate-400">
                {bookings.length} total transaction(s) recorded
              </p>
            </div>
          </div>

          <button
            onClick={() => setModalView('none')}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookings List Viewport */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
          
          {bookings.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-slate-800/60 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                <Ticket className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No Cinema Tickets Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  You haven't reserved any movie tickets yet. Browse our blockbuster lineup and reserve your preferred seats!
                </p>
              </div>
              <button
                onClick={() => setModalView('none')}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Browse Movies Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const isCancelled = booking.status === 'cancelled';
                const isCancelling = cancellingBookingId === booking.id;

                return (
                  <div
                    key={booking.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isCancelled
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 shadow-lg'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      
                      {/* Movie & Info */}
                      <div className="flex items-start gap-4">
                        <img
                          src={booking.movie.posterUrl}
                          alt={booking.movie.title}
                          className="w-16 h-24 rounded-xl object-cover shrink-0 shadow-md"
                        />
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                              {booking.bookingRef}
                            </span>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              isCancelled
                                ? 'bg-rose-950 text-rose-300'
                                : 'bg-emerald-950 text-emerald-300'
                            }`}>
                              {booking.status}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-white font-display">
                            {booking.movie.title}
                          </h4>

                          <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-500" />
                              {booking.showtime.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              {booking.showtime.time} ({booking.showtime.format})
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 line-clamp-1">
                            {booking.showtime.cinemaName} • {booking.showtime.hallName}
                          </p>
                        </div>
                      </div>

                      {/* Right Details: Seats, Cost, Actions */}
                      <div className="flex flex-col sm:items-end justify-between gap-3 shrink-0">
                        <div className="sm:text-right">
                          <span className="text-[11px] text-slate-500 uppercase font-semibold block">
                            Reserved Seats
                          </span>
                          <span className="text-xs font-bold text-slate-200">
                            {booking.seats.map((s) => s.id).join(', ')}
                          </span>
                          <div className="text-sm font-black text-white mt-1">
                            ${booking.grandTotal.toFixed(2)}
                          </div>
                        </div>

                        {/* Action buttons */}
                        {!isCancelled && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => viewTicket(booking)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-rose-400" />
                              <span>View Pass</span>
                            </button>

                            <button
                              onClick={() => setCancellingBookingId(booking.id)}
                              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/30 transition-all cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Cancellation Confirmation Box */}
                    {isCancelling && (
                      <div className="mt-4 pt-4 border-t border-slate-800/80 p-3 rounded-xl bg-rose-950/30 border border-rose-900/60 space-y-3 animate-in fade-in">
                        <div className="flex items-start gap-2 text-rose-300 text-xs">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                          <div>
                            <p className="font-bold">Are you sure you want to cancel this booking?</p>
                            <p className="text-slate-400 text-[11px] mt-0.5">
                              A 100% full refund of ${booking.grandTotal.toFixed(2)} will be credited back to your {booking.paymentMethod}, and seats ({booking.seats.map(s => s.id).join(', ')}) will be released to the public.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setCancellingBookingId(null)}
                            className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                          >
                            Keep Booking
                          </button>
                          <button
                            onClick={() => handleConfirmCancel(booking.id)}
                            className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all cursor-pointer"
                          >
                            Yes, Cancel & Refund
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
