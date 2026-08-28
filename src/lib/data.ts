import { Player } from '@/types/player';
import { Club, League } from '@/types/club';
import { NewsArticle } from '@/types/news';

export const LEAGUES: League[] = [
  { id: 'guinness-super-league', name: 'Guinness Super League', country: 'Cameroun', confed: 'CAF', tierCoefficient: 1.0 },
  { id: 'liga-f', name: 'Liga F', country: 'Espagne', confed: 'UEFA', tierCoefficient: 1.25 },
  { id: 'segunda-federacion', name: 'Segunda Federación Femenina', country: 'Espagne', confed: 'UEFA', tierCoefficient: 1.10 },
  { id: 'tercera-federacion', name: '3ª Federación Femenina', country: 'Espagne', confed: 'UEFA', tierCoefficient: 1.02 },
  { id: 'caf-wcl', name: "CAF Women's Champions League", country: 'Afrique', confed: 'CAF', tierCoefficient: 1.15 }
];

export const CLUBS: Club[] = [
  { id: 'real-madrid-b', name: 'Real Madrid CF (équipe B)', country: 'Espagne', leagueId: 'segunda-federacion', confed: 'UEFA', logo: '👑' },
  { id: 'real-oviedo-fem', name: 'Real Oviedo Femenino', country: 'Espagne', leagueId: 'segunda-federacion', confed: 'UEFA', logo: '🔵' },
  { id: 'fc-ebolowa', name: 'FC Ebolowa', country: 'Cameroun', leagueId: 'guinness-super-league', confed: 'CAF', logo: '⭐' },
  { id: 'rayo-vallecano-fem', name: 'Rayo Vallecano Femenino', country: 'Espagne', leagueId: 'segunda-federacion', confed: 'UEFA', logo: '⚡' },
  { id: 'cd-getafe-fem', name: 'CD Getafe Femenino', country: 'Espagne', leagueId: 'segunda-federacion', confed: 'UEFA', logo: '🔵' },
  { id: 'gijon-ff', name: 'Gijón FF', country: 'Espagne', leagueId: 'tercera-federacion', confed: 'UEFA', logo: '🔴' }
];

