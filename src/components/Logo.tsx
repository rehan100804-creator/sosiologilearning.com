import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

export function LogoIcon({ className = "w-10 h-10", color = "#8C0B0C" }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      id="sosiologi-logo-icon"
    >
      {/* Mortarboard + Tassel */}
      <path 
        d="M 250,100 L 120,172 L 250,244 L 340,194 L 340,244 L 380,244 L 380,172 Z" 
        fill={color} 
      />
      {/* Headband Chevron */}
      <path 
        d="M 165,212 L 165,247 L 250,294 L 335,247 L 335,212 L 250,259 Z" 
        fill={color} 
      />
    </svg>
  );
}

export function LogoWithText({ className = "w-full h-auto", color = "#8C0B0C" }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 500 460" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      id="sosiologi-logo-full"
    >
      {/* Mortarboard + Tassel */}
      <path 
        d="M 250,60 L 120,132 L 250,204 L 340,154 L 340,204 L 380,204 L 380,132 Z" 
        fill={color} 
      />
      {/* Headband Chevron */}
      <path 
        d="M 165,172 L 165,207 L 250,254 L 335,207 L 335,172 L 250,219 Z" 
        fill={color} 
      />
      
      {/* Text 'SOSIOLOGI' */}
      <text 
        x="250" 
        y="345" 
        textAnchor="middle" 
        fill={color} 
        fontSize="54" 
        fontWeight="800" 
        fontFamily="Montserrat, sans-serif" 
        letterSpacing="0.08em"
      >
        SOSIOLOGI
      </text>
      
      {/* Text 'learning' */}
      <text 
        x="250" 
        y="395" 
        textAnchor="middle" 
        fill={color} 
        fontSize="28" 
        fontWeight="400" 
        fontFamily="sans-serif" 
        letterSpacing="0.22em"
      >
        learning
      </text>
    </svg>
  );
}

export default function Logo({ className = "w-full h-auto", color = "#8C0B0C" }: LogoProps) {
  return <LogoWithText className={className} color={color} />;
}
