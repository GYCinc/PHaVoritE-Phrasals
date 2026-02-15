import { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

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
