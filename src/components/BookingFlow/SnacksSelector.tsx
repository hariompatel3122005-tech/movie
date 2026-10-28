import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Plus, Minus, Popcorn, Sparkles, Check } from 'lucide-react';
import { useCinema } from '../../context/CinemaContext';
import { SnackItem } from '../../types';

export const SnacksSelector: React.FC = () => {
  const {
    modalView,
    setModalView,
    snacksCatalog,
    selectedSnacks,
    addSnack,
    removeSnack,
    selectedSeats
  } = useCinema();

  const [activeTab, setActiveTab] = useState<'All' | 'Combos' | 'Popcorn' | 'Snacks' | 'Beverages'>('All');

  if (modalView !== 'snacks_select') return null;

  const filteredSnacks = activeTab === 'All'
    ? snacksCatalog
    : snacksCatalog.filter((item) => item.category === activeTab);

  const totalSnackAmount = selectedSnacks.reduce(
    (acc, item) => acc + item.snack.price * item.quantity,
    0
  );

  const getQuantity = (id: string) => {
    const found = selectedSnacks.find((item) => item.snack.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalView('seat_select')}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest">
                  Step 3 of 4 • Concessions & Treats
                </span>
              </div>
              <h2 className="text-lg font-black text-white font-display">
                Cinema Snacks & Refreshments
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

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(['All', 'Combos', 'Popcorn', 'Snacks', 'Beverages'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Snacks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSnacks.map((item) => {
              const qty = getQuantity(item.id);
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    qty > 0
                      ? 'bg-rose-500/10 border-rose-500 shadow-md shadow-rose-500/10'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.isPopular && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                          <Sparkles className="w-3 h-3" />
                          BESTSELLER
                        </span>
                      )}
                      {item.calories && (
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950/80 text-slate-300 backdrop-blur-xs">
                          {item.calories}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-base font-black text-white">
                      ${item.price.toFixed(2)}
                    </span>

                    {/* Quantity Modifier */}
                    {qty > 0 ? (
                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl p-1">
                        <button
                          onClick={() => removeSnack(item.id)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white">
                          {qty}
                        </span>
                        <button
                          onClick={() => addSnack(item)}
                          className="w-7 h-7 rounded-lg bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addSnack(item)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-white text-xs font-bold border border-slate-700/80 hover:border-rose-500 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Drawer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                Snacks Total
              </span>
              <span className="text-lg font-black text-white">
                ${totalSnackAmount.toFixed(2)}
              </span>
            </div>
            {selectedSnacks.length > 0 && (
              <span className="text-xs text-rose-400 font-medium">
                ({selectedSnacks.reduce((a, c) => a + c.quantity, 0)} items added)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalView('checkout')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              Skip Concessions
            </button>

            <button
              onClick={() => setModalView('checkout')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
