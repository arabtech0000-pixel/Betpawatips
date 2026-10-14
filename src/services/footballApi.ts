import { Match, MATCHES_DATA } from '../data/mockData';

// Proxy URL avoids CORS issues in Vite dev, fallback to direct API
const PROXY_URL = '/api/football-proxy';
const DIRECT_URL = 'https://api.football-data.org/v4';
const STORAGE_KEY_TOKEN = 'kickpredict_football_data_token';
const STORAGE_KEY_MATCHES = 'kickpredict_synced_matches';

export interface FootballApiConfig {
  token: string;
  isCustomToken: boolean;
}

export class FootballApiService {
  private static token: string = '37ac3cafeb310a4bc8c264238fe084f3';

  static {
    localStorage.setItem(STORAGE_KEY_TOKEN, '37ac3cafeb310a4bc8c264238fe084f3');
  }

  public static getToken(): string {
    return this.token;
  }

  public static setToken(token: string): void {
    this.token = token.trim();
    if (this.token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, this.token);
    } else {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
  }

  public static hasToken(): boolean {
    return !!this.token;
  }

  public static clearCachedMatches(): void {
    try {
      localStorage.removeItem(STORAGE_KEY_MATCHES);
    } catch {
      // ignore
    }
  }

  /**
   * Helper to perform fetch trying proxy first then direct
   */
  private static async apiFetch(endpoint: string, token: string): Promise<Response> {
    const headers = { 'X-Auth-Token': token };
    try {
      const proxyRes = await fetch(`${PROXY_URL}${endpoint}`, { headers });
      if (proxyRes.ok || proxyRes.status === 403 || proxyRes.status === 400) {
        return proxyRes;
      }
    } catch {
      // Proxy failed or not available, fallback to direct
    }
    return fetch(`${DIRECT_URL}${endpoint}`, { headers });
  }

  /**
   * Test connection to Football-Data.org API
   */
  public static async testConnection(tokenToTest?: string): Promise<{ success: boolean; message: string; count?: number }> {
    const auth = (tokenToTest !== undefined ? tokenToTest : this.token).trim();
    if (!auth) {
      return { success: false, message: 'Please enter your Football-Data.org API token' };
    }

    try {
      const response = await this.apiFetch('/competitions', auth);

      if (!response.ok) {
        if (response.status === 403) {
          return { success: false, message: 'Invalid API Token or 403 Forbidden. Check your subscription.' };
        }
        return { success: false, message: `API error (HTTP ${response.status})` };
      }

      const data = await response.json();
      const count = data.count || data.competitions?.length || 0;
      return {
        success: true,
        message: `Connected successfully! Access to ${count} competitions.`,
        count,
      };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Network error';
      return { success: false, message: `Connection failed: ${errMsg}` };
    }
  }

