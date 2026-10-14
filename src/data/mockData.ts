export type TeamLogoKey =
  | 'barcelona'
  | 'united'
  | 'realmadrid'
  | 'bayern'
  | 'chelsea'
  | 'dortmund'
  | 'arsenal'
  | 'psg'
  | 'city'
  | 'liverpool'
  | 'inter'
  | 'milan'
  | 'juventus'
  | 'generic';

export interface PlayerLineupItem {
  number: number;
  name: string;
  pos: 'GK' | 'RB' | 'CB' | 'LB' | 'DM' | 'CM' | 'AM' | 'RW' | 'LW' | 'ST' | 'RM' | 'LM';
  rating: number;
  isCaptain?: boolean;
}

export interface MatchStats {
  possession: { team1: number; team2: number };
  shotsOnTarget: { team1: number; team2: number };
  totalShots: { team1: number; team2: number };
  corners: { team1: number; team2: number };
  fouls: { team1: number; team2: number };
  yellowCards: { team1: number; team2: number };
  xG: { team1: number; team2: number };
  passesCompleted: { team1: string; team2: string };
}

export interface MatchLineup {
  team1Formation: string;
  team2Formation: string;
  team1Coach: string;
  team2Coach: string;
  team1StartingXI: PlayerLineupItem[];
  team2StartingXI: PlayerLineupItem[];
  team1Subs: string[];
  team2Subs: string[];
}

export interface MatchH2H {
  date: string;
  comp: string;
  score: string;
  winner: string;
}

export interface MatchEventTimeline {
  minute: number;
  type: 'goal' | 'card' | 'sub';
  player: string;
  team: 1 | 2;
  detail?: string;
}

export interface Match {
  id: string;
  sport: 'football';
  isLive: boolean;
  minute?: string;
  stage: string;
  leagueCode?: 'CL' | 'PL' | 'ELC' | 'WWQ' | 'PD' | 'SA' | 'BL1' | 'FL1' | string;
  eventTitle: string;
  group: string;
  date: 'Today' | 'Tomorrow' | 'Sat 17 Oct' | 'Sun 18 Oct' | 'Mon 19 Oct' | string;
  time: string;
  venue?: string;
  referee?: string;
  attendance?: string;
  weather?: string;
  bannerImage?: string;
  team1: {
    name: string;
    shortName: string;
    logoType?: TeamLogoKey;
    logoUrl?: string;
    odds: number;
    score?: number;
    form: ('W' | 'D' | 'L')[];
  };
  team2: {
    name: string;
    shortName: string;
    logoType?: TeamLogoKey;
    logoUrl?: string;
    odds: number;
    score?: number;
    form: ('W' | 'D' | 'L')[];
  };
  drawOdds?: number;
  predictionTip?: string;
  winProbabilityTeam1: number;
  winProbabilityTeam2: number;
  drawProbability?: number;
  isFavorite?: boolean;
  stats?: MatchStats;
  lineups?: MatchLineup;
  h2h?: MatchH2H[];
  timeline?: MatchEventTimeline[];
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  expiryDate: string;
  amount: string;
  image: string;
}

export interface BetSlipItem {
  id: string;
  matchId: string;
  matchTitle: string;
  selection: string;
  selectedTeam?: string;
  odds: number;
  stake: number;
}

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: 'promo-1',
    title: 'Free bets of $30',
    subtitle: 'Get Free bets on Premier League & Champions League fixtures',
    buttonText: 'Find out more',
    expiryDate: 'Oct 19, 2026',
    amount: '$30',
    image: '/src/assets/images/soccer_ball_grass_promo_1791827123606.jpg',
  },
  {
    id: 'promo-2',
    title: 'Matchday Boost +25%',
    subtitle: 'Extra payout booster on weekend accumulator bets',
    buttonText: 'Claim Boost',
    expiryDate: 'Weekend Special',
    amount: '+25%',
    image: '/src/assets/images/soccer_ball_grass_promo_1791827123606.jpg',
  },
  {
    id: 'promo-3',
    title: 'VIP Prediction Club',
    subtitle: 'Access 91% accuracy algorithmic match predictions',
    buttonText: 'Unlock VIP',
    expiryDate: 'Ongoing',
    amount: 'VIP',
    image: '/src/assets/images/soccer_ball_grass_promo_1791827123606.jpg',
  },
];

