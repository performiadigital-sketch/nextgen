export type Confederation = 'CAF' | 'UEFA' | 'CONCACAF' | 'CONMEBOL' | 'AFC' | 'OFC';

export type Position = 'FW' | 'MF' | 'DF' | 'GK';

export type PreferredFoot = 'left' | 'right' | 'both';

export interface MarketValuePoint {
  date: string;
  value: number; // In EUR base
}

export interface RadarStats {
  finishing: number;
  playmaking: number;
  pace: number;
  physique: number;
  defense: number;
  international: number;
}

export interface SeasonStat {
  season: string;
  competition: string;
  matches: number;
  goals?: number;
  assists?: number;
  cleanSheets?: number;
  minutes: number;
  yellowCards?: number;
  redCards?: number;
  rating?: number;
}

export interface TransferRecord {
  date: string;
  fromClub: string;
  toClub: string;
  type: string;
  fee: string;
}

export interface VideoRecord {
  title: string;
  url: string;
  thumbnail: string;
}

export interface Player {
  id: string;
  name: string;
  shortName: string;
  nationality: string;
  countryCode: string;
  confed: Confederation;
  dob: string;
  age: number;
  position: Position;
  positionDetail: string;
  preferredFoot: PreferredFoot;
  height: number; // in cm
  weight: number; // in kg
  clubId: string;
  clubName: string;
  contractUntil: string;
  agent: string;
  nationalTeam: string;
  caps: number;
  internationalGoals: number;
  marketValueEur: number;
  marketValueHistory: MarketValuePoint[];
  radarStats: RadarStats;
  seasonStats: SeasonStat[];
  transfers: TransferRecord[];
  palmares: string[];
  injuryHistory: string;
  socialFollowers: string;
  photoUrl: string;
  featured?: boolean;
  trending?: string;
  biography?: string;
  photoGallery?: string[];
  videoGallery?: VideoRecord[];
}
