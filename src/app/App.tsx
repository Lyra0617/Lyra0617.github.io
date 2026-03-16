import { useState, useEffect, useRef, CSSProperties, ReactNode, RefObject } from 'react';
import { ASCIIBackground } from './components/ASCIIBackground';
import { PixelFlower } from './components/PixelFlower';

// ─── Floating Panel (OS window frame) ────────────────────────────────────────
function FloatingPanel({
  title = 'ELOYB DESIGN',
  onPlusClick,
  style,
  children,
}: {
  title?: string;
  onPlusClick?: () => void;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div style={{ border: '2px solid #C9F86A', display: 'flex', flexDirection: 'column', ...style }}>
      <div
        style={{
          background: '#C9F86A',
          height: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5px 0 8px',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: 8,
            fontWeight: 700,
            color: '#000',
            letterSpacing: '0.1em',
            userSelect: 'none',
          }}
        >
          {title}
        </span>
        <button
          onClick={onPlusClick}
          style={{
            width: 14,
            height: 14,
            background: '#000',
            color: '#C9F86A',
            border: 'none',
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            flexShrink: 0,
          }}
        >
          +
        </button>
      </div>
      {children}
    </div>
  );
}

// ─── Dark page background canvas (subtle lime ASCII on #0B0B0B) ───────────────
function DarkPageCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const W = 1440, H = 960, FS = 11, CW = 7;
    const CHARS = '=+#%*@0123456789:.!01';
    const cols = Math.floor(W / CW), rows = Math.floor(H / FS);
    const grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => CHARS[Math.floor(Math.random() * CHARS.length)])
    );
    let id: number, last = 0;
    const draw = (t: number) => {
      if (t - last > 130) {
        last = t;
        ctx.clearRect(0, 0, W, H);
        ctx.font = `${FS}px "Courier New",monospace`;
        ctx.fillStyle = 'rgba(201,248,106,0.038)';
        const n = Math.floor(cols * rows * 0.022);
        for (let i = 0; i < n; i++) {
          grid[Math.floor(Math.random() * rows)][Math.floor(Math.random() * cols)] =
            CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        for (let r = 0; r < rows; r++)
          for (let cc = 0; cc < cols; cc++)
            ctx.fillText(grid[r][cc], cc * CW, r * FS + FS);
      }
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <canvas
      ref={ref}
      width={1440}
      height={960}
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 0, userSelect: 'none' }}
    />
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
const TITLE_LINES = ['USER INTERFACE', 'DESIGNER', 'WEBFLOW DEVELOPER', '& GLITCH ARTIST'];

