import React from 'react';

interface DecorationProps {
  className?: string;
  color?: string;
  size?: number | string;
  glow?: boolean;
}

/**
 * Elegant minimalist line-art sketch of a traditional Minangkabau house (Rumah Gadang)
 * Designed with curved pointed-roof (gonjong) lines and structural columns, mirroring the user's image.
 */
export function RumahGadangIllustration({ className = "w-full h-auto", color = "#8C0B0C" }: DecorationProps) {
  return (
    <svg
      viewBox="0 0 800 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="indonesian-heritage-rumah-gadang"
    >
      {/* Structural Stilts & Bottom Frame */}
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
        {/* Ground pillars */}
        <line x1="140" y1="420" x2="140" y2="480" />
        <line x1="220" y1="420" x2="220" y2="480" />
        <line x1="300" y1="420" x2="300" y2="480" />
        <line x1="380" y1="420" x2="380" y2="480" />
        <line x1="460" y1="420" x2="460" y2="480" />
        <line x1="540" y1="420" x2="540" y2="480" />
        <line x1="620" y1="420" x2="620" y2="480" />
        <line x1="700" y1="420" x2="700" y2="480" />

        {/* Diagonal pillar supports (arch style) */}
        <path d="M 120,440 Q 140,420 160,440" />
        <path d="M 200,440 Q 220,420 240,440" />
        <path d="M 280,440 Q 300,420 320,440" />
        <path d="M 360,440 Q 380,420 400,440" />
        <path d="M 440,440 Q 460,420 480,440" />
        <path d="M 520,440 Q 540,420 560,440" />
        <path d="M 600,440 Q 620,420 640,440" />
        <path d="M 680,440 Q 700,420 720,440" />

        {/* Horizonal bottom deck lines */}
        <line x1="110" y1="420" x2="730" y2="420" />
        <line x1="100" y1="390" x2="740" y2="390" />
        <line x1="130" y1="365" x2="710" y2="365" />
      </g>

      {/* Main walls & windows */}
      <g stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer wall frame */}
        <polygon points="130,260 710,260 690,390 150,390" fill={`${color}08`} />
        
        {/* Wall panels sections */}
        <line x1="210" y1="260" x2="220" y2="390" opacity="0.4" />
        <line x1="290" y1="260" x2="295" y2="390" opacity="0.4" />
        <line x1="370" y1="260" x2="370" y2="390" opacity="0.4" />
        <line x1="450" y1="260" x2="450" y2="390" opacity="0.4" />
        <line x1="530" y1="260" x2="525" y2="390" opacity="0.4" />
        <line x1="610" y1="260" x2="600" y2="390" opacity="0.4" />

        {/* Traditional Windows */}
        <rect x="160" y="295" width="28" height="45" rx="2" fill={`${color}12`} />
        <rect x="240" y="295" width="28" height="45" rx="2" fill={`${color}12`} />
        <rect x="320" y="295" width="28" height="45" rx="2" fill={`${color}12`} />
        <rect x="470" y="295" width="28" height="45" rx="2" fill={`${color}12`} />
        <rect x="550" y="295" width="28" height="45" rx="2" fill={`${color}12`} />
        <rect x="630" y="295" width="28" height="45" rx="2" fill={`${color}12`} />

        {/* Traditional main entrance steps in the middle-right */}
        <polygon points="410,310 440,310 440,390 410,390" fill={`${color}1A`} />
        <line x1="410" y1="330" x2="440" y2="330" />
        <line x1="410" y1="350" x2="440" y2="350" />
        <line x1="410" y1="370" x2="440" y2="370" />
        
        {/* Delicate floral patterns on walls */}
        <path d="M 174,350 Q 174,375 160,380" strokeWidth="1.5" opacity="0.4" />
        <path d="M 254,350 Q 254,375 240,380" strokeWidth="1.5" opacity="0.4" />
        <path d="M 334,350 Q 334,375 320,380" strokeWidth="1.5" opacity="0.4" />
        <path d="M 484,350 Q 484,375 470,380" strokeWidth="1.5" opacity="0.4" />
        <path d="M 564,350 Q 564,375 550,380" strokeWidth="1.5" opacity="0.4" />
        <path d="M 644,350 Q 644,375 630,380" strokeWidth="1.5" opacity="0.4" />
      </g>

      {/* Iconic curved roofs (Gonjong roofs with pointed horns pointing skies) */}
      <g stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill={`${color}0B`}>
        {/* Central main roof curve */}
        <path d="M 400,280 C 350,220 200,200 130,120 C 180,210 320,230 400,260 C 480,230 620,210 670,120 C 600,200 450,220 400,280 Z" />

        {/* Left tier wing gonjong roof curve */}
        <path d="M 250,260 C 200,180 100,160 30,60 C 90,160 180,180 250,235 Z" />
        
        {/* Right tier wing gonjong roof curve */}
        <path d="M 550,260 C 600,180 700,160 770,60 C 710,160 620,180 550,235 Z" />

        {/* Central double elevated high spire */}
        <path d="M 400,260 C 400,140 370,110 330,20 C 370,120 400,130 400,230 C 400,130 430,120 470,20 C 430,110 400,140 400,260 Z" />
      </g>

      {/* Spires / Gonjong Tips ornaments */}
      <g stroke="#C5A059" strokeWidth="4.5" strokeLinecap="round">
        {/* Spire tips plated with copper/gold color */}
        <line x1="30" y1="60" x2="30" y2="40" />
        <line x1="130" y1="120" x2="130" y2="100" />
        <line x1="330" y1="20" x2="330" y2="0" />
        <line x1="470" y1="20" x2="470" y2="0" />
        <line x1="670" y1="120" x2="670" y2="100" />
        <line x1="770" y1="60" x2="770" y2="40" />
      </g>

      {/* Beautiful decorative floating leaves outline */}
      <path d="M 50,200 Q 80,180 100,210" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M 750,200 Q 720,180 700,210" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

/**
 * Clean Single Songket Golden Medallion component.
 * Standard floral emblem from Sumatra/java (representing custom society norms).
 */
export function GoldHeritageMedallion({ className = "w-10 h-10", color = "#C5A059", glow = false }: DecorationProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      id="indonesian-heritage-songket-medallion"
    >
      {glow && (
        <circle cx="50" cy="50" r="30" fill={`${color}12`} filter="blur(4px)" />
      )}
      {/* Outer elegant diamond structure */}
      <rect x="25" y="25" width="50" height="50" rx="4" transform="rotate(45 50 50)" stroke={color} strokeWidth="3" />
      <rect x="30" y="30" width="40" height="40" rx="3" transform="rotate(45 50 50)" stroke={color} strokeWidth="1.5" opacity="0.6" />
      
      {/* Center circle and spokes */}
      <circle cx="50" cy="50" r="14" stroke={color} strokeWidth="3.5" />
      <circle cx="50" cy="50" r="4" fill={color} />
      
      {/* Surrounding Petals/Sunburst */}
      <path d="M 50,15 L 50,23" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 50,77 L 50,85" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 15,50 L 23,50" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 77,50 L 85,50" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      
      {/* Diagonal buds */}
      <circle cx="28" cy="28" r="3.5" fill={color} />
      <circle cx="72" cy="28" r="3.5" fill={color} />
      <circle cx="28" cy="72" r="3.5" fill={color} />
      <circle cx="72" cy="72" r="3.5" fill={color} />

      {/* Intertwining dots */}
      <circle cx="50" cy="33" r="2.5" fill={color} opacity="0.8" />
      <circle cx="50" cy="67" r="2.5" fill={color} opacity="0.8" />
      <circle cx="33" cy="50" r="2.5" fill={color} opacity="0.8" />
      <circle cx="67" cy="50" r="2.5" fill={color} opacity="0.8" />
    </svg>
  );
}