export const MATCHES_DATA: Match[] = [
  // ==========================================
  // PREMIER LEAGUE - OCTOBER 17-19, 2026 FIXTURES
  // ==========================================
  {
    id: 'match-everton-chelsea-oct17',
    sport: 'football',
    isLive: false,
    stage: 'Premier League',
    leagueCode: 'PL',
    eventTitle: 'Everton vs Chelsea',
    group: 'Matchday 8 • October 17',
    date: 'Sat 17 Oct',
    time: '12:30',
    venue: 'Goodison Park, Liverpool',
    referee: 'Michael Oliver (England)',
    attendance: '39,410',
    weather: '12°C, Autumn Morning',
    bannerImage: '/src/assets/images/stadium_match_banner_1791891895353.jpg',
    team1: { name: 'Everton', shortName: 'EVE', logoType: 'generic', logoUrl: 'https://crests.football-data.org/62.png', odds: 3.40, form: ['W', 'D', 'L', 'W', 'D'] },
    team2: { name: 'Chelsea', shortName: 'CHE', logoType: 'chelsea', logoUrl: 'https://crests.football-data.org/61.png', odds: 2.10, form: ['W', 'W', 'D', 'W', 'W'] },
    drawOdds: 3.40,
    predictionTip: 'Chelsea attacking depth to test Everton defensive block',
    winProbabilityTeam1: 28, winProbabilityTeam2: 48, drawProbability: 24,
    stats: { possession: { team1: 44, team2: 56 }, shotsOnTarget: { team1: 4, team2: 7 }, totalShots: { team1: 10, team2: 15 }, corners: { team1: 4, team2: 6 }, fouls: { team1: 13, team2: 11 }, yellowCards: { team1: 2, team2: 1 }, xG: { team1: 1.15, team2: 2.10 }, passesCompleted: { team1: '320 (79%)', team2: '490 (87%)' } },
    lineups: {
      team1Formation: '4-2-3-1', team2Formation: '4-2-3-1', team1Coach: 'Sean Dyche', team2Coach: 'Enzo Maresca',
      team1StartingXI: [
        { number: 1, name: 'Jordan Pickford', pos: 'GK', rating: 7.8, isCaptain: true },
        { number: 2, name: 'Nathan Patterson', pos: 'RB', rating: 7.1 },
        { number: 6, name: 'James Tarkowski', pos: 'CB', rating: 7.6 },
        { number: 32, name: 'Jarrad Branthwaite', pos: 'CB', rating: 7.9 },
        { number: 19, name: 'Vitaliy Mykolenko', pos: 'LB', rating: 7.3 },
        { number: 27, name: 'Idrissa Gueye', pos: 'DM', rating: 7.4 },
        { number: 8, name: 'Orel Mangala', pos: 'CM', rating: 7.2 },
        { number: 11, name: 'Jack Harrison', pos: 'RW', rating: 7.3 },
        { number: 16, name: 'Abdoulaye Doucoure', pos: 'AM', rating: 7.5 },
        { number: 10, name: 'Iliman Ndiaye', pos: 'LW', rating: 7.7 },
        { number: 9, name: 'Dominic Calvert-Lewin', pos: 'ST', rating: 7.8 }
      ],
      team2StartingXI: [
        { number: 1, name: 'Robert Sanchez', pos: 'GK', rating: 7.2 },
        { number: 27, name: 'Malo Gusto', pos: 'RB', rating: 7.4 },
        { number: 29, name: 'Wesley Fofana', pos: 'CB', rating: 7.5 },
        { number: 6, name: 'Levi Colwill', pos: 'CB', rating: 7.6 },
        { number: 3, name: 'Marc Cucurella', pos: 'LB', rating: 7.3 },
        { number: 25, name: 'Moises Caicedo', pos: 'DM', rating: 8.0 },
        { number: 8, name: 'Enzo Fernandez', pos: 'CM', rating: 7.8, isCaptain: true },
        { number: 11, name: 'Noni Madueke', pos: 'RW', rating: 7.6 },
        { number: 20, name: 'Cole Palmer', pos: 'AM', rating: 8.8 },
        { number: 19, name: 'Jadon Sancho', pos: 'LW', rating: 7.7 },
        { number: 15, name: 'Nicolas Jackson', pos: 'ST', rating: 8.1 }
      ],
      team1Subs: ['Joao Virginia (GK)', 'Michael Keane (CB)', 'Ashley Young (RB)', 'Tim Iroegbunam (CM)', 'Dwight McNeil (LW)', 'Beto (ST)', 'Seamus Coleman (RB)'],
      team2Subs: ['Filip Jorgensen (GK)', 'Tosin Adarabioyo (CB)', 'Renato Veiga (LB)', 'Romeo Lavia (DM)', 'Christopher Nkunku (ST)', 'Pedro Neto (RW)', 'Joao Felix (AM)']
    }
  },
  {
    id: 'match-brentford-liverpool-oct17',
    sport: 'football',
    isLive: false,
    stage: 'Premier League',
    leagueCode: 'PL',
    eventTitle: 'Brentford vs Liverpool',
    group: 'Matchday 8 • October 17',
    date: 'Sat 17 Oct',
    time: '15:00',
    venue: 'Gtech Community Stadium, London',
    referee: 'Anthony Taylor (England)',
    attendance: '17,250',
    weather: '13°C, Crisp Autumn',
    team1: { name: 'Brentford', shortName: 'BRE', logoType: 'generic', logoUrl: 'https://crests.football-data.org/402.png', odds: 4.20, form: ['W', 'L', 'W', 'D', 'W'] },
    team2: { name: 'Liverpool', shortName: 'LIV', logoType: 'liverpool', logoUrl: 'https://crests.football-data.org/64.png', odds: 1.72, form: ['W', 'W', 'W', 'W', 'W'] },
    drawOdds: 3.90,
    predictionTip: 'Liverpool high press and Mohamed Salah scoring form',
    winProbabilityTeam1: 22, winProbabilityTeam2: 56, drawProbability: 22,
    stats: { possession: { team1: 38, team2: 62 }, shotsOnTarget: { team1: 3, team2: 8 }, totalShots: { team1: 9, team2: 18 }, corners: { team1: 3, team2: 7 }, fouls: { team1: 11, team2: 9 }, yellowCards: { team1: 2, team2: 1 }, xG: { team1: 0.95, team2: 2.40 }, passesCompleted: { team1: '280 (76%)', team2: '530 (89%)' } },
    lineups: {
      team1Formation: '4-3-3', team2Formation: '4-3-3', team1Coach: 'Thomas Frank', team2Coach: 'Arne Slot',
      team1StartingXI: [
        { number: 1, name: 'Mark Flekken', pos: 'GK', rating: 7.4 },
        { number: 20, name: 'Kristoffer Ajer', pos: 'RB', rating: 7.0 },
        { number: 5, name: 'Nathan Collins', pos: 'CB', rating: 7.2 },
        { number: 22, name: 'Ethan Pinnock', pos: 'CB', rating: 7.5, isCaptain: true },
        { number: 3, name: 'Rico Henry', pos: 'LB', rating: 7.3 },
        { number: 6, name: 'Christian Norgaard', pos: 'DM', rating: 7.6 },
        { number: 8, name: 'Mathias Jensen', pos: 'CM', rating: 7.1 },
        { number: 27, name: 'Vitaly Janelt', pos: 'CM', rating: 7.2 },
        { number: 19, name: 'Bryan Mbeumo', pos: 'RW', rating: 7.9 },
        { number: 9, name: 'Kevin Schade', pos: 'LW', rating: 7.3 },
        { number: 11, name: 'Yoane Wissa', pos: 'ST', rating: 7.7 }
      ],
      team2StartingXI: [
        { number: 1, name: 'Alisson Becker', pos: 'GK', rating: 7.9 },
        { number: 66, name: 'Trent Alexander-Arnold', pos: 'RB', rating: 8.2 },
        { number: 5, name: 'Ibrahima Konate', pos: 'CB', rating: 7.8 },
        { number: 4, name: 'Virgil van Dijk', pos: 'CB', rating: 8.4, isCaptain: true },
        { number: 26, name: 'Andy Robertson', pos: 'LB', rating: 7.7 },
        { number: 38, name: 'Ryan Gravenberch', pos: 'DM', rating: 8.1 },
        { number: 10, name: 'Alexis Mac Allister', pos: 'CM', rating: 7.9 },
        { number: 8, name: 'Dominik Szoboszlai', pos: 'AM', rating: 8.0 },
        { number: 11, name: 'Mohamed Salah', pos: 'RW', rating: 8.9 },
        { number: 7, name: 'Luis Diaz', pos: 'LW', rating: 8.2 },
        { number: 20, name: 'Diogo Jota', pos: 'ST', rating: 7.8 }
      ],
      team1Subs: ['Hakon Valdimarsson (GK)', 'Sepp van den Berg (CB)', 'Keane Lewis-Potter (LW)', 'Yegor Yarmolyuk (CM)', 'Fabio Carvalho (AM)'],
      team2Subs: ['Caoimhin Kelleher (GK)', 'Jarell Quansah (CB)', 'Kostas Tsimikas (LB)', 'Wataru Endo (DM)', 'Curtis Jones (CM)', 'Cody Gakpo (LW)', 'Darwin Nunez (ST)']
    }
  },
  {
    id: 'match-fulham-hull-oct17',
    sport: 'football',
    isLive: false,
    stage: 'Premier League',
    leagueCode: 'PL',
    eventTitle: 'Fulham vs Hull City',
    group: 'Matchday 8 • October 17',
    date: 'Sat 17 Oct',
    time: '15:00',
    venue: 'Craven Cottage, London',
    referee: 'Stuart Attwell (England)',
    attendance: '24,500',
    weather: '14°C, Thames Breeze',
    team1: { name: 'Fulham', shortName: 'FUL', logoType: 'generic', logoUrl: 'https://crests.football-data.org/63.png', odds: 1.65, form: ['W', 'W', 'D', 'L', 'W'] },
    team2: { name: 'Hull City', shortName: 'HUL', logoType: 'generic', logoUrl: 'https://crests.football-data.org/322.png', odds: 5.20, form: ['W', 'L', 'W', 'D', 'L'] },
    drawOdds: 3.90,
    predictionTip: 'Fulham home superiority at Craven Cottage',
    winProbabilityTeam1: 58, winProbabilityTeam2: 20, drawProbability: 22,
  },
  {
    id: 'match-mancity-ipswich-oct17',
    sport: 'football',
    isLive: false,
    stage: 'Premier League',
    leagueCode: 'PL',
    eventTitle: 'Manchester City vs Ipswich Town',
    group: 'Matchday 8 • October 17',
    date: 'Sat 17 Oct',
    time: '15:00',
    venue: 'Etihad Stadium, Manchester',
    referee: 'Simon Hooper (England)',
    attendance: '53,400',
    weather: '11°C, Overcast',
    team1: { name: 'Manchester City', shortName: 'MCI', logoType: 'city', logoUrl: 'https://crests.football-data.org/65.png', odds: 1.18, form: ['W', 'W', 'W', 'W', 'W'] },
    team2: { name: 'Ipswich Town', shortName: 'IPS', logoType: 'generic', logoUrl: 'https://crests.football-data.org/349.png', odds: 15.0, form: ['D', 'L', 'W', 'L', 'D'] },
    drawOdds: 7.50,
    predictionTip: 'Erling Haaland hat-trick potential and complete City dominance',
    winProbabilityTeam1: 85, winProbabilityTeam2: 5, drawProbability: 10,
    stats: { possession: { team1: 74, team2: 26 }, shotsOnTarget: { team1: 11, team2: 2 }, totalShots: { team1: 24, team2: 5 }, corners: { team1: 10, team2: 1 }, fouls: { team1: 7, team2: 12 }, yellowCards: { team1: 0, team2: 2 }, xG: { team1: 3.50, team2: 0.40 }, passesCompleted: { team1: '780 (93%)', team2: '210 (70%)' } },
    lineups: {
      team1Formation: '4-1-4-1', team2Formation: '5-4-1', team1Coach: 'Pep Guardiola', team2Coach: 'Kieran McKenna',
      team1StartingXI: [
        { number: 31, name: 'Ederson', pos: 'GK', rating: 7.5 },
        { number: 82, name: 'Rico Lewis', pos: 'RB', rating: 8.0 },
        { number: 3, name: 'Ruben Dias', pos: 'CB', rating: 7.7 },
        { number: 25, name: 'Manuel Akanji', pos: 'CB', rating: 7.6 },
        { number: 24, name: 'Josko Gvardiol', pos: 'LB', rating: 8.1 },
        { number: 16, name: 'Rodri', pos: 'DM', rating: 8.8, isCaptain: true },
        { number: 20, name: 'Bernardo Silva', pos: 'RW', rating: 8.3 },
        { number: 17, name: 'Kevin De Bruyne', pos: 'CM', rating: 9.1 },
        { number: 47, name: 'Phil Foden', pos: 'LW', rating: 8.5 },
        { number: 10, name: 'Jack Grealish', pos: 'RW', rating: 7.9 },
        { number: 9, name: 'Erling Haaland', pos: 'ST', rating: 9.5 }
      ],
      team2StartingXI: [
        { number: 1, name: 'Arijanet Muric', pos: 'GK', rating: 7.1 },
        { number: 2, name: 'Harry Clarke', pos: 'RB', rating: 6.8 },
        { number: 6, name: 'Luke Woolfenden', pos: 'CB', rating: 6.9 },
        { number: 15, name: 'Cameron Burgess', pos: 'CB', rating: 7.0 },
        { number: 3, name: 'Leif Davis', pos: 'LB', rating: 7.2 },
        { number: 12, name: 'Jens Cajuste', pos: 'DM', rating: 6.8 },
        { number: 8, name: 'Sam Morsy', pos: 'CM', rating: 7.1, isCaptain: true },
        { number: 10, name: 'Conor Chaplin', pos: 'AM', rating: 6.9 },
        { number: 7, name: 'Wes Burns', pos: 'RW', rating: 6.7 },
        { number: 19, name: 'Omari Hutchinson', pos: 'LW', rating: 7.3 },
        { number: 14, name: 'Liam Delap', pos: 'ST', rating: 7.1 }
      ],
      team1Subs: ['Stefan Ortega (GK)', 'John Stones (CB)', 'Nathan Ake (CB)', 'Mateo Kovacic (DM)', 'Savinho (RW)', 'Jeremy Doku (LW)', 'Matheus Nunes (CM)'],
      team2Subs: ['Cieran Slicker (GK)', 'Axel Tuanzebe (CB)', 'Massimo Luongo (CM)', 'Jack Taylor (CM)', 'Nathan Broadhead (LW)', 'George Hirst (ST)']
    }
  },
  {
    id: 'match-newcastle-villa-oct17',
    sport: 'football',
    isLive: false,
    stage: 'Premier League',
    leagueCode: 'PL',
    eventTitle: 'Newcastle United vs Aston Villa',
    group: 'Matchday 8 • October 17',
    date: 'Sat 17 Oct',
    time: '17:30',
    venue: 'St. James’ Park, Newcastle',
    referee: 'Darren England (England)',
    attendance: '52,250',
    weather: '10°C, Floodlight Night',
    team1: { name: 'Newcastle United', shortName: 'NEW', logoType: 'generic', logoUrl: 'https://crests.football-data.org/67.png', odds: 2.05, form: ['W', 'W', 'D', 'W', 'W'] },
    team2: { name: 'Aston Villa', shortName: 'AVL', logoType: 'generic', logoUrl: 'https://crests.football-data.org/58.png', odds: 3.40, form: ['W', 'W', 'W', 'L', 'W'] },
    drawOdds: 3.60,
    predictionTip: 'St. James’ Park electric atmosphere to edge high-tempo thriller',
    winProbabilityTeam1: 49, winProbabilityTeam2: 27, drawProbability: 24,
  },
  {
    id: 'match-bournemouth-sunderland-oct18',
    sport: 'football',
    isLive: false,
    stage: 'Premier League',
    leagueCode: 'PL',
    eventTitle: 'Bournemouth vs Sunderland',
    group: 'Matchday 8 • October 18',
    date: 'Sun 18 Oct',
    time: '20:00',
    venue: 'Vitality Stadium, Bournemouth',
    referee: 'Peter Bankes (England)',
    attendance: '11,300',
    weather: '15°C, Coastal Breeze',
    team1: { name: 'Bournemouth', shortName: 'BOU', logoType: 'generic', logoUrl: 'https://crests.football-data.org/1044.png', odds: 1.85, form: ['W', 'D', 'W', 'L', 'W'] },
    team2: { name: 'Sunderland', shortName: 'SUN', logoType: 'generic', logoUrl: 'https://crests.football-data.org/71.png', odds: 4.10, form: ['W', 'W', 'D', 'W', 'L'] },
    drawOdds: 3.60,
    predictionTip: 'Bournemouth pace and counter-attacking speed at Vitality Stadium',
    winProbabilityTeam1: 52, winProbabilityTeam2: 24, drawProbability: 24,
  },
  {
    id: 'match-brighton-palace-oct18',
    sport: 'football',
    isLive: false,
    stage: 'Premier League',
    leagueCode: 'PL',
    eventTitle: 'Brighton & Hove Albion vs Crystal Palace',
    group: 'Matchday 8 • October 18',
    date: 'Sun 18 Oct',
    time: '14:00',
    venue: 'Amex Stadium, Brighton',
    referee: 'Robert Jones (England)',
    attendance: '31,800',
    weather: '14°C, Coastal Sun',
    team1: { name: 'Brighton & Hove Albion', shortName: 'BHA', logoType: 'generic', logoUrl: 'https://crests.football-data.org/397.png', odds: 2.05, form: ['W', 'W', 'D', 'W', 'L'] },
    team2: { name: 'Crystal Palace', shortName: 'CRY', logoType: 'generic', logoUrl: 'https://crests.football-data.org/354.png', odds: 3.50, form: ['D', 'W', 'L', 'W', 'D'] },
    drawOdds: 3.50,
    predictionTip: 'A23 derby rivalry with intense midfield battles and goals',
    winProbabilityTeam1: 48, winProbabilityTeam2: 27, drawProbability: 25,
  },
  {
    id: 'match-leeds-manutd-oct18',
    sport: 'football',
    isLive: false,
    stage: 'Premier League',
    leagueCode: 'PL',
    eventTitle: 'Leeds United vs Manchester United',
    group: 'Matchday 8 • October 18',
    date: 'Sun 18 Oct',
    time: '14:00',
    venue: 'Elland Road, Leeds',
    referee: 'Michael Oliver (England)',
    attendance: '37,890',
    weather: '11°C, Fiery Atmosphere',
    team1: { name: 'Leeds United', shortName: 'LEE', logoType: 'generic', logoUrl: 'https://crests.football-data.org/363.png', odds: 3.10, form: ['W', 'W', 'D', 'W', 'W'] },
    team2: { name: 'Manchester United', shortName: 'MUN', logoType: 'united', logoUrl: 'https://crests.football-data.org/66.png', odds: 2.20, form: ['W', 'D', 'W', 'L', 'W'] },
    drawOdds: 3.50,
    predictionTip: 'Roses rivalry electric tempo with goals on both sides',
    winProbabilityTeam1: 32, winProbabilityTeam2: 45, drawProbability: 23,
  },
  {
    id: 'match-forest-arsenal-oct18',
    sport: 'football',
    isLive: false,
    stage: 'Premier League',
    leagueCode: 'PL',
    eventTitle: 'Nottingham Forest vs Arsenal',
    group: 'Matchday 8 • October 18',
    date: 'Sun 18 Oct',
    time: '16:30',
    venue: 'City Ground, Nottingham',
    referee: 'Anthony Taylor (England)',
    attendance: '30,400',
    weather: '12°C, Crisp Sunday Evening',
    team1: { name: 'Nottingham Forest', shortName: 'NFO', logoType: 'generic', logoUrl: 'https://crests.football-data.org/351.png', odds: 4.80, form: ['W', 'L', 'W', 'D', 'W'] },
    team2: { name: 'Arsenal', shortName: 'ARS', logoType: 'arsenal', logoUrl: 'https://crests.football-data.org/57.png', odds: 1.70, form: ['W', 'W', 'W', 'W', 'D'] },
    drawOdds: 3.80,
    predictionTip: 'Arsenal tactical precision and set-piece prowess to break Forest block',
    winProbabilityTeam1: 20, winProbabilityTeam2: 58, drawProbability: 22,
    stats: { possession: { team1: 35, team2: 65 }, shotsOnTarget: { team1: 3, team2: 8 }, totalShots: { team1: 8, team2: 17 }, corners: { team1: 3, team2: 8 }, fouls: { team1: 14, team2: 10 }, yellowCards: { team1: 3, team2: 1 }, xG: { team1: 0.85, team2: 2.30 }, passesCompleted: { team1: '265 (74%)', team2: '560 (89%)' } },
    lineups: {
      team1Formation: '4-2-3-1', team2Formation: '4-3-3', team1Coach: 'Nuno Espirito Santo', team2Coach: 'Mikel Arteta',
      team1StartingXI: [
        { number: 1, name: 'Matz Sels', pos: 'GK', rating: 7.5 },
        { number: 30, name: 'Willy Boly', pos: 'CB', rating: 7.2 },
        { number: 4, name: 'Morato', pos: 'CB', rating: 7.0 },
        { number: 15, name: 'Harry Toffolo', pos: 'LB', rating: 7.1 },
        { number: 5, name: 'Murillo', pos: 'CB', rating: 7.6 },
        { number: 6, name: 'Ibrahim Sangare', pos: 'DM', rating: 7.3 },
        { number: 8, name: 'Elliot Anderson', pos: 'CM', rating: 7.4 },
        { number: 10, name: 'Morgan Gibbs-White', pos: 'AM', rating: 7.8, isCaptain: true },
        { number: 14, name: 'Callum Hudson-Odoi', pos: 'RW', rating: 7.5 },
        { number: 21, name: 'Anthony Elanga', pos: 'LW', rating: 7.6 },
        { number: 9, name: 'Taiwo Awoniyi', pos: 'ST', rating: 7.4 }
      ],
      team2StartingXI: [
        { number: 22, name: 'David Raya', pos: 'GK', rating: 8.0 },
        { number: 4, name: 'Ben White', pos: 'RB', rating: 7.8 },
        { number: 2, name: 'William Saliba', pos: 'CB', rating: 8.5 },
        { number: 6, name: 'Gabriel Magalhaes', pos: 'CB', rating: 8.4 },
        { number: 33, name: 'Riccardo Calafiori', pos: 'LB', rating: 7.9 },
        { number: 41, name: 'Declan Rice', pos: 'DM', rating: 8.8 },
        { number: 5, name: 'Thomas Partey', pos: 'CM', rating: 7.9 },
        { number: 8, name: 'Martin Odegaard', pos: 'AM', rating: 9.0, isCaptain: true },
        { number: 7, name: 'Bukayo Saka', pos: 'RW', rating: 8.9 },
        { number: 11, name: 'Gabriel Martinelli', pos: 'LW', rating: 8.1 },
        { number: 29, name: 'Kai Havertz', pos: 'ST', rating: 8.3 }
      ],
      team1Subs: ['Carlos Miguel (GK)', 'Neco Williams (RB)', 'Nicolas Dominguez (CM)', 'James Ward-Prowse (CM)', 'Ramon Sosa (LW)', 'Jota Silva (RW)', 'Chris Wood (ST)'],
      team2Subs: ['Neto (GK)', 'Jurrien Timber (RB)', 'Oleksandr Zinchenko (LB)', 'Jorginho (DM)', 'Mikel Merino (CM)', 'Leandro Trossard (LW)', 'Gabriel Jesus (ST)']
    }
  },
  {
    id: 'match-tottenham-coventry-oct19',
    sport: 'football',
    isLive: false,
    stage: 'Premier League',
    leagueCode: 'PL',
    eventTitle: 'Tottenham Hotspur vs Coventry City',
    group: 'Matchday 8 • October 19',
    date: 'Mon 19 Oct',
    time: '20:00',
    venue: 'Tottenham Hotspur Stadium, London',
    referee: 'Craig Pawson (England)',
    attendance: '62,850',
    weather: '13°C, Monday Night Lights',
    team1: { name: 'Tottenham Hotspur', shortName: 'TOT', logoType: 'generic', logoUrl: 'https://crests.football-data.org/73.png', odds: 1.42, form: ['W', 'W', 'L', 'W', 'W'] },
    team2: { name: 'Coventry City', shortName: 'COV', logoType: 'generic', logoUrl: 'https://crests.football-data.org/1075.png', odds: 7.20, form: ['W', 'D', 'W', 'L', 'W'] },
    drawOdds: 4.80,
    predictionTip: 'Son Heung-min and Dominic Solanke to secure home victory under lights',
    winProbabilityTeam1: 70, winProbabilityTeam2: 13, drawProbability: 17,
  },

  // ==========================================
  // CHAMPIONS LEAGUE - MATCHWEEK 2 FIXTURES
  // ==========================================
  {
    id: 'match-arsenal-lille-cl',
    sport: 'football',
    isLive: false,
    stage: 'UEFA Champions League',
    leagueCode: 'CL',
    eventTitle: 'Arsenal vs Lille',
    group: 'League Phase • Matchweek 2',
    date: 'Today',
    time: '19:00',
    venue: 'Emirates Stadium, London',
    referee: 'Istvan Kovacs (Romania)',
    attendance: '60,000',
    weather: '14°C, Champions League Lights',
    team1: { name: 'Arsenal', shortName: 'ARS', logoType: 'arsenal', logoUrl: 'https://crests.football-data.org/57.png', odds: 1.35, form: ['W', 'W', 'W', 'W', 'D'] },
    team2: { name: 'Lille', shortName: 'LIL', logoType: 'generic', logoUrl: 'https://crests.football-data.org/521.png', odds: 8.50, form: ['W', 'D', 'W', 'L', 'W'] },
    drawOdds: 5.00,
    predictionTip: 'Arsenal home dominance in European nights',
    winProbabilityTeam1: 74, winProbabilityTeam2: 11, drawProbability: 15,
    stats: { possession: { team1: 64, team2: 36 }, shotsOnTarget: { team1: 8, team2: 3 }, totalShots: { team1: 18, team2: 7 }, corners: { team1: 7, team2: 3 }, fouls: { team1: 9, team2: 12 }, yellowCards: { team1: 1, team2: 2 }, xG: { team1: 2.45, team2: 0.80 }, passesCompleted: { team1: '590 (90%)', team2: '310 (78%)' } },
    lineups: {
      team1Formation: '4-3-3', team2Formation: '4-2-3-1', team1Coach: 'Mikel Arteta', team2Coach: 'Bruno Genesio',
      team1StartingXI: [
        { number: 22, name: 'David Raya', pos: 'GK', rating: 8.1 },
        { number: 4, name: 'Ben White', pos: 'RB', rating: 7.9 },
        { number: 2, name: 'William Saliba', pos: 'CB', rating: 8.6 },
        { number: 6, name: 'Gabriel Magalhaes', pos: 'CB', rating: 8.4 },
        { number: 33, name: 'Riccardo Calafiori', pos: 'LB', rating: 8.0 },
        { number: 41, name: 'Declan Rice', pos: 'DM', rating: 8.9 },
        { number: 5, name: 'Thomas Partey', pos: 'CM', rating: 8.0 },
        { number: 8, name: 'Martin Odegaard', pos: 'AM', rating: 9.1, isCaptain: true },
        { number: 7, name: 'Bukayo Saka', pos: 'RW', rating: 9.0 },
        { number: 11, name: 'Gabriel Martinelli', pos: 'LW', rating: 8.3 },
        { number: 29, name: 'Kai Havertz', pos: 'ST', rating: 8.4 }
      ],
      team2StartingXI: [
        { number: 30, name: 'Lucas Chevalier', pos: 'GK', rating: 7.5 },
        { number: 12, name: 'Thomas Meunier', pos: 'RB', rating: 7.1 },
        { number: 4, name: 'Alexsandro', pos: 'CB', rating: 7.0 },
        { number: 2, name: 'Aissa Mandi', pos: 'CB', rating: 7.2 },
        { number: 31, name: 'Ismaily', pos: 'LB', rating: 7.1 },
        { number: 6, name: 'Nabil Bentaleb', pos: 'DM', rating: 7.3 },
        { number: 21, name: 'Benjamin Andre', pos: 'CM', rating: 7.4, isCaptain: true },
        { number: 8, name: 'Angel Gomes', pos: 'AM', rating: 7.6 },
        { number: 17, name: 'Hakon Haraldsson', pos: 'RW', rating: 7.2 },
        { number: 11, name: 'Osame Sahraoui', pos: 'LW', rating: 7.3 },
        { number: 9, name: 'Jonathan David', pos: 'ST', rating: 7.8 }
      ],
      team1Subs: ['Neto (GK)', 'Jurrien Timber (RB)', 'Oleksandr Zinchenko (LB)', 'Jorginho (DM)', 'Mikel Merino (CM)', 'Leandro Trossard (LW)', 'Gabriel Jesus (ST)'],
      team2Subs: ['Vito Mannone (GK)', 'Gabriel Gudmundsson (LB)', 'Ayyoub Bouaddi (CM)', 'Remmy Cabella (AM)', 'Matias Fernandez-Pardo (ST)']
    }
  },
  {
    id: 'match-atletico-manutd-cl',
    sport: 'football',
    isLive: false,
    stage: 'UEFA Champions League',
    leagueCode: 'CL',
    eventTitle: 'Atlético Madrid vs Manchester United',
    group: 'League Phase • Matchweek 2',
    date: 'Today',
    time: '19:00',
    venue: 'Metropolitano Stadium, Madrid',
    referee: 'Szymon Marciniak (Poland)',
    attendance: '68,000',
    weather: '18°C, Clear Night',
    team1: { name: 'Atlético Madrid', shortName: 'ATM', logoType: 'generic', logoUrl: 'https://crests.football-data.org/78.png', odds: 2.10, form: ['W', 'W', 'D', 'W', 'W'] },
    team2: { name: 'Manchester United', shortName: 'MUN', logoType: 'united', logoUrl: 'https://crests.football-data.org/66.png', odds: 3.40, form: ['W', 'D', 'W', 'L', 'W'] },
    drawOdds: 3.40,
    predictionTip: 'Tight tactical battle at the Metropolitano',
    winProbabilityTeam1: 48, winProbabilityTeam2: 28, drawProbability: 24,
  },
  {
    id: 'match-galatasaray-barcelona-cl',
    sport: 'football',
    isLive: false,
    stage: 'UEFA Champions League',
    leagueCode: 'CL',
    eventTitle: 'Galatasaray vs Barcelona',
    group: 'League Phase • Matchweek 2',
    date: 'Today',
    time: '19:00',
    venue: 'RAMS Park, Istanbul',
    referee: 'Clément Turpin (France)',
    attendance: '52,200',
    weather: '16°C, Intense Atmosphere',
    team1: { name: 'Galatasaray', shortName: 'GAL', logoType: 'generic', logoUrl: 'https://crests.football-data.org/610.png', odds: 3.80, form: ['W', 'W', 'W', 'W', 'D'] },
    team2: { name: 'Barcelona', shortName: 'BAR', logoType: 'barcelona', logoUrl: 'https://crests.football-data.org/81.png', odds: 1.85, form: ['W', 'W', 'W', 'W', 'W'] },
    drawOdds: 3.90,
    predictionTip: 'Lamine Yamal and Robert Lewandowski attacking firepower',
    winProbabilityTeam1: 24, winProbabilityTeam2: 54, drawProbability: 22,
  },
  {
    id: 'match-inter-brugge-cl',
    sport: 'football',
    isLive: false,
    stage: 'UEFA Champions League',
    leagueCode: 'CL',
    eventTitle: 'Inter Milan vs Club Brugge',
    group: 'League Phase • Matchweek 2',
    date: 'Today',
    time: '19:00',
    venue: 'San Siro, Milan',
    referee: 'Michael Oliver (England)',
    attendance: '71,500',
    weather: '13°C, Milan Night',
    team1: { name: 'Inter Milan', shortName: 'INT', logoType: 'inter', logoUrl: 'https://crests.football-data.org/108.png', odds: 1.30, form: ['W', 'W', 'W', 'D', 'W'] },
    team2: { name: 'Club Brugge', shortName: 'CLU', logoType: 'generic', logoUrl: 'https://crests.football-data.org/656.png', odds: 9.50, form: ['W', 'L', 'W', 'W', 'D'] },
    drawOdds: 5.50,
    predictionTip: 'Lautaro Martinez scoring form to seal home points',
    winProbabilityTeam1: 78, winProbabilityTeam2: 8, drawProbability: 14,
  },
  {
    id: 'match-bayern-viking-cl',
    sport: 'football',
    isLive: false,
    stage: 'UEFA Champions League',
    leagueCode: 'CL',
    eventTitle: 'Viking FK vs Bayern Munich',
    group: 'League Phase • Matchweek 2',
    date: 'Today',
    time: '19:00',
    venue: 'Allianz Arena, Munich',
    referee: 'Felix Zwayer (Germany)',
    attendance: '75,000',
    weather: '10°C, Crisp Evening',
    team1: { name: 'Viking FK', shortName: 'VIK', logoType: 'generic', logoUrl: 'https://crests.football-data.org/1871.png', odds: 19.0, form: ['W', 'D', 'L', 'W', 'L'] },
    team2: { name: 'Bayern Munich', shortName: 'BAY', logoType: 'bayern', logoUrl: 'https://crests.football-data.org/5.png', odds: 1.12, form: ['W', 'W', 'W', 'W', 'W'] },
    drawOdds: 9.00,
    predictionTip: 'Harry Kane and Michael Olise commanding masterclass',
    winProbabilityTeam1: 3, winProbabilityTeam2: 90, drawProbability: 7,
  }
];
