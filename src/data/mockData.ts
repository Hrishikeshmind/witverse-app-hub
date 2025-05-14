
export interface App {
  id: string;
  name: string;
  developer: string;
  icon: string;
  category: string;
  rating: number;
  downloads: number;
  description: string;
  screenshots: string[];
  version: string;
  size: string;
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
  isFacultyPick: boolean;
  updatedAt: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { 
    id: 'academics', 
    name: 'Academics', 
    icon: '📚', 
    count: 24 
  },
  { 
    id: 'utilities', 
    name: 'Utilities', 
    icon: '🛠️', 
    count: 18 
  },
  { 
    id: 'events', 
    name: 'Events', 
    icon: '📅', 
    count: 12 
  },
  { 
    id: 'social', 
    name: 'Social', 
    icon: '👥', 
    count: 15 
  },
  { 
    id: 'campus', 
    name: 'Campus', 
    icon: '🏫', 
    count: 9 
  },
  { 
    id: 'clubs', 
    name: 'Clubs', 
    icon: '🎭', 
    count: 21 
  },
];

export const apps: App[] = [
  {
    id: '1',
    name: 'WIT Timetable',
    developer: 'Student Council',
    icon: 'https://via.placeholder.com/80',
    category: 'academics',
    rating: 4.8,
    downloads: 3420,
    description: 'Get your personalized class schedule directly on your phone. Set reminders for important classes and exams.',
    screenshots: [
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800'
    ],
    version: '2.3.1',
    size: '12.4 MB',
    isFeatured: true,
    isTrending: true,
    isNew: false,
    isFacultyPick: true,
    updatedAt: '2025-04-28',
    tags: ['schedule', 'academics', 'notifications']
  },
  {
    id: '2',
    name: 'Campus Navigator',
    developer: 'CSE Department',
    icon: 'https://via.placeholder.com/80',
    category: 'utilities',
    rating: 4.6,
    downloads: 2830,
    description: 'Interactive map of the WIT campus with navigation directions, building information, and points of interest.',
    screenshots: [
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800'
    ],
    version: '1.8.5',
    size: '24.7 MB',
    isFeatured: true,
    isTrending: false,
    isNew: false,
    isFacultyPick: true,
    updatedAt: '2025-05-02',
    tags: ['map', 'navigation', 'campus']
  },
  {
    id: '3',
    name: 'WIT Events',
    developer: 'Cultural Committee',
    icon: 'https://via.placeholder.com/80',
    category: 'events',
    rating: 4.9,
    downloads: 3150,
    description: 'Stay updated with all campus events, festivals, workshops, and competitions. Register for events directly.',
    screenshots: [
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800'
    ],
    version: '3.1.0',
    size: '18.2 MB',
    isFeatured: false,
    isTrending: true,
    isNew: true,
    isFacultyPick: false,
    updatedAt: '2025-05-10',
    tags: ['events', 'calendar', 'registration']
  },
  {
    id: '4',
    name: 'CampusConnect',
    developer: 'WIT Network Club',
    icon: 'https://via.placeholder.com/80',
    category: 'social',
    rating: 4.5,
    downloads: 2945,
    description: 'Connect with other students, join interest groups, and participate in discussions. Find study partners or project teammates.',
    screenshots: [
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800'
    ],
    version: '2.5.1',
    size: '21.8 MB',
    isFeatured: true,
    isTrending: true,
    isNew: false,
    isFacultyPick: true,
    updatedAt: '2025-04-25',
    tags: ['social', 'networking', 'groups']
  },
  {
    id: '5',
    name: 'WIT Library',
    developer: 'Library Department',
    icon: 'https://via.placeholder.com/80',
    category: 'academics',
    rating: 4.7,
    downloads: 2210,
    description: 'Search for books, reserve study rooms, check book availability, and get notified about due dates.',
    screenshots: [
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800'
    ],
    version: '1.4.2',
    size: '15.6 MB',
    isFeatured: false,
    isTrending: false,
    isNew: true,
    isFacultyPick: true,
    updatedAt: '2025-05-08',
    tags: ['library', 'books', 'study']
  },
  {
    id: '6',
    name: 'Attendance Tracker',
    developer: 'WIT Official',
    icon: 'https://via.placeholder.com/80',
    category: 'academics',
    rating: 4.4,
    downloads: 3560,
    description: 'Track your attendance for all courses, get alerts when attendance falls below threshold, and request leave from professors.',
    screenshots: [
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800'
    ],
    version: '2.0.3',
    size: '10.8 MB',
    isFeatured: true,
    isTrending: true,
    isNew: false,
    isFacultyPick: false,
    updatedAt: '2025-05-01',
    tags: ['attendance', 'tracking', 'academics']
  },
  {
    id: '7',
    name: 'WIT Cafeteria',
    developer: 'Food Committee',
    icon: 'https://via.placeholder.com/80',
    category: 'campus',
    rating: 4.3,
    downloads: 2420,
    description: 'View cafeteria menu, place orders in advance, get notifications when order is ready, and pay digitally.',
    screenshots: [
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800'
    ],
    version: '1.2.1',
    size: '16.9 MB',
    isFeatured: false,
    isTrending: true,
    isNew: true,
    isFacultyPick: false,
    updatedAt: '2025-05-09',
    tags: ['food', 'cafeteria', 'payments']
  },
  {
    id: '8',
    name: 'Club Hub',
    developer: 'Student Activities',
    icon: 'https://via.placeholder.com/80',
    category: 'clubs',
    rating: 4.8,
    downloads: 2780,
    description: 'Explore all student clubs and organizations, sign up for memberships, and stay updated on club activities.',
    screenshots: [
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800',
      'https://via.placeholder.com/400x800'
    ],
    version: '2.1.0',
    size: '19.3 MB',
    isFeatured: true,
    isTrending: false,
    isNew: false,
    isFacultyPick: true,
    updatedAt: '2025-04-22',
    tags: ['clubs', 'activities', 'organizations']
  }
];
