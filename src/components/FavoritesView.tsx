import React from 'react';
import { Star, Shield, ArrowRight } from 'lucide-react';
import { Match } from '../data/mockData';
import { TeamLogo } from './TeamLogo';

interface FavoritesViewProps {
  favorites: Match[];
  onSelectMatch: (match: Match) => void;
  onToggleFavorite: (id: string) => void;
  onSelectOdd: (match: Match, teamName: string, odds: number) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onSelectMatch,
  onToggleFavorite,
  onSelectOdd,
}) => {
  if (favorites.length === 0) {
    return (
      <div className="py-16 text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/30">
          <Star className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-white">No Favorite Matches Yet</h3>
        <p className="text-xs text-white/50 max-w-xs mx-auto">
          Tap the star icon on any match card to bookmark it for fast tracking and live notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-16 animate-fade-in">
      <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 px-1">
        Your Starred Fixtures ({favorites.length})
      </h3>
      {favorites.map((match) => (
        <div
          key={match.id}
          className="rounded-[26px] bg-[#171b15] border border-[#263321] p-4 text-white shadow-lg space-y-3"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#ccff00] font-semibold">{match.eventTitle} • {match.stage}</span>
            <button
              onClick={() => onToggleFavorite(match.id)}
              className="text-amber-400 p-1"
            >
              <Star className="w-4 h-4 fill-amber-400" />
            </button>
          </div>

          <div
            onClick={() => onSelectMatch(match)}
            className="flex items-center justify-between cursor-pointer py-1"
          >
            <div className="flex items-center gap-2">
              <TeamLogo type={match.team1.logoType} size={36} />
              <span className="text-xs font-bold text-white">{match.team1.name}</span>
            </div>
            <span className="text-[11px] font-mono text-white/40">{match.date} {match.time}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{match.team2.name}</span>
              <TeamLogo type={match.team2.logoType} size={36} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
            <button
              onClick={() => onSelectOdd(match, match.team1.name, match.team1.odds)}
              className="py-2 rounded-xl bg-[#1f281b] hover:bg-[#283523] text-xs font-bold text-center text-white"
            >
              {match.team1.name} @ <span className="text-[#ccff00] font-mono">{match.team1.odds.toFixed(2)}</span>
            </button>
            <button
              onClick={() => onSelectOdd(match, match.team2.name, match.team2.odds)}
              className="py-2 rounded-xl bg-[#1f281b] hover:bg-[#283523] text-xs font-bold text-center text-white"
            >
              {match.team2.name} @ <span className="text-[#ccff00] font-mono">{match.team2.odds.toFixed(2)}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
