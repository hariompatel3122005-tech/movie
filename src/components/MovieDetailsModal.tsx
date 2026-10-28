import React, { useState } from 'react';
import { X, Star, Clock, Ticket, Calendar, Play, User, MessageSquare, Volume2, Shield } from 'lucide-react';
import { useCinema } from '../context/CinemaContext';

export const MovieDetailsModal: React.FC = () => {
  const { selectedMovie, modalView, setModalView, startBooking, updateMovie, currentUser } = useCinema();
  const [showTrailer, setShowTrailer] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  if (modalView !== 'movie_details' || !selectedMovie) return null;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: currentUser?.name || 'Verified Moviegoer',
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim()
    };

    updateMovie({
      ...selectedMovie,
      reviews: [newRev, ...selectedMovie.reviews]
    });
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setShowTrailer(false);
            setModalView('none');
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* Hero Media / Trailer Header */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-slate-950">
            {showTrailer ? (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${selectedMovie.trailerYoutubeId}?autoplay=1&rel=0`}
                  title={`${selectedMovie.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <>
                <img
                  src={selectedMovie.bannerUrl}
                  alt={selectedMovie.title}
                  className="w-full h-full object-cover filter brightness-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                
                {/* Watch Trailer Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white font-bold text-sm tracking-wide shadow-2xl shadow-rose-600/50 hover:scale-105 transition-all backdrop-blur-sm cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>Watch Official Trailer</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Details Content Container */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Title & Metadata Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {selectedMovie.certificate}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300">
                    {selectedMovie.language}
                  </span>
                  {selectedMovie.formats.map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white font-display">
                  {selectedMovie.title}
                </h2>
                <p className="text-sm italic text-slate-400">"{selectedMovie.tagline}"</p>
              </div>

              {/* Rating Card */}
              <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 p-3 rounded-2xl shrink-0">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                <div>
                  <div className="text-xl font-black text-white leading-tight">
                    {selectedMovie.rating} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {(selectedMovie.voteCount / 1000).toFixed(1)}k verified ratings
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-semibold block">Duration</span>
                <span className="text-sm font-bold text-slate-200">
                  {Math.floor(selectedMovie.duration / 60)}h {selectedMovie.duration % 60}m
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-semibold block">Release Date</span>
                <span className="text-sm font-bold text-slate-200">{selectedMovie.releaseDate}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-semibold block">Director</span>
                <span className="text-sm font-bold text-slate-200 truncate block">{selectedMovie.director}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-semibold block">Genres</span>
                <span className="text-sm font-bold text-slate-200 truncate block">{selectedMovie.genre.join(', ')}</span>
              </div>
            </div>

            {/* Storyline / Synopsis */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-rose-500 rounded-full"></span>
                Storyline & Overview
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedMovie.synopsis}
              </p>
            </div>

            {/* Cast & Crew Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-rose-500 rounded-full"></span>
                Starring Cast & Characters
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {selectedMovie.cast.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{member.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Reviews Section */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-500" />
                  Audience Reviews & Verdict
                </h3>
                <span className="text-xs text-slate-400">{selectedMovie.reviews.length} reviews</span>
              </div>

              {/* Add Review Box */}
              <form onSubmit={handleAddReview} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">Rate this movie:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setNewRating(s)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            s <= newRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Share your cinema verdict or experience..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Post Review
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                {selectedMovie.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">{rev.author}</span>
                        <span className="text-[10px] text-slate-500">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{rev.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-medium block">
              Admission Price
            </span>
            <span className="text-lg font-black text-white">
              From ${selectedMovie.priceBase.toFixed(2)} / seat
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowTrailer(false);
                setModalView('none');
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowTrailer(false);
                startBooking(selectedMovie);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-600/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Select Showtimes & Seats</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
