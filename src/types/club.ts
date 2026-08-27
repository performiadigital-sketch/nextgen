import { Confederation } from './player';

export interface League {
  id: string;
  name: string;
  country: string;
  confed: Confederation;
  tierCoefficient: number;
}

export interface Club {
  id: string;
  name: string;
  country: string;
  leagueId: string;
  confed: Confederation;
  logo: string;
}
