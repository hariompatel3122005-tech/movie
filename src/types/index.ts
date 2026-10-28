export type MovieCategory = 'now_showing' | 'coming_soon' | 'trending' | 'top_rated';

export type MovieFormat = 'IMAX 3D' | 'Dolby Cinema' | '4DX' | 'Standard 2D' | 'ScreenX';

export interface CastMember {
  name: string;
  role: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  genre: string[];
  duration: number; // in minutes
  rating: number; // e.g. 8.8
  voteCount: number;
  certificate: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  releaseDate: string;
  director: string;
  cast: CastMember[];
  posterUrl: string;
  bannerUrl: string;
  trailerYoutubeId: string;
  formats: MovieFormat[];
  language: string;
  status: MovieCategory;
  priceBase: number;
  reviews: Review[];
}

export interface Cinema {
  id: string;
  name: string;
  location: string;
  distance: string;
  formatsSupported: MovieFormat[];
  amenities: string[];
}

export type SeatTier = 'regular' | 'premium' | 'vip' | 'wheelchair';
export type SeatStatus = 'available' | 'reserved' | 'selected' | 'blocked';

export interface Seat {
  id: string; // e.g. "D6"
  row: string; // "D"
  number: number; // 6
  tier: SeatTier;
  price: number;
  status: SeatStatus;
}

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  cinemaName: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "19:30"
  format: MovieFormat;
  hallName: string;
  seats: Seat[];
  seatMapRows: string[]; // e.g. ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  seatsPerRow: number;
}

export interface SnackItem {
  id: string;
  name: string;
  category: 'Combos' | 'Popcorn' | 'Snacks' | 'Beverages';
  description: string;
  price: number;
  imageUrl: string;
  calories?: string;
  isPopular?: boolean;
}

export interface SelectedSnack {
  snack: SnackItem;
  quantity: number;
}

export interface Booking {
  id: string;
  bookingRef: string; // e.g. "IMV-94821"
  userId: string;
  userName: string;
  userEmail: string;
  movie: Movie;
  showtime: Showtime;
  seats: Seat[];
  snacks: SelectedSnack[];
  ticketTotal: number;
  snackTotal: number;
  bookingFee: number;
  discount: number;
  grandTotal: number;
  paymentMethod: 'Credit Card' | 'Apple Pay' | 'Google Pay' | 'Cinema Cash';
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
  qrCodeSeed: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  token?: string;
  membershipLevel: 'Bronze' | 'Silver Gold' | 'IMAX VIP';
  loyaltyPoints: number;
  role: 'user' | 'admin';
}

export interface EpicItem {
  id: string;
  number: number;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress';
  tasks: {
    id: string;
    title: string;
    description: string;
    skills: string[];
  }[];
}
