import { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// Inject bento styles directly
const bentoStyles = `
:root {
  --ink: #1f2b2d;
  --ink-soft: #2e3d40;
  --sand: #f6e7cf;
  --paper: #fbf7ef;
  --clay: #d86b4b;
  --teal: #1f6f78;
  --sun: #f2c14e;
  --sage: #9db59e;
  --clay-shadow: rgba(216, 107, 75, 0.28);
  --teal-shadow: rgba(31, 111, 120, 0.24);
  --hero-cool: rgba(31, 111, 120, 0.12);
  --hero-warm: rgba(242, 193, 78, 0.18);
  --hero-glow: rgba(216, 107, 75, 0.35);
  --card-radius: 15px;
  --card-radius-corner: 40px;
  --shadow-bento: 0 18px 40px rgba(31, 43, 45, 0.12);
}

.bento-page {
  min-height: 100vh;
  padding: 40px 24px 60px;
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  background: radial-gradient(circle at 15% 15%, rgba(242, 193, 78, 0.25), transparent 45%),
              radial-gradient(circle at 85% 10%, rgba(31, 111, 120, 0.22), transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(157, 181, 158, 0.25), transparent 45%),
              var(--paper) !important;
  color: var(--ink) !important;
}

.bento-page::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: linear-gradient(120deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0)),
                    repeating-linear-gradient(90deg, rgba(31, 43, 45, 0.04), rgba(31, 43, 45, 0.04) 1px, transparent 1px, transparent 24px);
  pointer-events: none;
  z-index: 0;
}

.bento-grid {
  width: min(1120px, 100%);
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-auto-rows: 110px;
  gap: 12px;
  position: relative;
  z-index: 1;
  margin: 0 auto;
}

.bento-card {
  background: var(--paper) !important;
  border-radius: var(--card-radius);
  padding: 24px;
  border: 1px solid rgba(31, 43, 45, 0.1) !important;
  box-shadow: var(--shadow-bento) !important;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: floatIn 0.9s ease both;
  position: relative;
  overflow: hidden;
}

.bento-hero {
  grid-column: span 7;
  grid-row: span 3;
  background: linear-gradient(135deg, var(--hero-cool), var(--hero-warm)), var(--paper) !important;
  border-top-left-radius: var(--card-radius-corner);
}

.bento-hero::after {
  content: '';
  position: absolute;
  width: 240px;
  height: 240px;
  right: -80px;
  top: -90px;
  background: radial-gradient(circle, var(--hero-glow), transparent 70%);
  border-radius: 50%;
  z-index: 0;
}

.bento-hero > * {
  position: relative;
  z-index: 1;
}

.bento-palette {
  grid-column: span 5;
  grid-row: span 3;
  border-top-right-radius: var(--card-radius-corner);
  padding: 20px;
  gap: 10px;
}

.bento-contrast, .bento-temp, .bento-type {
  grid-column: span 4;
  grid-row: span 2;
}

.bento-harmony {
  grid-column: span 7;
  grid-row: span 2;
}

.bento-accent {
  grid-column: span 5;
  grid-row: span 2;
}

.bento-usage {
  grid-column: span 7;
  grid-row: span 2;
  border-bottom-left-radius: var(--card-radius-corner);
}

.bento-controls {
  grid-column: span 5;
  grid-row: span 2;
  border-bottom-right-radius: var(--card-radius-corner);
}

.bento-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.7rem;
  color: var(--ink-soft);
}

.bento-title {
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(2.2rem, 3.2vw, 3.3rem);
  line-height: 1.05;
  color: var(--ink) !important;
}

.bento-section-title {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  color: var(--ink-soft);
  margin: 0;
}

.bento-lead {
  font-size: 1.02rem;
  line-height: 1.6;
  max-width: 420px;
  color: var(--ink-soft);
}

.bento-btn {
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  font-size: 0.95rem;
}

.bento-btn-small {
  padding: 8px 14px;
  font-size: 0.85rem;
}

.bento-btn-primary {
  background: var(--clay) !important;
  color: #fff !important;
  box-shadow: 0 12px 20px var(--clay-shadow) !important;
}

.bento-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 24px var(--clay-shadow) !important;
}

.bento-btn-ghost {
  background: transparent !important;
  border-color: rgba(31, 43, 45, 0.2);
  color: var(--ink) !important;
}

.bento-btn-ghost:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 18px rgba(31, 43, 45, 0.18) !important;
}

.bento-btn-outline {
  background: transparent !important;
  border-color: var(--teal);
  color: var(--teal) !important;
  box-shadow: 0 10px 18px var(--teal-shadow) !important;
}

.bento-btn-outline:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 22px var(--teal-shadow) !important;
}

.bento-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.bento-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: auto;
}

.bento-metric {
  background: rgba(255, 255, 255, 0.65);
  border-radius: 14px;
  padding: 10px 12px;
  border: 1px solid rgba(31, 43, 45, 0.08);
}

.bento-metric-value {
  font-weight: 700;
  color: var(--ink);
}

.bento-metric-label {
  display: block;
  font-size: 0.75rem;
  color: var(--ink-soft);
}

.swatch-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  font-size: 0.85rem;
}

.swatch-card {
  position: relative;
  border-radius: 14px;
  padding: 10px 10px 8px 32px;
  min-height: 52px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  border: 1px solid rgba(31, 43, 45, 0.15);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.swatch-card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 20px rgba(31, 43, 45, 0.15);
}

.swatch-card:focus-within {
  outline: 2px solid rgba(31, 111, 120, 0.45);
  outline-offset: 2px;
}

.swatch-dot {
  position: absolute;
  top: 9px;
  left: 9px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid rgba(31, 43, 45, 0.08);
  box-shadow: 0 3px 8px rgba(31, 43, 45, 0.18);
}

.swatch-name {
  font-weight: 600;
}

.swatch-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.swatch-value {
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.85;
}

.swatch-teal { background-color: var(--teal) !important; color: #fff !important; }
.swatch-clay { background-color: var(--clay) !important; color: #fff !important; }
.swatch-sun { background-color: var(--sun) !important; color: var(--ink) !important; }
.swatch-sand { background-color: var(--sand) !important; color: var(--ink) !important; }
.swatch-sage { background-color: var(--sage) !important; color: var(--ink) !important; }
.swatch-ink { background-color: var(--ink) !important; color: #fff !important; }

.contrast-stack {
  display: grid;
  gap: 8px;
}

.contrast-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
  align-items: center;
  gap: 10px;
}

.contrast-meta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.contrast-meta span {
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.35);
  font-weight: 700;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.contrast-row.contrast-pass {
  outline: 1px solid rgba(31, 111, 120, 0.4);
}

.contrast-row.contrast-warn {
  outline: 1px solid rgba(216, 107, 75, 0.45);
}

.contrast-ink { background: var(--sand) !important; color: var(--ink) !important; }
.contrast-teal { background: var(--teal) !important; color: #fff !important; }
.contrast-sun { background: var(--ink) !important; color: var(--sun) !important; }

.bento-note {
  font-size: 0.85rem;
  color: var(--ink-soft);
  margin: 0;
}

.temp-bar {
  position: relative;
  height: 56px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--teal), var(--sage), var(--sun), var(--clay)) !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  color: #fff !important;
  font-weight: 600;
}

.temp {
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
}

.type-sample h3 {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 1.3rem;
  margin: 6px 0 4px;
  color: var(--ink) !important;
}

.type-sample p {
  font-size: 0.9rem;
  color: var(--ink-soft);
  margin: 0;
}

.bento-kicker {
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: var(--clay);
  font-weight: 600;
}

.harmony-strip {
  height: 90px;
  border-radius: 18px;
  background: linear-gradient(90deg, var(--teal), var(--sage), var(--sand), var(--sun), var(--clay), var(--ink)) !important;
  border: 1px solid rgba(31, 43, 45, 0.1);
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.bento-chip {
  background: rgba(31, 43, 45, 0.08);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.75rem;
  color: var(--ink);
}

.accent-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.usage-panel {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(31, 43, 45, 0.08);
  display: grid;
  gap: 8px;
}

.usage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-soft);
}

.status-pill {
  background: var(--teal) !important;
  color: #fff !important;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
}

.usage-title {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 1.05rem;
  color: var(--ink);
  margin: 0;
}

.usage-text {
  font-size: 0.85rem;
  color: var(--ink-soft);
  margin: 0;
}

.usage-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.bento-tag {
  background: rgba(31, 43, 45, 0.08);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.7rem;
  color: var(--ink);
}

.palette-controls {
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px dashed rgba(31, 43, 45, 0.15);
  display: grid;
  gap: 12px;
}

.control-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.control-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.bento-control {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--ink-soft);
}

.bento-control input[type="color"],
.bento-control select {
  height: 38px;
  border-radius: 12px;
  border: 1px solid rgba(31, 43, 45, 0.12);
  padding: 4px 10px;
  background: #fff;
  color: var(--ink);
  font-weight: 600;
  font-size: 0.85rem;
  font-family: 'Space Grotesk', -apple-system, sans-serif;
}

@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.bento-card:nth-child(1) { animation-delay: 0.05s; }
.bento-card:nth-child(2) { animation-delay: 0.1s; }
.bento-card:nth-child(3) { animation-delay: 0.15s; }
.bento-card:nth-child(4) { animation-delay: 0.2s; }
.bento-card:nth-child(5) { animation-delay: 0.25s; }
.bento-card:nth-child(6) { animation-delay: 0.3s; }
.bento-card:nth-child(7) { animation-delay: 0.35s; }
.bento-card:nth-child(8) { animation-delay: 0.4s; }
.bento-card:nth-child(9) { animation-delay: 0.45s; }

@media (max-width: 1050px) {
  :root {
    --card-radius: 14px;
    --card-radius-corner: 36px;
  }
  .bento-hero { border-top-right-radius: var(--card-radius-corner); }
  .bento-palette { border-top-right-radius: var(--card-radius); }
  .bento-usage { border-bottom-left-radius: var(--card-radius); }
  .bento-controls { border-bottom-left-radius: var(--card-radius-corner); border-bottom-right-radius: var(--card-radius-corner); }
  .bento-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-auto-rows: 110px;
  }
  .bento-hero, .bento-palette, .bento-harmony, .bento-accent, .bento-usage, .bento-controls {
    grid-column: span 6;
  }
  .bento-contrast, .bento-temp, .bento-type {
    grid-column: span 3;
  }
}

@media (max-width: 820px) {
  :root {
    --card-radius: 14px;
    --card-radius-corner: 32px;
  }
  .bento-hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .bento-hero-actions .bento-btn {
    width: 100%;
  }
  .bento-contrast, .bento-temp, .bento-type {
    grid-column: span 6;
  }
  .contrast-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .contrast-meta {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 720px) {
  :root {
    --card-radius: 13px;
    --card-radius-corner: 28px;
  }
  .bento-page {
    padding: 24px 16px 40px;
  }
  .bento-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .bento-card {
    grid-column: auto;
    grid-row: auto;
  }
  .bento-metrics {
    grid-template-columns: 1fr;
  }
  .swatch-list {
    grid-template-columns: 1fr;
  }
  .control-row {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bento-card {
    animation: none;
  }
  .bento-btn, .swatch-card {
    transition: none;
  }
}
`;

// Color name library for auto-naming
const colorNameLibrary = [
  { name: 'Ink', hex: '#1F2B2D' },
  { name: 'Slate', hex: '#3C4B4E' },
  { name: 'Deep Teal', hex: '#1F6F78' },
  { name: 'Lagoon', hex: '#2A8791' },
  { name: 'Sage', hex: '#9DB59E' },
  { name: 'Moss', hex: '#7A8F7A' },
  { name: 'Sand', hex: '#F6E7CF' },
  { name: 'Oat', hex: '#F2E2C8' },
  { name: 'Sun', hex: '#F2C14E' },
  { name: 'Amber', hex: '#EBA741' },
  { name: 'Clay', hex: '#D86B4B' },
  { name: 'Terracotta', hex: '#C75D40' },
  { name: 'Rose', hex: '#D05D7B' },
  { name: 'Plum', hex: '#6E3B5F' },
  { name: 'Indigo', hex: '#2C3A6A' },
  { name: 'Cobalt', hex: '#2C65C8' },
  { name: 'Mint', hex: '#7EC6B2' },
  { name: 'Pearl', hex: '#F8F6F0' },
];

const paletteKeys = ['teal', 'clay', 'sun', 'sand', 'sage', 'ink'];

interface BentoThemeCustomizerProps {
  onPaletteChange?: (palette: Record<string, string>) => void;
}

export function BentoThemeCustomizer({ onPaletteChange }: BentoThemeCustomizerProps) {
  const [palette, setPalette] = useState<Record<string, string>>({
    teal: '#1F6F78',
    clay: '#D86B4B',
    sun: '#F2C14E',
    sand: '#F6E7CF',
    sage: '#9DB59E',
    ink: '#1F2B2D',
  });
  
  const [colorNames, setColorNames] = useState<Record<string, string>>({
    teal: 'Deep Teal',
    clay: 'Clay',
    sun: 'Sun',
    sand: 'Sand',
    sage: 'Sage',
    ink: 'Ink',
  });

  const [harmonyMode, setHarmonyMode] = useState<'analogous' | 'complementary' | 'triadic'>('analogous');
  const [copied, setCopied] = useState(false);
  const [contrastValues, setContrastValues] = useState<Record<string, { ratio: number; grade: string }>>({});
  
  const autoRandomRef = useRef<NodeJS.Timeout | null>(null);
  const autoRandomTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasInteractedRef = useRef(false);
  const stylesInjectedRef = useRef(false);

  // Inject styles once on mount
  useEffect(() => {
    if (!stylesInjectedRef.current) {
      const styleEl = document.createElement('style');
      styleEl.id = 'bento-styles';
      styleEl.textContent = bentoStyles;
      document.head.appendChild(styleEl);
      stylesInjectedRef.current = true;
    }
  }, []);

  // Color utilities
  const normalizeHex = (hex: string): string => {
    if (!hex) return '#000000';
    let value = hex.trim().replace('#', '');
    if (value.length === 3) value = value.split('').map(c => c + c).join('');
    value = value.padStart(6, '0').slice(0, 6);
    return `#${value.toUpperCase()}`;
  };

  const hexToRgb = (hex: string) => {
    const value = normalizeHex(hex).replace('#', '');
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16),
    };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (v: number) => Math.round(v).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const hexToHsl = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) * 60; break;
        case gNorm: h = ((bNorm - rNorm) / d + 2) * 60; break;
        case bNorm: h = ((rNorm - gNorm) / d + 4) * 60; break;
      }
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    const sat = s / 100, light = l / 100;
    const c = (1 - Math.abs(2 * light - 1)) * sat;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = light - c / 2;
    let r = 0, g = 0, b = 0;

    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }

    return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
  };

  const shiftHue = (h: number, offset: number) => (h + offset + 360) % 360;

  const getNearestColorName = (hex: string) => {
    const target = hexToRgb(hex);
    let closest = colorNameLibrary[0].name;
    let bestDistance = Infinity;

    colorNameLibrary.forEach(entry => {
      const rgb = hexToRgb(entry.hex);
      const distance = Math.pow(target.r - rgb.r, 2) + Math.pow(target.g - rgb.g, 2) + Math.pow(target.b - rgb.b, 2);
      if (distance < bestDistance) {
        bestDistance = distance;
        closest = entry.name;
      }
    });
    return closest;
  };

  const relativeLuminance = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const transform = (v: number) => {
      const norm = v / 255;
      return norm <= 0.03928 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
  };

  const contrastRatio = (hexA: string, hexB: string) => {
    const lumA = relativeLuminance(hexA);
    const lumB = relativeLuminance(hexB);
    return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
  };

  const getContrastGrade = (ratio: number) => {
    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    if (ratio >= 3) return 'AA Large';
    return 'Fail';
  };

  // Apply palette to DOM
  const applyPalette = useCallback((newPalette: Record<string, string>) => {
    const root = document.documentElement;
    
    // Apply bento variables
    Object.entries(newPalette).forEach(([key, hex]) => {
      root.style.setProperty(`--${key}`, hex);
    });

    // Update shadow variables
    const setShadowVar = (name: string, hex: string, alpha: number) => {
      const rgb = hexToRgb(hex);
      root.style.setProperty(name, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`);
    };

    if (newPalette.clay) setShadowVar('--clay-shadow', newPalette.clay, 0.28);
    if (newPalette.teal) setShadowVar('--teal-shadow', newPalette.teal, 0.24);
    if (newPalette.teal) setShadowVar('--hero-cool', newPalette.teal, 0.12);
    if (newPalette.sun) setShadowVar('--hero-warm', newPalette.sun, 0.18);
    if (newPalette.clay) setShadowVar('--hero-glow', newPalette.clay, 0.35);

    // Also apply to standard theme variables for the main app
    root.style.setProperty('--primary', newPalette.teal || '#1F6F78');
    root.style.setProperty('--secondary', newPalette.clay || '#D86B4B');
    root.style.setProperty('--accent', newPalette.sun || '#F2C14E');
    root.style.setProperty('--background', newPalette.sand || '#F6E7CF');
    root.style.setProperty('--muted', newPalette.sage || '#9DB59E');
    root.style.setProperty('--foreground', newPalette.ink || '#1F2B2D');

    // Update color names
    const names: Record<string, string> = {};
    paletteKeys.forEach(key => {
      names[key] = getNearestColorName(newPalette[key]);
    });
    setColorNames(names);

    // Update contrast values
    const contrasts: Record<string, { ratio: number; grade: string }> = {};
    const contrastPairs = [
      { key: 'ink-sand', fg: 'ink', bg: 'sand' },
      { key: 'sand-teal', fg: 'sand', bg: 'teal' },
      { key: 'sun-ink', fg: 'sun', bg: 'ink' },
    ];
    contrastPairs.forEach(({ key, fg, bg }) => {
      const ratio = contrastRatio(newPalette[fg], newPalette[bg]);
      contrasts[key] = { ratio, grade: getContrastGrade(ratio) };
    });
    setContrastValues(contrasts);

    onPaletteChange?.(newPalette);
  }, [onPaletteChange]);

  // Build palette from base
  const buildPalette = useCallback((baseHex: string, mode: 'analogous' | 'complementary' | 'triadic') => {
    const base = normalizeHex(baseHex);
    const { h } = hexToHsl(base);

    const offsets = {
      analogous: { warm: 30, accent: 60 },
      complementary: { warm: 180, accent: 210 },
      triadic: { warm: 120, accent: 240 },
    };
    const selected = offsets[mode];

    return {
      teal: base,
      clay: hslToHex(shiftHue(h, selected.warm), 64, 52),
      sun: hslToHex(shiftHue(h, selected.accent), 82, 60),
      sand: hslToHex(shiftHue(h, 18), 55, 92),
      sage: hslToHex(shiftHue(h, -22), 24, 66),
      ink: hslToHex(shiftHue(h, 200), 22, 18),
    };
  }, []);

  const randomHex = () => {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    return `#${hex.toUpperCase()}`;
  };

  const randomizePalette = useCallback(() => {
    const newPalette = buildPalette(randomHex(), harmonyMode);
    setPalette(newPalette);
    applyPalette(newPalette);
  }, [harmonyMode, buildPalette, applyPalette]);

  const handleColorChange = (key: string, hex: string) => {
    hasInteractedRef.current = true;
    const newPalette = { ...palette, [key]: normalizeHex(hex) };
    setPalette(newPalette);
    applyPalette(newPalette);
  };

  const handleGenerate = () => {
    hasInteractedRef.current = true;
    const base = palette.teal || randomHex();
    const newPalette = buildPalette(base, harmonyMode);
    setPalette(newPalette);
    applyPalette(newPalette);
  };

  const handleExport = () => {
    const cssLines = paletteKeys.map(key => `  --${key}: ${palette[key]};`);
    const cssBlock = `:root {\n${cssLines.join('\n')}\n}`;
    const json = JSON.stringify(palette, null, 2);

    navigator.clipboard.writeText(`${cssBlock}\n\n${json}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  // Auto-randomize on mount
  useEffect(() => {
    if (hasInteractedRef.current) return;

    autoRandomRef.current = setInterval(() => {
      if (!hasInteractedRef.current) {
        randomizePalette();
      }
    }, 450);

    autoRandomTimeoutRef.current = setTimeout(() => {
      if (autoRandomRef.current) clearInterval(autoRandomRef.current);
    }, 2200);

    return () => {
      if (autoRandomRef.current) clearInterval(autoRandomRef.current);
      if (autoRandomTimeoutRef.current) clearTimeout(autoRandomTimeoutRef.current);
    };
  }, []);

  // Stop on interaction
  useEffect(() => {
    const stopAuto = () => {
      hasInteractedRef.current = true;
      if (autoRandomRef.current) clearInterval(autoRandomRef.current);
      if (autoRandomTimeoutRef.current) clearTimeout(autoRandomTimeoutRef.current);
    };
    const events = ['pointerdown', 'keydown', 'touchstart'] as const;
    events.forEach(event => window.addEventListener(event, stopAuto, { once: true, passive: true }));
    return () => events.forEach(event => window.removeEventListener(event, stopAuto));
  }, []);

  // Initial contrast calculation
  useEffect(() => {
    applyPalette(palette);
  }, []);

  return (
    <div className="bento-page">
      <section className="bento-grid">
        {/* Hero Card */}
        <article className="bento-card bento-hero">
          <div className="bento-eyebrow">Color Theory Challenge</div>
          <h1 className="bento-title">Chromatic Bento</h1>
          <p className="bento-lead">
            Build a palette that balances warmth, calm, and clarity. Use clay for energy,
            teal for trust, and sand for breathing room.
          </p>
          <div className="bento-hero-actions">
            <button className="bento-btn bento-btn-primary" type="button" onClick={handleExport}>
              {copied ? 'Copied!' : 'Export Palette'}
            </button>
            <button className="bento-btn bento-btn-ghost" type="button" onClick={() => applyPalette(palette)}>
              Check Contrast
            </button>
          </div>
          <div className="bento-metrics">
            <div className="bento-metric">
              <span className="bento-metric-value">60/30/10</span>
              <span className="bento-metric-label">Balance</span>
            </div>
            <div className="bento-metric">
              <span className="bento-metric-value">4.5:1+</span>
              <span className="bento-metric-label">Contrast</span>
            </div>
            <div className="bento-metric">
              <span className="bento-metric-value" style={{ textTransform: 'capitalize' }}>{harmonyMode}</span>
              <span className="bento-metric-label">Harmony</span>
            </div>
          </div>
        </article>

        {/* Palette Swatches */}
        <article className="bento-card bento-palette">
          <h2 className="bento-section-title">Palette Swatches</h2>
          <div className="swatch-list">
            {paletteKeys.map((key) => (
              <label key={key} className={cn('swatch-card', `swatch-${key}`)}>
                <input
                  className="swatch-input"
                  type="color"
                  value={palette[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  aria-label={`${key} color`}
                />
                <span className="swatch-dot" aria-hidden="true" />
                <span className="swatch-name">{colorNames[key]}</span>
                <span className="swatch-value" data-color-value={key}>{palette[key]}</span>
              </label>
            ))}
          </div>
        </article>

        {/* Contrast Ladder */}
        <article className="bento-card bento-contrast">
          <h2 className="bento-section-title">Contrast Ladder</h2>
          <div className="contrast-stack">
            <div className={cn('contrast-row contrast-ink', contrastValues['ink-sand']?.ratio && contrastValues['ink-sand'].ratio >= 4.5 ? 'contrast-pass' : 'contrast-warn')}>
              <span className="contrast-label">
                <span data-contrast-foreground="ink">{colorNames.ink}</span> on{' '}
                <span data-contrast-background="sand">{colorNames.sand}</span>
              </span>
              <span className="contrast-meta">
                <span>{contrastValues['ink-sand']?.grade || 'AA'}</span>
                <span data-contrast-value>{contrastValues['ink-sand']?.ratio?.toFixed(1) || '9.8'}</span>
              </span>
            </div>
            <div className={cn('contrast-row contrast-teal', contrastValues['sand-teal']?.ratio && contrastValues['sand-teal'].ratio >= 4.5 ? 'contrast-pass' : 'contrast-warn')}>
              <span className="contrast-label">
                <span data-contrast-foreground="sand">{colorNames.sand}</span> on{' '}
                <span data-contrast-background="teal">{colorNames.teal}</span>
              </span>
              <span className="contrast-meta">
                <span>{contrastValues['sand-teal']?.grade || 'AA'}</span>
                <span data-contrast-value>{contrastValues['sand-teal']?.ratio?.toFixed(1) || '5.3'}</span>
              </span>
            </div>
            <div className={cn('contrast-row contrast-sun', contrastValues['sun-ink']?.ratio && contrastValues['sun-ink'].ratio >= 4.5 ? 'contrast-pass' : 'contrast-warn')}>
              <span className="contrast-label">
                <span data-contrast-foreground="sun">{colorNames.sun}</span> on{' '}
                <span data-contrast-background="ink">{colorNames.ink}</span>
              </span>
              <span className="contrast-meta">
                <span>{contrastValues['sun-ink']?.grade || 'AA'}</span>
                <span data-contrast-value>{contrastValues['sun-ink']?.ratio?.toFixed(1) || '7.1'}</span>
              </span>
            </div>
          </div>
          <p className="bento-note">Keep buttons at AA or above for readable CTAs.</p>
        </article>

        {/* Temperature Map */}
        <article className="bento-card bento-temp">
          <h2 className="bento-section-title">Temperature Map</h2>
          <div className="temp-bar">
            <span className="temp cool">Cool</span>
            <span className="temp warm">Warm</span>
          </div>
          <p className="bento-note">Anchor layouts with cool tones and highlight with warm accents.</p>
        </article>

        {/* Type Hierarchy */}
        <article className="bento-card bento-type">
          <h2 className="bento-section-title">Type Hierarchy</h2>
          <div className="type-sample">
            <span className="bento-kicker">Section Label</span>
            <h3>Visual Weight and Rhythm</h3>
            <p>Use size, color, and spacing to guide attention.</p>
          </div>
        </article>

        {/* Harmony Strip */}
        <article className="bento-card bento-harmony">
          <h2 className="bento-section-title">Harmony Strip</h2>
          <div className="harmony-strip" />
          <div className="chip-row">
            <span className="bento-chip">Base: {colorNames.teal}</span>
            <span className="bento-chip">Accent: {colorNames.clay}</span>
            <span className="bento-chip">Neutral: {colorNames.sand}</span>
          </div>
        </article>

        {/* Accent Rules */}
        <article className="bento-card bento-accent">
          <h2 className="bento-section-title">Accent Rules</h2>
          <div className="accent-buttons">
            <button className="bento-btn bento-btn-primary" type="button">Primary Action</button>
            <button className="bento-btn bento-btn-outline" type="button">Secondary</button>
            <button className="bento-btn bento-btn-ghost" type="button">View Guidelines</button>
          </div>
          <p className="bento-note">Reserve clay for emphasis and sun for friendly highlights.</p>
        </article>

        {/* Usage Example */}
        <article className="bento-card bento-usage">
          <h2 className="bento-section-title">Usage Example</h2>
          <div className="usage-panel">
            <div className="usage-header">
              <span className="usage-label">UI Sample</span>
              <span className="status-pill">Live</span>
            </div>
            <h3 className="usage-title">PHaVE Learner</h3>
            <p className="usage-text">Use sand for structure and clay for urgency cues.</p>
            <div className="usage-tags">
              <span className="bento-tag">Flashcards</span>
              <span className="bento-tag">Quiz</span>
              <span className="bento-tag">Progress</span>
            </div>
          </div>
        </article>

        {/* Palette Controls */}
        <article className="bento-card bento-controls">
          <h2 className="bento-section-title">Palette Controls</h2>
          <div className="palette-controls">
            <div className="control-row">
              <label className="bento-control">
                <span>Base Color</span>
                <input
                  type="color"
                  value={palette.teal}
                  onChange={(e) => {
                    hasInteractedRef.current = true;
                    const newPalette = buildPalette(e.target.value, harmonyMode);
                    setPalette(newPalette);
                    applyPalette(newPalette);
                  }}
                  aria-label="Base color"
                />
              </label>
              <label className="bento-control">
                <span>Mode</span>
                <select
                  value={harmonyMode}
                  onChange={(e) => {
                    hasInteractedRef.current = true;
                    const mode = e.target.value as typeof harmonyMode;
                    setHarmonyMode(mode);
                    const newPalette = buildPalette(palette.teal, mode);
                    setPalette(newPalette);
                    applyPalette(newPalette);
                  }}
                  aria-label="Palette mode"
                >
                  <option value="analogous">Analogous</option>
                  <option value="complementary">Complementary</option>
                  <option value="triadic">Triadic</option>
                </select>
              </label>
            </div>
            <div className="control-row control-actions">
              <button className="bento-btn bento-btn-primary bento-btn-small" type="button" onClick={handleGenerate}>
                Generate
              </button>
              <button className="bento-btn bento-btn-ghost bento-btn-small" type="button" onClick={randomizePalette}>
                Randomize
              </button>
            </div>
            <p className="bento-note">Start with a base color to generate a fresh palette instantly.</p>
          </div>
        </article>
      </section>
    </div>
  );
}
