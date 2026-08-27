import { Player } from '@/types/player';
import { Club, League } from '@/types/club';
import { NewsArticle } from '@/types/news';

export const LEAGUES: League[] = [
  { id: 'liga-f', name: 'Liga F', country: 'Espagne', confed: 'UEFA', tierCoefficient: 1.25 },
  { id: 'd1-arkema', name: 'Arkema Première Ligue', country: 'France', confed: 'UEFA', tierCoefficient: 1.22 },
  { id: 'wsl', name: "Barclays Women's Super League", country: 'Angleterre', confed: 'UEFA', tierCoefficient: 1.28 },
  { id: 'nwsl', name: "NWSL (National Women's Soccer League)", country: 'États-Unis', confed: 'CONCACAF', tierCoefficient: 1.26 },
  { id: 'frauen-bundesliga', name: 'Google Pixel Frauen-Bundesliga', country: 'Allemagne', confed: 'UEFA', tierCoefficient: 1.18 },
  { id: 'serie-a-femminile', name: 'Serie A Femminile', country: 'Italie', confed: 'UEFA', tierCoefficient: 1.12 },
  { id: 'caf-wcl', name: "CAF Women's Champions League", country: 'Afrique', confed: 'CAF', tierCoefficient: 1.05 },
  { id: 'guinness-super-league', name: 'Guinness Super League', country: 'Cameroun', confed: 'CAF', tierCoefficient: 0.95 },
  { id: 'saudi-wpl', name: "Saudi Women's Premier League", country: 'Arabie Saoudite', confed: 'AFC', tierCoefficient: 1.02 },
  { id: 'copa-libertadores-femenina', name: 'Copa Libertadores Femenina', country: 'Amérique du Sud', confed: 'CONMEBOL', tierCoefficient: 1.08 }
];

export const CLUBS: Club[] = [
  { id: 'fc-barcelona', name: 'FC Barcelona Femení', country: 'Espagne', leagueId: 'liga-f', confed: 'UEFA', logo: '⚽' },
  { id: 'olympique-lyonnais', name: 'Olympique Lyonnais Féminin', country: 'France', leagueId: 'd1-arkema', confed: 'UEFA', logo: '🦁' },
  { id: 'chelsea-fcw', name: 'Chelsea FC Women', country: 'Angleterre', leagueId: 'wsl', confed: 'UEFA', logo: '🔵' },
  { id: 'real-madrid-fem', name: 'Real Madrid Femenino', country: 'Espagne', leagueId: 'liga-f', confed: 'UEFA', logo: '👑' },
  { id: 'psg-fem', name: 'Paris Saint-Germain Féminin', country: 'France', leagueId: 'd1-arkema', confed: 'UEFA', logo: '🗼' },
  { id: 'orlando-pride', name: 'Orlando Pride', country: 'États-Unis', leagueId: 'nwsl', confed: 'CONCACAF', logo: '💜' },
  { id: 'portland-thorns', name: 'Portland Thorns FC', country: 'États-Unis', leagueId: 'nwsl', confed: 'CONCACAF', logo: '🌹' },
  { id: 'man-city-wfc', name: 'Manchester City WFC', country: 'Angleterre', leagueId: 'wsl', confed: 'UEFA', logo: '🌙' },
  { id: 'bay-fc', name: 'Bay FC', country: 'États-Unis', leagueId: 'nwsl', confed: 'CONCACAF', logo: '🌉' },
  { id: 'as-far', name: 'AS FAR Rabat', country: 'Maroc', leagueId: 'caf-wcl', confed: 'CAF', logo: '⭐' },
  { id: 'mamelodi-sundowns', name: 'Mamelodi Sundowns Ladies', country: 'Afrique du Sud', leagueId: 'caf-wcl', confed: 'CAF', logo: '☀️' },
  { id: 'al-qadsiah', name: 'Al-Qadsiah FC', country: 'Arabie Saoudite', leagueId: 'saudi-wpl', confed: 'AFC', logo: '⚔️' },
  { id: 'stade-reims', name: 'Stade de Reims Féminin', country: 'France', leagueId: 'd1-arkema', confed: 'UEFA', logo: '🔴' }
];

