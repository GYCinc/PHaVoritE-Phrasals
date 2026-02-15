import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Shuffle, 
  Download, 
  Check, 
  Sun, 
  Moon,
  Sparkles,
  Layers,
  Type,
  Contrast,
  Palette as PaletteIcon
} from 'lucide-react';
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
  { name: 'Violet', hex: '#6366f1' },
  { name: 'Lavender', hex: '#a78bfa' },
];

interface PaletteColor {
  key: string;
  hex: string;
  name: string;
}

interface BentoThemeCustomizerProps {
  onPaletteChange?: (palette: Record<string, string>) => void;
  className?: string;
}

export function BentoThemeCustomizer({ onPaletteChange, className }: BentoThemeCustomizerProps) {
  const [palette, setPalette] = useState<PaletteColor[]>([
    { key: 'primary', hex: '#6366f1', name: 'Violet' },
    { key: 'secondary', hex: '#2A8791', name: 'Lagoon' },
    { key: 'accent', hex: '#F2C14E', name: 'Sun' },
    { key: 'background', hex: '#F8F6F0', name: 'Pearl' },
    { key: 'muted', hex: '#9DB59E', name: 'Sage' },
    { key: 'foreground', hex: '#1F2B2D', name: 'Ink' },
  ]);

  const [harmonyMode, setHarmonyMode] = useState<'analogous' | 'complementary' | 'triadic'>('analogous');
  const [copied, setCopied] = useState(false);
  const [autoRandomizing, setAutoRandomizing] = useState(true);
  const autoRandomRef = useRef<NodeJS.Timeout | null>(null);

  // Color conversion utilities
  const normalizeHex = (hex: string): string => {
    if (!hex) return '#000000';
    let value = hex.trim().replace('#', '');
    if (value.length === 3) {
      value = value.split('').map(c => c + c).join('');
    }
    value = value.padStart(6, '0').slice(0, 6);
    return `#${value.toUpperCase()}`;
  };

  const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
    const value = normalizeHex(hex).replace('#', '');
    const r = parseInt(value.slice(0, 2), 16) / 255;
    const g = parseInt(value.slice(2, 4), 16) / 255;
    const b = parseInt(value.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    const sat = s / 100;
    const light = l / 100;
    const c = (1 - Math.abs(2 * light - 1)) * sat;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = light - c / 2;
    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) { r = c; g = x; }
    else if (h >= 60 && h < 120) { r = x; g = c; }
    else if (h >= 120 && h < 180) { g = c; b = x; }
    else if (h >= 180 && h < 240) { g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; b = c; }
    else { r = c; b = x; }

    const toHex = (value: number) => {
      const v = Math.round((value + m) * 255);
      return v.toString(16).padStart(2, '0');
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const shiftHue = (h: number, offset: number): number => {
    return (h + offset + 360) % 360;
  };

  const getNearestColorName = (hex: string): string => {
    const target = hexToRgb(hex);
    let closest = colorNameLibrary[0].name;
    let bestDistance = Number.POSITIVE_INFINITY;

    colorNameLibrary.forEach(entry => {
      const rgb = hexToRgb(entry.hex);
      const distance =
        Math.pow(target.r - rgb.r, 2) +
        Math.pow(target.g - rgb.g, 2) +
        Math.pow(target.b - rgb.b, 2);

      if (distance < bestDistance) {
        bestDistance = distance;
        closest = entry.name;
      }
    });

    return closest;
  };

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const value = normalizeHex(hex).replace('#', '');
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16),
    };
  };

  const getReadableTextColor = (hex: string): string => {
    const white = '#FFFFFF';
    const dark = '#1F2B2D';
    const whiteContrast = contrastRatio(hex, white);
    const darkContrast = contrastRatio(hex, dark);
    return whiteContrast >= darkContrast ? white : dark;
  };

  const relativeLuminance = (hex: string): number => {
    const { r, g, b } = hexToRgb(hex);
    const transform = (value: number) => {
      const v = value / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
  };

  const contrastRatio = (hexA: string, hexB: string): number => {
    const lumA = relativeLuminance(hexA);
    const lumB = relativeLuminance(hexB);
    const lighter = Math.max(lumA, lumB);
    const darker = Math.min(lumA, lumB);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const getContrastGrade = (ratio: number): string => {
    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    if (ratio >= 3) return 'AA Large';
    return 'Fail';
  };

  // Build palette from base color
  const buildPalette = useCallback((baseHex: string, mode: 'analogous' | 'complementary' | 'triadic') => {
    const base = normalizeHex(baseHex);
    const { h } = hexToHsl(base);

    const offsets = {
      analogous: { warm: 30, accent: 60 },
      complementary: { warm: 180, accent: 210 },
      triadic: { warm: 120, accent: 240 },
    };

    const selected = offsets[mode];

    return [
      { key: 'primary', hex: base, name: getNearestColorName(base) },
      { key: 'secondary', hex: hslToHex(shiftHue(h, selected.warm), 64, 52), name: '' },
      { key: 'accent', hex: hslToHex(shiftHue(h, selected.accent), 82, 60), name: '' },
      { key: 'background', hex: hslToHex(shiftHue(h, 18), 55, 92), name: '' },
      { key: 'muted', hex: hslToHex(shiftHue(h, -22), 24, 66), name: '' },
      { key: 'foreground', hex: hslToHex(shiftHue(h, 200), 22, 18), name: '' },
    ].map(p => ({ ...p, name: getNearestColorName(p.hex) }));
  }, []);

  const randomHex = (): string => {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    return `#${hex.toUpperCase()}`;
  };

  const randomizePalette = useCallback(() => {
    const newPalette = buildPalette(randomHex(), harmonyMode);
    setPalette(newPalette);
    applyPaletteToDOM(newPalette);
  }, [harmonyMode, buildPalette]);

  const applyPaletteToDOM = (colors: PaletteColor[]) => {
    const root = document.documentElement;
    colors.forEach(({ key, hex }) => {
      root.style.setProperty(`--theme-${key}`, hex);
    });
    
    // Apply to CSS variables
    const primary = colors.find(c => c.key === 'primary')?.hex || '#6366f1';
    const foreground = colors.find(c => c.key === 'foreground')?.hex || '#1F2B2D';
    const background = colors.find(c => c.key === 'background')?.hex || '#F8F6F0';
    
    root.style.setProperty('--primary', primary);
    root.style.setProperty('--foreground', foreground);
    root.style.setProperty('--background', background);
    
    onPaletteChange?.(colors.reduce((acc, { key, hex }) => ({ ...acc, [key]: hex }), {}));
  };

  const handleColorChange = (key: string, hex: string) => {
    const newPalette = palette.map(p =>
      p.key === key ? { ...p, hex: normalizeHex(hex), name: getNearestColorName(hex) } : p
    );
    setPalette(newPalette);
    applyPaletteToDOM(newPalette);
    setAutoRandomizing(false);
  };

  const handleGenerate = () => {
    const base = palette.find(p => p.key === 'primary')?.hex || randomHex();
    const newPalette = buildPalette(base, harmonyMode);
    setPalette(newPalette);
    applyPaletteToDOM(newPalette);
    setAutoRandomizing(false);
  };

  const handleExport = () => {
    const cssLines = palette.map(({ key, hex }) => `  --${key}: ${hex};`);
    const cssBlock = `:root {\n${cssLines.join('\n')}\n}`;
    const json = JSON.stringify(palette.reduce((acc, { key, hex }) => ({ ...acc, [key]: hex }), {}), null, 2);
    
    navigator.clipboard.writeText(`${cssBlock}\n\n${json}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  // Auto-randomize on mount
  useEffect(() => {
    if (autoRandomizing) {
      autoRandomRef.current = setInterval(() => {
        randomizePalette();
      }, 450);

      const timeout = setTimeout(() => {
        setAutoRandomizing(false);
        if (autoRandomRef.current) clearInterval(autoRandomRef.current);
      }, 2200);

      return () => {
        clearTimeout(timeout);
        if (autoRandomRef.current) clearInterval(autoRandomRef.current);
      };
    }
  }, []);

  // Stop auto-randomize on interaction
  useEffect(() => {
    const stopAuto = () => setAutoRandomizing(false);
    const events = ['pointerdown', 'keydown', 'touchstart'];
    events.forEach(event => window.addEventListener(event, stopAuto, { once: true }));
    return () => events.forEach(event => window.removeEventListener(event, stopAuto));
  }, []);

  // Animation variants for staggered entrance
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <div className={cn('min-h-screen p-6 md:p-10', className)}>
      {/* Background pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-background to-indigo-50/50" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, currentColor, currentColor 1px, transparent 1px, transparent 24px)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* Hero Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="md:col-span-2 lg:col-span-2 lg:row-span-2"
          >
            <Card className="h-full overflow-hidden border-0 shadow-xl bg-gradient-to-br from-violet-500/10 via-background to-indigo-500/10">
              <CardContent className="p-8 h-full flex flex-col">
                <Badge variant="outline" className="w-fit mb-4 text-xs uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Color Lab
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Bento Theme Studio
                </h1>
                <p className="text-muted-foreground text-lg mb-6 flex-1">
                  Build a palette that balances warmth, calm, and clarity. 
                  Click any swatch to customize, or let the generator surprise you.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleGenerate} className="gap-2">
                    <Palette className="w-4 h-4" />
                    Generate
                  </Button>
                  <Button variant="outline" onClick={randomizePalette} className="gap-2">
                    <Shuffle className="w-4 h-4" />
                    Randomize
                  </Button>
                  <Button variant="ghost" onClick={handleExport} className="gap-2">
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Download className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Export'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Palette Swatches */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="md:col-span-2 lg:col-span-2"
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                  Color Swatches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {palette.map((color) => (
                    <label
                      key={color.key}
                      className="relative group cursor-pointer"
                    >
                      <div
                        className="rounded-xl p-4 min-h-[80px] flex flex-col justify-end transition-all duration-200 group-hover:scale-[1.02] group-hover:-translate-y-1"
                        style={{
                          backgroundColor: color.hex,
                          color: getReadableTextColor(color.hex),
                          boxShadow: `0 10px 40px ${color.hex}40`,
                        }}
                      >
                        <span className="font-semibold text-sm capitalize">{color.key}</span>
                        <span className="text-xs opacity-80">{color.name}</span>
                        <span className="text-[10px] font-mono opacity-70 mt-1">{color.hex}</span>
                      </div>
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => handleColorChange(color.key, e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        aria-label={`Edit ${color.key} color`}
                      />
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Harmony Mode */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                  Harmony Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(['analogous', 'complementary', 'triadic'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setHarmonyMode(mode);
                      handleGenerate();
                    }}
                    className={cn(
                      "w-full px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                      harmonyMode === mode
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contrast Checker */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Contrast className="w-4 h-4" />
                  Contrast Checker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { fg: 'foreground', bg: 'background' },
                    { fg: 'background', bg: 'primary' },
                    { fg: 'accent', bg: 'foreground' },
                  ].map(({ fg, bg }, i) => {
                    const fgColor = palette.find(c => c.key === fg)?.hex || '#000';
                    const bgColor = palette.find(c => c.key === bg)?.hex || '#fff';
                    const ratio = contrastRatio(fgColor, bgColor);
                    const grade = getContrastGrade(ratio);

                    return (
                      <div
                        key={i}
                        className={cn(
                          "rounded-xl p-3 flex flex-col justify-between",
                          "border-2",
                          ratio >= 4.5 ? "border-emerald-500/30" : "border-rose-500/30"
                        )}
                        style={{ backgroundColor: bgColor, color: fgColor }}
                      >
                        <span className="text-xs font-medium capitalize">{fg} on {bg}</span>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-bold">{ratio.toFixed(1)}:1</span>
                          <span className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full font-bold",
                            ratio >= 4.5 ? "bg-emerald-500/20" : "bg-rose-500/20"
                          )}>
                            {grade}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Harmony Strip */}
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Harmony Strip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="h-24 rounded-xl mb-4"
                  style={{
                    background: `linear-gradient(90deg, ${palette.map(c => c.hex).join(', ')})`,
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {palette.slice(0, 4).map((color) => (
                    <Badge key={color.key} variant="secondary" className="text-xs">
                      {color.key}: {color.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Temperature Map */}
          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Temperature Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="h-16 rounded-full flex items-center justify-between px-6"
                  style={{
                    background: `linear-gradient(90deg, ${palette.find(c => c.key === 'primary')?.hex}, ${palette.find(c => c.key === 'muted')?.hex}, ${palette.find(c => c.key === 'accent')?.hex}, ${palette.find(c => c.key === 'secondary')?.hex})`,
                  }}
                >
                  <span className="text-white text-xs font-bold uppercase tracking-wider drop-shadow-lg">Cool</span>
                  <span className="text-white text-xs font-bold uppercase tracking-wider drop-shadow-lg">Warm</span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Anchor layouts with cool tones, highlight with warm accents.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Type Hierarchy */}
          <motion.div
            custom={6}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Type Hierarchy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <span className="text-xs uppercase tracking-widest text-violet-600 font-bold">Section Label</span>
                  <h3 className="text-xl font-bold mt-1">Visual Weight</h3>
                  <p className="text-sm text-muted-foreground">Use size and color to guide.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
