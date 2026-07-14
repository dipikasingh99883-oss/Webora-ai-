import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = "w-10 h-10", size, showText = false, variant = 'light' }: LogoProps) {
  // Base size for the SVG canvas is 300x240 when showing text, or 240x180 for just the symbol
  const width = size ? size * (showText ? 1.4 : 1) : (showText ? 140 : 40);
  const height = size ? size : 40;

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`} style={{ width, height }}>
      <svg
        width="100%"
        height="100%"
        viewBox={showText ? "0 0 320 220" : "0 0 220 160"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        id="webora-agency-logo"
      >
        <defs>
          {/* Drop shadow for 3D depth of interlocking rings */}
          <filter id="premium-shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#2A1B14" floodOpacity="0.22" />
          </filter>

          <filter id="soft-overlap-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.35 0" />
            <feOffset dx="-1" dy="2" />
            <feBlend in="SourceGraphic" in2="blur" mode="normal" />
          </filter>

          {/* Luxury Metallic Gold Gradient */}
          <linearGradient id="luxury-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E4C3" /> {/* Soft cream gold highlight */}
            <stop offset="25%" stopColor="#D4AF37" /> {/* Classic luxury gold */}
            <stop offset="50%" stopColor="#AA7C11" /> {/* Deep metallic gold */}
            <stop offset="75%" stopColor="#E5C483" /> {/* Warm gold shine */}
            <stop offset="100%" stopColor="#8C6207" /> {/* Rich bronze-gold shadow */}
          </linearGradient>

          {/* Premium Cream/Ivory Enamel Body Gradient */}
          <linearGradient id="ivory-enamel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" /> {/* High gloss reflection */}
            <stop offset="30%" stopColor="#FDFBF7" /> {/* Warm Pearl */}
            <stop offset="70%" stopColor="#F5EFE3" /> {/* Champagne Cream */}
            <stop offset="100%" stopColor="#EADBCE" /> {/* Cashmere Ivory shadow */}
          </linearGradient>

          {/* Text/Brand Dark Bronze Color Gradient */}
          <linearGradient id="brand-dark-text" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312520" />
            <stop offset="100%" stopColor="#1B120E" />
          </linearGradient>
        </defs>

        {/* Ring Symbol Group */}
        <g filter="url(#premium-shadow)">
          {/* 1. RIGHT HORSESHOE (Bottom Layer) */}
          {/* Inner body fill */}
          <path
            d="M 125 74 A 32 32 0 1 0 169 74"
            stroke="url(#ivory-enamel)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* Outer gold border */}
          <path
            d="M 125 74 A 32 32 0 1 0 169 74"
            stroke="url(#luxury-gold)"
            strokeWidth="24"
            strokeLinecap="round"
            className="mix-blend-normal"
            style={{ strokeDasharray: 'none', fill: 'none' }}
          />
          {/* Re-draw inner body over gold to keep border effect */}
          <path
            d="M 125 74 A 32 32 0 1 0 169 74"
            stroke="url(#ivory-enamel)"
            strokeWidth="17"
            strokeLinecap="round"
            style={{ fill: 'none' }}
          />

          {/* 2. LEFT HORSESHOE (Middle Layer, overlaps Right Horseshoe at bottom) */}
          <g>
            {/* Outer gold border of Left Horseshoe */}
            <path
              d="M 97 74 A 32 32 0 1 1 53 74"
              stroke="url(#luxury-gold)"
              strokeWidth="24"
              strokeLinecap="round"
              style={{ fill: 'none' }}
            />
            {/* Inner cream body of Left Horseshoe */}
            <path
              d="M 97 74 A 32 32 0 1 1 53 74"
              stroke="url(#ivory-enamel)"
              strokeWidth="17"
              strokeLinecap="round"
              style={{ fill: 'none' }}
            />
          </g>

          {/* 3. INTERLOCK OVERLAP (Top Layer)
              We draw the top-left segment of the Right Horseshoe on top of the Left Horseshoe
              to complete the interlocking effect. */}
          <g filter="url(#soft-overlap-shadow)">
            {/* Outer gold border segment */}
            <path
              d="M 125 74 A 32 32 0 0 0 138 98"
              stroke="url(#luxury-gold)"
              strokeWidth="24"
              strokeLinecap="round"
              style={{ fill: 'none' }}
            />
            {/* Inner cream body segment */}
            <path
              d="M 125 74 A 32 32 0 0 0 138 98"
              stroke="url(#ivory-enamel)"
              strokeWidth="17"
              strokeLinecap="round"
              style={{ fill: 'none' }}
            />
          </g>
          
          {/* 3D Glossy specular highlights on both curves */}
          <path
            d="M 58 82 A 28 28 0 0 0 88 100"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
            style={{ fill: 'none' }}
          />
          <path
            d="M 136 102 A 28 28 0 0 0 164 82"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
            style={{ fill: 'none' }}
          />
        </g>

        {/* Brand Typography (Only visible if showText is true) */}
        {showText && (
          <g>
            {/* "Webora" in elegant premium serif style */}
            <text
              x="160"
              y="152"
              textAnchor="middle"
              fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
              fontWeight="600"
              fontSize="38"
              letterSpacing="0.5"
              fill={variant === 'light' ? 'url(#brand-dark-text)' : '#FDFBF7'}
            >
              Webora
              {/* "AI" in luxury gold text */}
              <tspan
                dx="10"
                fontFamily="'Inter', 'Outfit', sans-serif"
                fontWeight="700"
                fontSize="38"
                fill="url(#luxury-gold)"
              >
                AI
              </tspan>
            </text>

            {/* Elegantly spaced "AGENCY" with gold accent lines */}
            {/* Left Line */}
            <line
              x1="45"
              y1="184"
              x2="105"
              y2="184"
              stroke="url(#luxury-gold)"
              strokeWidth="1.5"
              opacity="0.75"
            />
            
            {/* AGENCY text */}
            <text
              x="160"
              y="189"
              textAnchor="middle"
              fontFamily="'Inter', 'Montserrat', sans-serif"
              fontWeight="500"
              fontSize="14"
              letterSpacing="7.5"
              fill="url(#luxury-gold)"
            >
              AGENCY
            </text>

            {/* Right Line */}
            <line
              x1="215"
              y1="184"
              x2="275"
              y2="184"
              stroke="url(#luxury-gold)"
              strokeWidth="1.5"
              opacity="0.75"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
