import React, { useState } from 'react';
import { CheckCircle2, XCircle, Trophy, Sparkles } from 'lucide-react';
import { TeamLogo } from './TeamLogo';
import { TeamLogoKey } from '../data/mockData';

export type TipSituation = 'won' | 'lost' | 'pending';

export interface BettingTip {
  id: string;
  league: string;
  time: string;
  isToday: boolean;
  situation: TipSituation;
  team1: {
    name: string;
    logoType: TeamLogoKey;
    score?: number;
    willWin: boolean;
  };
  team2: {
    name: string;
    logoType: TeamLogoKey;
    score?: number;
    willWin: boolean;
  };
  tipText: string;
  predictedWinner: string;
  odds: number;
  winProbability: number;
}

export const TIPS_DATA: BettingTip[] = [
  {
    id: 'tip-1',
    league: 'UEFA Champions League',
    time: 'Today 20:45',
    isToday: true,
    situation: 'pending',
    team1: { name: 'Real Madrid', logoType: 'realmadrid', willWin: true },
    team2: { name: 'Arsenal', logoType: 'arsenal', willWin: false },
    tipText: 'Real Madrid to Win & Over 1.5 Goals',
    predictedWinner: 'Real Madrid',
    odds: 1.85,
    winProbability: 92,
  },
  {
    id: 'tip-2',
    league: 'UEFA Champions League',
    time: 'Today 20:00',
    isToday: true,
    situation: 'pending',
    team1: { name: 'Barcelona', logoType: 'barcelona', willWin: true },
    team2: { name: 'Chelsea', logoType: 'chelsea', willWin: false },
    tipText: 'Barcelona Full Time Victory',
    predictedWinner: 'Barcelona',
    odds: 2.10,
    winProbability: 88,
  },
  {
    id: 'tip-3',
    league: 'Premier League',
    time: 'Yesterday 17:30',
    isToday: false,
    situation: 'won',
    team1: { name: 'Manchester United', logoType: 'united', score: 2, willWin: true },
    team2: { name: 'Borussia Dortmund', logoType: 'dortmund', score: 1, willWin: false },
    tipText: 'Home Win (1X2)',
    predictedWinner: 'Manchester United',
    odds: 1.72,
    winProbability: 90,
  },
  {
    id: 'tip-4',
    league: 'Champions League',
    time: 'Yesterday 21:00',
    isToday: false,
    situation: 'won',
    team1: { name: 'Bayern Munich', logoType: 'bayern', score: 3, willWin: true },
    team2: { name: 'Paris SG', logoType: 'psg', score: 1, willWin: false },
    tipText: 'Over 2.5 Total Match Goals',
    predictedWinner: 'Bayern Munich',
    odds: 1.95,
    winProbability: 94,
  },
  {
    id: 'tip-5',
    league: 'Premier League',
    time: '14 April',
    isToday: false,
    situation: 'lost',
    team1: { name: 'Arsenal', logoType: 'arsenal', score: 0, willWin: true },
    team2: { name: 'Chelsea', logoType: 'chelsea', score: 1, willWin: false },
    tipText: 'Arsenal Clean Sheet & Win',
    predictedWinner: 'Arsenal',
    odds: 2.45,
    winProbability: 84,
  },
  {
    id: 'tip-6',
    league: 'La Liga Supercup',
    time: '12 April',
    isToday: false,
    situation: 'won',
    team1: { name: 'Barcelona', logoType: 'barcelona', score: 3, willWin: true },
    team2: { name: 'Real Madrid', logoType: 'realmadrid', score: 2, willWin: false },
    tipText: 'Both Teams to Score & Over 2.5',
    predictedWinner: 'Barcelona',
    odds: 1.80,
    winProbability: 89,
  },
];

type TipTab = 'today' | 'pending' | 'won' | 'lost' | 'history';

interface TipsViewProps {
  onSelectTip?: (tip: BettingTip) => void;
  onGoToSubscriptions: () => void;
}

