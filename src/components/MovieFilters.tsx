import React from 'react';
import { Sparkles, Flame, Calendar, Trophy, Film, Filter } from 'lucide-react';
import { useCinema } from '../context/CinemaContext';

export const MovieFilters: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedGenre,
    setSelectedGenre,
    selectedFormat,
    setSelectedFormat,
    movies,
    searchQuery
  } = useCinema();

  const categories = [
    { id: 'all', label: 'All Titles', icon: Film },
    { id: 'now_showing', label: 'Now Showing', icon: Sparkles },
    { id: 'trending', label: 'Trending Hits', icon: Flame },
    { id: 'top_rated', label: 'Top Rated (8.5+)', icon: Trophy },
    { id: 'coming_soon', label: 'Coming Soon', icon: Calendar }
  ];

  const genres = ['All', 'Sci-Fi', 'Action', 'Drama', 'Adventure', 'Animation', 'Horror', 'Biography', 'Mystery'];
  const formats = ['All', 'IMAX 3D', 'Dolby Cinema', '4DX', 'ScreenX', 'Standard 2D'];

  return (
    <div className="space-y-5">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rose-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary filter strip: Genres & Formats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 border-t border-slate-900">
        
        {/* Genre Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-rose-500" />
            Genre:
          </span>
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/60'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {/* Format Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs font-semibold text-slate-400">Format:</label>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="bg-slate-900 text-xs font-medium text-slate-200 border border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            {formats.map((fmt) => (
              <option key={fmt} value={fmt} className="bg-slate-900 text-white">
                {fmt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