function HeroSection() {
  const [glitchLine, setGlitchLine] = useState<number | null>(null);

  useEffect(() => {
    const trigger = () => {
      setGlitchLine(Math.floor(Math.random() * TITLE_LINES.length));
      setTimeout(() => setGlitchLine(null), 120 + Math.random() * 110);
    };
    const iv = setInterval(trigger, 2600 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      style={{
        background: '#C9F86A',
        position: 'relative',
        minHeight: 820,
        overflow: 'hidden',
      }}
    >
      {/* ASCII background canvas */}
      <ASCIIBackground />

      {/* Flower top-right */}
      <div style={{ position: 'absolute', top: -30, right: -30, zIndex: 2, pointerEvents: 'none' }}>
        <PixelFlower displaySize={420} colorA="#000" colorB="#2a2a2a" speed={0.0022} opacity={0.74} />
      </div>

      {/* Flower center-right lower */}
      <div style={{ position: 'absolute', bottom: 60, right: '12%', zIndex: 2, pointerEvents: 'none' }}>
        <PixelFlower
          displaySize={300}
          colorA="#000"
          colorB="#111"
          speed={0.0016}
          rotationOffset={Math.PI / 3}
          opacity={0.42}
        />
      </div>

      {/* Main title with echo */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '8vh',
          paddingLeft: '3.8vw',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          letterSpacing: '-0.025em',
        }}
      >
        {TITLE_LINES.map((text, li) => {
          const isG = glitchLine === li;
          return (
            <div key={li}>
              {/* Main line */}
              <div
                style={{
                  fontSize: '6.6vw',
                  lineHeight: 0.96,
                  color: '#000',
                  transform: isG
                    ? `translateX(${(Math.random() > 0.5 ? 1 : -1) * 7}px)`
                    : 'translateX(0)',
                  transition: isG ? 'none' : 'transform 0.22s ease-out',
                  whiteSpace: 'nowrap',
                }}
              >
                {text}
              </div>
              {/* Echo line — same size, slightly indented, below */}
              <div
                aria-hidden
                style={{
                  fontSize: '6.6vw',
                  lineHeight: 0.96,
                  color: '#000',
                  opacity: 0.88,
                  paddingLeft: '2.8vw',
                  marginBottom: '0.4vw',
                  whiteSpace: 'nowrap',
                  transform: isG ? `translateX(${(Math.random() > 0.5 ? 1 : -1) * 4}px)` : 'none',
                }}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bio code text — bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: '3.8vw',
          zIndex: 10,
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: 10,
          lineHeight: 1.72,
          color: 'rgba(0,0,0,0.5)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div>function()</div>
        <div>randomfacts array:</div>
        <div>&nbsp;</div>
        <div>[maximalist,</div>
        <div>little monster, a</div>
        <div>latinx baddie,</div>
        <div>kitsch, brat,</div>
        <div>########</div>
      </div>
    </div>
  );
}

// ─── SELECTED WORK SECTION ────────────────────────────────────────────────────
const SW_TEXT = 'SELECTED WORK  '.repeat(8);
const SW_LINES = 20;

function SelectedWorkSection({ scrollY }: { scrollY: number }) {
  return (
    <div
      style={{
        background: '#0D0D0D',
        overflow: 'hidden',
        height: 660,
        position: 'relative',
      }}
    >
      {Array.from({ length: SW_LINES }, (_, i) => {
        const t = i / (SW_LINES - 1);
        const fontSize = 15 + t * t * 82; // exponential: ~15px → ~97px
        const opacity = 0.4 + t * 0.6;
        const glitchX = Math.sin(scrollY * 0.007 + i * 0.41) * 8;
        const indent = (i % 3 === 1 ? 5 : i % 3 === 2 ? -2 : 0);

        return (
          <div
            key={i}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize,
              lineHeight: 0.88,
              color: '#C9F86A',
              opacity,
              letterSpacing: '-0.025em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              paddingLeft: 10 + indent,
              transform: `translateX(${glitchX}px)`,
              willChange: 'transform',
              userSelect: 'none',
            }}
          >
            {SW_TEXT}
          </div>
        );
      })}
    </div>
  );
}

// ─── PORTFOLIO WORK SECTION ───────────────────────────────────────────────────
const PROJECTS = [
  { id: 1, name: 'NICHOLAS ONG', sub: 'PORTFOLIO DESIGN / 2024', light: false, accent: '#C9F86A' },
  { id: 2, name: 'STDF', sub: 'ENTERTAINMENT / WEBFLOW DEV / 2023', light: true, accent: '#000' },
  { id: 3, name: 'LOLLAPALOOZA', sub: 'EVENT DESIGN / 2023', light: false, accent: '#C9F86A' },
  { id: 4, name: 'LAVA BEATS', sub: 'MUSIC BRAND / 2024', light: true, accent: '#000' },
  { id: 5, name: 'GLITCH LABS', sub: 'EXPERIMENTAL / 2025', light: false, accent: '#C9F86A' },
];

const IMG_URLS = [
  'https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?w=600&q=70',
  'https://images.unsplash.com/photo-1771012788591-a1c7e6763e5e?w=600&q=70',
  'https://images.unsplash.com/photo-1771980589908-86b23f94f02b?w=600&q=70',
  'https://images.unsplash.com/photo-1558707538-c56435bdcdf3?w=600&q=70',
];

const CARD_COLORS = [
  '#141414', '#1e1e1e', '#0f0f0f', '#252525', '#111', '#1a1a1a',
];

function WorkRow({ project, imgUrl }: { project: typeof PROJECTS[0]; imgUrl: string }) {
  const [hovered, setHovered] = useState(false);

  const CARD_W = [340, 260, 300, 280, 260, 320, 240];

  return (
    <div style={{ borderBottom: '1px solid rgba(201,248,106,0.18)' }}>
      <div
        style={{ overflow: 'hidden' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            transform: hovered ? 'translateX(-55%)' : 'translateX(0)',
            transition: hovered ? 'transform 9s linear' : 'transform 1.4s ease-out',
            willChange: 'transform',
          }}
        >
          {/* Info card */}
          <div
            style={{
              width: 380,
              height: 158,
              flexShrink: 0,
              background: project.light ? '#C9F86A' : '#000',
              border: `1px solid ${project.light ? 'rgba(0,0,0,0.15)' : 'rgba(201,248,106,0.25)'}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '14px 18px',
            }}
          >
            <div
              style={{
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: 8,
                color: project.light ? 'rgba(0,0,0,0.4)' : 'rgba(201,248,106,0.5)',
                letterSpacing: '0.14em',
                userSelect: 'none',
              }}
            >
              {project.sub}
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(26px, 2.6vw, 44px)',
                lineHeight: 0.9,
                letterSpacing: '-0.025em',
                color: project.light ? '#000' : '#C9F86A',
              }}
            >
              {project.name}
            </div>
          </div>

          {/* Preview image card */}
          <div
            style={{
              width: 340,
              height: 158,
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(201,248,106,0.12)',
            }}
          >
            <img
              src={imgUrl}
              alt={project.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%)`,
              }}
            />
          </div>

          {/* Placeholder cards */}
          {CARD_W.map((w, ci) => (
            <div
              key={ci}
              style={{
                width: w,
                height: 158,
                flexShrink: 0,
                background: ci % 2 === 0
                  ? CARD_COLORS[ci % CARD_COLORS.length]
                  : project.light ? 'rgba(201,248,106,0.08)' : '#0f0f0f',
                border: '1px solid rgba(201,248,106,0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Inner glitch decoration */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: 10,
                  fontFamily: 'monospace',
                  fontSize: 7,
                  color: '#C9F86A',
                  opacity: 0.25,
                  userSelect: 'none',
                }}
              >
                work{project.id}_0{ci + 2}.jpg
              </div>
              {/* Lime accent bar */}
              {ci % 3 === 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 2,
                    background: '#C9F86A',
                    opacity: 0.4,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Row label */}
      <div
        style={{
          padding: '5px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#0B0B0B',
        }}
      >
        <span
          style={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: 8,
            color: 'rgba(201,248,106,0.45)',
            letterSpacing: '0.14em',
            userSelect: 'none',
          }}
        >
          {String(project.id).padStart(2, '0')} — work{project.id}
        </span>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 8,
            color: 'rgba(201,248,106,0.25)',
            userSelect: 'none',
          }}
        >
          hover to scroll →
        </span>
      </div>
    </div>
  );
}

function WorkPortfolioSection() {
  return (
    <div style={{ background: '#0B0B0B' }}>
      {PROJECTS.map((p, i) => (
        <WorkRow key={p.id} project={p} imgUrl={IMG_URLS[i % IMG_URLS.length]} />
      ))}
    </div>
  );
}

// ─── CONNECT SECTION ──────────────────────────────────────────────────────────
// Pre-seeded scatter to avoid runtime randomness
const SCATTER = Array.from({ length: 230 }, (_, i) => ({
  id: i,
  ch: '=+#%@012:!?/|^~`-;.,^"\'\\()[]'.charAt(i % 30),
  x: ((i * 1301 + 373) % 9800) / 100,
  y: ((i * 997 + 211) % 9400) / 100,
  op: 0.1 + ((i * 41) % 28) / 100,
  sz: 7 + (i % 5),
}));

const LIME_RECTS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: ((i * 1777 + 89) % 9200) / 100,
  y: ((i * 2333 + 211) % 8800) / 100,
  w: 10 + ((i * 37) % 64),
  h: 10 + ((i * 53) % 64),
}));

function ConnectSection({ onConnect }: { onConnect: () => void }) {
  const [glitchLabel, setGlitchLabel] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setGlitchLabel(true);
      setTimeout(() => setGlitchLabel(false), 140);
    }, 3200 + Math.random() * 2400);
    return () => clearInterval(iv);
  }, []);

  const label = glitchLabel ? 'CLlCK_T0_C0NNECT' : 'CLICK TO CONNECT';

  return (
    <div style={{ background: '#0B0B0B', position: 'relative', height: 560, overflow: 'hidden' }}>
      {/* Dense ASCII scatter */}
      {SCATTER.map(c => (
        <div
          key={c.id}
          style={{
            position: 'absolute',
            left: `${c.x}%`,
            top: `${c.y}%`,
            fontFamily: 'monospace',
            fontSize: c.sz,
            color: '#C9F86A',
            opacity: c.op,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {c.ch}
        </div>
      ))}

      {/* Lime solid rectangles */}
      {LIME_RECTS.map(b => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.w,
            height: b.h,
            background: '#C9F86A',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* +++ vertical column */}
      <div
        style={{
          position: 'absolute',
          right: '28%',
          top: 32,
          bottom: 60,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontWeight: 700,
              fontSize: 28,
              color: '#C9F86A',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            +++
          </div>
        ))}
      </div>

      {/* CLICK TO CONNECT */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '42%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        <button
          onClick={onConnect}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: '0.1em',
            color: '#C9F86A',
            background: hover ? 'rgba(201,248,106,0.08)' : 'transparent',
            border: `1px dashed ${glitchLabel ? '#fff' : '#C9F86A'}`,
            padding: '16px 36px',
            cursor: 'pointer',
            transform: glitchLabel ? 'translateX(4px)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </button>
      </div>

      {/* Left badge */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '38%',
          transform: 'translateY(-50%)',
          zIndex: 6,
        }}
      >
        <div
          style={{
            background: '#000',
            padding: '14px 10px',
            borderRight: '2px solid #C9F86A',
            borderTop: '1px solid rgba(201,248,106,0.4)',
            borderBottom: '1px solid rgba(201,248,106,0.4)',
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: '#C9F86A',
              userSelect: 'none',
            }}
          >
            W.
          </div>
          <div
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: 'monospace',
              fontSize: 8,
              color: '#C9F86A',
              opacity: 0.55,
              letterSpacing: '0.12em',
              marginTop: 10,
              userSelect: 'none',
            }}
          >
            Nominee
          </div>
        </div>
      </div>

      {/* Footer status bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          background: '#000',
          borderTop: '1px solid rgba(201,248,106,0.28)',
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          padding: '0 14px',
          zIndex: 12,
          overflow: 'hidden',
        }}
      >
        {[
          '//current status:',
          'available for fun — no meetings policy',
          'collabing w/ cool global agencies',
          'experiencing life —in human form',
          'mailto:hi@eloyb.design?subject=I WANT TO CONNECT',
          'site by eloyb',
          '20-25©©©',
        ].map((txt, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'monospace',
              fontSize: 7,
              color: i === 0 ? 'rgba(201,248,106,0.6)' : i === 4 ? '#C9F86A' : 'rgba(201,248,106,0.38)',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              marginRight: 24,
              userSelect: 'none',
            }}
          >
            {txt}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── NAV POPUP ────────────────────────────────────────────────────────────────
function NavPopup({
  onClose,
  onWork,
  onConnect,
}: {
  onClose: () => void;
  onWork: () => void;
  onConnect: () => void;
}) {
  const [hov, setHov] = useState<string | null>(null);
  const NAV = [
    { label: 'WHO', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'WORK', action: onWork },
    { label: 'CONNECT', action: onConnect },
    { label: 'LABS', action: () => {} },
  ];
  return (
    <div
      style={{
        position: 'fixed',
        top: 28,
        right: 28,
        zIndex: 200,
        width: 210,
        border: '2px solid #C9F86A',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          background: '#C9F86A',
          height: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5px 0 8px',
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: 8, fontWeight: 700, letterSpacing: '0.1em' }}>
          ELOYB DESIGN
        </span>
        <button
          onClick={onClose}
          style={{
            width: 14,
            height: 14,
            background: '#000',
            color: '#C9F86A',
            border: 'none',
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          ×
        </button>
      </div>
      <div style={{ background: '#0B0B0B', padding: '6px 0' }}>
        {NAV.map(({ label, action }) => (
          <div
            key={label}
            onClick={() => {
              action();
              onClose();
            }}
            onMouseEnter={() => setHov(label)}
            onMouseLeave={() => setHov(null)}
            style={{
              padding: '11px 16px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: hov === label ? '#000' : '#C9F86A',
              background: hov === label ? '#C9F86A' : 'transparent',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              userSelect: 'none',
            }}
          >
            {label}
          </div>
        ))}
        <div
          style={{
            padding: '8px 16px 10px',
            borderTop: '1px solid rgba(201,248,106,0.2)',
            marginTop: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 8,
              color: 'rgba(201,248,106,0.45)',
              letterSpacing: '0.06em',
              marginRight: 10,
            }}
          >
            socials →
          </span>
          {['IG', 'TW', 'LN', 'BE'].map(s => (
            <span
              key={s}
              style={{
                fontFamily: 'monospace',
                fontSize: 9,
                color: '#C9F86A',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                marginRight: 12,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONNECT POPUP ────────────────────────────────────────────────────────────
const CONTACT = [
  { label: 'EMAIL', value: 'hi@eloyb.design', href: 'mailto:hi@eloyb.design' },
  { label: 'INSTAGRAM', value: '@eloybdesign', href: '#' },
  { label: 'LINKEDIN', value: 'Eloyb Design', href: '#' },
];

function ConnectPopup({ onClose }: { onClose: () => void }) {
  const [hov, setHov] = useState<string | null>(null);
  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,0.72)' }}
      />
      <div
        style={{
          position: 'fixed',
          zIndex: 100,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 460,
          border: '2px solid #C9F86A',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            background: '#C9F86A',
            height: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 5px 0 8px',
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: 8, fontWeight: 700, letterSpacing: '0.1em' }}>
            ELOYB DESIGN
          </span>
          <button
            onClick={onClose}
            style={{
              width: 14,
              height: 14,
              background: '#000',
              color: '#C9F86A',
              border: 'none',
              fontFamily: 'monospace',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ background: '#C9F86A', padding: '24px 28px 28px' }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 8,
              color: '#000',
              opacity: 0.25,
              letterSpacing: '0.16em',
              marginBottom: 16,
              userSelect: 'none',
            }}
          >
            // INIT_CONTACT.EXE
          </div>
          {CONTACT.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              onMouseEnter={() => setHov(label)}
              onMouseLeave={() => setHov(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `14px ${hov === label ? '10px' : '0'}`,
                borderBottom: '2px solid #000',
                background: hov === label ? '#000' : 'transparent',
                color: hov === label ? '#C9F86A' : '#000',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 8,
                  opacity: hov === label ? 0.55 : 0.35,
                  letterSpacing: '0.14em',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 19,
                }}
              >
                {value}
              </span>
              <span style={{ opacity: 0.4, fontSize: 14 }}>→</span>
            </a>
          ))}
          <div
            style={{
              marginTop: 18,
              fontFamily: 'monospace',
              fontSize: 7,
              color: '#000',
              opacity: 0.18,
              letterSpacing: '0.12em',
              userSelect: 'none',
            }}
          >
            {'>>'} EOF_CONTACT // 20-25
          </div>
        </div>
      </div>
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);

  const workRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (ref: RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
  };

  return (
    <div
      style={{
        background: '#0B0B0B',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Fixed dark ASCII field */}
      <DarkPageCanvas />

      {/* Sections stack */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          padding: 14,
        }}
      >
        {/* 1. HERO */}
        <FloatingPanel onPlusClick={() => setNavOpen(v => !v)}>
          <HeroSection />
        </FloatingPanel>

        {/* 2. SELECTED WORK glitch trail */}
        <FloatingPanel title="ELOYB DESIGN" onPlusClick={() => setNavOpen(v => !v)}>
          <SelectedWorkSection scrollY={scrollY} />
        </FloatingPanel>

        {/* 3. PORTFOLIO */}
        <div ref={workRef} id="work">
          <FloatingPanel title="ELOYB DESIGN" onPlusClick={() => setNavOpen(v => !v)}>
            <WorkPortfolioSection />
          </FloatingPanel>
        </div>

        {/* 4. CONNECT */}
        <div ref={connectRef} id="connect">
          <FloatingPanel title="ELOYB DESIGN" onPlusClick={() => setNavOpen(v => !v)}>
            <ConnectSection onConnect={() => setConnectOpen(true)} />
          </FloatingPanel>
        </div>
      </div>

      {/* Nav popup */}
      {navOpen && (
        <NavPopup
          onClose={() => setNavOpen(false)}
          onWork={() => scrollTo(workRef)}
          onConnect={() => scrollTo(connectRef)}
        />
      )}

      {/* Connect popup */}
      {connectOpen && <ConnectPopup onClose={() => setConnectOpen(false)} />}
    </div>
  );
}