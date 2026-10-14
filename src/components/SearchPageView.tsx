import React, { useState, useMemo } from 'react';
import {
  Search,
  Radio,
  Trophy,
  Flame,
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Match, MATCHES_DATA } from '../data/mockData';
import { TeamLogo } from './TeamLogo';

interface SearchPageViewProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSelectMatch: (match: Match) => void;
  onSelectOdd: (match: Match, teamName: string, odds: number) => void;
  isOddSelected: (matchId: string, teamName: string) => boolean;
}

type SearchCategory = 'all' | 'live' | 'football' | 'premier' | 'champions';

export const SearchPageView: React.FC<SearchPageViewProps> = ({
  query,
  onQueryChange,
  onSelectMatch,
  onSelectOdd,
  isOddSelected,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');

  const popularTags = [
    'Arsenal vs Chelsea',
    'Barcelona',
    'Real Madrid',
    'Live Now',
    'Champions League',
    'Premier League',
    'High Odds',
  ];

  // Filter matches based on search query and category
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    return MATCHES_DATA.filter((match) => {
      // Category filter
      if (selectedCategory === 'live' && !match.isLive) return false;
      if (selectedCategory === 'football' && match.sport !== 'football') return false;
      if (selectedCategory === 'premier' && !match.stage.toLowerCase().includes('premier')) return false;
      if (selectedCategory === 'champions' && !match.eventTitle.toLowerCase().includes('champions')) return false;

      // Query filter
      if (!q) return true;

      const team1Match = match.team1.name.toLowerCase().includes(q) || match.team1.shortName.toLowerCase().includes(q);
      const team2Match = match.team2.name.toLowerCase().includes(q) || match.team2.shortName.toLowerCase().includes(q);
      const eventMatch = match.eventTitle.toLowerCase().includes(q);
      const stageMatch = match.stage.toLowerCase().includes(q);
      const groupMatch = match.group.toLowerCase().includes(q);
      const tipMatch = match.predictionTip ? match.predictionTip.toLowerCase().includes(q) : false;

      return team1Match || team2Match || eventMatch || stageMatch || groupMatch || tipMatch;
    });
  }, [query, selectedCategory]);

  // Group matches into organized buckets
  const liveMatches = searchResults.filter((m) => m.isLive);
  const upcomingMatches = searchResults.filter((m) => !m.isLive);

  // Extract matching teams
  const matchingTeams = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    const seen = new Set<string>();
    const teams: { name: string; logoType: any; stage: string; form: any[] }[] = [];

    MATCHES_DATA.forEach((m) => {
      if (m.team1.name.toLowerCase().includes(q) && !seen.has(m.team1.name)) {
        seen.add(m.team1.name);
        teams.push({ name: m.team1.name, logoType: m.team1.logoType, stage: m.stage, form: m.team1.form });
      }
      if (m.team2.name.toLowerCase().includes(q) && !seen.has(m.team2.name)) {
        seen.add(m.team2.name);
        teams.push({ name: m.team2.name, logoType: m.team2.logoType, stage: m.stage, form: m.team2.form });
      }
    });
    return teams;
  }, [query]);

  return (
    <div className="w-full space-y-5 animate-fade-in pb-16">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: `All (${searchResults.length})` },
          { id: 'live', label: `🔴 Live (${MATCHES_DATA.filter((m) => m.isLive).length})` },
          { id: 'football', label: '⚽ Football' },
          { id: 'premier', label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League' },
          { id: 'champions', label: '⭐ Champions League' },
        ].map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as SearchCategory)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/30'
                  : 'bg-[#161c13] hover:bg-[#20291c] text-white/70 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Popular Trending Tags when query is short or empty */}
      {!query && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white/60">
            <TrendingUp className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>Trending Sports Searches</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onQueryChange(tag === 'Live Now' ? '' : tag)}
                className="px-3 py-1 rounded-full bg-[#171f14] hover:bg-[#222e1d] text-[11px] font-semibold text-white/80 hover:text-[#ccff00] border border-white/5 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CLUBS & TEAMS FOUND (if matching) */}
      {matchingTeams.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#ccff00]">
            <Shield className="w-3.5 h-3.5" />
            <span>Clubs & Teams Found ({matchingTeams.length})</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {matchingTeams.map((team, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#161c13] border border-[#263520] flex items-center gap-2.5 shadow-md hover:border-[#384e2e] transition-all"
              >
                <TeamLogo type={team.logoType} size={32} />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate">{team.name}</div>
                  <div className="text-[10px] text-white/50 truncate">{team.stage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 1: LIVE FIXTURES */}
      {liveMatches.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-extrabold text-white">
            <span className="flex items-center gap-1.5 text-red-500 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Live In-Play Matches ({liveMatches.length})</span>
            </span>
            <span className="text-[11px] text-white/40">Tap match to view full setup</span>
          </div>

          <div className="space-y-2.5">
            {liveMatches.map((match) => (
              <SearchMatchCard
                key={match.id}
                match={match}
                onSelectMatch={onSelectMatch}
                onSelectOdd={onSelectOdd}
                isOddSelected={isOddSelected}
              />
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: UPCOMING SCHEDULED MATCHES */}
      {upcomingMatches.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-extrabold text-white">
            <span className="flex items-center gap-1.5 text-white/90 uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>Upcoming Fixtures ({upcomingMatches.length})</span>
            </span>
            <span className="text-[11px] text-white/40">Tap match to view full setup</span>
          </div>

          <div className="space-y-2.5">
            {upcomingMatches.map((match) => (
              <SearchMatchCard
                key={match.id}
                match={match}
                onSelectMatch={onSelectMatch}
                onSelectOdd={onSelectOdd}
                isOddSelected={isOddSelected}
              />
            ))}
          </div>
        </div>
      )}

      {/* NO RESULTS FOUND */}
      {searchResults.length === 0 && (
        <div className="py-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#182015] border border-white/5 mx-auto flex items-center justify-center text-white/40">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">No matches found for "{query}"</h3>
          <p className="text-xs text-white/50 max-w-xs mx-auto">
            Try searching for "Arsenal", "Chelsea", "Premier League", or clear your filter.
          </p>
          <button
            onClick={() => {
              onQueryChange('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-full bg-[#ccff00] text-black font-extrabold text-xs shadow-md cursor-pointer"
          >
            Reset Search Filters
          </button>
        </div>
      )}
    </div>
  );
};

// Reusable Search Match Card with full click-to-detail and odds selection
const SearchMatchCard: React.FC<{
  match: Match;
  onSelectMatch: (m: Match) => void;
  onSelectOdd: (m: Match, team: string, odds: number) => void;
  isOddSelected: (matchId: string, team: string) => boolean;
}> = ({ match, onSelectMatch, onSelectOdd, isOddSelected }) => {
  const isTeam1Picked = isOddSelected(match.id, match.team1.name);
  const isTeam2Picked = isOddSelected(match.id, match.team2.name);

  return (
    <div className="rounded-[24px] bg-[#151b12] border border-[#24331e] p-3.5 text-white shadow-xl hover:border-[#384e2e] transition-all">
      {/* Top Header: Live or date + Tournament */}
      <div className="flex items-center justify-between text-xs mb-2">
        {match.isLive ? (
          <div className="flex items-center gap-1.5 text-red-500 font-extrabold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>LIVE {match.minute || "68'"}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-white/50 text-[11px]">
            <Clock className="w-3 h-3 text-[#ccff00]" />
            <span>{match.date} • {match.time}</span>
          </div>
        )}
        <span className="text-[#8e9489] text-[11px] font-medium">{match.stage}</span>
      </div>

      {/* Center Fixture Info: Tap to open full page */}
      <div
        onClick={() => onSelectMatch(match)}
        className="flex items-center justify-between cursor-pointer py-1 group"
      >
        {/* Team 1 */}
        <div className="flex flex-col items-center flex-1 text-center">
          <TeamLogo logoUrl={match.team1.logoUrl} type={match.team1.logoType} name={match.team1.name} size={36} className="mb-1" />
          <span className="text-xs font-bold text-white group-hover:text-[#ccff00] transition-colors truncate max-w-[100px]">
            {match.team1.name}
          </span>
          {match.team1.score !== undefined && (
            <span className="text-lg font-black font-display text-white mt-0.5">
              {match.team1.score}
            </span>
          )}
        </div>

        {/* Center Clash vs */}
        <div className="flex flex-col items-center px-2 text-center flex-1">
          <span className="text-[11px] font-bold text-white/90 leading-tight">
            {match.eventTitle}
          </span>
          <span className="text-[9px] text-[#ccff00] mt-0.5 uppercase tracking-wider flex items-center gap-1">
            <span>Setup & Details</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center flex-1 text-center">
          <TeamLogo logoUrl={match.team2.logoUrl} type={match.team2.logoType} name={match.team2.name} size={36} className="mb-1" />
          <span className="text-xs font-bold text-white group-hover:text-[#ccff00] transition-colors truncate max-w-[100px]">
            {match.team2.name}
          </span>
          {match.team2.score !== undefined && (
            <span className="text-lg font-black font-display text-white mt-0.5">
              {match.team2.score}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Odds Row */}
      <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/5">
        <button
          onClick={() => onSelectOdd(match, match.team1.name, match.team1.odds)}
          className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isTeam1Picked
              ? 'bg-[#ccff00] text-black font-black'
              : 'hover:bg-white/5 text-white/90'
          }`}
        >
          <span className="text-xs font-mono font-bold">{match.team1.odds.toFixed(2)}</span>
        </button>

        <div className="px-2.5 py-0.5 rounded-lg bg-[#1e251b] text-[10px] text-white/60 font-mono mx-2">
          VS
        </div>

        <button
          onClick={() => onSelectOdd(match, match.team2.name, match.team2.odds)}
          className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isTeam2Picked
              ? 'bg-[#ccff00] text-black font-black'
              : 'hover:bg-white/5 text-white/90'
          }`}
        >
          <span className="text-xs font-mono font-bold">{match.team2.odds.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};
