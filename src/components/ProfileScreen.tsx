import React, { useState } from 'react';
import {
  ChevronLeft,
  Pencil,
  SlidersHorizontal,
  X,
  Home,
  Crown,
  Star,
  Plane,
  Menu,
  Trophy,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileScreenProps {
  onBack: () => void;
  onGoToGetStarted: () => void;
  onNavigateTab?: (tab: 'home' | 'premium' | 'tips' | 'aviator') => void;
  userProfile?: { name: string; handle: string; avatar: string };
}

interface PickItem {
  id: string;
  date: string;
  status: 'WIN' | 'LOSS' | 'PENDING';
  competitionHeader: string;
  competitionSub: string;
  pickType: string;
  team: string;
  profit: string;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBack,
  onGoToGetStarted,
  onNavigateTab,
  userProfile,
}) => {
  const [activeSegment, setActiveSegment] = useState<'picks' | 'premium' | 'socials'>('picks');
  const [subscribedPlan, setSubscribedPlan] = useState<string>('1-month');

  // Filter chips state
  const [showSpreadFilter, setShowSpreadFilter] = useState(true);
  const [showWinFilter, setShowWinFilter] = useState(true);

  // User Profile Data matching Screenshot 3
  const [name, setName] = useState(userProfile?.name || 'Alex');
  const [handle, setHandle] = useState(userProfile?.handle || '@alex');
  const [avatar, setAvatar] = useState(userProfile?.avatar || '/avatars/salah.jpg');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editHandle, setEditHandle] = useState(handle);

  const [picksList] = useState<PickItem[]>([
    {
      id: 'pick-1',
      date: 'Mar 21',
      status: 'WIN',
      competitionHeader: 'UEFA',
      competitionSub: 'Champions League',
      pickType: 'Spread',
      team: 'Manchester City',
      profit: 'Profit: 10,20 Units',
    },
    {
      id: 'pick-2',
      date: 'Mar 21',
      status: 'WIN',
      competitionHeader: 'UEFA',
      competitionSub: 'Champions League',
      pickType: 'Spread',
      team: 'Manchester City',
      profit: 'Profit: 10,20 Units',
    },
    {
      id: 'pick-3',
      date: 'Mar 18',
      status: 'WIN',
      competitionHeader: 'Premier League',
      competitionSub: 'Matchday 29',
      pickType: 'Spread',
      team: 'Arsenal FC',
      profit: 'Profit: 12,50 Units',
    },
  ]);

  const handleSaveProfile = () => {
    if (editName.trim()) setName(editName);
    if (editHandle.trim()) setHandle(editHandle.startsWith('@') ? editHandle : `@${editHandle}`);
    setIsEditing(false);
  };

  const filteredPicks = picksList.filter((item) => {
    if (showSpreadFilter && item.pickType !== 'Spread' && showWinFilter === false) return false;
    if (showWinFilter && item.status !== 'WIN') return false;
    return true;
  });

  return (
    <div className="relative w-full min-h-screen bg-[#0b1008] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
      {/* Ambient background glows matching Screenshot 3 */}
      <div className="fixed top-0 left-0 w-80 h-80 bg-[#2d4715]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed top-1/2 right-0 w-72 h-72 bg-[#1b2d0d]/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-4 pb-28 flex-1 flex flex-col">
        {/* Top Header hanging freely in open space matching Screenshot 3: Sticky at top */}
        <div className="sticky top-0 z-30 pointer-events-none py-3 -mx-4 px-4">
          <div className="relative flex items-center justify-center">
            {/* Back Arrow button on left hanging freely */}
            <button
              onClick={onBack}
              className="absolute left-0 w-10 h-10 rounded-full bg-[#1b2217]/75 hover:bg-[#253021] border border-white/5 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md active:scale-95 pointer-events-auto shadow-md shadow-black/30"
              aria-label="Back to home"
            >
              <ChevronLeft className="w-5 h-5 text-white stroke-[2.5]" />
            </button>

            {/* Centered Title */}
            <h1 className="text-lg font-bold text-white tracking-tight font-display">
              Profile
            </h1>
          </div>
        </div>

        {/* Profile Card matching Screenshot 3 */}
        <div className="mt-4 rounded-[28px] bg-[#151914] border border-[#232d1e] p-4 text-white shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Avatar matching Screenshot */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#2d3a26] shadow-md shrink-0">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Name and Handle */}
            <div>
              <h2 className="text-[17px] font-bold text-white leading-tight font-display">
                {name}
              </h2>
              <p className="text-xs text-[#8e9489] mt-0.5 font-medium">
                {handle}
              </p>
            </div>
          </div>

          {/* Edit Button matching Screenshot 3 */}
          <button
            onClick={() => {
              setEditName(name);
              setEditHandle(handle);
              setIsEditing(true);
            }}
            className="w-10 h-10 rounded-full bg-[#1e261a] hover:bg-[#283523] border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer active:scale-95 shrink-0"
            aria-label="Edit Profile"
          >
            <Pencil className="w-4 h-4 text-white/80" />
          </button>
        </div>

        {/* Segmented Navigation Bar: Picks | Premium | Socials */}
        <div className="mt-4 p-1 rounded-full bg-[#141913] border border-[#222b1c] flex items-center justify-between">
          <button
            onClick={() => setActiveSegment('picks')}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'picks'
                ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/25'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Picks
          </button>
          <button
            onClick={() => setActiveSegment('premium')}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'premium'
                ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/25'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Premium
          </button>
          <button
            onClick={() => setActiveSegment('socials')}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'socials'
                ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/25'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Socials
          </button>
        </div>

        {/* Tab 1: Picks Content matching Screenshot 3 */}
        {activeSegment === 'picks' && (
          <div className="mt-5 space-y-4">
            {/* Subheading: "Picks" */}
            <h3 className="text-xl font-extrabold text-white font-display">
              Picks
            </h3>

            {/* Filter Tags Row matching Screenshot 3 */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {/* Spread filter pill */}
                {showSpreadFilter ? (
                  <button
                    onClick={() => setShowSpreadFilter(false)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ccff00] text-black font-bold text-xs shadow-sm shadow-[#ccff00]/20 cursor-pointer active:scale-95"
                  >
                    <span>Spread</span>
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSpreadFilter(true)}
                    className="px-3.5 py-2 rounded-full bg-[#182015] border border-white/10 text-white/60 text-xs font-medium cursor-pointer"
                  >
                    + Spread
                  </button>
                )}

                {/* Win filter pill */}
                {showWinFilter ? (
                  <button
                    onClick={() => setShowWinFilter(false)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ccff00] text-black font-bold text-xs shadow-sm shadow-[#ccff00]/20 cursor-pointer active:scale-95"
                  >
                    <span>Win</span>
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowWinFilter(true)}
                    className="px-3.5 py-2 rounded-full bg-[#182015] border border-white/10 text-white/60 text-xs font-medium cursor-pointer"
                  >
                    + Win
                  </button>
                )}
              </div>

              {/* Sliders / Tune Filter Button matching Screenshot 3 */}
              <button
                onClick={() => {
                  setShowSpreadFilter(true);
                  setShowWinFilter(true);
                }}
                className="w-10 h-10 rounded-full bg-[#ccff00] hover:bg-[#bbf722] text-black flex items-center justify-center shadow-md shadow-[#ccff00]/20 cursor-pointer active:scale-95 shrink-0"
                aria-label="Filter Options"
              >
                <SlidersHorizontal className="w-4 h-4 text-black stroke-[2.5]" />
              </button>
            </div>

            {/* List of Pick Cards matching Screenshot 3 */}
            <div className="space-y-3 pt-1">
              {filteredPicks.map((pick) => (
                <div
                  key={pick.id}
                  className="rounded-[26px] bg-[#161a14] border border-[#252f20] p-4 text-white shadow-xl hover:border-[#35432d] transition-all space-y-2"
                >
                  {/* Top row: Date on left, WIN badge on right */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8e9489] text-[11px] font-medium">
                      {pick.date}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#1d261a] border border-[#ccff00]/20 text-[#ccff00] font-black text-[10px] tracking-wide">
                      {pick.status}
                    </span>
                  </div>

                  {/* Competition Title */}
                  <div className="pt-0.5">
                    <h4 className="text-[22px] font-black text-white leading-none font-display">
                      {pick.competitionHeader}
                    </h4>
                    <p className="text-xs text-white/85 font-medium mt-1">
                      {pick.competitionSub}
                    </p>
                  </div>

                  {/* Pick Type & Result Outcome */}
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-[11px] text-[#8e9489]">
                      Pick type: {pick.pickType}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-white">
                        {pick.team}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#ccff00]">
                        {pick.profit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Premium Subscriptions */}
        {activeSegment === 'premium' && (
          <div className="mt-5 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-white font-display">
                  Premium Subscriptions
                </h3>
                <p className="text-xs text-white/50">Access winning tips & Aviator predictor</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#ccff00]/15 text-[#ccff00] text-[10px] font-black uppercase tracking-wider border border-[#ccff00]/30">
                VIP Access
              </span>
            </div>

            {/* Current Active Plan Badge */}
            <div className="rounded-[24px] bg-[#172014] border border-[#2b3a24] p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ccff00] text-black flex items-center justify-center font-bold shadow-md shadow-[#ccff00]/20">
                  <Crown className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase font-black tracking-wider">Active Subscription</span>
                  <h4 className="text-sm font-extrabold text-white">
                    {subscribedPlan === '1-week' ? '1 Week Pass (Active)' : subscribedPlan === '1-month' ? '1 Month Pass (Active)' : 'VIP Infinity Pass (Active)'}
                  </h4>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>

            {/* 3 Subscription Tiers matching User Specs */}
            <div className="space-y-3">
              {/* Tier 1: 1 Week */}
              <div
                className={`rounded-[24px] bg-[#151a13] border p-4 transition-all ${
                  subscribedPlan === '1-week' ? 'border-[#ccff00] shadow-md shadow-[#ccff00]/15' : 'border-[#232c1e]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-white tracking-tight">1 Week Plan</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black font-mono text-[#ccff00]">25,000 UGX</span>
                    <span className="text-[10px] text-white/40 block">/ 1 week</span>
                  </div>
                </div>
                <p className="text-xs text-white/70 leading-relaxed mb-3">
                  Full access to daily betting tips and the Aviator predictor for one week.
                </p>
                <button
                  onClick={() => {
                    setSubscribedPlan('1-week');
                    confetti({ particleCount: 30, spread: 50, colors: ['#ccff00', '#ffffff'] });
                  }}
                  className={`w-full py-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    subscribedPlan === '1-week'
                      ? 'bg-white/10 text-white/80 border border-white/15'
                      : 'bg-[#ccff00] hover:bg-[#bbf722] text-black shadow-md shadow-[#ccff00]/25'
                  }`}
                >
                  {subscribedPlan === '1-week' ? '✓ Currently Active' : 'Subscribe for 25,000 UGX'}
                </button>
              </div>

              {/* Tier 2: 1 Month */}
              <div
                className={`rounded-[24px] bg-[#151a13] border p-4 transition-all ${
                  subscribedPlan === '1-month' ? 'border-[#ccff00] shadow-md shadow-[#ccff00]/15' : 'border-[#232c1e]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-white tracking-tight">1 Month Plan</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#ccff00]/20 text-[#ccff00] text-[9px] font-black uppercase">
                      Popular
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black font-mono text-[#ccff00]">55,000 UGX</span>
                    <span className="text-[10px] text-white/40 block">/ 1 month</span>
                  </div>
                </div>
                <p className="text-xs text-white/70 leading-relaxed mb-3">
                  Full access to daily betting tips and the Aviator predictor for one full month.
                </p>
                <button
                  onClick={() => {
                    setSubscribedPlan('1-month');
                    confetti({ particleCount: 40, spread: 60, colors: ['#ccff00', '#ffffff'] });
                  }}
                  className={`w-full py-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    subscribedPlan === '1-month'
                      ? 'bg-white/10 text-white/80 border border-white/15'
                      : 'bg-[#ccff00] hover:bg-[#bbf722] text-black shadow-md shadow-[#ccff00]/25'
                  }`}
                >
                  {subscribedPlan === '1-month' ? '✓ Currently Active' : 'Subscribe for 55,000 UGX'}
                </button>
              </div>

              {/* Tier 3: VIP Infinity */}
              <div
                className={`rounded-[24px] bg-gradient-to-br from-[#1a2316] to-[#121910] border p-4 transition-all ${
                  subscribedPlan === 'vip' ? 'border-[#ccff00] shadow-md shadow-[#ccff00]/15' : 'border-[#2f4227]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-black uppercase text-amber-400 tracking-tight">VIP Infinity Plan</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black font-mono text-[#ccff00]">90,000 UGX</span>
                    <span className="text-[10px] text-white/40 block">/ VIP Infinity</span>
                  </div>
                </div>
                <p className="text-xs text-white/70 leading-relaxed mb-3">
                  VIP tips, higher accuracy algorithmic predictions, and infinity tips daily with priority Aviator signals.
                </p>
                <button
                  onClick={() => {
                    setSubscribedPlan('vip');
                    confetti({ particleCount: 50, spread: 70, colors: ['#ccff00', '#f59e0b', '#ffffff'] });
                  }}
                  className={`w-full py-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    subscribedPlan === 'vip'
                      ? 'bg-white/10 text-white/80 border border-white/15'
                      : 'bg-gradient-to-r from-[#ccff00] to-lime-300 text-black shadow-md shadow-[#ccff00]/30'
                  }`}
                >
                  {subscribedPlan === 'vip' ? '✓ VIP Active' : 'Unlock VIP for 90,000 UGX'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Socials & Follow */}
        {activeSegment === 'socials' && (
          <div className="mt-5 space-y-4">
            <h3 className="text-xl font-extrabold text-white font-display">
              Socials & Ranking
            </h3>
            <div className="rounded-[26px] bg-[#161a14] border border-[#252f20] p-5 text-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Global Ranking</h4>
                  <p className="text-xs text-[#ccff00] font-semibold">Rank #4 this week</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#ccff00]/15 flex items-center justify-center text-[#ccff00]">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>

              <div className="flex gap-4 text-xs pt-2 border-t border-white/5">
                <div>
                  <span className="font-black text-white text-sm">14.8K</span>
                  <p className="text-white/40">Followers</p>
                </div>
                <div>
                  <span className="font-black text-white text-sm">92</span>
                  <p className="text-white/40">Following</p>
                </div>
                <div>
                  <span className="font-black text-[#ccff00] text-sm">82.4%</span>
                  <p className="text-white/40">Accuracy</p>
                </div>
              </div>
            </div>

            {/* Return to Get Started Slider Button */}
            <button
              onClick={onGoToGetStarted}
              className="w-full py-3 rounded-full bg-[#182116] hover:bg-[#222e1f] border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>View Get Started Intro Slider</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating Bottom Navigation Bar with Icons & Names matching Home */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-md mx-auto px-3 pb-3">
          <div className="pointer-events-auto rounded-[32px] bg-[#0d120a]/95 border border-white/10 backdrop-blur-xl px-2 py-2.5 shadow-2xl grid grid-cols-5 items-center">
            {/* Tab 1: Home */}
            <button
              onClick={onBack}
              className="flex flex-col items-center justify-center py-1 cursor-pointer transition-all active:scale-95 group"
              aria-label="Home"
            >
              <div className="w-8 h-8 flex items-center justify-center text-white/50 group-hover:text-white">
                <Home className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold tracking-tight mt-0.5 text-white/50 group-hover:text-white/80 transition-colors">
                Home
              </span>
            </button>

            {/* Tab 2: Premium */}
            <button
              onClick={() => {
                if (onNavigateTab) onNavigateTab('premium');
                else onBack();
              }}
              className="flex flex-col items-center justify-center py-1 cursor-pointer transition-all active:scale-95 group"
              aria-label="Premium Subscriptions"
            >
              <div className="w-8 h-8 flex items-center justify-center text-white/50 group-hover:text-white">
                <Crown className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold tracking-tight mt-0.5 text-white/50 group-hover:text-white/80 transition-colors">
                Premium
              </span>
            </button>

            {/* Tab 3: Tips */}
            <button
              onClick={() => {
                if (onNavigateTab) onNavigateTab('tips');
                else onBack();
              }}
              className="flex flex-col items-center justify-center py-1 cursor-pointer transition-all active:scale-95 group"
              aria-label="Betting Tips"
            >
              <div className="w-8 h-8 flex items-center justify-center text-white/50 group-hover:text-white">
                <Star className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold tracking-tight mt-0.5 text-white/50 group-hover:text-white/80 transition-colors">
                Tips
              </span>
            </button>

            {/* Tab 4: Aviator */}
            <button
              onClick={() => {
                if (onNavigateTab) onNavigateTab('aviator');
                else onBack();
              }}
              className="flex flex-col items-center justify-center py-1 cursor-pointer transition-all active:scale-95 group"
              aria-label="Aviator Predictions"
            >
              <div className="w-8 h-8 flex items-center justify-center text-white/50 group-hover:text-white">
                <Plane className="w-4.5 h-4.5 transform rotate-45" />
              </div>
              <span className="text-[10px] font-bold tracking-tight mt-0.5 text-white/50 group-hover:text-white/80 transition-colors">
                Aviator
              </span>
            </button>

            {/* Tab 5: Profile Active */}
            <button
              className="flex flex-col items-center justify-center py-1 cursor-pointer transition-all active:scale-95 group"
              aria-label="Profile Active"
            >
              <div className="w-10 h-10 rounded-full bg-[#ccff00] flex items-center justify-center text-black shadow-lg shadow-[#ccff00]/30">
                <Menu className="w-4.5 h-4.5 text-black stroke-[2.5]" />
              </div>
              <span className="text-[10px] font-bold tracking-tight mt-0.5 text-[#ccff00]">
                Profile
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xs rounded-[28px] bg-[#161a14] border border-[#2b3a24] p-5 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold font-display">Edit Profile</h3>
              <button onClick={() => setIsEditing(false)} className="text-white/60 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-white/60 uppercase">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#1f281b] border border-white/10 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-white/60 uppercase">Username / Handle</label>
                <input
                  type="text"
                  value={editHandle}
                  onChange={(e) => setEditHandle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#1f281b] border border-white/10 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                />
              </div>

              <button
                onClick={handleSaveProfile}
                className="w-full py-2.5 mt-2 rounded-full bg-[#ccff00] hover:bg-[#bbf722] text-black font-extrabold text-xs cursor-pointer shadow-md shadow-[#ccff00]/25"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
