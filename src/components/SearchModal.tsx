import React, { useState } from 'react';
import { Search, X, Trophy, Radio } from 'lucide-react';
import { Match } from '../data/mockData';
import { TeamLogo } from './TeamLogo';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, matches, onSelectMatch }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = matches.filter(
    (m) =>
      m.team1.name.toLowerCase().includes(query.toLowerCase()) ||
      m.team2.name.toLowerCase().includes(query.toLowerCase()) ||
      m.eventTitle.toLowerCase().includes(query.toLowerCase()) ||
      m.group.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-[28px] bg-[#141913] border border-[#2e3d28] p-5 text-white shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 bg-[#1e261a] rounded-full px-4 py-3 border border-[#374930]">
          <Search className="w-5 h-5 text-[#ccff00]" />
          <input
            type="text"
            placeholder="Search teams, matches, or events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-white/40"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-white/70 hover:text-white pl-2 border-l border-white/20"
          >
            Cancel
          </button>
        </div>

        {/* Quick Suggestions / Results */}
        <div className="mt-4 max-h-80 overflow-y-auto space-y-2 no-scrollbar">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-white/50 text-xs">
              No matching sports fixtures found
            </div>
          ) : (
            filtered.map((match) => (
              <div
                key={match.id}
                onClick={() => {
                  onSelectMatch(match);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#1b2217] hover:bg-[#232c1e] transition-colors cursor-pointer border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <TeamLogo type={match.team1.logoType} size={30} />
                    <TeamLogo type={match.team2.logoType} size={30} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{match.team1.name} vs {match.team2.name}</span>
                      {match.isLive && (
                        <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold">
                          <Radio className="w-2.5 h-2.5 animate-pulse" /> Live
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-white/50 flex items-center gap-2">
                      <Trophy className="w-3 h-3 text-[#ccff00]" />
                      <span>{match.eventTitle} • {match.stage}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#ccff00] font-mono">
                    {match.team1.odds} / {match.team2.odds}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
