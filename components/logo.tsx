export function LogoSVG() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle background */}
      <circle cx="24" cy="24" r="22" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="1.5" />
      
      {/* Brazil nut shell shape - left */}
      <path
        d="M 24 10 Q 18 14 16 22 Q 18 28 24 32 L 24 10 Z"
        fill="#10B981"
      />
      
      {/* Brazil nut shell shape - right */}
      <path
        d="M 24 10 Q 30 14 32 22 Q 30 28 24 32 L 24 10 Z"
        fill="#059669"
      />
      
      {/* Brazil nut bottom section */}
      <ellipse cx="24" cy="34" rx="8" ry="6" fill="#10B981" opacity="0.8" />
      
      {/* Inner shine detail */}
      <circle cx="22" cy="20" r="2" fill="white" opacity="0.6" />
      
      {/* Accent line */}
      <line x1="24" y1="10" x2="24" y2="36" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    </svg>
  );
}
