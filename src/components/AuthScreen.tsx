import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Plus, Check, ChevronLeft, Search, Phone, ChevronDown } from 'lucide-react';

interface AuthScreenProps {
  onCompleteAuth: (userData: { name: string; handle: string; avatar: string; phone?: string; email: string }) => void;
}

interface FootballerAvatar {
  id: string;
  name: string;
  club: string;
  url: string;
}

interface CountryPhoneFormat {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  format: string;
}

const COUNTRIES: CountryPhoneFormat[] = [
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', format: '7123 456789' },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', format: '(555) 019-2834' },
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '🇳🇬', format: '801 234 5678' },
  { name: 'Kenya', code: 'KE', dialCode: '+254', flag: '🇰🇪', format: '712 345 678' },
  { name: 'Egypt', code: 'EG', dialCode: '+20', flag: '🇪🇬', format: '10 1234 5678' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦', format: '82 123 4567' },
  { name: 'Ghana', code: 'GH', dialCode: '+233', flag: '🇬🇭', format: '24 123 4567' },
  { name: 'Uganda', code: 'UG', dialCode: '+256', flag: '🇺🇬', format: '772 123456' },
  { name: 'Spain', code: 'ES', dialCode: '+34', flag: '🇪🇸', format: '612 34 56 78' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷', format: '6 12 34 56 78' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪', format: '151 23456789' },
  { name: 'Italy', code: 'IT', dialCode: '+39', flag: '🇮🇹', format: '312 345 6789' },
  { name: 'Brazil', code: 'BR', dialCode: '+55', flag: '🇧🇷', format: '(11) 91234-5678' },
  { name: 'Argentina', code: 'AR', dialCode: '+54', flag: '🇦🇷', format: '9 11 1234-5678' },
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', format: '98765 43210' },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦', format: '50 123 4567' },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪', format: '50 123 4567' },
  { name: 'Portugal', code: 'PT', dialCode: '+351', flag: '🇵🇹', format: '912 345 678' },
  { name: 'Netherlands', code: 'NL', dialCode: '+31', flag: '🇳🇱', format: '6 12345678' },
  { name: 'Norway', code: 'NO', dialCode: '+47', flag: '🇳🇴', format: '412 34 567' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', format: '(555) 012-3456' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺', format: '412 345 678' },
];

const FOOTBALLER_AVATARS: FootballerAvatar[] = [
  { id: 'salah', name: 'Mohamed Salah', club: 'Liverpool FC', url: '/avatars/salah.jpg' },
  { id: 'haaland', name: 'Erling Haaland', club: 'Manchester City', url: '/avatars/haaland.png' },
  { id: 'mbappe', name: 'Kylian Mbappé', club: 'Real Madrid', url: '/avatars/mbappe.jpg' },
  { id: 'messi', name: 'Lionel Messi', club: 'Inter Miami / Legend', url: '/avatars/messi.jpg' },
  { id: 'ronaldo', name: 'Cristiano Ronaldo', club: 'Al Nassr / CR7', url: '/avatars/ronaldo.jpg' },
  { id: 'bellingham', name: 'Jude Bellingham', club: 'Real Madrid', url: '/avatars/bellingham.png' },
  { id: 'vini', name: 'Vinicius Jr', club: 'Real Madrid', url: '/avatars/vini.png' },
  { id: 'kane', name: 'Harry Kane', club: 'Bayern Munich', url: '/avatars/kane.png' },
  { id: 'yamal', name: 'Lamine Yamal', club: 'FC Barcelona', url: '/avatars/yamal.png' },
  { id: 'lewandowski', name: 'Robert Lewandowski', club: 'FC Barcelona', url: '/avatars/lewandowski.png' },
  { id: 'ronaldinho', name: 'Ronaldinho', club: 'Football Legend', url: '/avatars/ronaldinho.png' },
  { id: 'zidane', name: 'Zinedine Zidane', club: 'Football Legend', url: '/avatars/zidane.png' },
  { id: 'saka', name: 'Bukayo Saka', club: 'Arsenal FC', url: '/avatars/saka.png' },
  { id: 'palmer', name: 'Cole Palmer', club: 'Chelsea FC', url: '/avatars/palmer.png' },
  { id: 'son', name: 'Heung-min Son', club: 'Tottenham Hotspur', url: '/avatars/son.png' },
  { id: 'kdb', name: 'Kevin De Bruyne', club: 'Manchester City', url: '/avatars/kdb.png' },
  { id: 'odegaard', name: 'Martin Ødegaard', club: 'Arsenal FC', url: '/avatars/odegaard.png' },
  { id: 'watkins', name: 'Ollie Watkins', club: 'Aston Villa', url: '/avatars/watkins.png' },
  { id: 'isak', name: 'Alexander Isak', club: 'Newcastle United', url: '/avatars/isak.png' },
  { id: 'fernandes', name: 'Bruno Fernandes', club: 'Manchester United', url: '/avatars/fernandes.png' },
  { id: 'foden', name: 'Phil Foden', club: 'Manchester City', url: '/avatars/foden.png' },
  { id: 'rice', name: 'Declan Rice', club: 'Arsenal FC', url: '/avatars/rice.png' },
  { id: 'trent', name: 'Trent Alexander-Arnold', club: 'Liverpool FC', url: '/avatars/trent.png' },
  { id: 'saliba', name: 'William Saliba', club: 'Arsenal FC', url: '/avatars/saliba.png' },
  { id: 'neymar', name: 'Neymar Jr', club: 'Al Hilal', url: '/avatars/neymar.jpg' },
];