export const PLAYERS: Player[] = [
  {
    id: 'achta-toko-njoya',
    name: 'Achta Toko Njoya',
    shortName: 'A. Toko Njoya',
    nationality: 'Cameroun',
    countryCode: 'CM',
    confed: 'CAF',
    dob: '2005-07-08',
    age: 21,
    position: 'MF',
    positionDetail: 'Milieu défensif / récupératrice',
    preferredFoot: 'right',
    height: 165,
    weight: 61,
    clubId: 'real-madrid-b',
    clubName: 'Real Madrid CF (équipe B)',
    contractUntil: '2027-06-30',
    agent: 'ALMA 2019',
    nationalTeam: 'Cameroun (Lionnes Indomptables)',
    caps: 18,
    internationalGoals: 2,
    marketValueEur: 150000,
    marketValueHistory: [
      { date: '2023-06', value: 35000 },
      { date: '2024-06', value: 75000 },
      { date: '2025-06', value: 110000 },
      { date: '2026-08', value: 150000 }
    ],
    radarStats: {
      finishing: 65,
      playmaking: 84,
      pace: 82,
      physique: 88,
      defense: 89,
      international: 85
    },
    seasonStats: [
      { season: '2025/2026', competition: 'Segunda Federación', matches: 22, goals: 3, assists: 6, minutes: 1850, yellowCards: 3, redCards: 0, rating: 8.4 },
      { season: '2026', competition: 'CAN Féminine 2026 (Maroc)', matches: 6, goals: 1, assists: 2, minutes: 540, yellowCards: 1, redCards: 0, rating: 8.7 }
    ],
    transfers: [
      { date: '2025-07-01', fromClub: 'CD Getafe Femenino', toClub: 'Real Madrid CF (équipe B)', type: 'Transfert', fee: '50,000 €' },
      { date: '2023-08-15', fromClub: "Eclair de Sa'a", toClub: 'CD Getafe Femenino', type: 'Transfert', fee: 'Gratuit' }
    ],
    palmares: [
      "Championne d'Afrique (CAN Féminine Maroc 2026)",
      "Révélation jeune joueuse Segunda Federación (2024/2025)",
      "Vainqueur Coupe du Cameroun avec Eclair de Sa'a"
    ],
    injuryHistory: 'Aucune blessure majeure répertoriée - Indice physique optimal',
    socialFollowers: '45k',
    photoUrl: 'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/Achta%20Toko.jpg',
    featured: true,
    trending: '+36%',
    biography: "Née le 8 juillet 2005, Achta Toko Njoya est une milieu de terrain camerounaise formée à Eclair Football Filles de Sa'a. Repérée grâce au partenariat entre son club formateur et le CD Getafe Femenino, elle rejoint l'Espagne en 2023 et s'impose en Segunda Federación avant d'être transférée au Real Madrid CF en 2025. Internationale camerounaise, elle fait partie du groupe sacré champion d'Afrique lors de la CAN Féminine 2026 et incarne la nouvelle génération de la Guinness Super League exportée en Europe.",
    photoGallery: [
      'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/Achta%20Toko.jpg'
    ],
    videoGallery: [
      {
        title: "Highlights et récupérations - Achta Toko Njoya",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 'raissa-mbappe-etoundi',
    name: 'Raïssa Mbappé Etoundi',
    shortName: 'R. Mbappé Etoundi',
    nationality: 'Cameroun',
    countryCode: 'CM',
    confed: 'CAF',
    dob: '1993-10-04',
    age: 32,
    position: 'FW',
    positionDetail: 'Avant-centre / Ailière',
    preferredFoot: 'right',
    height: 170,
    weight: 63,
    clubId: 'real-oviedo-fem',
    clubName: 'Real Oviedo Femenino',
    contractUntil: '2026-06-30',
    agent: 'ALMA 2019',
    nationalTeam: 'Cameroun (Lionnes Indomptables)',
    caps: 25,
    internationalGoals: 10,
    marketValueEur: 80000,
    marketValueHistory: [
      { date: '2023-06', value: 95000 },
      { date: '2024-06', value: 90000 },
      { date: '2025-06', value: 85000 },
      { date: '2026-08', value: 80000 }
    ],
    radarStats: {
      finishing: 88,
      playmaking: 76,
      pace: 85,
      physique: 80,
      defense: 45,
      international: 88
    },
    seasonStats: [
      { season: '2025/2026', competition: 'Segunda Federación', matches: 24, goals: 14, assists: 5, minutes: 1920, yellowCards: 2, redCards: 0, rating: 8.2 },
      { season: '2024/2025', competition: 'Primera RFEF (Alhama)', matches: 22, goals: 11, assists: 4, minutes: 1740, yellowCards: 1, redCards: 0, rating: 8.0 }
    ],
    transfers: [
      { date: '2025-07-01', fromClub: 'CF Alhama', toClub: 'Real Oviedo Femenino', type: 'Transfert', fee: 'Libre' },
      { date: '2024-01-10', fromClub: 'CD Getafe Femenino', toClub: 'CF Alhama', type: 'Transfert', fee: '25,000 €' },
      { date: '2022-08-01', fromClub: 'Étoile Rouge de Belgrade', toClub: 'CD Getafe Femenino', type: 'Transfert', fee: 'Gratuit' }
    ],
    palmares: [
      "Montée en Primera RFEF avec le CD Getafe (19 buts inscrits)",
      "Ascension en Liga F avec le CF Alhama",
      "Internationale majeure Lionnes Indomptables (10 buts)"
    ],
    injuryHistory: 'Bonne régularité athlétique - aucun antécédent ligamentaire',
    socialFollowers: '68k',
    photoUrl: 'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/RaissaMbappe.jpg',
    featured: true,
    trending: '+12%',
    biography: "Née le 4 octobre 1993 à Yaoundé, Raïssa Mbappé Etoundi est une attaquante camerounaise à la carrière internationale riche : Étoile Rouge de Belgrade, Getafe (où elle inscrit 19 buts et participe à la montée en Primera RFEF) puis CF Alhama, avec qui elle obtient l'ascension en Liga F. Depuis l'été 2025, elle évolue au Real Oviedo Femenino. Rapide et clinique devant le but, elle reste une référence de l'attaque des Lionnes Indomptables.",
    photoGallery: [
      'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/RaissaMbappe.jpg'
    ],
    videoGallery: [
      {
        title: "Ses 19 buts avec le CD Getafe Femenino",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 'lewijo-mogai',
    name: 'Lewijo Mogaï',
    shortName: 'L. Mogaï',
    nationality: 'Cameroun',
    countryCode: 'CM',
    confed: 'CAF',
    dob: '2002-04-14',
    age: 24,
    position: 'DF',
    positionDetail: 'Défenseure centrale',
    preferredFoot: 'right',
    height: 172,
    weight: 66,
    clubId: 'fc-ebolowa',
    clubName: 'FC Ebolowa',
    contractUntil: '2027-06-30',
    agent: 'ALMA 2020',
    nationalTeam: 'Cameroun (Lionnes Indomptables)',
    caps: 20,
    internationalGoals: 1,
    marketValueEur: 60000,
    marketValueHistory: [
      { date: '2023-06', value: 15000 },
      { date: '2024-06', value: 30000 },
      { date: '2025-06', value: 45000 },
      { date: '2026-08', value: 60000 }
    ],
    radarStats: {
      finishing: 42,
      playmaking: 68,
      pace: 78,
      physique: 92,
      defense: 93,
      international: 86
    },
    seasonStats: [
      { season: '2025/2026', competition: 'Guinness Super League', matches: 20, goals: 2, cleanSheets: 12, minutes: 1800, yellowCards: 2, redCards: 0, rating: 8.5 },
      { season: '2026', competition: 'CAN Féminine 2026 (Maroc)', matches: 6, goals: 1, cleanSheets: 4, minutes: 540, yellowCards: 1, redCards: 0, rating: 8.8 }
    ],
    transfers: [
      { date: '2024-01-01', fromClub: 'Louves Minproff', toClub: 'FC Ebolowa', type: 'Transfert', fee: 'Local' }
    ],
    palmares: [
      "Championne d'Afrique (CAN Féminine Maroc 2026)",
      "Meilleure défenseure de Guinness Super League (2025)",
      "Championne du Cameroun avec FC Ebolowa"
    ],
    injuryHistory: 'Excellente condition physique - 100% de titularisations en 2025/2026',
    socialFollowers: '28k',
    photoUrl: 'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/lewijo.jpg',
    featured: true,
    trending: '+33%',
    biography: "Lewijo Mogaï évolue au poste de défenseure centrale pour le FC Ebolowa sur le plan national et pour les Lionnes Indomptables du Cameroun sur la scène continentale. Titulaire en charnière centrale, elle fait partie du groupe camerounais sacré champion d'Afrique lors de la CAN Féminine 2026 organisée au Maroc, un accueil triomphal lui ayant été réservé à son retour à Yaoundé aux côtés de ses coéquipières.",
    photoGallery: [
      'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/lewijo.jpg'
    ],
    videoGallery: [
      {
        title: "Interventions défensives clés - CAN Féminine 2026",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 'ruth-bella-brunda',
    name: 'Bella Brunda',
    shortName: 'R. Bella Brunda',
    nationality: 'Cameroun',
    countryCode: 'CM',
    confed: 'CAF',
    dob: '2004-02-18',
    age: 22,
    position: 'MF',
    positionDetail: 'Milieu relayeuse',
    preferredFoot: 'right',
    height: 165,
    weight: 59,
    clubId: 'rayo-vallecano-fem',
    clubName: 'Rayo Vallecano Femenino',
    contractUntil: '2027-06-30',
    agent: 'ALMA 2019',
    nationalTeam: 'Cameroun (espoirs)',
    caps: 3,
    internationalGoals: 0,
    marketValueEur: 20000,
    marketValueHistory: [
      { date: '2024-06', value: 8000 },
      { date: '2025-06', value: 14000 },
      { date: '2026-08', value: 20000 }
    ],
    radarStats: {
      finishing: 68,
      playmaking: 80,
      pace: 84,
      physique: 75,
      defense: 66,
      international: 62
    },
    seasonStats: [
      { season: '2025/2026', competition: 'Segunda Federación', matches: 18, goals: 4, assists: 5, minutes: 1420, yellowCards: 1, redCards: 0, rating: 7.8 },
      { season: '2024/2025', competition: '4ª División (PM Friol)', matches: 24, goals: 7, assists: 6, minutes: 1980, yellowCards: 0, redCards: 0, rating: 8.1 }
    ],
    transfers: [
      { date: '2025-07-01', fromClub: 'PM Friol', toClub: 'Rayo Vallecano Femenino', type: 'Transfert', fee: 'Gratuit' },
      { date: '2024-01-15', fromClub: 'AS Fortuna Filles', toClub: 'PM Friol', type: 'Transfert', fee: 'Gratuit' }
    ],
    palmares: [
      "Révélation offensive PM Friol (7 buts, 6 passes décisives)",
      "Sélectionnée Cameroun U23 / Espoirs"
    ],
    injuryHistory: 'Aucune blessure notable',
    socialFollowers: '15k',
    photoUrl: 'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/Brunda%20bella.jpg',
    featured: false,
    trending: '+42%',
    biography: "Ruth Bella Brunda a débuté sa carrière au Cameroun avec l'AS Fortuna Filles avant de s'envoler pour l'Espagne. Après un passage remarqué en quatrième division avec PM Friol (7 buts, 6 passes décisives), la milieu de terrain camerounaise franchit un palier en signant avec le Rayo Vallecano Femenino en troisième division espagnole, confirmant la progression continue des jeunes talents camerounais en Europe.",
    photoGallery: [
      'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/Brunda%20bella.jpg'
    ],
    videoGallery: [
      {
        title: "Buts et passes décisives avec PM Friol",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 'eliane-manbolamo',
    name: 'Eliane Manbolamo',
    shortName: 'E. Manbolamo',
    nationality: 'Cameroun',
    countryCode: 'CM',
    confed: 'CAF',
    dob: '1991-07-03',
    age: 35,
    position: 'DF',
    positionDetail: 'Défenseure centrale / Milieu défensif',
    preferredFoot: 'right',
    height: 178,
    weight: 71,
    clubId: 'cd-getafe-fem',
    clubName: 'CD Getafe Femenino',
    contractUntil: '2027-06-30',
    agent: 'ALMA 2019',
    nationalTeam: 'Cameroun (Lionnes Indomptables)',
    caps: 1,
    internationalGoals: 0,
    marketValueEur: 35000,
    marketValueHistory: [
      { date: '2023-06', value: 45000 },
      { date: '2024-06', value: 40000 },
      { date: '2025-06', value: 38000 },
      { date: '2026-08', value: 35000 }
    ],
    radarStats: {
      finishing: 45,
      playmaking: 72,
      pace: 68,
      physique: 90,
      defense: 88,
      international: 70
    },
    seasonStats: [
      { season: '2025/2026', competition: 'Segunda Federación', matches: 21, goals: 1, assists: 2, minutes: 1750, yellowCards: 4, redCards: 0, rating: 7.9 }
    ],
    transfers: [
      { date: '2026-07-01', fromClub: 'CD Argual', toClub: 'CD Getafe Femenino', type: 'Transfert', fee: 'Libre' },
      { date: '2025-01-01', fromClub: 'Odisha FC', toClub: 'CD Argual', type: 'Transfert', fee: 'Libre' },
      { date: '2023-08-01', fromClub: 'CD Juan Grande', toClub: 'CD Getafe Femenino', type: 'Transfert', fee: 'Libre' },
      { date: '2020-07-01', fromClub: 'Extremadura UD', toClub: 'CD Juan Grande', type: 'Transfert', fee: 'Libre' }
    ],
    palmares: [
      "Vaste expérience européenne et internationale (Extremadura, Juan Grande, Getafe, Odisha FC)",
      "Sélectionnée avec les Lionnes Indomptables"
    ],
    injuryHistory: 'Excellente longévité athlétique, profil robuste',
    socialFollowers: '19k',
    photoUrl: 'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/Eliane.jpg',
    featured: false,
    trending: '-5%',
    biography: "Née le 3 juillet 1991 à Yaoundé, Éliane Manbolamo Bodolo est une défenseure centrale internationale camerounaise à la solide expérience espagnole : Extremadura UD, CD Juan Grande, CD Getafe Femenino, un passage en Inde à l'Odisha FC, puis CD Argual. En juillet 2026, elle retrouve les couleurs azulones du Getafe Femenino, club où elle avait déjà évolué aux côtés de sa compatriote Raïssa Mbappé.",
    photoGallery: [
      'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/Eliane.jpg'
    ],
    videoGallery: [
      {
        title: "Leadership défensif et relances - Éliane Manbolamo",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    id: 'ariadna-gonzalez',
    name: 'Ariadna Gonzalez',
    shortName: 'A. González',
    nationality: 'Espagne',
    countryCode: 'ES',
    confed: 'UEFA',
    dob: '2002-09-12',
    age: 24,
    position: 'FW',
    positionDetail: 'Avant-centre',
    preferredFoot: 'right',
    height: 165,
    weight: 58,
    clubId: 'gijon-ff',
    clubName: 'Gijón FF',
    contractUntil: '2027-06-30',
    agent: 'ALMA 2019',
    nationalTeam: 'Non convoquée',
    caps: 0,
    internationalGoals: 0,
    marketValueEur: 15000,
    marketValueHistory: [
      { date: '2024-06', value: 8000 },
      { date: '2025-06', value: 11000 },
      { date: '2026-08', value: 15000 }
    ],
    radarStats: {
      finishing: 78,
      playmaking: 70,
      pace: 80,
      physique: 68,
      defense: 38,
      international: 40
    },
    seasonStats: [
      { season: '2025/2026', competition: '3ª Federación (Groupe II)', matches: 20, goals: 9, assists: 3, minutes: 1620, yellowCards: 1, redCards: 0, rating: 7.7 }
    ],
    transfers: [
      { date: '2024-07-01', fromClub: 'Asturies Formation', toClub: 'Gijón FF', type: 'Premier Contrat', fee: 'Gratuit' }
    ],
    palmares: [
      "Buteuse technique en 3ª Federación (Groupe II)",
      "Espoir du football asturien sous mandat Alma 2019"
    ],
    injuryHistory: 'Aucune blessure',
    socialFollowers: '12k',
    photoUrl: 'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/Arianda.jpg',
    featured: false,
    trending: '+15%',
    biography: "Ariadna González Canteli est une attaquante espagnole évoluant au Gijón FF, en 3ª Federación (Groupe II). Buteuse technique formée dans les Asturies, elle poursuit sa progression dans le football féminin régional avec l'ambition de gravir les échelons du football espagnol.",
    photoGallery: [
      'https://ontntkqfyotzfqvhzxhl.supabase.co/storage/v1/object/public/nextmedia/Arianda.jpg'
    ],
    videoGallery: [
      {
        title: "Finitions et buts en 3ª Federación - Ariadna González",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&auto=format&fit=crop&q=80"
      }
    ]
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Achta Toko Njoya et la filière espagnole : les pépites Alma 2019 à la conquête de l’Europe',
    date: '2026-08-20',
    category: 'ANALYSE DATA',
    tagKey: 'news_tag_analysis',
    readTime: '4 min',
    author: 'NextGen Data Desk',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    summary: "Avec son sacre à la CAN 2026 et son arrivée au Real Madrid B, Achta Toko Njoya symbolise l'ascension fulgurante des talents camerounais valorisés par NextGen.",
    content: "L'essor du football féminin africain s'accélère grâce à la passerelle développée entre le Cameroun et l'Espagne. Formée à Eclair de Sa'a et passée par Getafe, Achta Toko Njoya incarne cette réussite au Real Madrid B. Avec Raïssa Mbappé (Oviedo), Lewijo Mogaï (FC Ebolowa) et Ruth Bella Brunda (Rayo Vallecano), l'agence Alma 2019 structure un vivier d'excellence reconnu à l'international."
  },
  {
    id: 'news-2',
    title: 'CAN Féminine 2026 : Le triomphe des Lionnes Indomptables booste leur valeur marchande',
    date: '2026-08-15',
    category: 'MERCATO',
    tagKey: 'news_tag_transfer',
    readTime: '3 min',
    author: 'Scouting Desk NextGen',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800&auto=format&fit=crop&q=80',
    summary: "Le titre continental remporté au Maroc génère une hausse moyenne de +35% sur la cotation des championnes camerounaises.",
    content: "La victoire finale des Lionnes Indomptables lors de la CAN Féminine 2026 a attiré l'attention des plus grands recruteurs européens. Des joueuses comme Lewijo Mogaï et Achta Toko Njoya voient leur indice de valeur marchande franchir de nouveaux paliers grâce à leurs performances défensives décisives."
  },
  {
    id: 'news-3',
    title: 'Interview Alma 2019 : "Valoriser objectivement le talent africain et hispanique"',
    date: '2026-08-08',
    category: 'INTERVIEW',
    tagKey: 'news_tag_interview',
    readTime: '5 min',
    author: 'Rédaction NextGen International',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80',
    summary: "L'agence Alma 2019 partage sa vision sur l'importance d'un indice de valeur marchande transparent et certifié pour négocier des contrats justes.",
    content: "Dans cet entretien exclusif, les dirigeants d'Alma 2019 reviennent sur l'intégration de la technologie NextGen Women's Football pour accompagner le plan de carrière des joueuses camerounaises et espagnoles sous mandat officiel."
  }
];

export function getAllPlayers(): Player[] {
  return PLAYERS;
}

export function getStoredPlayers(): Player[] {
  if (typeof window === 'undefined') return PLAYERS;
  try {
    const stored = localStorage.getItem('nextgen_custom_players_v3');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed.some(p => p.photoUrl && p.photoUrl.includes('supabase.co'))) {
        return parsed;
      }
    }
    // Clean old caches
    localStorage.removeItem('nextgen_custom_players');
    localStorage.removeItem('nextgen_custom_players_v2');
    localStorage.setItem('nextgen_custom_players_v3', JSON.stringify(PLAYERS));
  } catch (e) {
    console.error(e);
  }
  return PLAYERS;
}

export function getPlayerById(id: string): Player | undefined {
  const players = typeof window !== 'undefined' ? getStoredPlayers() : getAllPlayers();
  return players.find((p) => p.id === id) || PLAYERS.find((p) => p.id === id);
}

export function getAllClubs(): Club[] {
  return CLUBS;
}

export function getStoredClubs(): Club[] {
  if (typeof window === 'undefined') return CLUBS;
  try {
    const stored = localStorage.getItem('nextgen_custom_clubs_v2');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed.some(c => c.id === 'real-madrid-b')) {
        return parsed;
      }
    }
    localStorage.removeItem('nextgen_custom_clubs');
    localStorage.setItem('nextgen_custom_clubs_v2', JSON.stringify(CLUBS));
  } catch (e) {
    console.error(e);
  }
  return CLUBS;
}

export function savePlayersToLocalStorage(players: Player[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nextgen_custom_players_v3', JSON.stringify(players));
    localStorage.removeItem('nextgen_custom_players');
    localStorage.removeItem('nextgen_custom_players_v2');
  }
}

export function saveClubsToLocalStorage(clubs: Club[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nextgen_custom_clubs_v2', JSON.stringify(clubs));
    localStorage.removeItem('nextgen_custom_clubs');
  }
}

export function getAllLeagues(): League[] {
  return LEAGUES;
}

export function getAllNews(): NewsArticle[] {
  return NEWS_ARTICLES;
}
