import React from 'react';
import { X, Trophy, Flame, Shield, TrendingUp } from 'lucide-react';
import { Match } from '../data/mockData';
import { TeamLogo } from './TeamLogo';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
  onSelectOdd: (match: Match, teamName: string, odds: number) => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  onClose,
  onSelectOdd,
}) => {
  if (!match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-[30px] bg-[#141a12] border border-[#2b3a24] p-5 text-white shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#ccff00]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Stage & Live Info */}
        <div className="text-center pt-1 pb-3">
          <div className="flex items-center justify-center gap-2 text-xs">
            {match.isLive ? (
              <span className="flex items-center gap-1.5 text-red-500 font-bold bg-red-500/10 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live Now
              </span>
            ) : (
              <span className="text-white/60 font-medium">{match.date} • {match.time}</span>
            )}
            <span className="text-white/40">·</span>
            <span className="text-[#ccff00] font-semibold">{match.stage}</span>
          </div>
          <h3 className="text-base font-bold text-white mt-1">{match.eventTitle}</h3>
          <p className="text-xs text-white/50">{match.group}</p>
        </div>

        {/* Head-to-Head Visual */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#1b2318] border border-white/5 my-2">
          {/* Team 1 */}
          <div className="flex flex-col items-center flex-1 text-center">
            <TeamLogo type={match.team1.logoType} size={48} className="mb-2" />
            <span className="text-xs font-bold text-white">{match.team1.name}</span>
            {match.team1.score !== undefined && (
              <span className="text-2xl font-black font-display text-white mt-1">{match.team1.score}</span>
            )}
            <div className="flex gap-1 mt-1.5">
              {match.team1.form.slice(0, 4).map((f, i) => (
                <span
                  key={i}
                  className={`w-3.5 h-3.5 rounded text-[8px] font-bold flex items-center justify-center ${
                    f === 'W' ? 'bg-emerald-500 text-black' : f === 'D' ? 'bg-amber-500 text-black' : 'bg-red-500 text-white'
                  }`}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="px-3 text-center">
            <span className="text-xs font-extrabold text-white/30 tracking-widest">VS</span>
          </div>

          {/* Team 2 */}
          <div className="flex flex-col items-center flex-1 text-center">
            <TeamLogo type={match.team2.logoType} size={48} className="mb-2" />
            <span className="text-xs font-bold text-white">{match.team2.name}</span>
            {match.team2.score !== undefined && (
              <span className="text-2xl font-black font-display text-white mt-1">{match.team2.score}</span>
            )}
            <div className="flex gap-1 mt-1.5">
              {match.team2.form.slice(0, 4).map((f, i) => (
                <span
                  key={i}
                  className={`w-3.5 h-3.5 rounded text-[8px] font-bold flex items-center justify-center ${
                    f === 'W' ? 'bg-emerald-500 text-black' : f === 'D' ? 'bg-amber-500 text-black' : 'bg-red-500 text-white'
                  }`}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Win Probability Bar */}
        <div className="my-3 p-3 rounded-2xl bg-[#192116] border border-white/5">
          <div className="flex justify-between text-xs mb-1.5 font-semibold">
            <span className="text-white/80">{match.winProbabilityTeam1}% Win</span>
            <span className="text-[11px] text-[#ccff00]">AI Win Probability</span>
            <span className="text-white/80">{match.winProbabilityTeam2}% Win</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden flex">
            <div
              style={{ width: `${match.winProbabilityTeam1}%` }}
              className="h-full bg-[#ccff00]"
            />
            <div
              style={{ width: `${100 - match.winProbabilityTeam1 - match.winProbabilityTeam2}%` }}
              className="h-full bg-white/20"
            />
            <div
              style={{ width: `${match.winProbabilityTeam2}%` }}
              className="h-full bg-blue-500"
            />
          </div>
        </div>

        {/* Prediction Insights */}
        {match.predictionTip && (
          <div className="p-3 rounded-2xl bg-[#1a2318] border border-[#ccff00]/15 flex items-start gap-2.5 my-3">
            <Flame className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-[#ccff00]">Smart Pick Analysis</span>
              <p className="text-white/70 text-[11px] mt-0.5">{match.predictionTip}</p>
            </div>
          </div>
        )}

        {/* Pick Odds Buttons */}
        <div className="mt-4 pt-2 border-t border-white/10 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => {
              onSelectOdd(match, match.team1.name, match.team1.odds);
              onClose();
            }}
            className="p-3 rounded-2xl bg-[#1c2519] hover:bg-[#253221] border border-white/10 flex flex-col items-center justify-center transition-all cursor-pointer group"
          >
            <span className="text-[11px] text-white/60 group-hover:text-white">{match.team1.name}</span>
            <span className="text-lg font-black font-mono text-[#ccff00] mt-0.5">{match.team1.odds.toFixed(2)}</span>
          </button>

          <button
            onClick={() => {
              onSelectOdd(match, match.team2.name, match.team2.odds);
              onClose();
            }}
            className="p-3 rounded-2xl bg-[#1c2519] hover:bg-[#253221] border border-white/10 flex flex-col items-center justify-center transition-all cursor-pointer group"
          >
            <span className="text-[11px] text-white/60 group-hover:text-white">{match.team2.name}</span>
            <span className="text-lg font-black font-mono text-[#ccff00] mt-0.5">{match.team2.odds.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