/**
 * Repeatable CSS definition or component helper that renders the gorgeous maroon & gold traditional pattern.
 * Uses high-efficiency optimized SVG string in standard inline base64 encode or raw SVG wrapper.
 */
export function PremiumPatternOverlay() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23C5A02E' fill-opacity='0.4'%3E%3Cpath d='M60 0 l15 35 l35 15 l-35 15 l-15 35 l-15 -35 l-35 -15 l35 -15 z' /%3E%3Ccircle cx='60' cy='60' r='10' fill='none' stroke='%23C5A02E' stroke-width='2' /%3E%3Ccircle cx='60' cy='60' r='3' fill='%23C5A02E' /%3E%3Ccircle cx='10' cy='10' r='2' /%3E%3Ccircle cx='110' cy='10' r='2' /%3E%3Ccircle cx='10' cy='110' r='2' /%3E%3Ccircle cx='110' cy='110' r='2' /%3E%3Crect x='5' y='55' width='10' height='10' rx='2' transform='rotate(45 10 60)' stroke='%23C5A02E' stroke-width='1' fill='none' /%3E%3Crect x='105' y='55' width='10' height='10' rx='2' transform='rotate(45 110 60)' stroke='%23C5A02E' stroke-width='1' fill='none' /%3E%3Crect x='55' y='5' width='10' height='10' rx='2' transform='rotate(45 60 10)' stroke='%23C5A02E' stroke-width='1' fill='none' /%3E%3Crect x='55' y='105' width='10' height='10' rx='2' transform='rotate(45 60 110)' stroke='%23C5A02E' stroke-width='1' fill='none' /%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px',
      }}
    />
  );
}

