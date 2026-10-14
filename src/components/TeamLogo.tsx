import React, { useState } from 'react';
import { TeamLogoKey } from '../data/mockData';

interface TeamLogoProps {
  type?: TeamLogoKey;
  logoUrl?: string;
  name?: string;
  className?: string;
  size?: number;
}

const TEAM_CREST_MAP: Record<string, string> = {
  'Real Madrid': 'https://crests.football-data.org/86.png',
  'Barcelona': 'https://crests.football-data.org/81.png',
  'Arsenal': 'https://crests.football-data.org/57.png',
  'Chelsea': 'https://crests.football-data.org/61.png',
  'Manchester United': 'https://crests.football-data.org/66.png',
  'United': 'https://crests.football-data.org/66.png',
  'Manchester City': 'https://crests.football-data.org/65.png',
  'Liverpool': 'https://crests.football-data.org/64.png',
  'Bayern Munich': 'https://crests.football-data.org/5.png',
  'Paris SG': 'https://crests.football-data.org/524.png',
  'Inter Milan': 'https://crests.football-data.org/108.png',
  'AC Milan': 'https://crests.football-data.org/98.png',
  'Juventus': 'https://crests.football-data.org/109.png',
  'Borussia Dortmund': 'https://crests.football-data.org/4.png',
  'Everton': 'https://crests.football-data.org/62.png',
  'Brentford': 'https://crests.football-data.org/402.png',
  'Fulham': 'https://crests.football-data.org/63.png',
  'Newcastle United': 'https://crests.football-data.org/67.png',
  'Aston Villa': 'https://crests.football-data.org/58.png',
  'Bournemouth': 'https://crests.football-data.org/1044.png',
  'Sunderland': 'https://crests.football-data.org/71.png',
  'Brighton & Hove Albion': 'https://crests.football-data.org/397.png',
  'Crystal Palace': 'https://crests.football-data.org/354.png',
  'Leeds United': 'https://crests.football-data.org/363.png',
  'Nottingham Forest': 'https://crests.football-data.org/351.png',
  'Tottenham Hotspur': 'https://crests.football-data.org/73.png',
  'Atlético Madrid': 'https://crests.football-data.org/78.png',
  'Galatasaray': 'https://crests.football-data.org/610.png',
  'Villarreal': 'https://crests.football-data.org/94.png',
  'Napoli': 'https://crests.football-data.org/113.png',
};

export const TeamLogo: React.FC<TeamLogoProps> = ({
  type,
  logoUrl,
  name = '',
  className = '',
  size = 44,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  // Resolve active logo URL from prop or map
  const activeLogoUrl = logoUrl || TEAM_CREST_MAP[name];

  if (activeLogoUrl && !imageFailed) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`relative shrink-0 rounded-2xl p-1 flex items-center justify-center bg-[#151c12]/90 border border-white/10 shadow-md overflow-hidden ${className}`}
      >
        <img
          src={activeLogoUrl}
          alt={name || 'Club Crest'}
          className="w-full h-full object-contain drop-shadow"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  // Fallback SVG badges
  switch (type) {
    case 'barcelona':
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative rounded-xl p-0.5 flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 shadow-md ${className}`}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            <path
              d="M50 5 C75 5 95 18 95 38 C95 68 65 88 50 96 C35 88 5 68 5 38 C5 18 25 5 50 5 Z"
              fill="#d99b1a"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <path d="M12 25 H45 V48 H12 Z" fill="#ffffff" />
            <path d="M26 25 H31 V48 H26 Z" fill="#dc2626" />
            <path d="M12 34 H45 V39 H12 Z" fill="#dc2626" />
            <path d="M55 25 H88 V48 H55 Z" fill="#eab308" />
            <path d="M62 25 H67 V48 H62 Z" fill="#dc2626" />
            <path d="M74 25 H79 V48 H74 Z" fill="#dc2626" />
            <path d="M10 47 H90 V55 H10 Z" fill="#d97706" />
            <text x="50" y="54" fontSize="7" fontWeight="bold" fill="#000" textAnchor="middle">
              FCB
            </text>
            <clipPath id="fcb-stripes">
              <path d="M50 55 C65 55 90 60 90 70 C85 85 62 92 50 95 C38 92 15 85 10 70 C10 60 35 55 50 55 Z" />
            </clipPath>
            <g clipPath="url(#fcb-stripes)">
              <rect x="10" y="55" width="80" height="42" fill="#1e3a8a" />
              <rect x="24" y="55" width="10" height="42" fill="#991b1b" />
              <rect x="45" y="55" width="10" height="42" fill="#991b1b" />
              <rect x="66" y="55" width="10" height="42" fill="#991b1b" />
              <circle cx="50" cy="73" r="6.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            </g>
          </svg>
        </div>
      );

    case 'chelsea':
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative rounded-full flex items-center justify-center bg-[#034694] ring-2 ring-blue-300/40 shadow-md ${className}`}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full p-1">
            <circle cx="50" cy="50" r="46" fill="#034694" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="37" fill="#002d62" stroke="#d4af37" strokeWidth="1.5" />
            <path id="chelsea-arc-top" d="M 22 50 A 28 28 0 0 1 78 50" fill="none" />
            <text fontSize="8" fontWeight="bold" fill="#ffffff" letterSpacing="2">
              <textPath href="#chelsea-arc-top" startOffset="50%" textAnchor="middle">
                CHELSEA
              </textPath>
            </text>
            <path
              d="M48 37 C52 35 57 37 57 41 C57 44 54 46 54 49 C57 49 61 51 61 56 C61 63 53 66 50 67 C47 67 44 65 43 62 C40 64 36 62 36 57 C36 52 40 48 45 47 C44 42 45 38 48 37 Z"
              fill="#ffffff"
            />
            <line x1="56" y1="36" x2="62" y2="60" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'united':
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative rounded-full flex items-center justify-center bg-gradient-to-br from-[#c70101] to-[#800000] ring-2 ring-amber-400/50 shadow-md ${className}`}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full p-1">
            <circle cx="50" cy="50" r="46" fill="#c70101" stroke="#facc15" strokeWidth="2.5" />
            <path
              d="M30 30 H70 V58 C70 70 50 82 50 82 C50 82 30 70 30 58 Z"
              fill="#facc15"
              stroke="#000000"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      );

    case 'arsenal':
      return (
        <div
          style={{ width: size, height: size }}
          className={`relative rounded-full flex items-center justify-center bg-[#ef0107] ring-2 ring-amber-300 shadow-md ${className}`}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full p-1">
            <path d="M20 20 H80 V55 C80 75 50 88 50 88 C50 88 20 75 20 55 Z" fill="#ef0107" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>
      );

    default: {
      const initials = name
        ? name
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : '⚽';

      return (
        <div
          style={{ width: size, height: size }}
          className={`shrink-0 rounded-2xl bg-gradient-to-br from-[#1b2518] to-[#273722] border border-[#ccff00]/30 flex items-center justify-center text-white text-xs font-black shadow-md ${className}`}
        >
          <span className="text-[#ccff00] font-mono tracking-tighter">{initials}</span>
        </div>
      );
    }
  }
};
