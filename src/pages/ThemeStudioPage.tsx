import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { BentoThemeCustomizer } from '@/components/BentoThemeCustomizer';
import { ArrowLeft, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ThemeStudioPage() {
  const navigate = useNavigate();

  const handlePaletteChange = useCallback((palette: Record<string, string>) => {
    // Apply the palette to localStorage for persistence
    localStorage.setItem('phave-custom-palette', JSON.stringify(palette));
    
    // Apply to CSS variables
    const root = document.documentElement;
    Object.entries(palette).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
    
    // Update primary colors
    if (palette.primary) {
      root.style.setProperty('--primary', palette.primary);
    }
    if (palette.foreground) {
      root.style.setProperty('--foreground', palette.foreground);
    }
    if (palette.background) {
      root.style.setProperty('--background', palette.background);
    }
  }, []);

  return (
    <div className="relative">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="gap-2 bg-background/80 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </Button>
      </div>

      {/* Bento Theme Customizer */}
      <BentoThemeCustomizer onPaletteChange={handlePaletteChange} />
    </div>
  );
}
