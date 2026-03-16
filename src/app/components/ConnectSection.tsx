import { useState } from 'react';

const GLITCH_SYMBOLS = [
  '▓▓░░', '██', '▄▄▄', '▀▀▀', '╔═╗', '╚═╝', '|||', '###',
  '::', '>>', '01101', 'FF00', 'SYS_', 'NULL', 'ERR',
];

const LINKS = [
  { label: 'EMAIL', value: 'hello@ovb.design', href: 'mailto:hello@ovb.design' },
  { label: 'INSTAGRAM', value: '@ovb.design', href: '#' },
  { label: 'LINKEDIN', value: 'OVB Design', href: '#' },
];

export function ConnectSection() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: '#C9F86A',
        borderTop: '3px solid #000',
        minHeight: '65vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Scattered glitch symbols */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {GLITCH_SYMBOLS.map((sym, i) => (
          <div
            key={i}
            className="absolute font-mono text-black"
            style={{
              top: `${((i * 531 + 77) % 10000) / 100}%`,
              left: `${((i * 773 + 199) % 10000) / 100}%`,
              fontSize: `${10 + (i % 3) * 5}px`,
              opacity: 0.10 + (i % 4) * 0.04,
              transform: `rotate(${(i * 17 % 90) - 45}deg)`,
            }}
          >
            {sym}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        {/* Terminal label */}
        <div
          className="font-mono"
          style={{ fontSize: 10, color: '#000', opacity: 0.35, letterSpacing: '0.2em', marginBottom: 32 }}
        >
          // INIT_CONNECT — STATUS: READY
        </div>

        {/* TAP TO CONNECT button */}
        <button
          onClick={() => setOpen(true)}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 80,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: '#000',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '16px 0',
            display: 'block',
            position: 'relative',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = '#000';
            (e.currentTarget as HTMLButtonElement).style.color = '#C9F86A';
            (e.currentTarget as HTMLButtonElement).style.padding = '16px 32px';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = '#000';
            (e.currentTarget as HTMLButtonElement).style.padding = '16px 0';
          }}
        >
          TAP TO CONNECT
        </button>

        {/* Glitch sub-symbols */}
        <div
          className="font-mono"
          style={{
            marginTop: 28,
            display: 'flex',
            gap: 24,
            justifyContent: 'center',
            fontSize: 12,
            color: '#000',
            opacity: 0.28,
            letterSpacing: '0.1em',
          }}
        >
          <span>[ERR://CONTACT]</span>
          <span>{'>> 00.READY'}</span>
          <span>▓▓▒░ OPEN</span>
        </div>
      </div>

      {/* Bottom label */}
      <div
        className="font-mono"
        style={{
          position: 'absolute',
          bottom: 24,
          left: 56,
          fontSize: 10,
          color: '#000',
          opacity: 0.3,
          letterSpacing: '0.15em',
        }}
      >
        OVB (DOT) DESIGN — 2024
      </div>

      {/* Popup overlay */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'rgba(0,0,0,0.35)',
            }}
          />
          <div
            style={{
              position: 'fixed',
              zIndex: 50,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 520,
              background: '#C9F86A',
              border: '4px solid #000',
              padding: '36px 40px 40px',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '3px solid #000',
                paddingBottom: 16,
                marginBottom: 24,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em' }}>
                CONNECT //
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: 38,
                  height: 38,
                  background: '#000',
                  color: '#C9F86A',
                  border: 'none',
                  fontSize: 22,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ×
              </button>
            </div>

            {/* Terminal hint */}
            <div
              className="font-mono"
              style={{ fontSize: 10, color: '#000', opacity: 0.3, marginBottom: 20, letterSpacing: '0.12em' }}
            >
              // INIT_CONTACT.EXE — STATUS: READY
            </div>

            {/* Links */}
            {LINKS.map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 0',
                  borderBottom: '2px solid #000',
                  textDecoration: 'none',
                  color: '#000',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = '#000';
                  el.style.color = '#C9F86A';
                  el.style.padding = '18px 12px';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'transparent';
                  el.style.color = '#000';
                  el.style.padding = '18px 0';
                }}
              >
                <span className="font-mono" style={{ fontSize: 9, opacity: 0.4, letterSpacing: '0.15em' }}>
                  {label}
                </span>
                <span style={{ fontWeight: 700, fontSize: 20 }}>
                  {value}
                </span>
                <span className="font-mono" style={{ fontSize: 14, opacity: 0.45 }}>
                  →
                </span>
              </a>
            ))}

            {/* Footer */}
            <div
              className="font-mono"
              style={{ marginTop: 20, fontSize: 9, color: '#000', opacity: 0.2, letterSpacing: '0.12em' }}
            >
              {'>>'} EOF_CONTACT // 2024
            </div>
          </div>
        </>
      )}
    </div>
  );
}
