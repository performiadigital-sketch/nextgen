import { Player } from './player';

export interface ValuationWeights {
  performance: number;   // default 30%
  agePotential: number;  // default 20%
  leagueClub: number;    // default 15%
  international: number; // default 15%
  contract: number;      // default 10%
  mediaBrand: number;    // default 5%
  injuryRisk: number;    // default 5%
}

export interface FactorScores {
  performance: number;
  agePotential: number;
  leagueClub: number;
  international: number;
  contract: number;
  mediaBrand: number;
  injuryRisk: number;
}

export interface ValuationEvaluationResult {
  player: Player;
  factorScores: FactorScores;
  compositeScore: number;
  estimatedValue: number;
  weightsUsed: ValuationWeights;
}
