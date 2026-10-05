/**
 * BioPNL Official Brand Logo Utilities
 * Defines the exact vector specifications, canvas rendering, and data URL generation
 * matching the user's authentic brand guideline screenshot 100%.
 */

export interface BrandLogoOptions {
  theme?: 'light' | 'dark';
  showText?: boolean;
  scale?: number;
}

// Official brand colors from screenshot
export const BRAND_COLORS = {
  // Circular terracotta emblem
  circleLight: '#E26A40',
  circleLightGradEnd: '#D45A2F',
  circleDark: '#F47A45',
  circleDarkGradEnd: '#D95B30',

  // Inner organic segments (warm creamy blush)
  lobesLight: '#FBECE3',
  lobesDark: '#FFF0E8',

  // Typography wordmark "biopnl"
  textLight: '#241915',
  textDark: '#FFF7F2'
};

/**
 * Draws the official BioPNL circular emblem with the 3 organic segments
 * (Upper Kernel, Lower-Left Wrap, and Right Crescent) on HTML Canvas.
 */
export function drawEmblemOnCanvas(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  isDark: boolean = false
) {
  ctx.save();
  ctx.translate(x, y);
  const s = size / 100;
  ctx.scale(s, s);

  // 1. Terracotta Circle
  const circleGrad = ctx.createLinearGradient(50, 4, 50, 96);
  if (isDark) {
    circleGrad.addColorStop(0, BRAND_COLORS.circleDark);
    circleGrad.addColorStop(1, BRAND_COLORS.circleDarkGradEnd);
  } else {
    circleGrad.addColorStop(0, BRAND_COLORS.circleLight);
    circleGrad.addColorStop(1, BRAND_COLORS.circleLightGradEnd);
  }
  ctx.fillStyle = circleGrad;
  ctx.beginPath();
  ctx.arc(50, 50, 46, 0, Math.PI * 2);
  ctx.fill();

  // 2. Inner Organic Segments in Soft Cream Blush
  ctx.fillStyle = isDark ? BRAND_COLORS.lobesDark : BRAND_COLORS.lobesLight;

  // Segment 1: Upper Central Kernel
  ctx.beginPath();
  ctx.moveTo(44, 14);
  ctx.bezierCurveTo(50, 14, 53, 19, 53, 26);
  ctx.bezierCurveTo(53, 38, 52, 52, 50, 63);
  ctx.bezierCurveTo(49, 69, 45, 72, 40, 71);
  ctx.bezierCurveTo(35, 70, 32, 64, 32, 54);
  ctx.bezierCurveTo(32, 40, 34, 26, 38, 18);
  ctx.bezierCurveTo(40, 15, 42, 14, 44, 14);
  ctx.closePath();
  ctx.fill();

  // Segment 2: Lower-Left Wrap Lobe
  ctx.beginPath();
  ctx.moveTo(18, 42);
  ctx.bezierCurveTo(24, 45, 28, 52, 30, 62);
  ctx.bezierCurveTo(31, 70, 37, 76, 43, 78);
  ctx.bezierCurveTo(38, 83, 31, 84, 24, 81);
  ctx.bezierCurveTo(17, 76, 13, 67, 13, 58);
  ctx.bezierCurveTo(13, 51, 15, 45, 18, 42);
  ctx.closePath();
  ctx.fill();

  // Segment 3: Right Crescent
  ctx.beginPath();
  ctx.moveTo(57, 20);
  ctx.bezierCurveTo(68, 22, 78, 32, 82, 46);
  ctx.bezierCurveTo(85, 58, 82, 70, 74, 77);
  ctx.bezierCurveTo(68, 81, 61, 80, 58, 76);
  ctx.bezierCurveTo(60, 70, 60, 58, 59, 46);
  ctx.bezierCurveTo(58, 36, 57, 26, 57, 20);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * Draws the full BioPNL Logo (Emblem + "biopnl" lowercase wordmark) on a Canvas context.
 */
export function drawFullBrandLogo(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  emblemSize: number = 60,
  options?: BrandLogoOptions
) {
  const isDark = options?.theme === 'dark';
  const showText = options?.showText !== false;

  // Draw the Emblem
  drawEmblemOnCanvas(ctx, x, y, emblemSize, isDark);

  if (showText) {
    ctx.save();
    // Wordmark typography in Comfortaa bold lowercase
    const fontSize = emblemSize * 0.76;
    ctx.font = `bold ${fontSize}px 'Comfortaa', -apple-system, sans-serif`;
    ctx.fillStyle = isDark ? BRAND_COLORS.textDark : BRAND_COLORS.textLight;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';

    const textX = x + emblemSize + emblemSize * 0.26;
    const textY = y + emblemSize * 0.52;
    ctx.fillText('biopnl', textX, textY);
    ctx.restore();
  }
}

/**
 * Generates a crisp, high-resolution PNG Data URL of the brand logo
 * for insertion into jsPDF documents or canvas overlays.
 */
export function getBrandLogoDataUrl(
  emblemSize: number = 120,
  options?: BrandLogoOptions
): string {
  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  const isDark = options?.theme === 'dark';
  const showText = options?.showText !== false;

  // Canvas dimensions
  const height = emblemSize;
  const width = showText ? emblemSize * 3.6 : emblemSize;

  canvas.width = width * 2; // 2x for sharp retina rendering
  canvas.height = height * 2;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.scale(2, 2);
  drawFullBrandLogo(ctx, 0, 0, emblemSize, { theme: isDark ? 'dark' : 'light', showText });

  return canvas.toDataURL('image/png');
}
