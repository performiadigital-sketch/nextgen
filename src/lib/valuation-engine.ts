import { Player } from '@/types/player';
import { ValuationWeights, FactorScores, ValuationEvaluationResult } from '@/types/valuation';

export const DEFAULT_WEIGHTS: ValuationWeights = {
  performance: 30,
  agePotential: 20,
  leagueClub: 15,
  international: 15,
  contract: 10,
  mediaBrand: 5,
  injuryRisk: 5,
};

export function evaluateFactors(player: Player): FactorScores {
  // 1. Performance Factor (0 - 100)
  let perfScore = 50;
  if (player.radarStats) {
    const avgRadar = (player.radarStats.finishing + player.radarStats.playmaking + (player.radarStats.defense || 50)) / 3;
    perfScore = Math.min(100, Math.max(30, avgRadar));
  }
  if (player.seasonStats && player.seasonStats.length > 0) {
    const latest = player.seasonStats[0];
    const ratingBonus = latest.rating ? (latest.rating - 7.0) * 15 : 0;
    const goalContribBonus = (latest.goals || 0) * 1.5 + (latest.assists || 0) * 1.2 + (latest.cleanSheets || 0) * 2.0;
    perfScore = Math.min(100, Math.max(20, perfScore * 0.6 + (ratingBonus + goalContribBonus) * 0.4 + 25));
  }

  // 2. Age & Potential Factor (0 - 100)
  let ageScore = 50;
  const age = player.age || 25;
  if (age <= 21) {
    ageScore = 96;
  } else if (age <= 24) {
    ageScore = 92;
  } else if (age <= 27) {
    ageScore = 88;
  } else if (age <= 29) {
    ageScore = 78;
  } else if (age <= 32) {
    ageScore = 65;
  } else {
    ageScore = Math.max(35, 60 - (age - 32) * 5);
  }

  // 3. League & Club Competitiveness (0 - 100)
  let leagueScore = 65;
  if (player.clubId) {
    const clubId = player.clubId;
    if (clubId === 'fc-barcelona' || clubId === 'olympique-lyonnais' || clubId === 'chelsea-fcw') {
      leagueScore = 98;
    } else if (clubId === 'orlando-pride' || clubId === 'portland-thorns' || clubId === 'real-madrid-fem' || clubId === 'man-city-wfc' || clubId === 'psg-fem') {
      leagueScore = 90;
    } else if (clubId === 'bay-fc' || clubId === 'stade-reims') {
      leagueScore = 78;
    } else if (clubId === 'as-far' || clubId === 'mamelodi-sundowns' || clubId === 'al-qadsiah') {
      leagueScore = 72;
    }
  }

  // 4. International Status (0 - 100)
  let intlScore = 50;
  const caps = player.caps || 0;
  const intlGoals = player.internationalGoals || 0;
  if (caps >= 80) intlScore = 98;
  else if (caps >= 50) intlScore = 90;
  else if (caps >= 30) intlScore = 80;
  else if (caps >= 15) intlScore = 68;
  else intlScore = 50 + caps;
  if (intlGoals > 20) intlScore = Math.min(100, intlScore + 5);

  // 5. Contract Remaining Duration (0 - 100)
  let contractScore = 60;
  if (player.contractUntil) {
    const expiryYear = parseInt(player.contractUntil.substring(0, 4), 10);
    const currentYear = 2026;
    const yearsLeft = expiryYear - currentYear;
    if (yearsLeft >= 3) contractScore = 95;
    else if (yearsLeft === 2) contractScore = 80;
    else if (yearsLeft === 1) contractScore = 55;
    else contractScore = 30;
  }

  // 6. Media & Commercial Brand Visibility (0 - 100)
  let mediaScore = 50;
  const followers = player.socialFollowers || '100k';
  if (followers.includes('M')) {
    const millions = parseFloat(followers);
    mediaScore = Math.min(100, 80 + millions * 10);
  } else if (followers.includes('k')) {
    const thousands = parseFloat(followers);
    mediaScore = Math.min(80, 40 + (thousands / 1000) * 40);
  }

  // 7. Injury Risk (0 - 100)
  let injuryScore = 85;
  if (player.injuryHistory) {
    const hist = player.injuryHistory.toLowerCase();
    if (hist.includes('aucune') || hist.includes('faible') || hist.includes('excellente')) {
      injuryScore = 95;
    } else if (hist.includes('genou') || hist.includes('ligament') || hist.includes('arrêt')) {
      injuryScore = 70;
    }
  }

  return {
    performance: Math.round(perfScore),
    agePotential: Math.round(ageScore),
    leagueClub: Math.round(leagueScore),
    international: Math.round(intlScore),
    contract: Math.round(contractScore),
    mediaBrand: Math.round(mediaScore),
    injuryRisk: Math.round(injuryScore),
  };
}