export const PLAYERS: Player[] = [
  {
    id: 'tabitha-chawinga',
    name: 'Tabitha Chawinga',
    shortName: 'T. Chawinga',
    nationality: 'Malawi',
    countryCode: 'MW',
    confed: 'CAF',
    dob: '1996-05-22',
    age: 29,
    position: 'FW',
    positionDetail: 'Attaquante / Ailière gauche',
    preferredFoot: 'left',
    height: 173,
    weight: 64,
    clubId: 'olympique-lyonnais',
    clubName: 'Olympique Lyonnais Féminin',
    contractUntil: '2027-06-30',
    agent: 'Alma 2019 / Performia Sports',
    nationalTeam: 'Malawi',
    caps: 38,
    internationalGoals: 34,
    marketValueEur: 680000,
    marketValueHistory: [
      { date: '2022-06', value: 250000 },
      { date: '2023-06', value: 420000 },
      { date: '2024-06', value: 550000 },
      { date: '2025-06', value: 640000 },
      { date: '2026-08', value: 680000 }
    ],
    radarStats: {
      finishing: 94,
      playmaking: 82,
      pace: 96,
      physique: 88,
      defense: 45,
      international: 89
    },
    seasonStats: [
      { season: '2025/2026', competition: 'Arkema Première Ligue', matches: 18, goals: 17, assists: 9, minutes: 1540, yellowCards: 1, redCards: 0, rating: 8.7 },
      { season: '2025/2026', competition: "UEFA Women's Champions League", matches: 8, goals: 7, assists: 4, minutes: 710, yellowCards: 0, redCards: 0, rating: 8.9 },
      { season: '2024/2025', competition: 'D1 Arkema (PSG)', matches: 21, goals: 19, assists: 10, minutes: 1780, yellowCards: 2, redCards: 0, rating: 8.6 }
    ],
    transfers: [
      { date: '2024-07-01', fromClub: 'PSG Féminin', toClub: 'Olympique Lyonnais', type: 'Transfert', fee: '400,000 €' },
      { date: '2023-09-01', fromClub: 'Wuhan Jiangda', toClub: 'PSG Féminin', type: 'Prêt', fee: 'Gratuit' },
      { date: '2022-08-01', fromClub: 'Wuhan Jiangda', toClub: 'Inter Milan', type: 'Prêt', fee: 'Gratuit' }
    ],
    palmares: [
      'Meilleure joueuse D1 Arkema (Trophées UNFP 2024)',
      'Meilleure buteuse Serie A Femminile (2023)',
      'Championne de France (2025)',
      "Joueuse africaine de l'année (Nomination CAF 2024)"
    ],
    injuryHistory: "Faible risque - 1 entorse mineure en 2023 (10 jours d'arrêt)",
    socialFollowers: '480k',
    photoUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=500&auto=format&fit=crop&q=80',
    featured: true,
    trending: '+18%',
    biography: "Tabitha Chawinga est une attaquante de classe mondiale originaire du Malawi. Après avoir dominé les championnats en Suède, en Chine et en Italie, elle a rejoint la D1 Arkema française, d'abord au PSG puis à l'Olympique Lyonnais. Reconnue pour sa vitesse fulgurante et sa précision clinique devant le but, elle est l'une des figures majeures du football féminin africain.",
    photoGallery: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=600&auto=format&fit=crop&q=80'
    ],
    videoGallery: [
      {
        title: "Tous les buts de Tabitha Chawinga en Ligue des Champions",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=80"
      },
      {
        title: "Ses meilleures actions individuelles sous le maillot lyonnais",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=400&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 'barbra-banda',
    name: 'Barbra Banda',
    shortName: 'B. Banda',
    nationality: 'Zambie',
    countryCode: 'ZM',
    confed: 'CAF',
    dob: '2000-03-20',
    age: 26,
    position: 'FW',
    positionDetail: 'Avant-centre',
    preferredFoot: 'right',
    height: 176,
    weight: 67,
    clubId: 'orlando-pride',
    clubName: 'Orlando Pride',
    contractUntil: '2028-12-31',
    agent: 'Alma 2019 Global',
    nationalTeam: 'Zambie',
    caps: 45,
    internationalGoals: 42,
    marketValueEur: 950000,
    marketValueHistory: [
      { date: '2022-06', value: 220000 },
      { date: '2023-06', value: 380000 },
      { date: '2024-03', value: 740000 },
      { date: '2025-06', value: 890000 },
      { date: '2026-08', value: 950000 }
    ],
    radarStats: {
      finishing: 96,
      playmaking: 78,
      pace: 98,
      physique: 92,
      defense: 40,
      international: 93
    },
    seasonStats: [
      { season: '2025/2026', competition: 'NWSL', matches: 22, goals: 18, assists: 7, minutes: 1890, yellowCards: 2, redCards: 0, rating: 8.8 },
      { season: '2024/2025', competition: 'NWSL', matches: 20, goals: 16, assists: 6, minutes: 1680, yellowCards: 1, redCards: 0, rating: 8.7 }
    ],
    transfers: [
      { date: '2024-03-07', fromClub: 'Shanghai Shengli', toClub: 'Orlando Pride', type: 'Transfert record', fee: '740,000 $ (Record historique)' }
    ],
    palmares: [
      'NWSL Championne & MVP (2024)',
      'Double Hat-Trick historique aux Jeux Olympiques',
      "BBC Women's Footballer of the Year 2024 (2e place)",
      "Capitaine de l'équipe nationale de Zambie"
    ],
    injuryHistory: 'Aucune blessure majeure répertoriée',
    socialFollowers: '720k',
    photoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&auto=format&fit=crop&q=80',
    featured: true,
    trending: '+25%',
    biography: "Capitaine légendaire de la Zambie, Barbra Banda est entrée dans l'histoire en devenant la première joueuse à inscrire deux hat-tricks consécutifs lors de Jeux Olympiques (Tokyo 2020). Reconnue pour sa puissance athlétique hors du commun et sa vitesse de pointe dévastatrice, elle a rejoint Orlando Pride en NWSL pour un transfert record.",
    photoGallery: [
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80'
    ],
    videoGallery: [
      {
        title: "Le doublé historique de Barbra Banda aux Jeux Olympiques",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 'aitana-bonmati',
    name: 'Aitana Bonmatí',
    shortName: 'A. Bonmatí',
    nationality: 'Espagne',
    countryCode: 'ES',
    confed: 'UEFA',
    dob: '1998-01-18',
    age: 28,
    position: 'MF',
    positionDetail: 'Milieu offensif / Meneuse',
    preferredFoot: 'both',
    height: 161,
    weight: 53,
    clubId: 'fc-barcelona',
    clubName: 'FC Barcelona Femení',
    contractUntil: '2028-06-30',
    agent: 'B-Engaged',
    nationalTeam: 'Espagne',
    caps: 68,
    internationalGoals: 26,
    marketValueEur: 1100000,
    marketValueHistory: [
      { date: '2022-06', value: 450000 },
      { date: '2023-08', value: 800000 },
      { date: '2024-06', value: 1000000 },
      { date: '2025-06', value: 1050000 },
      { date: '2026-08', value: 1100000 }
    ],
    radarStats: {
      finishing: 88,
      playmaking: 99,
      pace: 86,
      physique: 76,
      defense: 79,
      international: 99
    },
    seasonStats: [
      { season: '2025/2026', competition: 'Liga F', matches: 23, goals: 12, assists: 16, minutes: 1950, yellowCards: 1, redCards: 0, rating: 9.1 },
      { season: '2025/2026', competition: "UEFA Women's Champions League", matches: 9, goals: 5, assists: 7, minutes: 810, yellowCards: 0, redCards: 0, rating: 9.3 }
    ],
    transfers: [
      { date: '2016-07-01', fromClub: 'Barça B', toClub: 'FC Barcelona', type: 'Formation', fee: '-' }
    ],
    palmares: [
      "Ballon d'Or Féminin (2023, 2024)",
      'Championne du Monde FIFA 2023 & Meilleure Joueuse',
      "Vainqueure UEFA Women's Champions League (2021, 2023, 2024)",
      "The Best FIFA Women's Player"
    ],
    injuryHistory: 'Excellente condition physique générale',
    socialFollowers: '2.1M',
    photoUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500&auto=format&fit=crop&q=80',
    featured: true,
    trending: '+12%',
    biography: "Aitana Bonmatí est une joueuse de football espagnole évoluant comme milieu de terrain au FC Barcelone. Lauréate consécutive du Ballon d'Or Féminin (2023 et 2024), elle a remporté la Coupe du Monde 2023 avec l'Espagne ainsi que de multiples titres de Ligue des Champions avec le Barça. Son sens tactique, son contrôle du ballon et sa vision de jeu exceptionnelle en font le métronome du football mondial.",
    photoGallery: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&auto=format&fit=crop&q=80'
    ],
    videoGallery: [
      {
        title: "Aitana Bonmatí : Compilation Ballon d'Or et Gestes Techniques",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 'linda-caicedo',
    name: 'Linda Caicedo',
    shortName: 'L. Caicedo',
    nationality: 'Colombie',
    countryCode: 'CO',
    confed: 'CONMEBOL',
    dob: '2005-02-22',
    age: 21,
    position: 'FW',
    positionDetail: 'Ailière / Attaquante polyvalente',
    preferredFoot: 'right',
    height: 162,
    weight: 56,
    clubId: 'real-madrid-fem',
    clubName: 'Real Madrid Femenino',
    contractUntil: '2027-06-30',
    agent: 'Cisneros Group',
    nationalTeam: 'Colombie',
    caps: 34,
    internationalGoals: 14,
    marketValueEur: 820000,
    marketValueHistory: [
      { date: '2023-01', value: 180000 },
      { date: '2023-08', value: 450000 },
      { date: '2024-06', value: 650000 },
      { date: '2025-06', value: 750000 },
      { date: '2026-08', value: 820000 }
    ],
    radarStats: {
      finishing: 87,
      playmaking: 86,
      pace: 95,
      physique: 74,
      defense: 52,
      international: 91
    },
    seasonStats: [
      { season: '2025/2026', competition: 'Liga F', matches: 20, goals: 11, assists: 10, minutes: 1620, yellowCards: 1, redCards: 0, rating: 8.5 },
      { season: '2025/2026', competition: "UEFA Women's Champions League", matches: 6, goals: 3, assists: 3, minutes: 510, yellowCards: 0, redCards: 0, rating: 8.4 }
    ],
    transfers: [
      { date: '2023-02-24', fromClub: 'Deportivo Cali', toClub: 'Real Madrid', type: 'Transfert libre', fee: 'Gratuit' }
    ],
    palmares: [
      'Golden Girl 2023 (Meilleure jeune joueuse mondiale U21)',
      'But du tournoi Coupe du Monde Féminine 2023',
      'Finaliste Copa América Femenina 2022'
    ],
    injuryHistory: 'Rétablie totalement après antécédents médicaux 2020',
    socialFollowers: '1.4M',
    photoUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=500&auto=format&fit=crop&q=80',
    featured: true,
    trending: '+32%'
  },
  {
    id: 'melchie-dumornay',
    name: 'Melchie Dumornay',
    shortName: 'M. Dumornay',
    nationality: 'Haïti',
    countryCode: 'HT',
    confed: 'CONCACAF',
    dob: '2003-08-17',
    age: 23,
    position: 'MF',
    positionDetail: 'Milieu offensif / Attaquante de soutien',
    preferredFoot: 'right',
    height: 168,
    weight: 60,
    clubId: 'olympique-lyonnais',
    clubName: 'Olympique Lyonnais Féminin',
    contractUntil: '2027-06-30',
    agent: 'A&V Sports',
    nationalTeam: 'Haïti',
    caps: 26,
    internationalGoals: 17,
    marketValueEur: 790000,
    marketValueHistory: [
      { date: '2022-06', value: 160000 },
      { date: '2023-06', value: 390000 },
      { date: '2024-06', value: 600000 },
      { date: '2025-06', value: 720000 },
      { date: '2026-08', value: 790000 }
    ],
    radarStats: {
      finishing: 91,
      playmaking: 90,
      pace: 93,
      physique: 84,
      defense: 65,
      international: 88
    },
    seasonStats: [
      { season: '2025/2026', competition: 'Arkema Première Ligue', matches: 19, goals: 13, assists: 11, minutes: 1580, yellowCards: 1, redCards: 0, rating: 8.9 },
      { season: '2025/2026', competition: "UEFA Women's Champions League", matches: 7, goals: 5, assists: 3, minutes: 620, yellowCards: 0, redCards: 0, rating: 8.8 }
    ],
    transfers: [
      { date: '2023-07-01', fromClub: 'Stade de Reims', toClub: 'Olympique Lyonnais', type: 'Transfert', fee: 'Libre' }
    ],
    palmares: [
      "Meilleure jeune joueuse UEFA Women's Champions League (2024)",
      'Championne de France (2024, 2025)',
      'Vainqueure Trophée des Championnes'
    ],
    injuryHistory: 'Blessure à la cheville en 2023 (1 mois)',
    socialFollowers: '390k',
    photoUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=500&auto=format&fit=crop&q=80',
    featured: true,
    trending: '+28%'
  },
  {
    id: 'monique-ngock',
    name: 'Monique Ngock',
    shortName: 'M. Ngock',
    nationality: 'Cameroun',
    countryCode: 'CM',
    confed: 'CAF',
    dob: '2004-12-28',
    age: 21,
    position: 'MF',
    positionDetail: 'Milieu de terrain défensif (CDM)',
    preferredFoot: 'right',
    height: 170,
    weight: 62,
    clubId: 'stade-reims',
    clubName: 'Stade de Reims',
    contractUntil: '2028-06-30',
    agent: 'Alma 2019 Sports',
    nationalTeam: 'Cameroun',
    caps: 18,
    internationalGoals: 2,
    marketValueEur: 220000,
    marketValueHistory: [
      { date: '2023-06', value: 80000 },
      { date: '2024-06', value: 150000 },
      { date: '2025-06', value: 200000 },
      { date: '2026-08', value: 220000 }
    ],
    radarStats: {
      finishing: 72,
      playmaking: 82,
      pace: 88,
      physique: 84,
      defense: 89,
      international: 80
    },
    seasonStats: [
      { season: '2025/2026', competition: 'Arkema Première Ligue', matches: 20, goals: 3, assists: 5, minutes: 1650, yellowCards: 3, redCards: 0, rating: 8.4 }
    ],
    transfers: [
      { date: '2022-07-01', fromClub: 'Eclair de Saa', toClub: 'Stade de Reims', type: 'Transfert', fee: 'Gratuit' }
    ],
    palmares: [
      'Révélation de la Guinness Super League Cameroun',
      'Demi-finaliste de la CAN U20 Féminine'
    ],
    injuryHistory: 'Aucune blessure majeure',
    socialFollowers: '45k',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
    featured: true,
    trending: '+30%',
    biography: "Monique Ngock est un jeune prodige du milieu de terrain défensif camerounais. Formée à l'Eclair de Saa, elle s'est rapidement imposée au Stade de Reims en D1 Arkema par son volume de jeu et sa capacité de récupération."
  },
  {
    id: 'ajara-nchout',
    name: 'Ajara Nchout Njoya',
    shortName: 'A. Nchout',
    nationality: 'Cameroun',
    countryCode: 'CM',
    confed: 'CAF',
    dob: '1993-01-12',
    age: 33,
    position: 'FW',
    positionDetail: 'Attaquante de pointe / Ailière',
    preferredFoot: 'right',
    height: 163,
    weight: 58,
    clubId: 'al-qadsiah',
    clubName: 'Al-Qadsiah FC',
    contractUntil: '2027-06-30',
    agent: 'Alma 2019 / Performia',
    nationalTeam: 'Cameroun',
    caps: 92,
    internationalGoals: 49,
    marketValueEur: 320000,
    marketValueHistory: [
      { date: '2022-06', value: 380000 },
      { date: '2023-06', value: 410000 },
      { date: '2024-06', value: 370000 },
      { date: '2025-06', value: 340000 },
      { date: '2026-08', value: 320000 }
    ],
    radarStats: {
      finishing: 88,
      playmaking: 75,
      pace: 83,
      physique: 81,
      defense: 48,
      international: 95
    },
    seasonStats: [
      { season: '2025/2026', competition: "Saudi Women's Premier League", matches: 16, goals: 14, assists: 8, minutes: 1420, yellowCards: 1, redCards: 0, rating: 8.6 }
    ],
    transfers: [
      { date: '2024-01-15', fromClub: 'Inter Milan', toClub: 'Al-Qadsiah', type: 'Transfert', fee: '150,000 €' },
      { date: '2021-10-08', fromClub: 'Atlético de Madrid', toClub: 'Inter Milan', type: 'Transfert', fee: 'Libre' }
    ],
    palmares: [
      'Finaliste Prix Puskás FIFA 2019 (But historique Coupe du Monde)',
      "Vice-championne d'Afrique CAN Féminine (2014, 2016)",
      'Meilleure joueuse & buteuse Toppserien Norvège (2020)',
      'Capitaine emblématique des Lionnes Indomptables'
    ],
    injuryHistory: 'Très bonne régularité sans blessure majeure récente',
    socialFollowers: '540k',
    photoUrl: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=500&auto=format&fit=crop&q=80',
    featured: true,
    trending: '+5%'
  },
  {
    id: 'sophia-smith',
    name: 'Sophia Smith',
    shortName: 'S. Smith',
    nationality: 'États-Unis',
    countryCode: 'US',
    confed: 'CONCACAF',
    dob: '2000-08-10',
    age: 26,
    position: 'FW',
    positionDetail: 'Ailière droite / Buteuse',
    preferredFoot: 'both',
    height: 168,
    weight: 62,
    clubId: 'portland-thorns',
    clubName: 'Portland Thorns FC',
    contractUntil: '2028-12-31',
    agent: 'Wasserman',
    nationalTeam: 'États-Unis',
    caps: 54,
    internationalGoals: 24,
    marketValueEur: 920000,
    marketValueHistory: [
      { date: '2022-06', value: 400000 },
      { date: '2023-06', value: 650000 },
      { date: '2024-08', value: 850000 },
      { date: '2025-06', value: 900000 },
      { date: '2026-08', value: 920000 }
    ],
    radarStats: {
      finishing: 95,
      playmaking: 85,
      pace: 96,
      physique: 82,
      defense: 50,
      international: 94
    },
    seasonStats: [
      { season: '2025/2026', competition: 'NWSL', matches: 21, goals: 15, assists: 8, minutes: 1790, yellowCards: 1, redCards: 0, rating: 8.7 }
    ],
    transfers: [
      { date: '2020-01-16', fromClub: 'Stanford Cardinal', toClub: 'Portland Thorns', type: 'NWSL College Draft #1', fee: '-' }
    ],
    palmares: [
      "Médaillée d'or Jeux Olympiques Paris 2024",
      "NWSL MVP & Soulier d'or (2022)",
      'Championne NWSL (2022)'
    ],
    injuryHistory: 'Légère lésion ligamentaire en 2023 (6 semaines)',
    socialFollowers: '850k',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
    featured: true,
    trending: '+15%'
  },
  {
    id: 'lauren-james',
    name: 'Lauren James',
    shortName: 'L. James',
    nationality: 'Angleterre',
    countryCode: 'GB',
    confed: 'UEFA',
    dob: '2001-09-29',
    age: 24,
    position: 'FW',
    positionDetail: 'Ailière / Milieu offensive',
    preferredFoot: 'right',
    height: 175,
    weight: 68,
    clubId: 'chelsea-fcw',
    clubName: 'Chelsea FC Women',
    contractUntil: '2027-06-30',
    agent: 'ROCNATION Sports',
    nationalTeam: 'Angleterre',
    caps: 32,
    internationalGoals: 12,
    marketValueEur: 850000,
    marketValueHistory: [
      { date: '2022-06', value: 200000 },
      { date: '2023-06', value: 450000 },
      { date: '2024-06', value: 720000 },
      { date: '2025-06', value: 800000 },
      { date: '2026-08', value: 850000 }
    ],
    radarStats: {
      finishing: 91,
      playmaking: 92,
      pace: 89,
      physique: 94,
      defense: 48,
      international: 90
    },
    seasonStats: [
      { season: '2025/2026', competition: 'Barclays WSL', matches: 19, goals: 14, assists: 9, minutes: 1520, yellowCards: 2, redCards: 0, rating: 8.8 }
    ],
    transfers: [
      { date: '2021-07-23', fromClub: 'Manchester United', toClub: 'Chelsea FCW', type: 'Transfert', fee: '200,000 £' }
    ],
    palmares: [
      "Championne d'Angleterre WSL (2022, 2023, 2024, 2025)",
      'PFA Young Player of the Year',
      'Finaliste Coupe du Monde FIFA 2023'
    ],
    injuryHistory: 'Quelques pépins musculaires aux ischio-jambiers',
    socialFollowers: '1.2M',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
    featured: true,
    trending: '+20%'
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Barbra Banda et Tabitha Chawinga : les stars africaines qui redéfinissent le marché mondial',
    date: '2026-08-20',
    category: 'ANALYSE DATA',
    tagKey: 'news_tag_analysis',
    readTime: '4 min',
    author: 'Équipe Performia Digital & Alma 2019',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    summary: "Avec des valorisations records franchissant le seuil des 800k€ et des transferts historiques en NWSL et D1, les joueuses issues de la CAF s'imposent comme les moteurs de croissance majeurs du football féminin.",
    content: "L'essor du football féminin mondial connaît une accélération spectaculaire portée par des talents exceptionnels venus du continent africain. Barbra Banda (Orlando Pride / Zambie) et Tabitha Chawinga (Olympique Lyonnais / Malawi) incarnent cette révolution. Leurs performances athlétiques et statistiques hors normes attirent désormais les plus grands investissements des franchises américaines et européennes.\n\nL'algorithme NextGen Women's Football met en lumière un taux de valorisation en progression de +25% sur les deux dernières saisons pour les pépites du continent, confirmant l'urgence pour les cellules de recrutement d'intensifier le scouting dans les championnats régionaux et la CAF Women's Champions League."
  },
  {
    id: 'news-2',
    title: 'Mercato Record : Analyse du transfert historique en NWSL et projection des valeurs 2026/2027',
    date: '2026-08-15',
    category: 'MERCATO',
    tagKey: 'news_tag_transfer',
    readTime: '3 min',
    author: 'Scouting Desk NextGen',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop&q=80',
    summary: "Les montants d'indemnités de transfert dans le football féminin ont triplé en trois ans. Découvrez l'analyse financière et les projections de NextGen.",
    content: "La barrière symbolique du million d'euros pour une transaction en football féminin est sur le point d'être franchie régulièrement. Entre l'augmentation des droits TV de la Barclays WSL et de la NWSL et l'arrivée de fonds souverains, les valorisations des 50 meilleures joueuses mondiales atteignent un volume cumulé inédit."
  },
  {
    id: 'news-3',
    title: 'Interview Alma 2019 : "Comment la valorisation objective transforme la carrière des joueuses"',
    date: '2026-08-08',
    category: 'INTERVIEW',
    tagKey: 'news_tag_interview',
    readTime: '5 min',
    author: 'Rédaction NextGen Yaoundé',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80',
    summary: "L'agence Alma 2019 partage sa vision sur l'importance d'un indice de valeur marchande crédible, indépendant et transparent pour négocier des contrats justes.",
    content: "Dans cet entretien exclusif, les dirigeants d'Alma 2019 reviennent sur la genèse du projet NextGen Women's Football et la nécessité de professionnaliser la représentation sportive avec des données certifiées et opposables aux clubs employeurs."
  }
];

export function getAllPlayers(): Player[] {
  return PLAYERS;
}

export function getPlayerById(id: string): Player | undefined {
  const players = getAllPlayers();
  return players.find((p) => p.id === id);
}

export function getAllClubs(): Club[] {
  return CLUBS;
}

export function savePlayersToLocalStorage(players: Player[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nextgen_custom_players', JSON.stringify(players));
  }
}

export function saveClubsToLocalStorage(clubs: Club[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nextgen_custom_clubs', JSON.stringify(clubs));
  }
}

export function getAllLeagues(): League[] {
  return LEAGUES;
}

export function getAllNews(): NewsArticle[] {
  return NEWS_ARTICLES;
}