export const TipsView: React.FC<TipsViewProps> = ({ onGoToSubscriptions }) => {
  const [activeTab, setActiveTab] = useState<TipTab>('today');

  const filterTabs: { id: TipTab; label: string }[] = [
    { id: 'today', label: 'Today Tips' },
    { id: 'pending', label: 'Pending' },
    { id: 'won', label: 'Won' },
    { id: 'lost', label: 'Lost' },
    { id: 'history', label: 'History' },
  ];

  const filteredTips = TIPS_DATA.filter((tip) => {
    if (activeTab === 'today') return tip.isToday;
    if (activeTab === 'pending') return tip.situation === 'pending';
    if (activeTab === 'won') return tip.situation === 'won';
    if (activeTab === 'lost') return tip.situation === 'lost';
    if (activeTab === 'history') return true;
    return true;
  });

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white font-display">Winning Tips</h2>
          <p className="text-xs text-white/50">Teams to win and expert predictions</p>
        </div>
        <button
          onClick={onGoToSubscriptions}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ccff00]/15 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold hover:bg-[#ccff00]/25 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>VIP Access</span>
        </button>
      </div>

      {/* Horizontal Scroll Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {filterTabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/25 font-black scale-102'
                  : 'bg-[#151a13] hover:bg-[#1d261a] border border-white/5 text-white/70 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tips Cards List */}
      <div className="space-y-3.5">
        {filteredTips.length === 0 ? (
          <div className="py-12 text-center text-white/50 text-xs rounded-2xl bg-[#141913] border border-white/5 p-6">
            No tips recorded for this filter category yet. Check Today Tips!
          </div>
        ) : (
          filteredTips.map((tip) => {
            return (
              <div
                key={tip.id}
                className="rounded-[26px] bg-[#161a14] border border-[#252f20] p-4 text-white shadow-xl hover:border-[#35432d] transition-all space-y-3"
              >
                {/* 1. Header: League & Time + Status Badge */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-white/60">
                    <span className="font-bold text-white/90">{tip.league}</span>
                    <span>•</span>
                    <span className="text-[11px] text-white/50">{tip.time}</span>
                  </div>

                  {/* Situation Status Badge */}
                  {tip.situation === 'won' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase flex items-center gap-1 tracking-wider">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 stroke-[3]" />
                      <span>WON</span>
                    </span>
                  )}
                  {tip.situation === 'lost' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-black uppercase flex items-center gap-1 tracking-wider">
                      <XCircle className="w-3 h-3 text-red-400 stroke-[3]" />
                      <span>LOST</span>
                    </span>
                  )}
                  {tip.situation === 'pending' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase flex items-center gap-1.5 tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span>PENDING</span>
                    </span>
                  )}
                </div>

                {/* 2. Teams: Team and the other team */}
                <div className="flex items-center justify-between bg-[#192116] rounded-2xl p-3 border border-white/5">
                  {/* Team 1 */}
                  <div className="flex flex-col items-center flex-1 text-center">
                    <TeamLogo type={tip.team1.logoType} size={42} className="mb-1.5" />
                    <span className="text-xs font-bold text-white truncate max-w-[100px]">
                      {tip.team1.name}
                    </span>
                    {tip.team1.score !== undefined && (
                      <span className="text-base font-black font-display text-white mt-0.5">
                        {tip.team1.score}
                      </span>
                    )}
                  </div>

                  {/* Center VS */}
                  <div className="px-3 text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-black text-white/30 tracking-widest">VS</span>
                    <span className="text-[10px] font-mono text-[#ccff00] mt-1 font-bold">
                      {tip.winProbability}%
                    </span>
                  </div>

                  {/* Team 2 */}
                  <div className="flex flex-col items-center flex-1 text-center">
                    <TeamLogo type={tip.team2.logoType} size={42} className="mb-1.5" />
                    <span className="text-xs font-bold text-white truncate max-w-[100px]">
                      {tip.team2.name}
                    </span>
                    {tip.team2.score !== undefined && (
                      <span className="text-base font-black font-display text-white mt-0.5">
                        {tip.team2.score}
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. Then we show the tip */}
                <div className="p-3 rounded-2xl bg-[#1b2418] border border-[#ccff00]/25 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Expert Tip</span>
                      <span className="font-extrabold text-white text-xs">{tip.tipText}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#ccff00] font-bold block">{tip.predictedWinner}</span>
                  </div>
                </div>

                {/* 4. Then we show the odd */}
                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#141b12] border border-white/10">
                  <span className="text-xs text-white/70 font-medium">Market Selection Odd</span>
                  <div className="flex items-center gap-1.5 bg-[#ccff00] text-black px-3.5 py-1 rounded-xl font-black text-sm font-mono shadow-md shadow-[#ccff00]/20">
                    <span>{tip.odds.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