  /**
   * Fetch all live and scheduled matches from Football-Data.org with robust fallback and broad league generation
   */
  public static async fetchMatches(competitionCode?: string): Promise<{ matches: Match[]; isLive: boolean; error?: string }> {
    let apiMatches: Match[] = [];
    
    if (this.token) {
      try {
        const now = new Date();
        const todayStr = now.toISOString().slice(0, 10);
        const tomorrow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // broader 7 day window
        const tomorrowStr = tomorrow.toISOString().slice(0, 10);

        let endpoint = `/matches?dateFrom=${todayStr}&dateTo=${tomorrowStr}`;
        if (competitionCode && competitionCode !== 'ALL' && competitionCode !== 'LIVE') {
          endpoint = `/competitions/${competitionCode}/matches?dateFrom=${todayStr}&dateTo=${tomorrowStr}`;
        }

        const response = await this.apiFetch(endpoint, this.token);

        if (response.ok) {
          const data = await response.json();
          const rawMatches = data.matches || [];

          apiMatches = rawMatches.map((m: any, idx: number) => {
            const homeName = m.homeTeam?.name || 'Home Team';
            const awayName = m.awayTeam?.name || 'Away Team';
            const homeCrest = m.homeTeam?.crest || '';
            const awayCrest = m.awayTeam?.crest || '';
            const compName = m.competition?.name || 'Top League';
            const compCode = m.competition?.code || (competitionCode || 'PL');

            const isLive = m.status === 'IN_PLAY' || m.status === 'PAUSED';
            const scoreHome = m.score?.fullTime?.home ?? (isLive ? m.score?.halfTime?.home ?? 0 : undefined);
            const scoreAway = m.score?.fullTime?.away ?? (isLive ? m.score?.halfTime?.away ?? 0 : undefined);

            const matchUtc = m.utcDate ? new Date(m.utcDate) : new Date();
            const timeStr = matchUtc.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

            return {
              id: `fd-${m.id || idx}`,
              sport: 'football' as const,
              isLive,
              minute: isLive ? "68'" : undefined,
              stage: compName,
              leagueCode: compCode,
              eventTitle: `${homeName} vs ${awayName}`,
              group: `Matchday ${m.matchday || 1}`,
              date: 'Today',
              time: timeStr,
              venue: m.venue || `${homeName} Stadium`,
              referee: m.referees?.[0]?.name || 'Official Referee',
              team1: {
                name: homeName,
                shortName: m.homeTeam?.shortName || homeName.slice(0, 3).toUpperCase(),
                logoUrl: homeCrest,
                odds: 2.10,
                score: scoreHome,
                form: ['W', 'W', 'D', 'W', 'L'],
              },
              team2: {
                name: awayName,
                shortName: m.awayTeam?.shortName || awayName.slice(0, 3).toUpperCase(),
                logoUrl: awayCrest,
                odds: 3.20,
                score: scoreAway,
                form: ['W', 'D', 'W', 'L', 'W'],
              },
              drawOdds: 3.30,
              predictionTip: `${homeName} tactical advantage with expected goals index`,
              winProbabilityTeam1: 52,
              winProbabilityTeam2: 24,
              drawProbability: 24,
              stats: {
                possession: { team1: 55, team2: 45 },
                shotsOnTarget: { team1: 6, team2: 4 },
                totalShots: { team1: 15, team2: 10 },
                corners: { team1: 6, team2: 3 },
                fouls: { team1: 10, team2: 12 },
                yellowCards: { team1: 1, team2: 2 },
                xG: { team1: 1.88, team2: 1.15 },
                passesCompleted: { team1: '480 (87%)', team2: '390 (82%)' },
              },
              lineups: {
                team1Formation: '4-3-3',
                team2Formation: '4-2-3-1',
                team1Coach: 'Head Coach',
                team2Coach: 'Head Coach',
                team1StartingXI: [
                  { number: 1, name: `${homeName} GK`, pos: 'GK', rating: 7.3 },
                  { number: 2, name: 'Defender 1', pos: 'RB', rating: 7.1 },
                  { number: 4, name: 'Defender 2', pos: 'CB', rating: 7.6 },
                  { number: 5, name: 'Defender 3', pos: 'CB', rating: 7.4 },
                  { number: 3, name: 'Defender 4', pos: 'LB', rating: 7.2 },
                  { number: 6, name: 'Midfielder 1', pos: 'DM', rating: 7.8 },
                  { number: 8, name: 'Midfielder 2', pos: 'CM', rating: 7.9 },
                  { number: 10, name: 'Playmaker', pos: 'AM', rating: 8.3, isCaptain: true },
                  { number: 7, name: 'Forward 1', pos: 'RW', rating: 8.1 },
                  { number: 9, name: 'Striker', pos: 'ST', rating: 8.0 },
                  { number: 11, name: 'Forward 2', pos: 'LW', rating: 7.9 },
                ],
                team2StartingXI: [
                  { number: 1, name: `${awayName} GK`, pos: 'GK', rating: 7.1 },
                  { number: 24, name: 'Defender 1', pos: 'RB', rating: 7.0 },
                  { number: 6, name: 'Defender 2', pos: 'CB', rating: 7.3 },
                  { number: 15, name: 'Defender 3', pos: 'CB', rating: 7.1 },
                  { number: 21, name: 'Defender 4', pos: 'LB', rating: 6.9 },
                  { number: 16, name: 'Midfielder 1', pos: 'DM', rating: 7.4 },
                  { number: 18, name: 'Midfielder 2', pos: 'CM', rating: 7.2 },
                  { number: 17, name: 'Forward 1', pos: 'RW', rating: 7.5 },
                  { number: 20, name: 'Playmaker', pos: 'AM', rating: 8.0, isCaptain: true },
                  { number: 19, name: 'Forward 2', pos: 'LW', rating: 7.3 },
                  { number: 11, name: 'Striker', pos: 'ST', rating: 7.6 },
                ],
                team1Subs: ['Sub 1', 'Sub 2', 'Sub 3', 'Sub 4', 'Sub 5'],
                team2Subs: ['Sub 1', 'Sub 2', 'Sub 3', 'Sub 4', 'Sub 5'],
              },
            };
          });
        }
      } catch {
        // Fallback gracefully on network error
      }
    }

    // Determine filtered mock matches
    let filteredMock = competitionCode && competitionCode !== 'ALL' && competitionCode !== 'LIVE'
      ? MATCHES_DATA.filter((m) => 
          m.leagueCode === competitionCode || 
          m.stage.toLowerCase().includes(competitionCode.toLowerCase()) || 
          (competitionCode === 'PL' && m.stage.includes('Premier League')) || 
          (competitionCode === 'CL' && m.stage.includes('Champions')) ||
          (competitionCode === 'PD' && (m.stage.includes('La Liga') || m.stage.includes('Spain'))) ||
          (competitionCode === 'SA' && (m.stage.includes('Serie A') || m.stage.includes('Italy'))) ||
          (competitionCode === 'BL1' && (m.stage.includes('Bundesliga') || m.stage.includes('Germany'))) ||
          (competitionCode === 'FL1' && (m.stage.includes('Ligue 1') || m.stage.includes('France')))
        )
      : MATCHES_DATA;

    // If still empty for any requested competition code, generate robust fixtures so zero leagues show 'no fixtures'
    if (filteredMock.length === 0 && competitionCode && competitionCode !== 'ALL' && competitionCode !== 'LIVE') {
      const leagueNames: Record<string, string> = {
        'PD': 'La Liga',
        'SA': 'Serie A',
        'BL1': 'Bundesliga',
        'FL1': 'Ligue 1',
        'ELC': 'Championship',
        'DED': 'Eredivisie',
        'PPL': 'Primeira Liga',
      };
      const leagueName = leagueNames[competitionCode] || competitionCode;

      filteredMock = [
        {
          id: `gen-${competitionCode}-1`,
          sport: 'football',
          isLive: false,
          stage: leagueName,
          leagueCode: competitionCode,
          eventTitle: `Team Alpha vs Team Beta`,
          group: 'Matchday 10',
          date: 'Today',
          time: '18:00',
          venue: `${leagueName} Arena`,
          team1: { name: 'Alpha FC', shortName: 'ALP', odds: 1.95, form: ['W', 'W', 'D', 'W', 'W'] },
          team2: { name: 'Beta SC', shortName: 'BET', odds: 3.80, form: ['L', 'D', 'W', 'L', 'D'] },
          drawOdds: 3.40,
          predictionTip: 'Alpha FC expected to dominate possession and create high xG opportunities.',
          winProbabilityTeam1: 58,
          winProbabilityTeam2: 22,
          drawProbability: 20,
          stats: {
            possession: { team1: 58, team2: 42 },
            shotsOnTarget: { team1: 7, team2: 3 },
            totalShots: { team1: 16, team2: 9 },
            corners: { team1: 6, team2: 3 },
            fouls: { team1: 10, team2: 11 },
            yellowCards: { team1: 1, team2: 2 },
            xG: { team1: 2.10, team2: 0.95 },
            passesCompleted: { team1: '510 (88%)', team2: '360 (80%)' },
          },
          lineups: {
            team1Formation: '4-3-3',
            team2Formation: '4-4-2',
            team1Coach: 'Manager 1',
            team2Coach: 'Manager 2',
            team1StartingXI: [
              { number: 1, name: 'GK 1', pos: 'GK', rating: 7.2 },
              { number: 2, name: 'DF 1', pos: 'RB', rating: 7.1 },
              { number: 4, name: 'DF 2', pos: 'CB', rating: 7.5 },
              { number: 5, name: 'DF 3', pos: 'CB', rating: 7.4 },
              { number: 3, name: 'DF 4', pos: 'LB', rating: 7.3 },
              { number: 6, name: 'MF 1', pos: 'DM', rating: 7.6 },
              { number: 8, name: 'MF 2', pos: 'CM', rating: 7.8 },
              { number: 10, name: 'AM 1', pos: 'AM', rating: 8.2, isCaptain: true },
              { number: 7, name: 'FW 1', pos: 'RW', rating: 7.9 },
              { number: 9, name: 'FW 2', pos: 'ST', rating: 8.4 },
              { number: 11, name: 'FW 3', pos: 'LW', rating: 7.7 },
            ],
            team2StartingXI: [
              { number: 1, name: 'GK 2', pos: 'GK', rating: 7.0 },
              { number: 2, name: 'DF 1', pos: 'RB', rating: 6.9 },
              { number: 4, name: 'DF 2', pos: 'CB', rating: 7.2 },
              { number: 5, name: 'DF 3', pos: 'CB', rating: 7.1 },
              { number: 3, name: 'DF 4', pos: 'LB', rating: 6.8 },
              { number: 6, name: 'MF 1', pos: 'DM', rating: 7.3 },
              { number: 8, name: 'MF 2', pos: 'CM', rating: 7.2 },
              { number: 10, name: 'AM 1', pos: 'AM', rating: 7.6, isCaptain: true },
              { number: 7, name: 'FW 1', pos: 'RW', rating: 7.4 },
              { number: 9, name: 'FW 2', pos: 'ST', rating: 7.5 },
              { number: 11, name: 'FW 3', pos: 'LW', rating: 7.0 },
            ],
            team1Subs: ['Sub A', 'Sub B', 'Sub C'],
            team2Subs: ['Sub X', 'Sub Y', 'Sub Z'],
          },
        },
        {
          id: `gen-${competitionCode}-2`,
          sport: 'football',
          isLive: false,
          stage: leagueName,
          leagueCode: competitionCode,
          eventTitle: `Gamma United vs Delta City`,
          group: 'Matchday 10',
          date: 'Tomorrow',
          time: '20:30',
          venue: `${leagueName} Stadium`,
          team1: { name: 'Gamma United', shortName: 'GAM', odds: 2.30, form: ['W', 'D', 'W', 'L', 'W'] },
          team2: { name: 'Delta City', shortName: 'DEL', odds: 3.10, form: ['D', 'W', 'L', 'W', 'D'] },
          drawOdds: 3.25,
          predictionTip: 'Balanced tactical matchup with strong defensive setups expected.',
          winProbabilityTeam1: 45,
          winProbabilityTeam2: 32,
          drawProbability: 23,
          stats: {
            possession: { team1: 50, team2: 50 },
            shotsOnTarget: { team1: 5, team2: 5 },
            totalShots: { team1: 12, team2: 12 },
            corners: { team1: 4, team2: 4 },
            fouls: { team1: 12, team2: 12 },
            yellowCards: { team1: 2, team2: 2 },
            xG: { team1: 1.45, team2: 1.40 },
            passesCompleted: { team1: '450 (84%)', team2: '445 (83%)' },
          },
          lineups: {
            team1Formation: '4-2-3-1',
            team2Formation: '4-3-3',
            team1Coach: 'Coach A',
            team2Coach: 'Coach B',
            team1StartingXI: [
              { number: 1, name: 'GK', pos: 'GK', rating: 7.0 },
              { number: 2, name: 'RB', pos: 'RB', rating: 7.1 },
              { number: 4, name: 'CB', pos: 'CB', rating: 7.3 },
              { number: 5, name: 'CB', pos: 'CB', rating: 7.2 },
              { number: 3, name: 'LB', pos: 'LB', rating: 7.0 },
              { number: 6, name: 'CM', pos: 'CM', rating: 7.4 },
              { number: 8, name: 'CM', pos: 'CM', rating: 7.5, isCaptain: true },
              { number: 7, name: 'RW', pos: 'RW', rating: 7.2 },
              { number: 10, name: 'AM', pos: 'AM', rating: 7.8 },
              { number: 11, name: 'LW', pos: 'LW', rating: 7.3 },
              { number: 9, name: 'ST', pos: 'ST', rating: 7.6 },
            ],
            team2StartingXI: [
              { number: 1, name: 'GK', pos: 'GK', rating: 7.1 },
              { number: 2, name: 'RB', pos: 'RB', rating: 7.0 },
              { number: 4, name: 'CB', pos: 'CB', rating: 7.4 },
              { number: 5, name: 'CB', pos: 'CB', rating: 7.3 },
              { number: 3, name: 'LB', pos: 'LB', rating: 7.1 },
              { number: 6, name: 'DM', pos: 'DM', rating: 7.2 },
              { number: 8, name: 'CM', pos: 'CM', rating: 7.4, isCaptain: true },
              { number: 10, name: 'AM', pos: 'AM', rating: 7.7 },
              { number: 7, name: 'RW', pos: 'RW', rating: 7.3 },
              { number: 9, name: 'ST', pos: 'ST', rating: 7.8 },
              { number: 11, name: 'LW', pos: 'LW', rating: 7.2 },
            ],
            team1Subs: ['Sub 1', 'Sub 2'],
            team2Subs: ['Sub 1', 'Sub 2'],
          },
        },
      ];
    }

    const combined = apiMatches.length > 0 ? [...apiMatches, ...filteredMock] : filteredMock;

    try {
      localStorage.setItem(STORAGE_KEY_MATCHES, JSON.stringify(combined));
    } catch {
      // ignore
    }

    return { matches: combined, isLive: apiMatches.length > 0 };
  }

  /**
   * Retrieve cached synced matches or MATCHES_DATA fallback
   */
  public static getCachedMatches(): Match[] {
    try {
      const cached = localStorage.getItem(STORAGE_KEY_MATCHES);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return MATCHES_DATA;
  }
}
