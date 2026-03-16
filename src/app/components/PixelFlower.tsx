import { useEffect, useRef } from 'react';

// 16×16 pixel grid: 0=empty, 1=solid, 2=accent
const FLOWER_PATTERN: number[][] = [
  [0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0],
  [0,0,0,0,2,2,1,1,1,1,2,2,0,0,0,0],
  [0,0,0,2,1,1,1,2,2,1,1,1,2,0,0,0],
  [0,0,2,1,1,2,2,0,0,2,2,1,1,2,0,0],
  [0,2,1,1,2,0,0,0,0,0,0,2,1,1,2,0],
  [0,2,1,2,0,0,0,0,0,0,0,0,2,1,2,0],
  [2,1,1,0,0,0,1,1,1,1,0,0,0,1,1,2],
  [2,1,2,0,0,1,2,2,2,2,1,0,0,2,1,2],
  [2,1,2,0,0,1,2,2,2,2,1,0,0,2,1,2],
  [2,1,1,0,0,0,1,1,1,1,0,0,0,1,1,2],
  [0,2,1,2,0,0,0,0,0,0,0,0,2,1,2,0],
  [0,2,1,1,2,0,0,0,0,0,0,2,1,1,2,0],
  [0,0,2,1,1,2,2,0,0,2,2,1,1,2,0,0],
  [0,0,0,2,1,1,1,2,2,1,1,1,2,0,0,0],
  [0,0,0,0,2,2,1,1,1,1,2,2,0,0,0,0],
  [0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0],
];

const GRID = 16;
// Canvas is drawn at small size, CSS scales it up for the "big pixel" voxel look
const PIXEL_SIZE = 10;
const CANVAS_SIZE = GRID * PIXEL_SIZE; // 160

interface PixelFlowerProps {
  className?: string;
  displaySize?: number;       // CSS display size in px
  colorA?: string;            // solid cells
  colorB?: string;            // accent cells
  rotationOffset?: number;
  speed?: number;
  opacity?: number;
}

export function PixelFlower({
  className = '',
  displaySize = 320,
  colorA = '#000000',
  colorB = '#000000',
  rotationOffset = 0,
  speed = 0.003,
  opacity = 0.75,
}: PixelFlowerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rotation = rotationOffset;
    let glitchFrames = 0;
    let animId: number;
    const cx = CANVAS_SIZE / 2;
    const cy = CANVAS_SIZE / 2;

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      const isGlitching = glitchFrames > 0;
      const totalW = GRID * PIXEL_SIZE;

      for (let r = 0; r < GRID; r++) {
        for (let c = 0; c < GRID; c++) {
          const val = FLOWER_PATTERN[r][c];
          if (val === 0) continue;

          let px = c * PIXEL_SIZE - totalW / 2;
          let py = r * PIXEL_SIZE - totalW / 2;

          if (isGlitching && Math.random() < 0.25) {
            px += (Math.random() - 0.5) * 10;
            py += (Math.random() - 0.5) * 5;
          }

          ctx.fillStyle = val === 1 ? colorA : colorB;
          ctx.globalAlpha = val === 1 ? 1 : 0.65;
          ctx.fillRect(px, py, PIXEL_SIZE - 1, PIXEL_SIZE - 1);

          // subtle highlight top-left for voxel depth
          if (val === 1) {
            ctx.fillStyle = 'rgba(255,255,255,0.12)';
            ctx.globalAlpha = 1;
            ctx.fillRect(px, py, PIXEL_SIZE - 1, 2);
            ctx.fillRect(px, py, 2, PIXEL_SIZE - 1);
          }
        }
      }

      ctx.restore();
      rotation += speed;
      glitchFrames = Math.max(0, glitchFrames - 1);
      if (Math.random() < 0.004) glitchFrames = 10;

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [colorA, colorB, rotationOffset, speed]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      className={className}
      style={{
        width: displaySize,
        height: displaySize,
        imageRendering: 'pixelated',
        opacity,
      }}
    />
  );
}
