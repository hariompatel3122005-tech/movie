import React, { useState } from 'react';
import { X, ArrowLeft, ShieldCheck, CreditCard, Tag, Check, Sparkles, AlertCircle, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCinema } from '../../context/CinemaContext';
import { Booking } from '../../types';

export const CheckoutModal: React.FC = () => {
  const {
    modalView,
    setModalView,
    selectedMovie,
    selectedShowtime,
    selectedCinema,
    selectedSeats,
    selectedSnacks,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    completeBooking,
    currentUser
  } = useCinema();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('+1 (555) 349-2041');
  const [paymentMethod, setPaymentMethod] = useState<Booking['paymentMethod']>('Apple Pay');
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('382');
  const [isProcessing, setIsProcessing] = useState(false);

  if (modalView !== 'checkout' || !selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
    return null;
  }

  const ticketTotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const snackTotal = selectedSnacks.reduce((acc, item) => acc + item.snack.price * item.quantity, 0);
  const bookingFee = 3.50;
  const subtotal = ticketTotal + snackTotal + bookingFee;
  const discountAmount = appliedPromo ? Number(((subtotal * appliedPromo.discountPct) / 100).toFixed(2)) : 0;
  const grandTotal = Number((subtotal - discountAmount).toFixed(2));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('Please fill in your name and email address for ticket issuance.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      try {
        completeBooking({
          name: name.trim(),
          email: email.trim(),
          paymentMethod
        });

        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalView('snacks_select')}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest">
                  Step 4 of 4 • Checkout & Payment
                </span>
              </div>
              <h2 className="text-lg font-black text-white font-display">
                Confirm & Reserve Tickets
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleCheckoutSubmit} className="overflow-y-auto flex-1 p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Contact & Payment Details */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Contact Information */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Attendee & Ticket Delivery Info
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 font-semibold block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-semibold block mb-1">
                      Email Address (for Digital Ticket)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-slate-400 font-semibold block mb-1">
                      Phone Number (SMS updates)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  Select Payment Method (256-Bit SSL Encrypted)
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Apple Pay', 'Google Pay', 'Credit Card', 'Cinema Cash'] as const).map((method) => {
                    const isSelected = paymentMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-rose-500/10 border-rose-500 text-white shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <CreditCard className={`w-4 h-4 ${isSelected ? 'text-rose-500' : 'text-slate-500'}`} />
                        <span className="text-[11px] font-bold">{method}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'Credit Card' && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-3 animate-in fade-in">
                    <div>
                      <label className="text-[11px] text-slate-400 font-medium block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 font-medium block mb-1">
                          Expires (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 font-medium block mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Promo Code Box */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-rose-500" />
                    Promo / Gift Code
                  </label>
                  <span className="text-[10px] text-slate-500">Try "CINEMA20" or "VIP10"</span>
                </div>

                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold">{appliedPromo.code}</span>
                      <span>({appliedPromo.discountPct}% OFF applied)</span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-xs text-rose-400 hover:text-white cursor-pointer font-semibold underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. CINEMA20)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 uppercase font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {promoMessage && !appliedPromo && (
                  <p className={`text-xs ${promoMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
                
                {/* Movie Header in Summary */}
                <div className="flex gap-3 pb-3 border-b border-slate-800/80">
                  <img
                    src={selectedMovie.posterUrl}
                    alt={selectedMovie.title}
                    className="w-14 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight font-display">
                      {selectedMovie.title}
                    </h4>
                    <p className="text-xs text-amber-400 mt-0.5">
                      {selectedShowtime.format} • {selectedShowtime.time}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {selectedCinema?.name}
                    </p>
                  </div>
                </div>

                {/* Seats List */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-medium">
                      Seats ({selectedSeats.map((s) => s.id).join(', ')}):
                    </span>
                    <span className="font-bold text-white">${ticketTotal.toFixed(2)}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {selectedSeats.length} ticket(s) at tiered pricing
                  </div>
                </div>

                {/* Snacks List */}
                {selectedSnacks.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="font-medium">Concessions ({selectedSnacks.length} items):</span>
                      <span className="font-bold text-white">${snackTotal.toFixed(2)}</span>
                    </div>
                    {selectedSnacks.map((item) => (
                      <div key={item.snack.id} className="flex justify-between text-[11px] text-slate-400 pl-2">
                        <span>{item.quantity}x {item.snack.name}</span>
                        <span>${(item.snack.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Convenience Fee */}
                <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>Booking & Maintenance Fee:</span>
                  <span>${bookingFee.toFixed(2)}</span>
                </div>

                {/* Discount Line */}
                {appliedPromo && (
                  <div className="flex justify-between text-xs text-emerald-400 font-bold">
                    <span>Discount ({appliedPromo.code}):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Grand Total */}
                <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 block">Total Due</span>
                    <span className="text-[10px] text-slate-500">Taxes included</span>
                  </div>
                  <span className="text-2xl font-black text-white">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

              </div>

              {/* Guarantees Badge */}
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-center space-y-1">
                <p className="text-[11px] text-slate-400 font-medium">
                  🎟 Instant digital boarding pass with scannable QR barcode
                </p>
                <p className="text-[10px] text-slate-500">
                  Free cancellation up to 60 minutes before showtime
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setModalView('snacks_select')}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Back to Concessions
            </button>

            <button
              type="submit"
              disabled={isProcessing}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-black text-sm shadow-xl shadow-rose-600/40 hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Generating Digital Pass...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Book (${grandTotal.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
