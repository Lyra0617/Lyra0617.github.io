import { useEffect, useState } from 'react';

const SYMBOLS = [
  '+', '++', '+++', '###', '::', '..', '///', '<<<', '>>>',
  '||', '---', '___', '***', '!@#', '0x00', 'ERR', 'NULL',
  'FF', '01', '10', '>>>', '<<<', '^^', 'EOF', 'SYS',
  '▓▓', '░░', '▒▒', '■', '□', '×', '÷', '≠',
  '#', '@', '%', '&', '$', '?', '!', ';', '~',
];

// Deterministic positions to avoid hydration mismatches
const ARTIFACTS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  symbol: SYMBOLS[(i * 7 + 3) % SYMBOLS.length],
  top: ((i * 1301 + 373) % 10000) / 100,
  left: ((i * 1997 + 211) % 10000) / 100,
  size: 7 + (i % 4) * 2,
  baseOpacity: 0.10 + (i % 6) * 0.04,
  rotation: ((i * 23) % 90) - 45,
  flickerGroup: i % 7,
}));

export function GlitchArtifacts({ zIndex = 3 }: { zIndex?: number }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setFrame(f => (f + 1) % 21), 280);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex }}
    >
      {ARTIFACTS.map(a => {
        const visible = (a.flickerGroup === 0)
          ? (frame % 5 !== 0)
          : (a.flickerGroup === 1)
            ? (frame % 3 !== 2)
            : true;

        return (
          <div
            key={a.id}
            className="absolute font-mono text-black"
            style={{
              top: `${a.top}%`,
              left: `${a.left}%`,
              fontSize: `${a.size}px`,
              opacity: visible ? a.baseOpacity : 0,
              transform: `rotate(${a.rotation}deg)`,
              transition: 'opacity 0.08s',
            }}
          >
            {a.symbol}
          </div>
        );
      })}
    </div>
  );
}
