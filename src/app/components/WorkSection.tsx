import { useRef } from 'react';

const WORKS = [
  { id: 1, name: 'work1', title: 'PROJECT ALPHA', type: 'WEB / DESIGN', year: '2024', tags: ['UI', 'BRANDING', 'MOTION'] },
  { id: 2, name: 'work2', title: 'PROJECT BETA', type: 'WEBFLOW / UI', year: '2024', tags: ['WEBFLOW', 'CMS', 'ANIMATION'] },
  { id: 3, name: 'work3', title: 'PROJECT GAMMA', type: 'GLITCH / ART', year: '2023', tags: ['GLITCH', 'DIGITAL ART', 'IDENTITY'] },
  { id: 4, name: 'work4', title: 'PROJECT DELTA', type: 'MOTION / DEV', year: '2023', tags: ['REACT', 'GSAP', 'THREE.JS'] },
  { id: 5, name: 'work5', title: 'PROJECT EPSILON', type: 'BRANDING / WEB', year: '2022', tags: ['BRAND', 'PRINT', 'WEB'] },
];

function WorkRow({ work, isEven }: { work: typeof WORKS[0]; isEven: boolean }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isHovering = useRef(false);
  const animRef = useRef<number>(0);
  const MAX_OFFSET = 1360;

  const bg = isEven ? '#C9F86A' : '#000000';
  const fg = isEven ? '#000000' : '#C9F86A';
  const revealBg = isEven ? '#000000' : '#C9F86A';
  const revealFg = isEven ? '#C9F86A' : '#000000';

  const handleMouseEnter = () => {
    isHovering.current = true;
    const animate = () => {
      if (!isHovering.current || !innerRef.current) return;
      offsetRef.current = Math.min(offsetRef.current + 4, MAX_OFFSET);
      innerRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    cancelAnimationFrame(animRef.current);
  };

  return (
    <div style={{ marginBottom: 2 }}>
      {/* Card row */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ overflow: 'hidden', height: 88, cursor: 'pointer', borderTop: '2px solid #000', borderBottom: '2px solid #000' }}
      >
        {/* Sliding inner container */}
        <div
          ref={innerRef}
          style={{ display: 'flex', width: '2800px', height: '100%', willChange: 'transform' }}
        >
          {/* Visible portion */}
          <div
            style={{
              width: 1440,
              flexShrink: 0,
              height: '100%',
              background: bg,
              display: 'flex',
              alignItems: 'center',
              padding: '0 56px',
              gap: 32,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                color: fg,
                letterSpacing: '-0.01em',
                flexShrink: 0,
              }}
            >
              {work.title}
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 11, color: fg, opacity: 0.5, letterSpacing: '0.12em' }}
            >
              {work.type}
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
              {work.tags.map(tag => (
                <span
                  key={tag}
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    color: fg,
                    border: `1px solid ${fg}`,
                    padding: '2px 6px',
                    opacity: 0.45,
                    letterSpacing: '0.1em',
                  }}
                >
                  {tag}
                </span>
              ))}
              <span
                className="font-mono"
                style={{ fontSize: 10, color: fg, opacity: 0.35, marginLeft: 20, letterSpacing: '0.1em' }}
              >
                → HOVER
              </span>
            </div>
          </div>

          {/* Revealed content */}
          <div
            style={{
              width: 1360,
              flexShrink: 0,
              height: '100%',
              background: revealBg,
              display: 'flex',
              alignItems: 'center',
              padding: '0 56px',
              gap: 40,
            }}
          >
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
                <div style={{ width: 72, height: 6, background: revealFg, opacity: 0.5 }} />
                <div style={{ width: 48, height: 4, background: revealFg, opacity: 0.3 }} />
                <div style={{ width: 60, height: 4, background: revealFg, opacity: 0.2 }} />
              </div>
            ))}
            <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: revealFg,
                  letterSpacing: '0.08em',
                }}
              >
                VIEW PROJECT →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project name label */}
      <div
        style={{
          padding: '10px 56px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span className="font-mono" style={{ fontSize: 10, color: '#000', opacity: 0.3, letterSpacing: '0.1em' }}>
          {String(work.id).padStart(2, '0')}
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            color: '#000',
            letterSpacing: '0.18em',
          }}
        >
          {work.name.toUpperCase()}
        </span>
        <span className="font-mono" style={{ fontSize: 10, color: '#000', opacity: 0.25 }}>
          {work.type}
        </span>
        <span className="font-mono" style={{ fontSize: 10, color: '#000', opacity: 0.2, marginLeft: 'auto' }}>
          {work.year}
        </span>
      </div>
    </div>
  );
}

export function WorkSection() {
  return (
    <div>
      {/* Section label */}
      <div style={{ padding: '64px 56px 40px', borderBottom: '2px solid #000' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.22em',
              color: '#000',
              margin: 0,
            }}
          >
            SELECTED WORK
          </h2>
          <span className="font-mono" style={{ fontSize: 10, color: '#000', opacity: 0.35 }}>
            // 2022 — 2024
          </span>
          <span className="font-mono" style={{ fontSize: 10, color: '#000', opacity: 0.25, marginLeft: 'auto' }}>
            HOVER ROWS TO EXPLORE →
          </span>
        </div>
      </div>

      {/* Rows */}
      <div>
        {WORKS.map((w, i) => (
          <WorkRow key={w.id} work={w} isEven={i % 2 === 0} />
        ))}
      </div>
    </div>
  );
}
