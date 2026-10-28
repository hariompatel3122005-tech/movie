import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Booking, Cinema, Movie, Seat, SelectedSnack, Showtime, SnackItem, UserProfile } from '../types';
import { CINEMAS, DEMO_USERS, INITIAL_MOVIES, SAMPLE_SHOWTIMES, SNACKS_CATALOG } from '../data/mockData';

export type BookingModalView = 
  | 'none'
  | 'movie_details'
  | 'showtime_select'
  | 'seat_select'
  | 'snacks_select'
  | 'checkout'
  | 'confirmation'
  | 'my_bookings'
  | 'admin'
  | 'project_docs'
  | 'auth';

interface CinemaContextType {
  movies: Movie[];
  showtimes: Showtime[];
  cinemas: Cinema[];
  snacksCatalog: SnackItem[];
  selectedMovie: Movie | null;
  selectedShowtime: Showtime | null;
  selectedCinema: Cinema | null;
  selectedSeats: Seat[];
  selectedSnacks: SelectedSnack[];
  appliedPromo: { code: string; discountPct: number } | null;
  countdownSeconds: number;
  bookings: Booking[];
  activeBooking: Booking | null;
  currentUser: UserProfile | null;
  modalView: BookingModalView;
  searchQuery: string;
  selectedGenre: string;
  selectedFormat: string;
  selectedCategory: string;

  // Actions
  setModalView: (view: BookingModalView) => void;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string) => void;
  setSelectedFormat: (format: string) => void;
  setSelectedCategory: (cat: string) => void;
  openMovieDetails: (movie: Movie) => void;
  startBooking: (movie: Movie) => void;
  selectShowtime: (showtime: Showtime) => void;
  setSelectedCinema: (cinema: Cinema) => void;
  toggleSeat: (seat: Seat) => void;
  addSnack: (snack: SnackItem) => void;
  removeSnack: (snackId: string) => void;
  clearSnack: (snackId: string) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  completeBooking: (details: { name: string; email: string; paymentMethod: Booking['paymentMethod'] }) => Booking;
  cancelBooking: (bookingId: string) => void;
  viewTicket: (booking: Booking) => void;
  loginUser: (user: UserProfile) => void;
  logoutUser: () => void;
  addMovie: (newMovie: Movie) => void;
  updateMovie: (updatedMovie: Movie) => void;
  deleteMovie: (movieId: string) => void;
  resetAllData: () => void;
  resetBookingFlow: () => void;
}

const CinemaContext = createContext<CinemaContextType | undefined>(undefined);

const SEAT_LOCK_DURATION = 8 * 60; // 8 minutes

