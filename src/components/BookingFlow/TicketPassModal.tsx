import React, { useState } from 'react';
import { X, CheckCircle2, Printer, Download, Share2, Ticket, QrCode, Sparkles, MapPin, Calendar, Clock, Film } from 'lucide-react';
import { useCinema } from '../../context/CinemaContext';

export const TicketPassModal: React.FC = () => {
  const { modalView, setModalView, activeBooking, bookings } = useCinema();
  const [walletAdded, setWalletAdded] = useState(false);

  // If no activeBooking in context, fallback to latest confirmed booking
  const booking = activeBooking || bookings.find((b) => b.status === 'confirmed');

  if (modalView !== 'confirmation' || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleAddToWallet = () => {
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              Cinema Boarding Pass Confirmed!
            </h2>
          </div>

          <button
            onClick={() => setModalView('none')}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Ticket Viewport */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* Printable Ticket Container */}
          <div id="cinema-ticket-pass" className="relative rounded-3xl bg-slate-950 border border-slate-700/80 shadow-2xl overflow-hidden">
            
            {/* Top Ticket Hero Header */}
            <div className="relative p-6 bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-950 border-b border-dashed border-slate-700">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-rose-600 text-white">
                      {booking.showtime.format}
                    </span>
                    <span className="text-[11px] font-bold text-amber-400">
                      HALL: {booking.showtime.hallName}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                    {booking.movie.title}
                  </h3>
                  <p className="text-xs text-slate-400 italic">
                    Dir. {booking.movie.director} • {booking.movie.duration} mins
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Booking Reference</span>
                  <span className="text-base font-mono font-black text-white tracking-wider bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700">
                    {booking.bookingRef}
                  </span>
                </div>
              </div>
            </div>

            {/* Perforation Cutout Marks on sides */}
            <div className="absolute top-[108px] -left-3 w-6 h-6 rounded-full bg-slate-900 border-r border-slate-700"></div>
            <div className="absolute top-[108px] -right-3 w-6 h-6 rounded-full bg-slate-900 border-l border-slate-700"></div>

            {/* Ticket Body Grid */}
            <div className="p-6 space-y-5">
              
              {/* Multiplex, Date & Showtime Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-slate-500 block">Multiplex</span>
                  <span className="text-xs font-bold text-slate-200 line-clamp-1">
                    {booking.showtime.cinemaName}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase text-slate-500 block">Date & Time</span>
                  <span className="text-xs font-bold text-white">
                    {booking.showtime.date} @ {booking.showtime.time}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase text-slate-500 block">Customer</span>
                  <span className="text-xs font-bold text-slate-200 line-clamp-1">
                    {booking.userName}
                  </span>
                </div>
              </div>

              {/* Reserved Seats List */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                    Reserved Seats ({booking.seats.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {booking.seats.map((seat) => (
                      <span
                        key={seat.id}
                        className="px-3 py-1 rounded-xl bg-slate-950 border border-rose-500/40 text-white font-mono font-black text-xs shadow-sm"
                      >
                        {seat.id} ({seat.tier.toUpperCase()})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] uppercase text-slate-500 block font-semibold">Total Paid</span>
                  <span className="text-lg font-black text-emerald-400">
                    ${booking.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Concessions Voucher if present */}
              {booking.snacks.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-amber-300 block">
                      🍿 Concessions Express Pickup Voucher
                    </span>
                    <span className="text-[11px] text-slate-300">
                      {booking.snacks.map((s) => `${s.quantity}x ${s.snack.name}`).join(', ')}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    BAR-SNACK-OK
                  </span>
                </div>
              )}

              {/* QR Code & Barcode Scanner Area */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
                
                {/* Simulated Scannable QR Code */}
                <div className="p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center shrink-0">
                  <div className="w-28 h-28 relative flex flex-col justify-between">
                    {/* Simulated High-Res QR Blocks Matrix */}
                    <div className="flex justify-between">
                      <div className="w-8 h-8 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
                      <div className="w-8 h-8 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
                    </div>
                    
                    <div className="grid grid-cols-6 gap-1 my-1">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 ${
                            (i * 7 + booking.bookingRef.length) % 2 === 0 ? 'bg-black' : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="w-8 h-8 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
                      <div className="text-[8px] font-mono font-bold text-black tracking-tighter">
                        {booking.bookingRef}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scan Instructions & Security Token */}
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    Valid Digital Ticket
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Present this barcode at the usher terminal or self-service kiosk at the theater entrance.
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 truncate">
                    HASH: {booking.qrCodeSeed}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 pt-2">
            
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-300" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={handleAddToWallet}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-amber-400" />
                <span>{walletAdded ? 'Added to Wallet ✓' : 'Add to Apple Wallet'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalView('my_bookings')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
              >
                View My Bookings
              </button>

              <button
                onClick={() => setModalView('none')}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
