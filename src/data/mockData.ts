import { Cinema, EpicItem, Movie, Showtime, SnackItem, UserProfile } from '../types';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: 'mov-1',
    title: 'Dune: Part Two',
    tagline: 'Long live the fighters.',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.',
    genre: ['Sci-Fi', 'Adventure', 'Action'],
    duration: 166,
    rating: 8.9,
    voteCount: 420800,
    certificate: 'PG-13',
    releaseDate: '2024-03-01',
    director: 'Denis Villeneuve',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides' },
      { name: 'Zendaya', role: 'Chani' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica' },
      { name: 'Javier Bardem', role: 'Stilgar' },
      { name: 'Austin Butler', role: 'Feyd-Rautha' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: 'Way9Dexny3w',
    formats: ['IMAX 3D', 'Dolby Cinema', 'Standard 2D'],
    language: 'English',
    status: 'now_showing',
    priceBase: 16.50,
    reviews: [
      { id: 'rev-1', author: 'Marcus Sterling', rating: 5, date: '2 days ago', comment: 'A visual and sonic masterclass. IMAX sound shook the entire auditorium!' },
      { id: 'rev-2', author: 'Sarah Lin', rating: 4.8, date: '1 week ago', comment: 'Best sci-fi cinematic experience since Interstellar. Unforgettable world building.' }
    ]
  },
  {
    id: 'mov-2',
    title: 'Oppenheimer',
    tagline: 'The world forever changes.',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, exploring moral conflict and geopolitical fallout.',
    genre: ['Biography', 'Drama', 'History'],
    duration: 180,
    rating: 8.9,
    voteCount: 680200,
    certificate: 'R',
    releaseDate: '2023-07-21',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer' },
      { name: 'Emily Blunt', role: 'Katherine Oppenheimer' },
      { name: 'Matt Damon', role: 'Leslie Groves' },
      { name: 'Robert Downey Jr.', role: 'Lewis Strauss' },
      { name: 'Florence Pugh', role: 'Jean Tatlock' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: 'uYPbbksJxIg',
    formats: ['IMAX 3D', 'Dolby Cinema', 'Standard 2D'],
    language: 'English',
    status: 'top_rated',
    priceBase: 15.00,
    reviews: [
      { id: 'rev-3', author: 'David K.', rating: 5, date: '3 days ago', comment: 'Phenomenal performance by Cillian Murphy. The Trinity test sequence leaves you breathless.' }
    ]
  },
  {
    id: 'mov-3',
    title: 'Interstellar: 10th Anniversary IMAX',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    synopsis: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft along with a team of researchers to find a new planet for humans.',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    duration: 169,
    rating: 8.7,
    voteCount: 1980000,
    certificate: 'PG-13',
    releaseDate: '2024-11-06',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Matthew McConaughey', role: 'Cooper' },
      { name: 'Anne Hathaway', role: 'Brand' },
      { name: 'Jessica Chastain', role: 'Murph' },
      { name: 'Michael Caine', role: 'Professor Brand' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: 'zSWdZVtXT7E',
    formats: ['IMAX 3D', 'Dolby Cinema'],
    language: 'English',
    status: 'trending',
    priceBase: 18.00,
    reviews: [
      { id: 'rev-4', author: 'Elena Rostova', rating: 5, date: 'Yesterday', comment: 'Hans Zimmer score in 70mm IMAX was a religious experience!' }
    ]
  },
  {
    id: 'mov-4',
    title: 'Spider-Man: Beyond the Spider-Verse',
    tagline: 'Every universe has a destiny.',
    synopsis: 'Miles Morales catapults across the multiverse where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a catastrophic threat, Miles must redefine heroism.',
    genre: ['Animation', 'Action', 'Sci-Fi'],
    duration: 140,
    rating: 8.8,
    voteCount: 345000,
    certificate: 'PG',
    releaseDate: '2025-05-18',
    director: 'Joaquim Dos Santos, Kemp Powers',
    cast: [
      { name: 'Shameik Moore', role: 'Miles Morales (voice)' },
      { name: 'Hailee Steinfeld', role: 'Gwen Stacy (voice)' },
      { name: 'Oscar Isaac', role: 'Miguel O’Hara (voice)' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: 'cqGjhVJWtEg',
    formats: ['IMAX 3D', '4DX', 'Standard 2D'],
    language: 'English',
    status: 'coming_soon',
    priceBase: 14.00,
    reviews: []
  },
  {
    id: 'mov-5',
    title: 'Cyberpunk 2099: Neo Tokyo',
    tagline: 'Consciousness is the ultimate commodity.',
    synopsis: 'In a rain-drenched megacity where artificial memories are traded like stock, an ex-enforcer uncovers a syndicate synthesizing human emotions into synthetic neural drugs.',
    genre: ['Sci-Fi', 'Thriller', 'Action'],
    duration: 134,
    rating: 8.4,
    voteCount: 92400,
    certificate: 'R',
    releaseDate: '2024-10-14',
    director: 'Sofia Chen',
    cast: [
      { name: 'Ken Watanabe', role: 'Inspector Jin' },
      { name: 'Ana de Armas', role: 'Vespera' },
      { name: 'Steven Yeun', role: 'Kaelen' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: '8X2kIfS6fb8',
    formats: ['Dolby Cinema', '4DX', 'ScreenX'],
    language: 'English',
    status: 'now_showing',
    priceBase: 15.50,
    reviews: [
      { id: 'rev-5', author: 'Ryu Tanaka', rating: 4.7, date: '4 days ago', comment: 'Spectacular neon aesthetic and synthwave soundtrack.' }
    ]
  },
  {
    id: 'mov-6',
    title: 'The Dark Horizon: Odyssey',
    tagline: 'Deep space holds deep silence.',
    synopsis: 'A deep-sea drilling platform off the Marianas Trench drills past the Earth mantle and awakens an ancient sentient geological biosphere that controls gravitational fields.',
    genre: ['Horror', 'Sci-Fi', 'Mystery'],
    duration: 122,
    rating: 7.9,
    voteCount: 54100,
    certificate: 'R',
    releaseDate: '2024-11-20',
    director: 'Guillermo Vance',
    cast: [
      { name: 'Idris Elba', role: 'Captain Ronald' },
      { name: 'Rebecca Hall', role: 'Dr. Thorne' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: 'vKQi3bBA1y8',
    formats: ['Dolby Cinema', 'Standard 2D'],
    language: 'English',
    status: 'coming_soon',
    priceBase: 13.50,
    reviews: []
  }
];

export const CINEMAS: Cinema[] = [
  {
    id: 'cin-1',
    name: 'IMovies Grand IMAX - Downtown',
    location: '450 Metropolis Ave, Downtown Cultural District',
    distance: '1.4 miles away',
    formatsSupported: ['IMAX 3D', 'Dolby Cinema', 'Standard 2D'],
    amenities: ['IMAX Dual Laser 4K', '12-Channel Immersive Sound', 'Luxury Recliner Seats', 'VIP Gourmet Lounge', 'Valet Parking']
  },
  {
    id: 'cin-2',
    name: 'IMovies Starlight Multiplex - Westside',
    location: '88 Ocean View Blvd, Westside Promenade',
    distance: '3.2 miles away',
    formatsSupported: ['Dolby Cinema', '4DX', 'ScreenX', 'Standard 2D'],
    amenities: ['Dolby Atmos', '4DX Motion Chairs & Scent', 'Artisan Popcorn Bar', 'Beer & Wine Bar']
  },
  {
    id: 'cin-3',
    name: 'IMovies CineDome - Metro Galleria',
    location: '1200 Galleria Mall Circle, Level 3',
    distance: '5.8 miles away',
    formatsSupported: ['IMAX 3D', 'ScreenX', 'Standard 2D'],
    amenities: ['Curved Panoramic Screen', 'Heated Recliners', 'Family Game Arcade', 'Direct Mall Access']
  }
];

export const SNACKS_CATALOG: SnackItem[] = [
  {
    id: 'snack-1',
    name: 'IMAX Blockbuster Combo',
    category: 'Combos',
    description: 'Giant tub of Warm Butter Popcorn, 2 Large Fountain Sodas, and choice of M&Ms or Twizzlers.',
    price: 15.99,
    imageUrl: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80',
    calories: '940 kcal',
    isPopular: true
  },
  {
    id: 'snack-2',
    name: 'Truffle & Herb Popcorn Tub',
    category: 'Popcorn',
    description: 'Freshly popped organic kernels tossed with white truffle oil, rosemary sea salt, and aged parmesan.',
    price: 9.50,
    imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=600&q=80',
    calories: '420 kcal',
    isPopular: true
  },
  {
    id: 'snack-3',
    name: 'Classic Golden Butter Popcorn',
    category: 'Popcorn',
    description: 'Crispy warm popcorn drenched in melted golden farm butter with classic theater seasoning.',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?auto=format&fit=crop&w=600&q=80',
    calories: '510 kcal'
  },
  {
    id: 'snack-4',
    name: 'Artisan Loaded Nachos Supreme',
    category: 'Snacks',
    description: 'Crisp corn tortilla chips topped with warm jalapeño queso, pico de gallo, guacamole, and sour cream.',
    price: 10.99,
    imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80',
    calories: '680 kcal',
    isPopular: true
  },
  {
    id: 'snack-5',
    name: 'Gourmet Angus Beef Hotdog',
    category: 'Snacks',
    description: 'Grilled 100% Angus beef frank inside a toasted brioche bun with caramelized onions and spicy mustard.',
    price: 8.50,
    imageUrl: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80',
    calories: '530 kcal'
  },
  {
    id: 'snack-6',
    name: 'Glacial Berry ICEE / Frozen Slush',
    category: 'Beverages',
    description: 'Sub-zero blended icy treat available in Wild Cherry, Electric Blue Raspberry, or Twisted Swirl.',
    price: 6.49,
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    calories: '210 kcal'
  },
  {
    id: 'snack-7',
    name: 'Craft Soda Fountain (Large)',
    category: 'Beverages',
    description: 'Unlimited refills of Coca-Cola Freestyle, Sprite, Fanta, Ginger Ale, or Dr. Pepper.',
    price: 5.99,
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    calories: '180 kcal'
  }
];

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@cinema-club.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    membershipLevel: 'IMAX VIP',
    loyaltyPoints: 1450,
    role: 'user',
    token: 'jwt_mock_token_alex_vip_9481230491'
  },
  {
    id: 'usr-admin',
    name: 'Cinema Admin / Manager',
    email: 'manager@imovies-theater.com',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    membershipLevel: 'IMAX VIP',
    loyaltyPoints: 9999,
    role: 'admin',
    token: 'jwt_mock_admin_token_manager_382914023'
  }
];

// Helper to generate a realistic seat grid for an auditorium
export function generateShowtimeSeats(tierConfig?: { basePrice: number }): Showtime['seats'] {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  const seats: Showtime['seats'] = [];
  const basePrice = tierConfig?.basePrice || 16.50;

  // Preset reserved seats for realism (about 30% reserved)
  const reservedKeys = new Set(['C5', 'C6', 'C7', 'D6', 'D7', 'E4', 'E5', 'E6', 'F7', 'F8', 'A1', 'B12', 'G3', 'G4']);

  rows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      const seatId = `${row}${i}`;
      let tier: Showtime['seats'][0]['tier'] = 'regular';
      let price = basePrice;

      // Rows A & B are VIP Recliners
      if (row === 'A' || row === 'B') {
        tier = 'vip';
        price = Number((basePrice * 1.5).toFixed(2));
      } else if (row === 'C' || row === 'D' || row === 'E') {
        tier = 'premium';
        price = Number((basePrice * 1.25).toFixed(2));
      } else if (row === 'H' && (i === 1 || i === 2 || i === 11 || i === 12)) {
        tier = 'wheelchair';
        price = Number((basePrice * 0.9).toFixed(2));
      }

      seats.push({
        id: seatId,
        row,
        number: i,
        tier,
        price,
        status: reservedKeys.has(seatId) ? 'reserved' : 'available'
      });
    }
  });

  return seats;
}

// Generate dates for next 7 days
export function getUpcomingDates(): { label: string; dateStr: string; dayName: string; isToday: boolean }[] {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dates.push({ label, dateStr, dayName, isToday: i === 0 });
  }
  return dates;
}

// Pre-generated showtimes
export const SAMPLE_SHOWTIMES: Showtime[] = [
  {
    id: 'st-101',
    movieId: 'mov-1',
    cinemaId: 'cin-1',
    cinemaName: 'IMovies Grand IMAX - Downtown',
    date: new Date().toISOString().split('T')[0],
    time: '13:00',
    format: 'IMAX 3D',
    hallName: 'Auditorium 1 (IMAX Laser)',
    seats: generateShowtimeSeats({ basePrice: 19.50 }),
    seatMapRows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    seatsPerRow: 12
  },
  {
    id: 'st-102',
    movieId: 'mov-1',
    cinemaId: 'cin-1',
    cinemaName: 'IMovies Grand IMAX - Downtown',
    date: new Date().toISOString().split('T')[0],
    time: '16:45',
    format: 'IMAX 3D',
    hallName: 'Auditorium 1 (IMAX Laser)',
    seats: generateShowtimeSeats({ basePrice: 19.50 }),
    seatMapRows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    seatsPerRow: 12
  },
  {
    id: 'st-103',
    movieId: 'mov-1',
    cinemaId: 'cin-1',
    cinemaName: 'IMovies Grand IMAX - Downtown',
    date: new Date().toISOString().split('T')[0],
    time: '20:30',
    format: 'IMAX 3D',
    hallName: 'Auditorium 1 (IMAX Laser)',
    seats: generateShowtimeSeats({ basePrice: 21.00 }),
    seatMapRows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    seatsPerRow: 12
  },
  {
    id: 'st-104',
    movieId: 'mov-1',
    cinemaId: 'cin-2',
    cinemaName: 'IMovies Starlight Multiplex - Westside',
    date: new Date().toISOString().split('T')[0],
    time: '18:15',
    format: 'Dolby Cinema',
    hallName: 'Dolby Screen 4',
    seats: generateShowtimeSeats({ basePrice: 17.50 }),
    seatMapRows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    seatsPerRow: 12
  },
  {
    id: 'st-105',
    movieId: 'mov-2',
    cinemaId: 'cin-1',
    cinemaName: 'IMovies Grand IMAX - Downtown',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    format: 'IMAX 3D',
    hallName: 'Auditorium 2 (Large Format)',
    seats: generateShowtimeSeats({ basePrice: 18.00 }),
    seatMapRows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    seatsPerRow: 12
  },
  {
    id: 'st-106',
    movieId: 'mov-3',
    cinemaId: 'cin-1',
    cinemaName: 'IMovies Grand IMAX - Downtown',
    date: new Date().toISOString().split('T')[0],
    time: '21:15',
    format: 'IMAX 3D',
    hallName: 'Auditorium 1 (IMAX Laser)',
    seats: generateShowtimeSeats({ basePrice: 22.00 }),
    seatMapRows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    seatsPerRow: 12
  },
  {
    id: 'st-107',
    movieId: 'mov-5',
    cinemaId: 'cin-2',
    cinemaName: 'IMovies Starlight Multiplex - Westside',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    format: '4DX',
    hallName: '4DX Motion Lab 2',
    seats: generateShowtimeSeats({ basePrice: 18.50 }),
    seatMapRows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    seatsPerRow: 12
  }
];

// Project Epics and Tasks matching the user's project documentation prompt
export const PROJECT_EPICS: EpicItem[] = [
  {
    id: 'epic-1',
    number: 1,
    title: 'User Authentication & Account Management',
    description: 'Implement secure registration, authentication via JWT, user profiles, and role-based permissions (Audience vs Cinema Manager).',
    status: 'Completed',
    tasks: [
      { id: 'task-101', title: 'User Registration & Validation', description: 'Design sign-up flow with email validation, password hashing, and profile initiation.', skills: ['HTML', 'CSS', 'React.js', 'Express.js', 'MongoDB'] },
      { id: 'task-102', title: 'JWT Authentication & Session Storage', description: 'Generate and verify JSON Web Tokens, store access tokens securely in client state, handle authorization headers.', skills: ['Node.js', 'Express.js', 'JWT', 'Async JS'] },
      { id: 'task-103', title: 'User Profile & Booking History', description: 'View and edit user personal info, membership tier, active reservations, and past tickets.', skills: ['React.js', 'Bootstrap/Tailwind', 'MongoDB'] }
    ]
  },
  {
    id: 'epic-2',
    number: 2,
    title: 'Movie Catalog & Discovery Engine',
    description: 'Dynamic movie browsing, categorized listings (Now Showing, Coming Soon, Top Rated), search, filtering, and rich movie details.',
    status: 'Completed',
    tasks: [
      { id: 'task-201', title: 'Movie Schema & Data Modeling', description: 'Define MongoDB collections for movie titles, synopsis, director, genres, certificates, and cast.', skills: ['MongoDB', 'Node.js'] },
      { id: 'task-202', title: 'Interactive Movie Search & Filtering', description: 'Real-time search bar, category filters, genre pills, format toggles (IMAX, Dolby, 4DX).', skills: ['React.js', 'JavaScript', 'Tailwind'] },
      { id: 'task-203', title: 'Rich Movie Detail & Trailer Overlay', description: 'Detailed movie showcase with high-res backdrops, trailer player, cast lists, and user reviews.', skills: ['HTML', 'CSS', 'React.js', 'Async JS'] }
    ]
  },
  {
    id: 'epic-3',
    number: 3,
    title: 'Showtime Scheduling & Multiplex Selection',
    description: 'Multiplex cinema discovery, multi-day calendar date picker, and showtime schedule generation per screen format.',
    status: 'Completed',
    tasks: [
      { id: 'task-301', title: 'Cinema Multiplex Directory', description: 'Store theater locations, supported audio/visual formats (IMAX, Dolby Atmos), and distance calculations.', skills: ['MongoDB', 'Express.js'] },
      { id: 'task-302', title: '7-Day Rolling Showtime Calendar', description: 'Dynamic date picker displaying today, tomorrow, and upcoming days with showtime availability indicators.', skills: ['React.js', 'JavaScript'] },
      { id: 'task-303', title: 'Showtime Format Categorization', description: 'Group showtimes by IMAX 3D, Dolby Cinema, 4DX, and Standard 2D with dynamic pricing tiers.', skills: ['React.js', 'Express.js'] }
    ]
  },
  {
    id: 'epic-4',
    number: 4,
    title: 'Interactive Seat Reservation with Real-Time Tracking',
    description: 'Auditorium curved screen seating map with tiered pricing (VIP Recliner, Premium, Regular, Wheelchair) and live countdown lock.',
    status: 'Completed',
    tasks: [
      { id: 'task-401', title: 'Auditorium Seat Map Grid System', description: 'Render interactive theater seating with curved screen perspective, row codes (A-H), and seat indices.', skills: ['HTML', 'CSS', 'React.js', 'SVG/Canvas'] },
      { id: 'task-402', title: 'Seat Tiering & Dynamic Pricing', description: 'Distinguish VIP Recliners, Premium seats, Standard seats, and Wheelchair accessible spots with live pricing.', skills: ['JavaScript', 'React.js'] },
      { id: 'task-403', title: 'Real-time Seat Locking & Countdown Timer', description: 'Prevent double bookings by temporarily reserving selected seats with an 8-minute session countdown timer.', skills: ['Async JS', 'React.js', 'Express.js'] },
      { id: 'task-404', title: 'Seat Status Synchronization', description: 'Live tracking of available, selected, reserved, and locked seats.', skills: ['JavaScript', 'MongoDB', 'Node.js'] }
    ]
  },
  {
    id: 'epic-5',
    number: 5,
    title: 'Concessions, Checkout & Digital Ticket Boarding Pass',
    description: 'Cinema snack bar add-ons, promo code engine, seamless checkout flow, and downloadable QR-coded digital cinema ticket.',
    status: 'Completed',
    tasks: [
      { id: 'task-501', title: 'Concessions & Gourmet Snack Bar', description: 'Interactive menu for popcorn tubs, combos, nachos, gourmet hot dogs, and craft sodas with live cart updates.', skills: ['React.js', 'HTML', 'CSS'] },
      { id: 'task-502', title: 'Promo Code & Pricing Engine', description: 'Discount codes verification, tax computation, and booking fee calculations.', skills: ['JavaScript', 'Express.js'] },
      { id: 'task-503', title: 'Booking Confirmation & Digital Boarding Pass', description: 'Generate high-resolution printable digital cinema boarding pass with scannable QR code and booking reference.', skills: ['HTML', 'CSS', 'React.js', 'Canvas'] },
      { id: 'task-504', title: 'Ticket Cancellation & Refund Simulation', description: 'Allow users to cancel upcoming reservations with instant seat release and automated refund ledger.', skills: ['React.js', 'Express.js', 'MongoDB'] }
    ]
  },
  {
    id: 'epic-6',
    number: 6,
    title: 'Cinema Manager / Admin Portal & System Monitoring',
    description: 'Comprehensive management dashboard for tracking gross box office revenue, occupancy rates, movie catalog, and screen schedules.',
    status: 'Completed',
    tasks: [
      { id: 'task-601', title: 'Box Office Revenue & Occupancy Analytics', description: 'Real-time metrics: total revenue, tickets sold, average occupancy %, and top grossing movies.', skills: ['React.js', 'Chart/Visuals', 'Express.js'] },
      { id: 'task-602', title: 'Movie Catalog CRUD Operations', description: 'Add new movie releases, update base ticket prices, change status from coming soon to now showing.', skills: ['React.js', 'Express.js', 'MongoDB'] }
    ]
  }
];
