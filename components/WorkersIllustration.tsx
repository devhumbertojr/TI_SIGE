export default function WorkersIllustration() {
  return (
    <svg viewBox="0 0 300 278" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Background circle */}
      <circle cx="150" cy="139" r="135" fill="#e8f5de" />

      {/* ── LEFT WORKER – clipboard ── */}
      {/* Legs */}
      <rect x="61" y="188" width="16" height="50" rx="8" fill="#5bafd0" />
      <rect x="81" y="188" width="16" height="50" rx="8" fill="#5bafd0" />
      {/* Body */}
      <rect x="57" y="132" width="44" height="58" rx="14" fill="#8dd5f0" />
      {/* Left arm */}
      <rect x="43" y="140" width="14" height="36" rx="7" fill="#8dd5f0" />
      <ellipse cx="50" cy="178" rx="9" ry="7" fill="#f5c9a0" />
      {/* Right arm + clipboard */}
      <rect x="101" y="137" width="14" height="30" rx="7" fill="#8dd5f0" />
      <rect x="111" y="122" width="24" height="32" rx="4" fill="white" stroke="#b8d8e8" strokeWidth="1.5" />
      <rect x="111" y="122" width="24" height="7" rx="3" fill="#b8d8e8" />
      <line x1="115" y1="135" x2="131" y2="135" stroke="#b8d8e8" strokeWidth="1.5" />
      <line x1="115" y1="140" x2="131" y2="140" stroke="#b8d8e8" strokeWidth="1.5" />
      <line x1="115" y1="145" x2="131" y2="145" stroke="#b8d8e8" strokeWidth="1.5" />
      {/* Head */}
      <circle cx="79" cy="117" r="19" fill="#f5c9a0" />
      {/* Hair */}
      <path d="M60 111 Q64 96 79 96 Q94 96 98 111" fill="#4a3020" />
      {/* Eyes */}
      <circle cx="73" cy="116" r="2.5" fill="#444" />
      <circle cx="85" cy="116" r="2.5" fill="#444" />
      {/* Smile */}
      <path d="M73 123 Q79 129 85 123" stroke="#c8906a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Hat brim */}
      <rect x="58" y="104" width="42" height="9" rx="4.5" fill="#8dd5f0" />

      {/* ── CENTER WORKER – yellow hard hat, pointing ── */}
      {/* Legs */}
      <rect x="124" y="192" width="18" height="52" rx="9" fill="#4898bc" />
      <rect x="146" y="192" width="18" height="52" rx="9" fill="#4898bc" />
      {/* Body */}
      <rect x="120" y="130" width="48" height="64" rx="16" fill="#6cc5e8" />
      {/* Pointing arm (up-left) */}
      <line x1="120" y1="148" x2="82" y2="103" stroke="#6cc5e8" strokeWidth="18" strokeLinecap="round" />
      {/* Pointing hand */}
      <circle cx="79" cy="99" r="12" fill="#f5c9a0" />
      <rect x="73" y="84" width="12" height="18" rx="6" fill="#f5c9a0" />
      {/* Right arm */}
      <rect x="168" y="142" width="14" height="34" rx="7" fill="#6cc5e8" />
      <ellipse cx="175" cy="178" rx="9" ry="7" fill="#f5c9a0" />
      {/* Head */}
      <circle cx="144" cy="113" r="22" fill="#f5c9a0" />
      {/* Eyes */}
      <circle cx="137" cy="111" r="3" fill="#444" />
      <circle cx="151" cy="111" r="3" fill="#444" />
      {/* Smile */}
      <path d="M137 120 Q144 127 151 120" stroke="#c8906a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Yellow hard hat dome */}
      <ellipse cx="144" cy="97" rx="26" ry="16" fill="#fdd94e" />
      {/* Hard hat brim */}
      <rect x="117" y="102" width="54" height="11" rx="5.5" fill="#fdd94e" />
      <rect x="120" y="107" width="48" height="6" rx="3" fill="#e8c010" />

      {/* ── RIGHT WORKER – thumbs up ── */}
      {/* Legs */}
      <rect x="196" y="188" width="16" height="50" rx="8" fill="#5bafd0" />
      <rect x="216" y="188" width="16" height="50" rx="8" fill="#5bafd0" />
      {/* Body */}
      <rect x="192" y="132" width="44" height="58" rx="14" fill="#8dd5f0" />
      {/* Left arm */}
      <rect x="178" y="140" width="14" height="36" rx="7" fill="#8dd5f0" />
      <ellipse cx="185" cy="178" rx="9" ry="7" fill="#f5c9a0" />
      {/* Right arm raised */}
      <rect x="236" y="122" width="14" height="38" rx="7" fill="#8dd5f0" />
      {/* Thumb-up hand */}
      <circle cx="243" cy="118" r="12" fill="#f5c9a0" />
      <rect x="237" y="102" width="12" height="20" rx="6" fill="#f5c9a0" />
      {/* Head */}
      <circle cx="214" cy="117" r="19" fill="#f5c9a0" />
      {/* Hair */}
      <path d="M195 111 Q199 96 214 96 Q229 96 233 111" fill="#4a3020" />
      {/* Eyes */}
      <circle cx="208" cy="116" r="2.5" fill="#444" />
      <circle cx="220" cy="116" r="2.5" fill="#444" />
      {/* Smile */}
      <path d="M208 123 Q214 129 220 123" stroke="#c8906a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Hat brim */}
      <rect x="193" y="104" width="42" height="9" rx="4.5" fill="#6cc5e8" />
      <ellipse cx="214" cy="102" rx="22" ry="9" fill="#5ab8e0" />
    </svg>
  )
}
