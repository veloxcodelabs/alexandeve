export interface StreamerBio {
  name: string;
  tag: string;
  handle: string;
  role: string;
  title: string;
  avatar: string;
  accentColor: string;
  quote: string;
  bio: string;
  playstyle: string;
  topGames: { name: string; hours: string; role: string; icon: string }[];
  setup: {
    gpu: string;
    cpu: string;
    ram: string;
    monitor: string;
    headset: string;
    mic: string;
    mouse: string;
    keyboard: string;
  };
  stats: {
    label: string;
    value: string;
    iconName: string;
  }[];
  badges: string[];
}

export interface HighlightClip {
  id: string;
  title: string;
  game: string;
  category: 'all' | 'clutch' | 'chaos' | 'funny' | 'wholesome';
  duration: string;
  views: string;
  date: string;
  clippedBy: string;
  thumbnail: string;
  videoUrl: string;
  featured?: boolean;
}

export interface ScheduleDay {
  day: string;
  date: string;
  time: string;
  timeEst: string;
  game: string;
  title: string;
  category: string;
  isToday?: boolean;
  isNext?: boolean;
}

export interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: string;
  stats: string;
  description: string;
  badge: string;
  color: string;
  hoverBorder: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  badges: ('sub' | 'vip' | 'mod' | 'prime' | 'founder')[];
  text: string;
  color: string;
  timestamp: string;
  emotes?: string[];
}

export interface StreamInfo {
  isLive: boolean;
  title: string;
  game: string;
  category: string;
  viewers: number;
  uptime: string;
  startedAt: string;
  tags: string[];
  recentFollower: string;
  topDonation: string;
  subGoal: { current: number; target: number };
}
