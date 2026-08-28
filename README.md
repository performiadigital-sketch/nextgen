# NextGen Women's Football — Plateforme Officielle

> **Indice mondial d'évaluation, de suivi statistique et de valorisation des joueuses de football féminin.**  
> Projet développé conformément au cahier des charges fonctionnel et technique (Version 1.0) en partenariat avec le réseau international d'agences et d'experts data certifiés.

---

## 🌟 Identité Visuelle & Logo

Le logo officiel de la marque NextGen Women's Football est intégré au sommet du site web, dans la barre de navigation, le pied de page, ainsi que sur les rapports d'évaluation et de scouting certifiés.

- **Fichier source du logo** : `assets/images/logo.png`
- **Charte chromatique** :
  - **Violet Électrique** : `#7C3AED` / `#8B5CF6` / `#5B21B6`
  - **Vert Néon / Lime** : `#22C55E` / `#84CC16` / `#16A34A`
  - **Dark Data Theme** : `#080C14`, `#0F172A`, `#1E293B`

---

## 🚀 Modules Fonctionnels Implémentés

### 1. Fiches Profils Joueuses Complètes (Module 5.1)
- **Identité complète** : Nom, date et lieu de naissance, âge, taille, poids, poste principal/secondaire, pied fort, club actuel, sélection nationale (sélections & buts).
- **Indice de valeur marchande** : Affichage dynamique de la cotation estimée avec convertisseur temps réel (**EUR €**, **USD $**, **FCFA XAF/XOF**, **GBP £**).
- **Courbe d'évolution historique** : Graphique interactif sur 5 ans (propulsé par *Chart.js*).
- **Statistiques par saison & compétition** : Matchs, buts, passes décisives, clean sheets, cartons, minutes et note de performance moyenne.
- **Historique des transferts** : Dates, clubs de départ/arrivée, type de transaction et montants.
- **Palmarès & Distinctions** : Trophées individuels et collectifs.

### 2. Moteur d'Évaluation de la Valeur Marchande (Module 5.2 — Cœur Différenciant)
L'algorithme propriétaire NextGen repose sur 7 critères objectifs pondérés :
1. **Performance Sportive (30%)** : Stats saisonnières, contribution aux buts/arrêts, régularité.
2. **Âge et Potentiel (20%)** : Courbe exponentielle valorisant la jeunesse (U21) et la maturité (22-28 ans).
3. **Niveau du Championnat & Club (15%)** : Coefficient de compétitivité de la ligue (Liga F, WSL, D1 Arkema, NWSL, CAF WCL, etc.).
4. **Statut International & Sélections (15%)** : Titularisations et impact en Coupe du Monde, CAN Féminine, Euro, JO.
5. **Durée Restante de Contrat (10%)** : Effet de levier contractuel dans les négociations.
6. **Visibilité Médiatique & Image Commerciale (5%)** : Followers réseaux sociaux et attractivité sponsoring.
7. **Historique Médical & Facteur de Risque (5%)** : Indice de disponibilité et de santé athlétique.

> 💡 *Un simulateur interactif permet aux utilisateurs et administrateurs d'ajuster les pondérations pour recalculer instantanément les valeurs de l'ensemble de la base.*

### 3. Moteur de Recherche & Comparateur (Module 5.3)
- **Recherche multicritère instantanée** : Recherche textuelle, filtre par Confédération (**CAF**, **UEFA**, **CONCACAF**, **CONMEBOL**, **AFC**), filtre par poste, tri par valeur, âge, progression.
- **Comparateur de Joueuses (jusqu'à 4 simultanément)** : Affichage d'un diagramme radar comparatif des 6 piliers athlétiques et techniques + tableau matriciel différentiel.

### 4. Module Classements & Tendances (Module 5.4)
- **Top Joueuses mondiales** classées par valeur marchande.
- **Top Clubs mondiaux** classés par valeur totale de l'effectif et valeur moyenne par joueuse.
- **Top Progressions** : Joueuses enregistrant la plus forte hausse de valeur.

### 5. Espaces Utilisateurs & Rôles Métiers (Modules 4.0, 5.5 & 5.7)
- 🛡️ **Club & Recruteur** : Gestion de listes de suivi privées (*Watchlist*), saisie de notes techniques et **exportation de rapports de scouting PDF prêts à imprimer**.
- 💼 **Agent de Joueuses** : Gestion du portefeuille de joueuses représentées (notamment sous mandat *Alma 2019*), suivi des échéances contractuelles et génération de fiches mandat.
- 📰 **Média & Presse** : Kits de données certifiées et générateur automatique de citations statistiques conformes pour les rédactions.
- 👤 **Fan / Public** : Consultation libre, mise en favoris, analyse des statistiques.
- ⚙️ **Back-Office Administrateur** : Dashboard KPI, gestion CRUD de la base de données, gouvernance et calibration de l'algorithme.

### 6. Actualités & Mercato (Module 5.6)
- Fil d'actualités dédié aux transferts, analyses de données et interviews exclusives.

---

## 🛠️ Structure du Projet

```
nextgen/
├── index.html                  # Application Single Page interactive & responsive
├── assets/
│   └── images/
│       └── logo.png            # Logo officiel NextGen Women's Football
├── css/
│   └── styles.css              # Design system violet/vert néon, responsive & print
├── js/
│   ├── app.js                  # Routeur principal et contrôleur de vues
│   ├── comparison.js           # Comparateur multi-joueuses & diagramme radar
│   ├── currency.js             # Convertisseur multidevises (EUR, USD, FCFA, GBP)
│   ├── data.js                 # Base de données internationale de joueuses & clubs
│   ├── i18n.js                 # Moteur bilingue Français (FR) / Anglais (EN)
│   ├── scout-report.js         # Générateur de rapports de scouting PDF
│   ├── user-spaces.js          # Espaces Recruteurs, Agents, Presse & Back-Office
│   └── valuation-engine.js     # Algorithme mathématique d'évaluation de valeur marchande
└── README.md                   # Documentation complète du projet
```

---

## 💻 Comment lancer et utiliser la plateforme

1. Ouvrez simplement le fichier `index.html` dans n'importe quel navigateur moderne (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Pour tester les différents modules :
   - Changez la devise dans l'en-tête (**FCFA**, **EUR**, **USD**, **GBP**).
   - Changez la langue (**FR** / **EN**).
   - Basculez entre les profils métiers (**Recruteur**, **Agent**, **Presse**, **Admin**) dans le sélecteur d'espace pro.
   - Cliquez sur une joueuse pour ouvrir sa fiche détaillée et son graphique d'historique.
   - Cliquez sur **"Rapport Scout PDF"** pour générer et imprimer le dossier officiel.

---

*Document préparé et réalisé pour NextGen Women's Football.*