export function calculateCompositeScore(factorScores: FactorScores, weights: ValuationWeights = DEFAULT_WEIGHTS): number {
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0) || 100;
  let sum = 0;
  sum += factorScores.performance * weights.performance;
  sum += factorScores.agePotential * weights.agePotential;
  sum += factorScores.leagueClub * weights.leagueClub;
  sum += factorScores.international * weights.international;
  sum += factorScores.contract * weights.contract;
  sum += factorScores.mediaBrand * weights.mediaBrand;
  sum += factorScores.injuryRisk * weights.injuryRisk;
  return sum / totalWeight;
}

export function scoreToMarketValue(compositeScore: number, player: Player): number {
  const baseMin = 50000;
  const baseMax = 1250000;
  const normalized = Math.max(0, Math.min(100, compositeScore)) / 100;
  const exponentialFactor = Math.pow(normalized, 2.4);
  let estimated = baseMin + (baseMax - baseMin) * exponentialFactor;

  if (player.position === 'FW') estimated *= 1.08;
  if (player.position === 'MF') estimated *= 1.03;
  if (player.position === 'GK') estimated *= 0.88;

  return Math.round(estimated / 5000) * 5000;
}

export function evaluatePlayer(player: Player, customWeights: ValuationWeights = DEFAULT_WEIGHTS): ValuationEvaluationResult {
  const factorScores = evaluateFactors(player);
  const compositeScore = calculateCompositeScore(factorScores, customWeights);
  const estimatedValue = scoreToMarketValue(compositeScore, player);

  return {
    player,
    factorScores,
    compositeScore: Math.round(compositeScore * 10) / 10,
    estimatedValue,
    weightsUsed: customWeights,
  };
}

export interface ScoutOpportunityResult {
  score: number;
  label: string;
  colorClass: string;
  grade: string;
}

export function calculateScoutOpportunity(performanceScore: number, marketValueEur: number): ScoutOpportunityResult {
  // Multiplier: (performanceScore * 10000) / marketValueEur
  const ratio = (performanceScore * 10000) / marketValueEur;
  const scoreVal = Math.round(Math.min(100, Math.max(30, ratio * 100)));

  let label = 'Valeur Cohérente';
  let colorClass = 'text-sky-400';
  let grade = 'B';

  if (scoreVal >= 90) {
    label = 'Opportunité Exceptionnelle (Sous-évaluée)';
    colorClass = 'text-amber-400';
    grade = 'A+';
  } else if (scoreVal >= 80) {
    label = 'Excellente Opportunité (Recrutement Malin)';
    colorClass = 'text-green-400';
    grade = 'A';
  } else if (scoreVal >= 70) {
    label = 'Valeur Marchande Cohérente';
    colorClass = 'text-sky-400';
    grade = 'B';
  } else {
    label = 'Profil Premium / Plus-value Hype';
    colorClass = 'text-purple-400';
    grade = 'C';
  }

  return { score: scoreVal, label, colorClass, grade };
}

export function getPlayerValuationExplanation(playerId: string): string {
  const explanations: Record<string, string> = {
    'barbra-banda': "Valeur marchande très élevée (950k €) liée à son transfert record de 740k $ en NWSL, l'inflation financière américaine et son statut d'icône exclusive en Zambie (CAF).",
    'lauren-james': "Sous-évaluée sportivement (850k €) car son dernier transfert Chelsea remonte à 2021 (200k £). Contrat stable et concurrence de stars à Chelsea bridant temporairement son prix.",
    'aitana-bonmati': "Valorisation maximale (1.1M €) s'expliquant par ses Ballons d'Or 2023-2024 consécutifs, sa domination mondiale absolue avec le FC Barcelone et son levier contractuel.",
    'tabitha-chawinga': "Prix très fort (930k €) justifié par ses titres de meilleure buteuse D1 Arkema, son rôle majeur à Lyon et son exposition internationale continue.",
    'linda-caicedo': "Valorisation élevée (890k €) propulsée par son potentiel U21 (Real Madrid), sa valeur marketing digitale élevée et son rayonnement en Copa América.",
    'melchie-dumornay': "Cote en forte hausse (790k €) portée par ses performances décisives en Ligue des Champions, son jeune âge et son contrat long terme avec Lyon.",
    'ajara-nchout': "Cote modérée (320k €) expliquée par son âge (33 ans), compensée par son statut de légende emblématique des Lionnes du Cameroun et sa présence en Arabie Saoudite.",
    'sophia-smith': "Cote maximale (920k €) s'expliquant par sa médaille d'or aux JO 2024, son titre de MVP de NWSL et son contrat long terme sécurisé jusqu'en 2028.",
    'monique-ngock': "Valeur de 220k € cohérente pour une jeune sentinelle U21 prometteuse du Stade de Reims, représentant une opportunité de plus-value future très élevée."
  };

  return explanations[playerId] || "Valorisation équilibrée calculée selon la grille des 7 facteurs NextGen (Performance, Âge, Contrat, Ligue, Sélections, Risque).";
}