export const CinemaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Local storage keys
  const STORAGE_PREFIX = 'imovies_';

  const [movies, setMovies] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}movies`);
      return saved ? JSON.parse(saved) : INITIAL_MOVIES;
    } catch {
      return INITIAL_MOVIES;
    }
  });

  const [showtimes, setShowtimes] = useState<Showtime[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}showtimes`);
      return saved ? JSON.parse(saved) : SAMPLE_SHOWTIMES;
    } catch {
      return SAMPLE_SHOWTIMES;
    }
  });

  const [cinemas] = useState<Cinema[]>(CINEMAS);
  const [snacksCatalog] = useState<SnackItem[]>(SNACKS_CATALOG);

  // User state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}user`);
      return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Alex Morgan by default
    } catch {
      return DEMO_USERS[0];
    }
  });

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}bookings`);
      if (saved) return JSON.parse(saved);
      
      // Default pre-seeded booking for instant delight
      const preBooking: Booking = {
        id: 'book-sample-1',
        bookingRef: 'IMV-84920',
        userId: 'usr-1',
        userName: 'Alex Morgan',
        userEmail: 'alex.morgan@cinema-club.com',
        movie: INITIAL_MOVIES[0],
        showtime: SAMPLE_SHOWTIMES[2],
        seats: [
          { id: 'D6', row: 'D', number: 6, tier: 'premium', price: 24.38, status: 'reserved' },
          { id: 'D7', row: 'D', number: 7, tier: 'premium', price: 24.38, status: 'reserved' }
        ],
        snacks: [
          { snack: SNACKS_CATALOG[0], quantity: 1 },
          { snack: SNACKS_CATALOG[5], quantity: 2 }
        ],
        ticketTotal: 48.76,
        snackTotal: 28.97,
        bookingFee: 3.50,
        discount: 10.00,
        grandTotal: 71.23,
        paymentMethod: 'Apple Pay',
        bookingDate: new Date(Date.now() - 3600000 * 24).toISOString(),
        status: 'confirmed',
        qrCodeSeed: 'IMV-84920-DUNE2-D6D7'
      };
      return [preBooking];
    } catch {
      return [];
    }
  });

  // Flow & selection state
  const [modalView, setModalView] = useState<BookingModalView>('none');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(CINEMAS[0]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<SelectedSnack[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPct: number } | null>(null);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Timer for seat lock
  const [countdownSeconds, setCountdownSeconds] = useState(SEAT_LOCK_DURATION);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}movies`, JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}showtimes`, JSON.stringify(showtimes));
  }, [showtimes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}bookings`, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`${STORAGE_PREFIX}user`, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(`${STORAGE_PREFIX}user`);
    }
  }, [currentUser]);

  // Countdown timer effect
  useEffect(() => {
    if (selectedSeats.length === 0 || (modalView !== 'seat_select' && modalView !== 'snacks_select' && modalView !== 'checkout')) {
      return;
    }

    const timer = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Release seats on timeout
          setSelectedSeats([]);
          setModalView('showtime_select');
          alert('Seat reservation session expired. Please reselect your preferred seats.');
          return SEAT_LOCK_DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedSeats.length, modalView]);

  const resetBookingFlow = () => {
    setSelectedSeats([]);
    setSelectedSnacks([]);
    setAppliedPromo(null);
    setCountdownSeconds(SEAT_LOCK_DURATION);
  };

  const openMovieDetails = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalView('movie_details');
  };

  const startBooking = (movie: Movie) => {
    setSelectedMovie(movie);
    // Find or pick a default cinema & showtime
    const matchedShowtimes = showtimes.filter((st) => st.movieId === movie.id);
    if (matchedShowtimes.length > 0) {
      setSelectedShowtime(matchedShowtimes[0]);
      const matchedCinema = cinemas.find((c) => c.id === matchedShowtimes[0].cinemaId);
      if (matchedCinema) setSelectedCinema(matchedCinema);
    }
    resetBookingFlow();
    setModalView('showtime_select');
  };

  const selectShowtime = (showtime: Showtime) => {
    setSelectedShowtime(showtime);
    const matchedCinema = cinemas.find((c) => c.id === showtime.cinemaId);
    if (matchedCinema) setSelectedCinema(matchedCinema);
    setSelectedSeats([]);
    setCountdownSeconds(SEAT_LOCK_DURATION);
    setModalView('seat_select');
  };

  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'reserved' || seat.status === 'blocked') return;

    setSelectedSeats((prev) => {
      const isAlreadySelected = prev.some((s) => s.id === seat.id);
      if (isAlreadySelected) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        if (prev.length >= 8) {
          alert('You can select a maximum of 8 seats per booking transaction.');
          return prev;
        }
        return [...prev, { ...seat, status: 'selected' }];
      }
    });
  };

  const addSnack = (snack: SnackItem) => {
    setSelectedSnacks((prev) => {
      const existing = prev.find((item) => item.snack.id === snack.id);
      if (existing) {
        return prev.map((item) =>
          item.snack.id === snack.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { snack, quantity: 1 }];
    });
  };

  const removeSnack = (snackId: string) => {
    setSelectedSnacks((prev) => {
      const existing = prev.find((item) => item.snack.id === snackId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((item) => item.snack.id !== snackId);
      }
      return prev.map((item) =>
        item.snack.id === snackId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const clearSnack = (snackId: string) => {
    setSelectedSnacks((prev) => prev.filter((item) => item.snack.id !== snackId));
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CINEMA20' || clean === 'IMOVIE20') {
      setAppliedPromo({ code: clean, discountPct: 20 });
      return { success: true, message: '🎉 20% Discount applied to your order!' };
    }
    if (clean === 'VIP10' || clean === 'VIP') {
      setAppliedPromo({ code: clean, discountPct: 10 });
      return { success: true, message: '🎉 10% VIP Discount applied!' };
    }
    if (clean === 'FREESNACK') {
      setAppliedPromo({ code: clean, discountPct: 15 });
      return { success: true, message: '🎉 15% Concessions & Ticket perk applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "CINEMA20" or "VIP10".' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const completeBooking = (details: {
    name: string;
    email: string;
    paymentMethod: Booking['paymentMethod'];
  }): Booking => {
    if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
      throw new Error('Incomplete booking data');
    }

    const ticketTotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
    const snackTotal = selectedSnacks.reduce((acc, item) => acc + item.snack.price * item.quantity, 0);
    const bookingFee = 3.50;
    const subtotal = ticketTotal + snackTotal + bookingFee;
    const discountAmount = appliedPromo ? Number(((subtotal * appliedPromo.discountPct) / 100).toFixed(2)) : 0;
    const grandTotal = Number((subtotal - discountAmount).toFixed(2));

    const randomRefNum = Math.floor(10000 + Math.random() * 90000);
    const bookingRef = `IMV-${randomRefNum}`;

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingRef,
      userId: currentUser?.id || 'guest-user',
      userName: details.name,
      userEmail: details.email,
      movie: selectedMovie,
      showtime: selectedShowtime,
      seats: selectedSeats.map((s) => ({ ...s, status: 'reserved' })),
      snacks: [...selectedSnacks],
      ticketTotal,
      snackTotal,
      bookingFee,
      discount: discountAmount,
      grandTotal,
      paymentMethod: details.paymentMethod,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      qrCodeSeed: `${bookingRef}-${selectedMovie.id}-${selectedSeats.map((s) => s.id).join('')}`
    };

    // Update showtime seats to marked as reserved in store
    setShowtimes((prevShowtimes) =>
      prevShowtimes.map((st) => {
        if (st.id === selectedShowtime.id) {
          const updatedSeats = st.seats.map((seat) => {
            if (selectedSeats.some((s) => s.id === seat.id)) {
              return { ...seat, status: 'reserved' as const };
            }
            return seat;
          });
          return { ...st, seats: updatedSeats };
        }
        return st;
      })
    );

    // Save booking to list
    setBookings((prev) => [newBooking, ...prev]);
    setActiveBooking(newBooking);

    // Reward points if logged in
    if (currentUser) {
      const earnedPoints = Math.round(grandTotal * 10);
      setCurrentUser((prev) =>
        prev ? { ...prev, loyaltyPoints: prev.loyaltyPoints + earnedPoints } : prev
      );
    }

    setModalView('confirmation');
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const bookingToCancel = bookings.find((b) => b.id === bookingId);
    if (!bookingToCancel) return;

    // Release seats on the showtime
    setShowtimes((prevShowtimes) =>
      prevShowtimes.map((st) => {
        if (st.id === bookingToCancel.showtime.id) {
          const releasedSeats = st.seats.map((seat) => {
            if (bookingToCancel.seats.some((s) => s.id === seat.id)) {
              return { ...seat, status: 'available' as const };
            }
            return seat;
          });
          return { ...st, seats: releasedSeats };
        }
        return st;
      })
    );

    // Mark booking as cancelled
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b))
    );
  };

  const viewTicket = (booking: Booking) => {
    setActiveBooking(booking);
    setModalView('confirmation');
  };

  const loginUser = (user: UserProfile) => {
    setCurrentUser(user);
    setModalView('none');
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const addMovie = (newMovie: Movie) => {
    setMovies((prev) => [newMovie, ...prev]);
  };

  const updateMovie = (updatedMovie: Movie) => {
    setMovies((prev) => prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)));
  };

  const deleteMovie = (movieId: string) => {
    setMovies((prev) => prev.filter((m) => m.id !== movieId));
  };

  const resetAllData = () => {
    localStorage.clear();
    setMovies(INITIAL_MOVIES);
    setShowtimes(SAMPLE_SHOWTIMES);
    setCurrentUser(DEMO_USERS[0]);
    setBookings([]);
    resetBookingFlow();
    setModalView('none');
  };

  return (
    <CinemaContext.Provider
      value={{
        movies,
        showtimes,
        cinemas,
        snacksCatalog,
        selectedMovie,
        selectedShowtime,
        selectedCinema,
        selectedSeats,
        selectedSnacks,
        appliedPromo,
        countdownSeconds,
        bookings,
        activeBooking,
        currentUser,
        modalView,
        searchQuery,
        selectedGenre,
        selectedFormat,
        selectedCategory,
        setModalView,
        setSearchQuery,
        setSelectedGenre,
        setSelectedFormat,
        setSelectedCategory,
        openMovieDetails,
        startBooking,
        selectShowtime,
        setSelectedCinema,
        toggleSeat,
        addSnack,
        removeSnack,
        clearSnack,
        applyPromoCode,
        removePromoCode,
        completeBooking,
        cancelBooking,
        viewTicket,
        loginUser,
        logoutUser,
        addMovie,
        updateMovie,
        deleteMovie,
        resetAllData,
        resetBookingFlow
      }}
    >
      {children}
    </CinemaContext.Provider>
  );
};

export const useCinema = (): CinemaContextType => {
  const context = useContext(CinemaContext);
  if (!context) {
    throw new Error('useCinema must be used within a CinemaProvider');
  }
  return context;
};
