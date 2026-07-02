import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "w-10 h-10", size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible`}
      id="webora-custom-logo"
    >
      <defs>
        {/* Gradient for the left/purple side of the ribbon */}
        <linearGradient id="webora-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d946ef" /> {/* Magenta */}
          <stop offset="50%" stopColor="#a855f7" /> {/* Purple */}
          <stop offset="100%" stopColor="#6366f1" /> {/* Indigo */}
        </linearGradient>

        {/* Gradient for the right/blue side of the ribbon */}
        <linearGradient id="webora-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" /> {/* Indigo */}
          <stop offset="60%" stopColor="#3b82f6" /> {/* Blue */}
          <stop offset="100%" stopColor="#06b6d4" /> {/* Cyan */}
        </linearGradient>

        {/* Glow filter for the dots and sparkles */}
        <filter id="cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Stylized custom Webora W Ribbon */}
      <g>
        {/* Left Side (Purple to Indigo ribbon) */}
        <path
          d="M25 35 C25 35 34 85 46 85 C58 85 54 52 62 47"
          stroke="url(#webora-purple)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Side (Indigo to Blue to Cyan ribbon) */}
        <path
          d="M62 47 C70 42 72 85 84 85 C96 85 105 45 105 45"
          stroke="url(#webora-blue)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Glowing floating cyan dot above the right tip */}
        <circle
          cx="105"
          cy="31"
          r="7"
          fill="#22d3ee"
          filter="url(#cyan-glow)"
        />

        {/* 4-pointed Sparkle Star 1 (Larger, top right) */}
        <path
          d="M117 22 Q117 26 113 26 Q117 26 117 30 Q117 26 121 26 Q117 26 117 22 Z"
          fill="#38bdf8"
          filter="url(#cyan-glow)"
        />

        {/* 4-pointed Sparkle Star 2 (Smaller, middle right) */}
        <path
          d="M113 38 Q113 40 111 40 Q113 40 113 42 Q113 40 115 40 Q113 40 113 38 Z"
          fill="#06b6d4"
          filter="url(#cyan-glow)"
        />
      </g>
    </svg>
  );
}