const STADIUM_BANNERS = [
  '/banners/stadium1.jpg',
  '/banners/stadium2.jpg',
  '/banners/stadium3.jpg',
  '/banners/stadium4.jpg',
];

export const AuthScreen: React.FC<AuthScreenProps> = ({ onCompleteAuth }) => {
  const [view, setView] = useState<'form' | 'avatar-select'>('form');
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState('Alex');
  const [email, setEmail] = useState('name@example.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(FOOTBALLER_AVATARS[0].url);
  const [searchQuery, setSearchQuery] = useState('');

  // Multiple stadium background slideshow state
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % STADIUM_BANNERS.length);
    }, 4500);
    return () => clearInterval(bannerInterval);
  }, []);

  // Phone number state
  const [selectedCountry, setSelectedCountry] = useState<CountryPhoneFormat>(COUNTRIES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const handle = `@${username.toLowerCase().replace(/\s+/g, '')}`;
    onCompleteAuth({
      name: isSignUp ? username || 'Alex' : (email.split('@')[0] || 'User'),
      handle: handle,
      avatar: selectedAvatar,
      phone: isSignUp && phoneNumber ? `${selectedCountry.dialCode} ${phoneNumber}` : undefined,
      email: email,
    });
  };

  const filteredPlayers = FOOTBALLER_AVATARS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.club.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // If user is in avatar selection page view
  if (view === 'avatar-select') {
    return (
      <div className="relative w-full min-h-screen bg-[#070b04] text-white flex flex-col px-4 py-5 overflow-y-auto selection:bg-[#ccff00] selection:text-black">
        {/* Top Header */}
        <div className="sticky top-0 z-30 bg-[#070b04]/95 backdrop-blur-md py-3 -mx-4 px-4 border-b border-white/5 flex items-center justify-between">
          <button
            onClick={() => setView('form')}
            className="w-10 h-10 rounded-full bg-[#151d12] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div className="text-center">
            <h1 className="text-base font-bold font-display tracking-tight">Select Footballer Avatar</h1>
            <p className="text-[10px] text-[#8e9489]">Choose from top legendary footballers</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search player or club..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#131a10] border border-[#232f1e] text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ccff00] transition-colors"
          />
        </div>

        {/* Circular Avatars Grid of Real Footballers */}
        <div className="grid grid-cols-3 gap-3.5 my-5 pb-12">
          {filteredPlayers.map((player) => {
            const isSelected = selectedAvatar === player.url;
            return (
              <button
                key={player.id}
                onClick={() => {
                  setSelectedAvatar(player.url);
                  setView('form');
                }}
                className={`group flex flex-col items-center p-3 rounded-2xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#182313] border-[#ccff00] shadow-lg shadow-[#ccff00]/20 scale-102'
                    : 'bg-[#121810] border-white/5 hover:border-white/20 hover:bg-[#161f13]'
                }`}
              >
                <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-white/15 group-hover:border-[#ccff00] transition-colors shadow-md mb-2 bg-[#1b2516]">
                  <img
                    src={player.url}
                    alt={player.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#ccff00]/30 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-[#ccff00] text-black flex items-center justify-center shadow-lg">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-xs font-bold text-white text-center line-clamp-1 font-display tracking-tight">
                  {player.name}
                </span>
                <span className="text-[10px] text-[#8e9489] text-center line-clamp-1 mt-0.5 font-medium">
                  {player.club}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col justify-end overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
      {/* Multiple Auto-Rotating Bright Vibrant Cinematic Stadium Backgrounds */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {STADIUM_BANNERS.map((banner, index) => (
          <img
            key={banner}
            src={banner}
            alt="Stunning Stadium Atmosphere"
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-105 contrast-110 saturate-110 transition-opacity duration-1000 ease-in-out ${
              index === currentBannerIndex ? 'opacity-100 scale-102' : 'opacity-0 scale-100'
            }`}
          />
        ))}
        {/* Subtle balanced gradient overlay so images stay exceptionally bright, clear and vibrant */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1008] via-black/40 to-transparent" />
      </div>

      {/* Bottom Compact Card Container */}
      <div className="relative z-25 w-full rounded-t-[32px] bg-[#0b1008]/95 border-t border-[#222e1c] px-5 py-5 shadow-2xl backdrop-blur-xl animate-fade-in max-h-[92vh] overflow-y-auto">
        {/* Top Header Row with Tabs and Avatar */}
        <div className="flex items-center justify-between mb-4">
          {/* Create Account / Sign In Tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-[#131a10] border border-[#222e1c] max-w-[240px] flex-1">
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer truncate ${
                isSignUp
                  ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer truncate ${
                !isSignUp
                  ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Avatar with Plus Badge */}
          <div className="relative ml-3 shrink-0">
            <button
              type="button"
              onClick={() => setView('avatar-select')}
              className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#ccff00] shadow-lg shadow-[#ccff00]/20 cursor-pointer group bg-[#162013]"
              title="Select Footballer Avatar"
            >
              <img
                src={selectedAvatar}
                alt="Selected Footballer Avatar"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#ccff00] text-black flex items-center justify-center shadow-md">
                <Plus className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </button>
          </div>
        </div>

        {/* Form with smooth animated transition when switching tabs */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div key={isSignUp ? 'signup-fields' : 'signin-fields'} className="space-y-3 animate-fade-in">
            {/* Username Field - Only shown on Create Account */}
            {isSignUp && (
              <div className="animate-fade-in">
                <label className="block text-[10px] font-bold text-white/70 mb-1 font-display uppercase tracking-wider">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="e.g. Alex"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#131910] border border-[#222e1c] text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#ccff00] transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email Address Field (Required for both Create Account & Sign In) */}
            <div>
              <label className="block text-[10px] font-bold text-white/70 mb-1 font-display uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#131910] border border-[#222e1c] text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#ccff00] transition-colors"
                />
              </div>
            </div>

            {/* Phone Number Field with Country Dropdown (Only for Create Account) */}
            {isSignUp && (
              <div className="animate-fade-in">
                <label className="block text-[10px] font-bold text-white/70 mb-1 font-display uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative flex items-center gap-1.5">
                  {/* Country Selector Dropdown Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryPicker(!showCountryPicker)}
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-[#131910] border border-[#222e1c] hover:border-white/20 text-white text-xs transition-colors cursor-pointer shrink-0"
                    >
                      <span className="text-base">{selectedCountry.flag}</span>
                      <span className="font-semibold text-white/90 text-xs">{selectedCountry.dialCode}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-white/40 ml-0.5" />
                    </button>

                    {/* Dropdown Menu Modal */}
                    {showCountryPicker && (
                      <div className="absolute left-0 bottom-full mb-2 w-64 max-h-56 overflow-y-auto bg-[#10170e] border border-[#253520] rounded-2xl shadow-2xl z-50 p-2">
                        <div className="p-1 mb-1.5">
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-white/40" />
                            <input
                              type="text"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Search country or code..."
                              className="w-full pl-8 pr-2 py-1.5 rounded-xl bg-[#172214] border border-[#2a3c24] text-[11px] text-white placeholder-white/30 focus:outline-none focus:border-[#ccff00]"
                            />
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          {filteredCountries.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(c);
                                setShowCountryPicker(false);
                                setCountrySearch('');
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                                selectedCountry.code === c.code
                                  ? 'bg-[#ccff00] text-black font-bold'
                                  : 'text-white/80 hover:bg-[#1a2617] hover:text-white'
                              }`}
                            >
                              <span className="flex items-center gap-2 truncate">
                                <span>{c.flag}</span>
                                <span className="truncate">{c.name}</span>
                              </span>
                              <span className="text-[11px] opacity-75 font-mono shrink-0 ml-1.5">{c.dialCode}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Input with Dynamic Country Format Placeholder */}
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      placeholder={`e.g. ${selectedCountry.format}`}
                      className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-[#131910] border border-[#222e1c] text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Password Field (Required for both Create Account & Sign In) */}
            <div>
              <label className="block text-[10px] font-bold text-white/70 mb-1 font-display uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-12 py-2.5 rounded-2xl bg-[#131910] border border-[#222e1c] text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#ccff00] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Primary Action Button (Create Account / Sign In) */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#ccff00] hover:bg-[#bbf722] active:scale-95 text-black font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#ccff00]/25 cursor-pointer text-center font-display"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Footer Toggle Text */}
        <div className="text-center mt-3 pb-1">
          <p className="text-[11px] text-[#8e9489]">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#ccff00] font-bold hover:underline cursor-pointer ml-1"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