/**
 * Repeatable CSS pattern style for a heavier traditional gold/maroon panel background (like the wallpaper).
 */
export function GoldMaroonWallpaper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div 
      className={`relative overflow-hidden bg-primary ${className}`}
      style={{
        backgroundColor: '#7A0C16', // Deep elegant royal red
      }}
    >
      {/* Floating repeat pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23E9C77B' fill-opacity='1'%3E%3C!-- Medallion at 60, 60 --%3E%3Crect x='45' y='45' width='30' height='30' rx='2' transform='rotate%2845 60 60%29' stroke='%23E9C77B' stroke-width='2' fill='none' /%3E%3Ccircle cx='60' cy='60' r='8' stroke='%23E9C77B' stroke-width='1.5' fill='none' /%3E%3Ccircle cx='60' cy='60' r='2' fill='%23E9C77B' /%3E%3Cpath d='M60 38 l0 4 M60 78 l0 4 M38 60 l4 0 M78 60 l4 0' stroke='%23E9C77B' stroke-width='2' stroke-linecap='round' /%3E%3Ccircle cx='44' cy='44' r='1.5' fill='%23E9C77B' /%3E%3Ccircle cx='76' cy='44' r='1.5' fill='%23E9C77B' /%3E%3Ccircle cx='44' cy='76' r='1.5' fill='%23E9C77B' /%3E%3Ccircle cx='76' cy='76' r='1.5' fill='%23E9C77B' /%3E%3C!-- Corners repeat patterns --%3E%3Crect x='-15' y='-15' width='30' height='30' rx='2' transform='rotate%2845 0 0%29' stroke='%23E9C77B' stroke-width='1.5' fill='none' /%3E%3Ccircle cx='0' cy='0' r='8' stroke='%23E9C77B' stroke-width='1' fill='none' /%3E%3Crect x='105' y='-15' width='30' height='30' rx='2' transform='rotate%2845 120 0%29' stroke='%23E9C77B' stroke-width='1.5' fill='none' /%3E%3Ccircle cx='120' cy='0' r='8' stroke='%23E9C77B' stroke-width='1' fill='none' /%3E%3Crect x='-15' y='105' width='30' height='30' rx='2' transform='rotate%2845 0 120%29' stroke='%23E9C77B' stroke-width='1.5' fill='none' /%3E%3Ccircle cx='0' cy='120' r='8' stroke='%23E9C77B' stroke-width='1' fill='none' /%3E%3Crect x='105' y='105' width='30' height='30' rx='2' transform='rotate%2845 120 120%29' stroke='%23E9C77B' stroke-width='1.5' fill='none' /%3E%3Ccircle cx='120' cy='120' r='8' stroke='%23E9C77B' stroke-width='1' fill='none' /%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Gentle horizontal gradient mask overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7A0C16] via-transparent to-[#7A0C16] opacity-30 pointer-events-none" />

      {/* Actual Content Wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
