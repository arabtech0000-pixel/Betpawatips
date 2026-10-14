import React, { useState } from 'react';
import {
  ChevronLeft,
  Share2,
  Star,
  Flame,
  Radio,
  Clock,
  MapPin,
  User,
  Users,
  Shield,
  Activity,
  Award,
  Layers,
  History,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { Match, PlayerLineupItem } from '../data/mockData';
import { TeamLogo } from './TeamLogo';

interface MatchDetailPageProps {
  match: Match;
  onBack: () => void;
  onSelectOdd: (match: Match, teamName: string, odds: number) => void;
  isOddSelected: (matchId: string, teamName: string) => boolean;
}

type DetailTab = 'lineup' | 'stats' | 'timeline' | 'h2h' | 'predictions';

export const MatchDetailPage: React.FC<MatchDetailPageProps> = ({
  match,
  onBack,
  onSelectOdd,
  isOddSelected,
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('lineup');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerLineupItem | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(match.isFavorite || false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isTeam1Picked = isOddSelected(match.id, match.team1.name);
  const isDrawPicked = match.drawOdds ? isOddSelected(match.id, 'Draw') : false;
  const isTeam2Picked = isOddSelected(match.id, match.team2.name);

  // Fallback lineups if not provided in mock data
  const lineups = match.lineups || {
    team1Formation: '4-3-3',
    team2Formation: '4-2-3-1',
    team1Coach: 'Head Coach',
    team2Coach: 'Head Coach',
    team1StartingXI: [
      { number: 1, name: 'Goalkeeper', pos: 'GK', rating: 7.2 },
      { number: 2, name: 'Right Back', pos: 'RB', rating: 7.1 },
      { number: 4, name: 'Center Back 1', pos: 'CB', rating: 7.5 },
      { number: 5, name: 'Center Back 2', pos: 'CB', rating: 7.4 },
      { number: 3, name: 'Left Back', pos: 'LB', rating: 7.0 },
      { number: 6, name: 'Def Midfield', pos: 'DM', rating: 7.6 },
      { number: 8, name: 'Central Mid', pos: 'CM', rating: 7.8 },
      { number: 10, name: 'Playmaker', pos: 'AM', rating: 8.2 },
      { number: 7, name: 'Right Winger', pos: 'RW', rating: 8.0 },
      { number: 9, name: 'Striker', pos: 'ST', rating: 7.9 },
      { number: 11, name: 'Left Winger', pos: 'LW', rating: 7.7 },
    ],
    team2StartingXI: [
      { number: 1, name: 'Goalkeeper', pos: 'GK', rating: 7.0 },
      { number: 24, name: 'Right Back', pos: 'RB', rating: 6.9 },
      { number: 6, name: 'Center Back 1', pos: 'CB', rating: 7.2 },
      { number: 15, name: 'Center Back 2', pos: 'CB', rating: 7.0 },
      { number: 21, name: 'Left Back', pos: 'LB', rating: 6.8 },
      { number: 16, name: 'Pivot 1', pos: 'DM', rating: 7.3 },
      { number: 18, name: 'Pivot 2', pos: 'CM', rating: 7.1 },
      { number: 17, name: 'Right Attack', pos: 'RW', rating: 7.4 },
      { number: 20, name: 'Attacking Mid', pos: 'AM', rating: 8.1 },
      { number: 19, name: 'Left Attack', pos: 'LW', rating: 7.2 },
      { number: 11, name: 'Center Forward', pos: 'ST', rating: 7.5 },
    ],
    team1Subs: ['Sub Player 1', 'Sub Player 2', 'Sub Player 3', 'Sub Player 4', 'Reserve GK'],
    team2Subs: ['Sub Player A', 'Sub Player B', 'Sub Player C', 'Sub Player D', 'Reserve GK'],
  };

  // Fallback stats
  const stats = match.stats || {
    possession: { team1: 54, team2: 46 },
    shotsOnTarget: { team1: 6, team2: 4 },
    totalShots: { team1: 14, team2: 9 },
    corners: { team1: 5, team2: 3 },
    fouls: { team1: 10, team2: 12 },
    yellowCards: { team1: 1, team2: 2 },
    xG: { team1: 1.85, team2: 1.12 },
    passesCompleted: { team1: '450 (86%)', team2: '380 (82%)' },
  };

  // Fallback timeline
  const timeline = match.timeline || [
    { minute: 18, type: 'goal', player: match.team1.name + ' Goal', team: 1, detail: 'Left-foot shot' },
    { minute: 42, type: 'card', player: match.team2.name + ' Defender', team: 2, detail: 'Yellow Card' },
    { minute: 58, type: 'goal', player: match.team2.name + ' Striker', team: 2, detail: 'Header' },
  ];

  // Fallback H2H
  const h2h = match.h2h || [
    { date: '12 Dec 2024', comp: match.stage, score: `${match.team1.name} 2 - 1 ${match.team2.name}`, winner: match.team1.name },
    { date: '28 Apr 2024', comp: match.stage, score: `${match.team2.name} 1 - 1 ${match.team1.name}`, winner: 'Draw' },
    { date: '04 Nov 2023', comp: match.stage, score: `${match.team1.name} 3 - 0 ${match.team2.name}`, winner: match.team1.name },
  ];

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#070b05] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
      {/* Background glow effects */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-[#2d4615]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/3 left-0 w-80 h-80 bg-[#16270b]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* UPPER SECTION: VERY BIG BANNER */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-[#10170d]">
        {/* Banner Image with stadium lights / match atmosphere */}
        <img
          src={match.bannerImage || '/src/assets/images/stadium_match_banner_1791891895353.jpg'}
          alt={`${match.team1.name} vs ${match.team2.name}`}
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b05] via-[#070b05]/60 to-black/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />

        {/* Top Floating Controls on Banner */}
        <div className="absolute top-4 inset-x-0 px-4 flex items-center justify-between z-20">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 flex items-center justify-center text-white backdrop-blur-md active:scale-95 transition-all cursor-pointer shadow-lg"
            aria-label="Back to matches"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Tournament Pill in open space */}
          <div className="px-3.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-xs font-bold tracking-tight text-[#ccff00] flex items-center gap-1.5 shadow-md">
            <span>🏆</span>
            <span>{match.stage}</span>
          </div>

          {/* Right Action Icons: Favorite & Share */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 flex items-center justify-center text-white backdrop-blur-md active:scale-95 transition-all cursor-pointer shadow-lg"
              aria-label="Bookmark match"
            >
              <Star
                className={`w-4 h-4 transition-colors ${
                  isBookmarked ? 'fill-[#ccff00] text-[#ccff00]' : 'text-white/80'
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 flex items-center justify-center text-white backdrop-blur-md active:scale-95 transition-all cursor-pointer shadow-lg"
              aria-label="Share match"
            >
              <Share2 className="w-4 h-4 text-white/80" />
            </button>
          </div>
        </div>

        {/* Status Pill on Banner */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
          {match.isLive ? (
            <div className="px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md border border-red-400/40 text-xs font-extrabold text-white flex items-center gap-1.5 shadow-lg shadow-red-900/40">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>LIVE {match.minute || "68'"}</span>
            </div>
          ) : (
            <div className="px-3 py-1 rounded-full bg-[#1b2317]/90 backdrop-blur-md border border-white/15 text-xs font-medium text-white/90 flex items-center gap-1.5 shadow-md">
              <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>{match.date} • {match.time}</span>
            </div>
          )}

          {match.group && (
            <span className="text-[11px] text-white/70 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
              {match.group}
            </span>
          )}
        </div>

        {copiedLink && (
          <div className="absolute top-16 right-4 z-30 px-3 py-1.5 rounded-xl bg-[#ccff00] text-black text-xs font-bold animate-fade-in shadow-xl">
            Match link copied!
          </div>
        )}
      </div>

      {/* AFTER THE BANNER: SHOW MATCH CLASH (ARSENAL VS CHELSEA) */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 -mt-3 flex-1 flex flex-col pb-24">
        {/* Match Clash Card */}
        <div className="rounded-[28px] bg-[#141a12] border border-[#263520] p-4.5 shadow-2xl backdrop-blur-md mb-4">
          <div className="flex items-center justify-between">
            {/* Team 1 */}
            <div className="flex flex-col items-center flex-1 text-center">
              <div className="relative p-2.5 rounded-2xl bg-[#1b2317] border border-white/5 mb-2 shadow-inner">
                <TeamLogo logoUrl={match.team1.logoUrl} type={match.team1.logoType} name={match.team1.name} size={50} />
              </div>
              <h2 className="text-sm font-black text-white tracking-tight leading-snug">
                {match.team1.name}
              </h2>
              {/* Form Guide */}
              <div className="flex items-center gap-0.5 mt-1.5">
                {match.team1.form.slice(0, 5).map((res, i) => (
                  <span
                    key={i}
                    className={`w-3.5 h-3.5 rounded text-[8px] font-black flex items-center justify-center ${
                      res === 'W'
                        ? 'bg-emerald-500 text-black'
                        : res === 'D'
                        ? 'bg-amber-400 text-black'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {res}
                  </span>
                ))}
              </div>
            </div>

            {/* Score / Center Clash */}
            <div className="flex flex-col items-center justify-center px-3 text-center min-w-[100px]">
              {match.team1.score !== undefined && match.team2.score !== undefined ? (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl font-black font-display text-white">
                    {match.team1.score}
                  </span>
                  <span className="text-xl font-bold text-white/30">:</span>
                  <span className="text-3xl font-black font-display text-white">
                    {match.team2.score}
                  </span>
                </div>
              ) : (
                <div className="px-3 py-1 rounded-xl bg-[#20271d] border border-white/10 text-white font-mono font-bold text-sm mb-1">
                  VS
                </div>
              )}
              <span className="text-[11px] font-extrabold text-[#ccff00] tracking-wider uppercase">
                {match.isLive ? '2nd Half' : match.time}
              </span>
              <span className="text-[10px] text-white/50 mt-0.5">
                {match.date}
              </span>
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center flex-1 text-center">
              <div className="relative p-2.5 rounded-2xl bg-[#1b2317] border border-white/5 mb-2 shadow-inner">
                <TeamLogo logoUrl={match.team2.logoUrl} type={match.team2.logoType} name={match.team2.name} size={50} />
              </div>
              <h2 className="text-sm font-black text-white tracking-tight leading-snug">
                {match.team2.name}
              </h2>
              {/* Form Guide */}
              <div className="flex items-center gap-0.5 mt-1.5">
                {match.team2.form.slice(0, 5).map((res, i) => (
                  <span
                    key={i}
                    className={`w-3.5 h-3.5 rounded text-[8px] font-black flex items-center justify-center ${
                      res === 'W'
                        ? 'bg-emerald-500 text-black'
                        : res === 'D'
                        ? 'bg-amber-400 text-black'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {res}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Match Venue & Details Strip */}
          <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px] text-white/70">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
              <span className="truncate">{match.venue || 'Emirates Stadium, London'}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <User className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
              <span className="truncate">Ref: {match.referee || 'Michael Oliver'}</span>
            </div>
          </div>
        </div>

        {/* FOOTBALL SETUP TABS NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-3">
          {[
            { id: 'lineup', label: 'Setup & Lineup', icon: '📋' },
            { id: 'stats', label: 'Stats & xG', icon: '📊' },
            { id: 'timeline', label: 'Timeline', icon: '⏱️' },
            { id: 'h2h', label: 'H2H History', icon: '⚔️' },
            { id: 'predictions', label: 'AI Prediction', icon: '💡' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DetailTab)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/30'
                    : 'bg-[#151c12] text-white/70 hover:text-white border border-white/5 hover:bg-[#1f281b]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: FOOTBALL SETUP & LINEUP (TACTICAL PITCH VIEW) */}
        {activeTab === 'lineup' && (
          <div className="space-y-4 animate-fade-in">
            {/* Formation Header Bar */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141a12] border border-[#253220] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white">{match.team1.name}</span>
                <span className="px-2 py-0.5 rounded-md bg-[#ccff00]/15 text-[#ccff00] font-mono font-bold">
                  {lineups.team1Formation}
                </span>
              </div>
              <span className="text-white/40 font-mono text-[11px]">FORMATIONS</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400 font-mono font-bold">
                  {lineups.team2Formation}
                </span>
                <span className="font-extrabold text-white">{match.team2.name}</span>
              </div>
            </div>

            {/* 2D REALISTIC FOOTBALL PITCH VIEW */}
            <div className="relative rounded-[26px] overflow-hidden bg-[#133215] border-2 border-[#2b592f] p-4 shadow-2xl min-h-[460px] flex flex-col justify-between select-none">
              {/* Pitch Grass Stripes */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(19,50,21,0.95)_0%,rgba(14,40,16,0.95)_25%,rgba(19,50,21,0.95)_50%,rgba(14,40,16,0.95)_75%,rgba(19,50,21,0.95)_100%)] pointer-events-none" />

              {/* Pitch White Markings */}
              <div className="absolute inset-2.5 border-2 border-white/35 rounded-2xl pointer-events-none">
                {/* Halfway Line */}
                <div className="absolute top-1/2 inset-x-0 h-0.5 bg-white/35 -translate-y-1/2" />
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full border-2 border-white/35 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white/60 -translate-x-1/2 -translate-y-1/2" />
                {/* Top Penalty Box (Team 1) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 border-b-2 border-x-2 border-white/35 rounded-b-lg" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-9 border-b-2 border-x-2 border-white/35 rounded-b-md" />
                {/* Bottom Penalty Box (Team 2) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-20 border-t-2 border-x-2 border-white/35 rounded-t-lg" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-9 border-t-2 border-x-2 border-white/35 rounded-t-md" />
              </div>

              {/* TEAM 1 PITCH SETUP (Top Half) */}
              <div className="relative z-10 space-y-4 pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-white/80 px-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ccff00]" />
                    <span>{match.team1.name} (Attack ↓)</span>
                  </div>
                  <span className="text-[10px] text-white/60">Coach: {lineups.team1Coach}</span>
                </div>

                {/* Team 1 Tactical Grid: GK, Defenders, Midfielders, Attackers */}
                {/* Goalkeeper */}
                <div className="flex justify-center">
                  <PlayerPitchBadge
                    player={lineups.team1StartingXI[0]}
                    teamColor="bg-yellow-400 text-black border-yellow-200"
                    onSelect={() => setSelectedPlayer(lineups.team1StartingXI[0])}
                  />
                </div>

                {/* Defenders (Lineup 1-4) */}
                <div className="flex justify-around px-2">
                  {lineups.team1StartingXI.slice(1, 5).map((p, idx) => (
                    <PlayerPitchBadge
                      key={idx}
                      player={p}
                      teamColor="bg-red-600 text-white border-red-300"
                      onSelect={() => setSelectedPlayer(p)}
                    />
                  ))}
                </div>

                {/* Midfielders (Lineup 5-7) */}
                <div className="flex justify-around px-4">
                  {lineups.team1StartingXI.slice(5, 8).map((p, idx) => (
                    <PlayerPitchBadge
                      key={idx}
                      player={p}
                      teamColor="bg-red-600 text-white border-red-300"
                      onSelect={() => setSelectedPlayer(p)}
                    />
                  ))}
                </div>

                {/* Attackers (Lineup 8-10) */}
                <div className="flex justify-around px-2">
                  {lineups.team1StartingXI.slice(8, 11).map((p, idx) => (
                    <PlayerPitchBadge
                      key={idx}
                      player={p}
                      teamColor="bg-red-600 text-white border-red-300"
                      onSelect={() => setSelectedPlayer(p)}
                    />
                  ))}
                </div>
              </div>

              {/* HALFWAY DIVIDER */}
              <div className="relative z-10 py-3 text-center pointer-events-none">
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-[9px] font-mono tracking-widest text-white/60 border border-white/10 uppercase">
                  Pitch Setup 2026
                </span>
              </div>

              {/* TEAM 2 PITCH SETUP (Bottom Half) */}
              <div className="relative z-10 space-y-4 pb-1">
                {/* Attackers (Lineup 8-10) */}
                <div className="flex justify-around px-2">
                  {lineups.team2StartingXI.slice(8, 11).map((p, idx) => (
                    <PlayerPitchBadge
                      key={idx}
                      player={p}
                      teamColor="bg-blue-600 text-white border-blue-300"
                      onSelect={() => setSelectedPlayer(p)}
                    />
                  ))}
                </div>

                {/* Midfielders (Lineup 5-7) */}
                <div className="flex justify-around px-4">
                  {lineups.team2StartingXI.slice(5, 8).map((p, idx) => (
                    <PlayerPitchBadge
                      key={idx}
                      player={p}
                      teamColor="bg-blue-600 text-white border-blue-300"
                      onSelect={() => setSelectedPlayer(p)}
                    />
                  ))}
                </div>

                {/* Defenders (Lineup 1-4) */}
                <div className="flex justify-around px-2">
                  {lineups.team2StartingXI.slice(1, 5).map((p, idx) => (
                    <PlayerPitchBadge
                      key={idx}
                      player={p}
                      teamColor="bg-blue-600 text-white border-blue-300"
                      onSelect={() => setSelectedPlayer(p)}
                    />
                  ))}
                </div>

                {/* Goalkeeper */}
                <div className="flex justify-center">
                  <PlayerPitchBadge
                    player={lineups.team2StartingXI[0]}
                    teamColor="bg-emerald-400 text-black border-emerald-200"
                    onSelect={() => setSelectedPlayer(lineups.team2StartingXI[0])}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-white/80 px-2 pt-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span>{match.team2.name} (Attack ↑)</span>
                  </div>
                  <span className="text-[10px] text-white/60">Coach: {lineups.team2Coach}</span>
                </div>
              </div>
            </div>

            {/* Selected Player Popover */}
            {selectedPlayer && (
              <div className="p-3.5 rounded-2xl bg-[#1b2317] border border-[#ccff00]/40 flex items-center justify-between animate-fade-in shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ccff00] text-black font-black flex items-center justify-center font-mono text-sm">
                    #{selectedPlayer.number}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{selectedPlayer.name}</h4>
                    <span className="text-[11px] text-[#ccff00] font-mono">
                      Position: {selectedPlayer.pos} • Live Match Rating: {selectedPlayer.rating}★
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="text-xs text-white/50 hover:text-white px-2 py-1 rounded-lg bg-white/5"
                >
                  Close
                </button>
              </div>
            )}

            {/* Substitutes Bench Setup */}
            <div className="rounded-2xl bg-[#141a12] border border-[#253220] p-4 space-y-3">
              <h3 className="text-xs font-black tracking-tight text-white uppercase flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Substitutes Bench</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Team 1 Subs */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#ccff00]">{match.team1.name} Subs</span>
                  <div className="space-y-1">
                    {lineups.team1Subs.map((sub, i) => (
                      <div key={i} className="px-2 py-1 rounded-lg bg-[#1a2217] text-[11px] text-white/80 border border-white/5 truncate">
                        • {sub}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team 2 Subs */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-blue-400">{match.team2.name} Subs</span>
                  <div className="space-y-1">
                    {lineups.team2Subs.map((sub, i) => (
                      <div key={i} className="px-2 py-1 rounded-lg bg-[#1a2217] text-[11px] text-white/80 border border-white/5 truncate">
                        • {sub}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE STATS & xG ANALYTICS */}
        {activeTab === 'stats' && (
          <div className="space-y-3.5 animate-fade-in">
            {/* Expected Goals (xG) Highlight Card */}
            <div className="rounded-2xl bg-gradient-to-r from-[#172213] to-[#121810] border border-[#283821] p-4 shadow-xl">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold text-[#ccff00] text-sm font-mono">{stats.xG.team1}</span>
                <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider">
                  Expected Goals (xG)
                </span>
                <span className="font-extrabold text-blue-400 text-sm font-mono">{stats.xG.team2}</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/10 overflow-hidden flex">
                <div
                  style={{ width: `${(stats.xG.team1 / (stats.xG.team1 + stats.xG.team2)) * 100}%` }}
                  className="h-full bg-[#ccff00]"
                />
                <div
                  style={{ width: `${(stats.xG.team2 / (stats.xG.team1 + stats.xG.team2)) * 100}%` }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>

            {/* Match Stats Comparison List */}
            <div className="rounded-2xl bg-[#141a12] border border-[#253220] p-4 space-y-4">
              <h3 className="text-xs font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>In-Depth Match Statistics</span>
              </h3>

              {/* Possession */}
              <StatComparisonRow
                label="Ball Possession"
                val1={`${stats.possession.team1}%`}
                val2={`${stats.possession.team2}%`}
                num1={stats.possession.team1}
                num2={stats.possession.team2}
              />

              {/* Shots on Target */}
              <StatComparisonRow
                label="Shots on Target"
                val1={stats.shotsOnTarget.team1}
                val2={stats.shotsOnTarget.team2}
                num1={stats.shotsOnTarget.team1}
                num2={stats.shotsOnTarget.team2}
              />

              {/* Total Shots */}
              <StatComparisonRow
                label="Total Shots"
                val1={stats.totalShots.team1}
                val2={stats.totalShots.team2}
                num1={stats.totalShots.team1}
                num2={stats.totalShots.team2}
              />

              {/* Corner Kicks */}
              <StatComparisonRow
                label="Corner Kicks"
                val1={stats.corners.team1}
                val2={stats.corners.team2}
                num1={stats.corners.team1}
                num2={stats.corners.team2}
              />

              {/* Fouls */}
              <StatComparisonRow
                label="Fouls Committed"
                val1={stats.fouls.team1}
                val2={stats.fouls.team2}
                num1={stats.fouls.team1}
                num2={stats.fouls.team2}
              />

              {/* Yellow Cards */}
              <StatComparisonRow
                label="Yellow Cards"
                val1={stats.yellowCards.team1}
                val2={stats.yellowCards.team2}
                num1={stats.yellowCards.team1}
                num2={stats.yellowCards.team2}
              />

              {/* Passes Completed */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="font-bold text-white font-mono">{stats.passesCompleted.team1}</span>
                <span className="text-white/60 text-[11px]">Passes Completed</span>
                <span className="font-bold text-white font-mono">{stats.passesCompleted.team2}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TIMELINE & KEY EVENTS */}
        {activeTab === 'timeline' && (
          <div className="space-y-3 animate-fade-in">
            <div className="rounded-2xl bg-[#141a12] border border-[#253220] p-4 space-y-3">
              <h3 className="text-xs font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Live Match Events</span>
              </h3>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                {timeline.map((ev, i) => (
                  <div key={i} className="relative flex items-start gap-3 text-xs">
                    {/* Minute Circle Badge */}
                    <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-[#1b2317] border border-[#ccff00]/60 flex items-center justify-center font-mono text-[9px] font-bold text-[#ccff00]">
                      {ev.minute}'
                    </div>
                    {/* Event Content */}
                    <div className="flex-1 p-2.5 rounded-xl bg-[#1a2217] border border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <span>{ev.type === 'goal' ? '⚽ Goal' : ev.type === 'card' ? '🟨 Card' : '🔁 Sub'}</span>
                          <span>{ev.player}</span>
                        </span>
                        <span className="text-[10px] text-[#ccff00] font-mono">
                          {ev.team === 1 ? match.team1.shortName : match.team2.shortName}
                        </span>
                      </div>
                      {ev.detail && (
                        <p className="text-[11px] text-white/60 mt-0.5">{ev.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HEAD-TO-HEAD (H2H) */}
        {activeTab === 'h2h' && (
          <div className="space-y-3 animate-fade-in">
            <div className="rounded-2xl bg-[#141a12] border border-[#253220] p-4 space-y-3">
              <h3 className="text-xs font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Recent Head-to-Head Encounters</span>
              </h3>

              <div className="space-y-2">
                {h2h.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#1a2217] border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="text-[11px] text-white/50">{item.comp} • {item.date}</div>
                      <div className="font-bold text-white text-sm mt-0.5 font-mono">{item.score}</div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-[#ccff00] font-bold text-[10px]">
                        Winner: {item.winner}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AI ODDS & PREDICTION ANALYSIS */}
        {activeTab === 'predictions' && (
          <div className="space-y-3.5 animate-fade-in">
            {/* AI Win Probability */}
            <div className="rounded-2xl bg-[#141a12] border border-[#253220] p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">{match.team1.name} ({match.winProbabilityTeam1}%)</span>
                <span className="text-[#ccff00] text-[10px] uppercase">AI Calculated Odds</span>
                <span className="text-blue-400">{match.team2.name} ({match.winProbabilityTeam2}%)</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden flex">
                <div
                  style={{ width: `${match.winProbabilityTeam1}%` }}
                  className="h-full bg-[#ccff00]"
                />
                {match.drawProbability && (
                  <div
                    style={{ width: `${match.drawProbability}%` }}
                    className="h-full bg-white/20"
                  />
                )}
                <div
                  style={{ width: `${match.winProbabilityTeam2}%` }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>

            {/* Smart Tip Breakdown */}
            {match.predictionTip && (
              <div className="p-4 rounded-2xl bg-[#182315] border border-[#ccff00]/25 flex items-start gap-3">
                <Flame className="w-5 h-5 text-[#ccff00] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-extrabold text-[#ccff00]">Smart Pick & Tactical Analysis</h4>
                  <p className="text-white/80 text-xs mt-1 leading-relaxed">{match.predictionTip}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FIXED BOTTOM QUICK-PREDICTION ODDS DOCK */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-md w-full px-4 py-3 bg-[#0c1209]/95 backdrop-blur-xl border-t border-[#253220] z-40">
        <div className="flex items-center gap-2">
          {/* Team 1 Odd Button */}
          <button
            onClick={() => onSelectOdd(match, match.team1.name, match.team1.odds)}
            className={`flex-1 py-2.5 px-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              isTeam1Picked
                ? 'bg-[#ccff00] text-black font-black shadow-lg shadow-[#ccff00]/30'
                : 'bg-[#182115] hover:bg-[#232f1f] text-white border border-white/10'
            }`}
          >
            <span className="text-[10px] opacity-75 truncate">{match.team1.name} (1)</span>
            <span className="text-base font-black font-mono mt-0.5">{match.team1.odds.toFixed(2)}</span>
          </button>

          {/* Draw Odd Button (if available) */}
          {match.drawOdds && (
            <button
              onClick={() => onSelectOdd(match, 'Draw', match.drawOdds!)}
              className={`flex-1 py-2.5 px-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                isDrawPicked
                  ? 'bg-[#ccff00] text-black font-black shadow-lg shadow-[#ccff00]/30'
                  : 'bg-[#182115] hover:bg-[#232f1f] text-white border border-white/10'
              }`}
            >
              <span className="text-[10px] opacity-75">Draw (X)</span>
              <span className="text-base font-black font-mono mt-0.5">{match.drawOdds.toFixed(2)}</span>
            </button>
          )}

          {/* Team 2 Odd Button */}
          <button
            onClick={() => onSelectOdd(match, match.team2.name, match.team2.odds)}
            className={`flex-1 py-2.5 px-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
              isTeam2Picked
                ? 'bg-[#ccff00] text-black font-black shadow-lg shadow-[#ccff00]/30'
                : 'bg-[#182115] hover:bg-[#232f1f] text-white border border-white/10'
            }`}
          >
            <span className="text-[10px] opacity-75 truncate">{match.team2.name} (2)</span>
            <span className="text-base font-black font-mono mt-0.5">{match.team2.odds.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Sub-component: Player Badge on Pitch View
const PlayerPitchBadge: React.FC<{
  player: PlayerLineupItem;
  teamColor: string;
  onSelect: () => void;
}> = ({ player, teamColor, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-center group cursor-pointer active:scale-90 transition-transform"
      title={`${player.name} (${player.pos})`}
    >
      <div
        className={`w-7 h-7 rounded-full ${teamColor} border-2 flex items-center justify-center text-[10px] font-black font-mono shadow-md group-hover:scale-110 transition-transform`}
      >
        {player.number}
      </div>
      <span className="text-[9px] font-bold text-white max-w-[54px] truncate drop-shadow mt-0.5 leading-none">
        {player.name.split(' ').pop()}
      </span>
      <span className="text-[8px] font-mono text-[#ccff00] opacity-80 leading-none">
        {player.rating}★
      </span>
    </button>
  );
};

// Sub-component: Stat Comparison Row
const StatComparisonRow: React.FC<{
  label: string;
  val1: string | number;
  val2: string | number;
  num1: number;
  num2: number;
}> = ({ label, val1, val2, num1, num2 }) => {
  const total = num1 + num2 || 1;
  const pct1 = (num1 / total) * 100;
  const pct2 = (num2 / total) * 100;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-bold text-white">{val1}</span>
        <span className="text-[11px] text-white/60">{label}</span>
        <span className="font-mono font-bold text-white">{val2}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden flex">
        <div style={{ width: `${pct1}%` }} className="h-full bg-[#ccff00]" />
        <div style={{ width: `${pct2}%` }} className="h-full bg-blue-500" />
      </div>
    </div>
  );
};
