export type Language = 'fr' | 'en';

export const DICTIONARY: Record<Language, Record<string, string>> = {
  fr: {
    site_title: "NextGen Women's Football",
    site_tagline: "L'indice de référence mondial du football féminin",
    nav_home: "Accueil",
    nav_players: "Joueuses",
    nav_compare: "Comparateur",
    nav_rankings: "Classements",
    nav_news: "Actualités",
    nav_spaces: "Espaces Pros",
    nav_valuation: "Valeur Marchande & Algo",

    hero_title: "L'Indice Mondial d'Évaluation & de Valorisation des Joueuses de Football",
    hero_desc: "Données statistiques fiables, couverture internationale multi-confédérations (CAF, UEFA, CONCACAF, CONMEBOL, AFC) et algorithme transparent d'estimation de la valeur marchande.",
    hero_btn_explore: "Explorer les Joueuses",
    hero_btn_algo: "Comprendre l'Algorithme",
    hero_stat_players: "Joueuses référencées",
    hero_stat_clubs: "Clubs & Sélections",
    hero_stat_confeds: "Confédérations",
    hero_stat_valuation: "Valeur totale répertoriée",

    search_placeholder: "Rechercher une joueuse, un club, un pays...",
    filter_all_confeds: "Toutes les confédérations",
    filter_all_positions: "Tous les postes",
    view_cards: "Cartes",
    view_table: "Tableau",
    market_value: "Valeur Marchande",
  },
  en: {
    site_title: "NextGen Women's Football",
    site_tagline: "The Global Benchmark for Women's Football Valuation",
    nav_home: "Home",
    nav_players: "Players",
    nav_compare: "Comparison",
    nav_rankings: "Rankings",
    nav_news: "News",
    nav_spaces: "Pro Hubs",
    nav_valuation: "Market Value & Algo",

    hero_title: "The Premier Valuation & Statistical Platform for Women's Football",
    hero_desc: "Reliable stats, international multi-confederation coverage (CAF, UEFA, CONCACAF, CONMEBOL, AFC), and an objective transparent market value estimation algorithm.",
    hero_btn_explore: "Explore Players",
    hero_btn_algo: "Discover Algorithm",
    hero_stat_players: "Indexed Players",
    hero_stat_clubs: "Clubs & National Teams",
    hero_stat_confeds: "Confederations",
    hero_stat_valuation: "Total Tracked Valuation",

    search_placeholder: "Search player, club, country...",
    filter_all_confeds: "All Confederations",
    filter_all_positions: "All Positions",
    view_cards: "Cards",
    view_table: "Table",
    market_value: "Market Value",
  }
};

export function getTranslation(lang: Language, key: string, params: Record<string, string | number> = {}): string {
  const dict = DICTIONARY[lang] || DICTIONARY.fr;
  let text = dict[key] || DICTIONARY.fr[key] || key;
  for (const [pKey, pVal] of Object.entries(params)) {
    text = text.replace(`{${pKey}}`, String(pVal));
  }
  return text;
}
