import React from 'react';
import { Film, Heart, Shield, Sparkles, BookOpen, Layers, Terminal } from 'lucide-react';
import { useCinema } from '../context/CinemaContext';

export const Footer: React.FC = () => {
  const { setModalView, setSelectedCategory } = useCinema();

  const skills = [
    'HTML5',
    'CSS3',
    'JavaScript ES6+',
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB NoSQL',
    'Async JS',
    'JSON Web Token (JWT)',
    'Tailwind CSS'
  ];

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/90 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-rose-500" />
                </div>
              </div>
              <span className="text-xl font-black tracking-wider text-white font-display">
                I<span className="text-rose-500">MOVIES</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The IMovies seamless online platform enhances the cinema experience by allowing users to browse movies, select showtimes, and reserve seats with real-time availability tracking.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setModalView('project_docs')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>6 Epics • 19 Tasks Architecture</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Cinema Experience
            </h4>
            <ul className="text-xs space-y-2">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('now_showing');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-400 transition-colors"
                >
                  Now Showing Blockbusters
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('coming_soon');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-400 transition-colors"
                >
                  Coming Soon Teasers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalView('admin')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Cinema Manager Operations
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalView('my_bookings')}
                  className="hover:text-white transition-colors"
                >
                  Ticket Pass Retrieval
                </button>
              </li>
            </ul>
          </div>

          {/* Core Tech Stack */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-rose-500" />
              Technologies & Competencies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} IMovies Cinema Reservation System. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>256-Bit SSL Encrypted</span>
            <span>•</span>
            <span>Real-time Seat Concurrency</span>
            <span>•</span>
            <span>Express & MongoDB Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
