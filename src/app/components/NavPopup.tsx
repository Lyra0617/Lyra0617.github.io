import { useState } from 'react';

interface NavPopupProps {
  onHome: () => void;
  onWork: () => void;
  onConnect: () => void;
}

const NAV_ITEMS = [
  { label: 'HOME', key: 'home' },
  { label: 'WORK', key: 'work' },
  { label: 'CONNECT', key: 'connect' },
] as const;

export function NavPopup({ onHome, onWork, onConnect }: NavPopupProps) {
  const [open, setOpen] = useState(false);

  const actions: Record<string, () => void> = {
    home: onHome,
    work: onWork,
    connect: onConnect,
  };

  return (
    <div className="fixed top-6 right-6 z-50" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* + / × button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: 52,
          height: 52,
          background: open ? '#C9F86A' : '#000000',
          color: open ? '#000000' : '#C9F86A',
          border: '3px solid #000',
          fontSize: 26,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          lineHeight: 1,
        }}
      >
        {open ? '×' : '+'}
      </button>

      {/* Dropdown nav */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 0,
            background: '#C9F86A',
            border: '3px solid #000',
            minWidth: 200,
          }}
        >
          <div
            className="font-mono"
            style={{ fontSize: 10, padding: '6px 14px 4px', color: '#000', opacity: 0.4, borderBottom: '2px solid #000', letterSpacing: '0.15em' }}
          >
            // NAV_MENU.EXE
          </div>
          {NAV_ITEMS.map(({ label, key }) => (
            <button
              key={key}
              onClick={() => { actions[key](); setOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid #000',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                color: '#000',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#000';
                (e.currentTarget as HTMLButtonElement).style.color = '#C9F86A';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = '#000';
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
