import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  Search,
  Home,
  Crown,
  Star,
  Plane,
  Menu,
  Clock,
  X,
  Check,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { Match, MATCHES_DATA, PROMO_BANNERS, BetSlipItem } from '../data/mockData';
import { FootballApiService } from '../services/footballApi';
import { TeamLogo } from './TeamLogo';
import { PromoModal } from './PromoModal';
import { CalendarModal } from './CalendarModal';
import { MatchDetailPage } from './MatchDetailPage';
import { SearchPageView } from './SearchPageView';
import { SubscriptionView } from './SubscriptionView';
import { TipsView } from './TipsView';
import { AviatorView } from './AviatorView';
import { BetSlipDrawer } from './BetSlipDrawer';

interface HomeScreenProps {
  initialTab?: NavTab;
  onGoToGetStarted: () => void;
  onOpenProfile: () => void;
}

type NavTab = 'home' | 'premium' | 'tips' | 'aviator' | 'profile';

interface LeagueCategory {
  code: string;
  label: string;
  icon: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  initialTab = 'home',
  onGoToGetStarted,
  onOpenProfile,
}) => {
  // Navigation & Filters
  const [activeTab, setActiveTab] = useState<NavTab>(initialTab);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  // Selected League replaces previous sport selection
  const [selectedLeague, setSelectedLeague] = useState<string>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('all');

  // Master Match Pool with live API syncing strictly for Today and Tomorrow
  const [allMatches, setAllMatches] = useState<Match[]>(() => {
    const cached = FootballApiService.getCachedMatches();
    // Only accept valid today or tomorrow matches to prevent old cached dates
    const validCached = cached.filter((c) => c.date === 'Today' || c.date === 'Tomorrow');
    if (validCached.length > 0) {
      const existingIds = new Set(validCached.map((c) => c.id));
      return [...validCached, ...MATCHES_DATA.filter((m) => !existingIds.has(m.id))];
    }
    return MATCHES_DATA;
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string>('');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);
  const [apiTokenInput, setApiTokenInput] = useState<string>(FootballApiService.getToken());
  const [tokenTestResult, setTokenTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Modals & Drawers
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedMatchForDetail, setSelectedMatchForDetail] = useState<Match | null>(null);

  // Search extended inline state & input ref
  const [isSearchExtended, setIsSearchExtended] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // User Balance & Bets
  const [balance, setBalance] = useState<number>(145.5);
  const [freeBets, setFreeBets] = useState<number>(30);
  const [isPromoClaimed, setIsPromoClaimed] = useState(false);
  const [betSlipItems, setBetSlipItems] = useState<BetSlipItem[]>([]);
  const [placedBets, setPlacedBets] = useState<
    { id: string; teams: string; stake: number; odds: number; returnAmt: number; date: string }[]
  >([
    {
      id: 'b-1',
      teams: 'Arsenal vs Chelsea',
      stake: 20,
      odds: 2.10,
      returnAmt: 42.0,
      date: 'Today 19:45',
    },
  ]);

  // Current promo index
  const [currentPromoIdx, setCurrentPromoIdx] = useState(0);

  // Sticky header scroll detection
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setIsScrolled(scrollY > 5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, []);

  // Automatic live sync on load if API token is stored
  useEffect(() => {
    if (FootballApiService.hasToken()) {
      handleSyncMatches();
    }
  }, []);

  // Leagues List that replaces the top sports categories:
  // 1. All Leagues (replaces football)
  // 2. Champions League & Premier League (replace basketball and other demo sports)
  // 3. Other premier football leagues
  const leaguesList: LeagueCategory[] = [
    { code: 'ALL', label: 'All Leagues', icon: '🌐' },
    { code: 'CL', label: 'Champions League', icon: '🏆' },
    { code: 'PL', label: 'Premier League', icon: '🦁' },
    { code: 'PD', label: 'La Liga', icon: '🇪🇸' },
    { code: 'SA', label: 'Serie A', icon: '🇮🇹' },
    { code: 'BL1', label: 'Bundesliga', icon: '🇩🇪' },
    { code: 'FL1', label: 'Ligue 1', icon: '🇫🇷' },
  ];

  // Live Football-Data.org API Pull for Today & Tomorrow
  const handleSyncMatches = async (leagueCode = selectedLeague) => {
    setIsSyncing(true);
    setSyncNotice('');
    try {
      const code = leagueCode === 'ALL' ? undefined : leagueCode;
      const res = await FootballApiService.fetchMatches(code);
      if (res.matches.length > 0) {
        setAllMatches((prev) => {
          const newIds = new Set(res.matches.map((m) => m.id));
          return [...res.matches, ...prev.filter((m) => !newIds.has(m.id))];
        });
        setSyncNotice(`Synced ${res.matches.length} live matches from Football API!`);
      } else if (res.error) {
        setSyncNotice(res.error);
      } else {
        setSyncNotice('Today & tomorrow matches refreshed!');
      }
    } catch {
      setSyncNotice('Sync completed');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncNotice(''), 4500);
    }
  };

  // Test and save API token
  const handleTestToken = async () => {
    if (!apiTokenInput.trim()) {
      setTokenTestResult({ success: false, message: 'Please enter a valid Football-Data.org token.' });
      return;
    }
    const res = await FootballApiService.testConnection(apiTokenInput.trim());
    setTokenTestResult(res);
  };

  const handleSaveToken = async () => {
    FootballApiService.setToken(apiTokenInput.trim());
    setIsTokenModalOpen(false);
    if (apiTokenInput.trim()) {
      await handleSyncMatches();
    }
  };

  // Filter matches based on selected League and Date (Today / Tomorrow / All)
  const filteredMatches = allMatches.filter((m) => {
    if (selectedDate !== 'all' && m.date !== selectedDate) return false;
    if (selectedLeague !== 'ALL' && m.leagueCode !== selectedLeague) return false;
    return true;
  });

  const handleSelectOdd = (match: Match, teamName: string, odds: number) => {
    setBetSlipItems((prev) => {
      const exists = prev.find((item) => item.matchId === match.id && item.selection === teamName);
      if (exists) {
        return prev.filter((item) => item.id !== exists.id);
      }
      const withoutSameMatch = prev.filter((item) => item.matchId !== match.id);
      return [
        ...withoutSameMatch,
        {
          id: `${match.id}-${teamName}-${Date.now()}`,
          matchId: match.id,
          matchTitle: `${match.team1.name} vs ${match.team2.name}`,
          selection: teamName,
          odds,
          stake: 10,
        },
      ];
    });
  };

  const isOddSelected = (matchId: string, teamName: string) => {
    return betSlipItems.some((item) => item.matchId === matchId && item.selection === teamName);
  };

  const handlePlaceBet = (totalStake: number, potentialReturn: number, items: BetSlipItem[]) => {
    setBalance((prev) => Math.max(0, prev - totalStake));
    const newPlaced = items.map((it) => ({
      id: `ticket-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      teams: it.matchTitle,
      stake: totalStake / items.length,
      odds: it.odds,
      returnAmt: (totalStake / items.length) * it.odds,
      date: 'Just now',
    }));
    setPlacedBets((prev) => [...newPlaced, ...prev]);
  };

  const handleClaimPromo = (amt: number) => {
    setFreeBets((prev) => prev + amt);
    setIsPromoClaimed(true);
  };

  const currentPromo = PROMO_BANNERS[currentPromoIdx];

  // Full Page Detail View when a Match is clicked
  if (selectedMatchForDetail) {
    return (
      <div className="relative w-full min-h-screen bg-[#070b05] text-white">
        <MatchDetailPage
          match={selectedMatchForDetail}
          onBack={() => setSelectedMatchForDetail(null)}
          onSelectOdd={handleSelectOdd}
          isOddSelected={isOddSelected}
        />
        <BetSlipDrawer
          items={betSlipItems}
          onRemoveItem={(id) => setBetSlipItems((prev) => prev.filter((it) => it.id !== id))}
          onClearAll={() => setBetSlipItems([])}
          onPlaceBet={handlePlaceBet}
          userBalance={balance}
          freeBetBalance={freeBets}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#070b05] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
      {/* Background glow effects */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-[#2d4615]/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-1/3 left-0 w-80 h-80 bg-[#16270b]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* TOP FLOATING CONTROLS (App Bar) */}
      <header className="fixed top-0 inset-x-0 z-40 w-full flex justify-center pointer-events-none">
        <div className="w-full max-w-md px-4 pt-3 flex items-center justify-between pointer-events-auto">
          {/* User Icon on the left */}
          <div
            className={`transition-all duration-300 transform ${
              isScrolled
                ? 'opacity-0 -translate-y-4 scale-75 pointer-events-none'
                : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <button
              onClick={onOpenProfile}
              className="w-10 h-10 rounded-full bg-[#1b2317]/85 hover:bg-[#253021] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md active:scale-95 shadow-lg shadow-black/40"
              aria-label="User Profile"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ccff00] to-emerald-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#12190e] flex items-center justify-center text-xs font-black text-[#ccff00]">
                  KP
                </div>
              </div>
            </button>
          </div>

          {/* Right Action Icons: Football API Key + Search + Calendar */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Inline Expanding Search Bar */}
            <div
              className={`flex items-center bg-[#1b2317]/85 border border-white/10 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/40 ${
                isSearchExtended ? 'w-48 bg-[#182015] border-[#ccff00]/40' : 'w-10'
              }`}
            >
              <button
                onClick={() => {
                  setIsSearchExtended(!isSearchExtended);
                  if (!isSearchExtended) {
                    setTimeout(() => searchInputRef.current?.focus(), 150);
                  }
                }}
                className="w-10 h-10 shrink-0 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Search matches"
              >
                <Search className={`w-4 h-4 ${isSearchExtended ? 'text-[#ccff00]' : ''}`} />
              </button>

              {isSearchExtended && (
                <div className="flex-1 flex items-center pr-2 animate-fade-in">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search teams, fixtures..."
                    className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-white/40"
                  />
                  <button
                    onClick={() => {
                      if (searchQuery) {
                        setSearchQuery('');
                      } else {
                        setIsSearchExtended(false);
                      }
                    }}
                    className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white cursor-pointer ml-1"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

             {/* Calendar / Fixtures Button */}
             <button
               onClick={() => setIsCalendarOpen(true)}
               className="w-10 h-10 rounded-full bg-[#1b2317]/85 hover:bg-[#253021] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md active:scale-95 shadow-lg shadow-black/40 shrink-0"
               aria-label="Calendar fixtures"
             >
               <Calendar className="w-4 h-4" />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-16 pb-28 flex-1 flex flex-col">
        {/* Dedicated Search Page View when search is extended */}
        {isSearchExtended ? (
          <div className="mt-4">
            <SearchPageView
              query={searchQuery}
              onQueryChange={setSearchQuery}
              onSelectMatch={(m) => setSelectedMatchForDetail(m)}
              onSelectOdd={handleSelectOdd}
              isOddSelected={isOddSelected}
            />
          </div>
        ) : (
          <>
            {/* Dynamic View based on bottom navigation */}
            {activeTab === 'home' && (
              <div className="space-y-4 mt-3">
                {/* Section Title & Quick Date Filters (Today / Tomorrow / All) */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-[23px] font-extrabold tracking-tight text-white font-display">
                      Upcoming events
                    </h1>
                    <span className="text-[11px] text-white/50">
                      Showing {filteredMatches.length} fixtures • Today & Tomorrow
                    </span>
                  </div>

                  {/* Today / Tomorrow Quick Toggle */}
                  <div className="flex items-center gap-1 bg-[#141b11] p-1 rounded-xl border border-white/5">
                    {(['all', 'Today', 'Tomorrow'] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => setSelectedDate(d)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          selectedDate === d
                            ? 'bg-[#ccff00] text-black shadow-sm'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        {d === 'all' ? 'All' : d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TOP LEAGUES ROW (Replaced sports section with All Leagues, Champions League, Premier League, etc.)
                    Maintains the exact smooth pill animation when active! */}
                <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
                  {leaguesList.map((league) => {
                    const isSelected = selectedLeague === league.code;
                    if (isSelected) {
                      return (
                        <button
                          key={league.code}
                          onClick={() => {
                            setSelectedLeague(league.code);
                            if (league.code !== 'ALL' && FootballApiService.hasToken()) {
                              handleSyncMatches(league.code);
                            }
                          }}
                          className="shrink-0 flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-[#182015] border border-[#2d3a26] text-white transition-all shadow-md cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#ccff00] flex items-center justify-center text-base shadow-sm shadow-[#ccff00]/40">
                            <span>{league.icon}</span>
                          </div>
                          <span className="text-sm font-bold tracking-tight">
                            {league.label}
                          </span>
                        </button>
                      );
                    }
                    return (
                      <button
                        key={league.code}
                        onClick={() => {
                          setSelectedLeague(league.code);
                          if (league.code !== 'ALL' && FootballApiService.hasToken()) {
                            handleSyncMatches(league.code);
                          }
                        }}
                        className="shrink-0 w-11 h-11 rounded-full bg-[#161c13] hover:bg-[#20291c] border border-white/5 flex items-center justify-center text-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                        title={league.label}
                      >
                        <span>{league.icon}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Optional notification banner if sync notice is present */}
                {syncNotice && (
                  <div className="px-3 py-2 rounded-xl bg-[#141d11] border border-[#ccff00]/30 text-xs text-[#ccff00] font-semibold flex items-center justify-between animate-fade-in">
                    <span>{syncNotice}</span>
                    <button onClick={() => setSyncNotice('')} className="text-white/50 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Featured Promo Card */}
                <div className="space-y-2.5">
                  <div className="relative rounded-[26px] overflow-hidden bg-[#161d13] border border-[#263520] shadow-xl min-h-[165px]">
                    <img
                      src={currentPromo.image}
                      alt="Sports promo"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
                    <div className="relative z-10 p-5 flex flex-col justify-between h-full min-h-[165px]">
                      <div className="max-w-[65%] space-y-1">
                        <h2 className="text-[20px] font-black text-white leading-tight font-display">
                          {currentPromo.title}
                        </h2>
                        <p className="text-white/80 text-[11px] leading-snug">
                          {currentPromo.subtitle}
                        </p>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => setIsPromoOpen(true)}
                          className="px-5 py-2 rounded-full bg-[#ccff00] hover:bg-[#bbf722] active:scale-95 text-black font-extrabold text-xs tracking-tight transition-transform shadow-md shadow-[#ccff00]/30 cursor-pointer"
                        >
                          {currentPromo.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Promo Dots Pagination */}
                  <div className="flex items-center justify-center gap-1.5 pt-0.5">
                    {PROMO_BANNERS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPromoIdx(idx)}
                        className={`transition-all duration-300 rounded-full ${
                          currentPromoIdx === idx
                            ? 'w-6 h-1.5 bg-[#ccff00]'
                            : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* COMPREHENSIVE MATCH CARDS LIST (TODAY & TOMORROW ONLY) */}
                <div className="space-y-3.5">
                  {filteredMatches.length === 0 ? (
                    <div className="py-12 text-center text-white/50 text-xs bg-[#121810] rounded-2xl border border-white/5 p-6">
                      <p className="font-bold text-white text-sm mb-1">No fixtures for {selectedDate === 'all' ? 'this league' : selectedDate}</p>
                      <p className="text-white/40 mb-3">Check another league or toggle between Today & Tomorrow.</p>
                      <button
                        onClick={() => {
                          setSelectedLeague('ALL');
                          setSelectedDate('all');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#ccff00] text-black font-bold text-xs"
                      >
                        View All Fixtures ({allMatches.length})
                      </button>
                    </div>
                  ) : (
                    filteredMatches.map((match) => {
                      const isTeam1Picked = isOddSelected(match.id, match.team1.name);
                      const isTeam2Picked = isOddSelected(match.id, match.team2.name);

                      return (
                        <div
                          key={match.id}
                          className="relative rounded-[26px] bg-[#161a14] border border-[#252f20] p-4 text-white shadow-xl hover:border-[#34442e] transition-all"
                        >
                          {/* Top Row: Live / Upcoming + League Stage */}
                          <div className="flex items-center justify-between mb-3 text-xs">
                            {match.isLive ? (
                              <div className="flex items-center gap-1.5 text-red-500 font-bold">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span>LIVE {match.minute || ''}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-white/50 text-[11px]">
                                <Clock className="w-3 h-3" />
                                <span>Upcoming • {match.date}</span>
                              </div>
                            )}
                            <span className="text-[#8e9489] text-[11px] font-medium flex items-center gap-1">
                              {match.stage}
                            </span>
                          </div>

                          {/* Center Row: Team 1, Match Title & Group, Team 2 */}
                          <div
                            onClick={() => setSelectedMatchForDetail(match)}
                            className="flex items-center justify-between cursor-pointer py-1"
                          >
                            {/* Team 1 */}
                            <div className="flex flex-col items-center flex-1 text-center">
                              <TeamLogo
                                logoUrl={match.team1.logoUrl}
                                type={match.team1.logoType}
                                name={match.team1.name}
                                size={44}
                                className="mb-1.5"
                              />
                              <span className="text-xs font-bold text-white tracking-tight">
                                {match.team1.name}
                              </span>
                            </div>

                            {/* Center Fixture Info & Live Score */}
                            <div className="flex flex-col items-center justify-center px-2 text-center flex-1">
                              {match.team1.score !== undefined && match.team2.score !== undefined ? (
                                <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#20271d] border border-white/10 mb-1">
                                  <span className="text-base font-black font-display text-white">
                                    {match.team1.score}
                                  </span>
                                  <span className="text-xs text-white/40">:</span>
                                  <span className="text-base font-black font-display text-white">
                                    {match.team2.score}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-xs font-bold text-white/95 leading-tight">
                                  {match.eventTitle}
                                </span>
                              )}
                              <span className="text-[10px] text-white/50 mt-0.5">
                                {match.group}
                              </span>

                              {/* Formations preview */}
                              {match.lineups && (
                                <span className="mt-1 px-2 py-0.5 rounded-full bg-[#ccff00]/10 text-[#ccff00] text-[9px] font-mono font-bold border border-[#ccff00]/20 flex items-center gap-1">
                                  <span>{match.lineups.team1Formation} vs {match.lineups.team2Formation}</span>
                                </span>
                              )}
                            </div>

                            {/* Team 2 */}
                            <div className="flex flex-col items-center flex-1 text-center">
                              <TeamLogo
                                logoUrl={match.team2.logoUrl}
                                type={match.team2.logoType}
                                name={match.team2.name}
                                size={44}
                                className="mb-1.5"
                              />
                              <span className="text-xs font-bold text-white tracking-tight">
                                {match.team2.name}
                              </span>
                            </div>
                          </div>

                          {/* Quick link: View Setup, Lineup & Named Substitutes */}
                          <div
                            onClick={() => setSelectedMatchForDetail(match)}
                            className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/60 hover:text-[#ccff00] cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="text-[#ccff00]">📋</span>
                              <span className="truncate">
                                {match.lineups?.team1Coach
                                  ? `${match.team1.shortName} (${match.lineups.team1Coach}) vs ${match.team2.shortName} (${match.lineups.team2Coach})`
                                  : 'Full Tactical Lineups & Field Setup'}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-[#ccff00] shrink-0 font-bold flex items-center gap-0.5">
                              {match.lineups?.team1Subs ? `${match.lineups.team1Subs.length + match.lineups.team2Subs.length} Bench Subs` : 'Lineup & Subs'}
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>

                          {/* Bottom Row: Left Odds, Curved Center Date Badge (Today/Tomorrow), Right Odds */}
                          <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/5">
                            {/* Team 1 Odds Button */}
                            <button
                              onClick={() => handleSelectOdd(match, match.team1.name, match.team1.odds)}
                              className={`flex-1 py-1.5 px-3 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                                isTeam1Picked
                                  ? 'bg-[#ccff00] text-black font-black'
                                  : 'hover:bg-white/5 text-white'
                              }`}
                            >
                              <span className="text-lg font-black font-mono tracking-tight">
                                {match.team1.odds.toFixed(2)}
                              </span>
                            </button>

                            {/* Center Curved Badge: strictly Today / Tomorrow + Kickoff Time */}
                            <div className="px-3.5 py-1 rounded-xl bg-[#20271d] border border-white/5 flex flex-col items-center justify-center text-center shadow-inner mx-2">
                              <span className="text-[10px] text-[#ccff00] font-bold leading-none">
                                {match.date}
                              </span>
                              <span className="text-[11px] font-mono font-bold text-white leading-none mt-1">
                                {match.time}
                              </span>
                            </div>

                            {/* Team 2 Odds Button */}
                            <button
                              onClick={() => handleSelectOdd(match, match.team2.name, match.team2.odds)}
                              className={`flex-1 py-1.5 px-3 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                                isTeam2Picked
                                  ? 'bg-[#ccff00] text-black font-black'
                                  : 'hover:bg-white/5 text-white'
                              }`}
                            >
                              <span className="text-lg font-black font-mono tracking-tight">
                                {match.team2.odds.toFixed(2)}
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Premium / Subscriptions */}
            {activeTab === 'premium' && (
              <div className="mt-4">
                <SubscriptionView />
              </div>
            )}

            {/* Tab 3: Tips */}
            {activeTab === 'tips' && (
              <div className="mt-4">
                <TipsView
                  onGoToSubscriptions={() => setActiveTab('premium')}
                />
              </div>
            )}

            {/* Tab 4: Aviator */}
            {activeTab === 'aviator' && (
              <div className="mt-4">
                <AviatorView
                  onGoToSubscriptions={() => setActiveTab('premium')}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* BOTTOM FLOATING NAV BAR */}
      <nav className="fixed bottom-0 inset-x-0 z-40 w-full flex justify-center pointer-events-none pb-4 px-4">
        <div className="w-full max-w-md bg-[#131b10]/95 border border-[#27391f] backdrop-blur-xl rounded-[28px] px-3 py-1.5 shadow-2xl shadow-black/80 pointer-events-auto">
          <div className="flex items-center justify-between">
            {/* Tab 1: Home */}
            <button
              onClick={() => setActiveTab('home')}
              className="flex flex-col items-center justify-center py-1 cursor-pointer transition-all active:scale-95 group"
              aria-label="Home"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  activeTab === 'home'
                    ? 'text-[#ccff00]'
                    : 'text-white/50 group-hover:text-white'
                }`}
              >
                <Home className="w-4.5 h-4.5" />
              </div>
              <span
                className={`text-[10px] font-bold tracking-tight mt-0.5 transition-colors ${
                  activeTab === 'home' ? 'text-[#ccff00]' : 'text-white/50 group-hover:text-white/80'
                }`}
              >
                Home
              </span>
            </button>

            {/* Tab 2: Premium */}
            <button
              onClick={() => setActiveTab('premium')}
              className="flex flex-col items-center justify-center py-1 cursor-pointer transition-all active:scale-95 group"
              aria-label="Premium"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  activeTab === 'premium'
                    ? 'text-[#ccff00]'
                    : 'text-white/50 group-hover:text-white'
                }`}
              >
                <Crown className="w-4.5 h-4.5" />
              </div>
              <span
                className={`text-[10px] font-bold tracking-tight mt-0.5 transition-colors ${
                  activeTab === 'premium' ? 'text-[#ccff00]' : 'text-white/50 group-hover:text-white/80'
                }`}
              >
                VIP Club
              </span>
            </button>

            {/* Tab 3: Tips */}
            <button
              onClick={() => setActiveTab('tips')}
              className="flex flex-col items-center justify-center py-1 cursor-pointer transition-all active:scale-95 group"
              aria-label="Tips"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  activeTab === 'tips'
                    ? 'text-[#ccff00]'
                    : 'text-white/50 group-hover:text-white'
                }`}
              >
                <Star className="w-4.5 h-4.5" />
              </div>
              <span
                className={`text-[10px] font-bold tracking-tight mt-0.5 transition-colors ${
                  activeTab === 'tips' ? 'text-[#ccff00]' : 'text-white/50 group-hover:text-white/80'
                }`}
              >
                AI Tips
              </span>
            </button>

            {/* Tab 4: Aviator */}
            <button
              onClick={() => setActiveTab('aviator')}
              className="flex flex-col items-center justify-center py-1 cursor-pointer transition-all active:scale-95 group"
              aria-label="Aviator"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  activeTab === 'aviator'
                    ? 'text-[#ccff00]'
                    : 'text-white/50 group-hover:text-white'
                }`}
              >
                <Plane className="w-4.5 h-4.5" />
              </div>
              <span
                className={`text-[10px] font-bold tracking-tight mt-0.5 transition-colors ${
                  activeTab === 'aviator' ? 'text-[#ccff00]' : 'text-white/50 group-hover:text-white/80'
                }`}
              >
                Aviator
              </span>
            </button>

            {/* Tab 5: Profile */}
            <button
              onClick={onOpenProfile}
              className="flex flex-col items-center justify-center py-1 cursor-pointer transition-all active:scale-95 group"
              aria-label="Profile"
            >
              <div className="w-8 h-8 flex items-center justify-center text-white/50 group-hover:text-white">
                <Menu className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold tracking-tight mt-0.5 text-white/50 group-hover:text-white/80 transition-colors">
                Profile
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Bet Slip Drawer */}
      <BetSlipDrawer
        items={betSlipItems}
        onRemoveItem={(id) => setBetSlipItems((prev) => prev.filter((it) => it.id !== id))}
        onClearAll={() => setBetSlipItems([])}
        onPlaceBet={handlePlaceBet}
        userBalance={balance}
        freeBetBalance={freeBets}
      />

      {/* Promo Modal */}
      <PromoModal
        isOpen={isPromoOpen}
        onClose={() => setIsPromoOpen(false)}
        onClaim={handleClaimPromo}
        isClaimed={isPromoClaimed}
      />

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {/* FOOTBALL DATA API TOKEN MODAL */}
      {isTokenModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md px-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#131b10] border border-[#26371d] p-5 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#ccff00]/15 text-[#ccff00] flex items-center justify-center font-bold">
                  ⚽
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Football-Data.org API</h3>
                  <p className="text-[10px] text-white/50">Plug token to pull all live match fixtures</p>
                </div>
              </div>
              <button
                onClick={() => setIsTokenModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/70">API Token (X-Auth-Token)</label>
              <input
                type="text"
                value={apiTokenInput}
                onChange={(e) => {
                  setApiTokenInput(e.target.value);
                  setTokenTestResult(null);
                }}
                placeholder="e.g. 84f479a928b746..."
                className="w-full px-3 py-2.5 rounded-xl bg-[#0c120a] border border-[#293d20] text-xs font-mono text-[#ccff00] placeholder:text-white/30 focus:outline-none focus:border-[#ccff00]"
              />
              <p className="text-[10px] text-white/40">
                Plug your API token to fetch live matches directly for today and tomorrow. KickPredict automatically caches all fetched matches.
              </p>
            </div>

            {tokenTestResult && (
              <div
                className={`p-2.5 rounded-xl text-xs font-medium ${
                  tokenTestResult.success
                    ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
                    : 'bg-red-950/50 border border-red-500/40 text-red-300'
                }`}
              >
                {tokenTestResult.message}
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleTestToken}
                className="flex-1 py-2.5 rounded-xl bg-[#1b2518] hover:bg-[#23311f] border border-white/10 text-xs font-bold text-white transition-all cursor-pointer"
              >
                Test Connection
              </button>
              <button
                onClick={handleSaveToken}
                className="flex-1 py-2.5 rounded-xl bg-[#ccff00] hover:bg-[#bbf722] text-black text-xs font-extrabold shadow-md shadow-[#ccff00]/30 transition-all cursor-pointer"
              >
                Save & Pull All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
