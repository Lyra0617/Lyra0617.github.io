import { useEffect, useRef } from 'react';

const CHARS = '=+#%*@0123456789:.!?/\\|><^~`_-;,01010111';
const FONT_SIZE = 13;
const CHAR_W = 8;
const CANVAS_W = 1440;
const CANVAS_H = 980;

export function ASCIIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = Math.floor(CANVAS_W / CHAR_W);
    const rows = Math.floor(CANVAS_H / FONT_SIZE);

    const grid: string[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => CHARS[Math.floor(Math.random() * CHARS.length)])
    );

    let animId: number;
    let lastTime = 0;
    const FPS = 12;

    const render = (time: number) => {
      if (time - lastTime > 1000 / FPS) {
        lastTime = time;
        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.font = `${FONT_SIZE}px "Courier New", monospace`;

        const updateCount = Math.floor(cols * rows * 0.035);
        for (let i = 0; i < updateCount; i++) {
          const r = Math.floor(Math.random() * rows);
          const c = Math.floor(Math.random() * cols);
          grid[r][c] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const opacity = 0.08 + ((r * 7 + c * 3) % 5) * 0.025;
            ctx.fillStyle = `rgba(0,0,0,${opacity})`;
            ctx.fillText(grid[r][c], c * CHAR_W, r * FONT_SIZE + FONT_SIZE);
          }
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      className="absolute top-0 left-0 pointer-events-none select-none"
      style={{ zIndex: 1 }}
    />
  );
}
