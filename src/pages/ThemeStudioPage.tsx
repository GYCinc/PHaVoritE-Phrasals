import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { BentoThemeCustomizer } from '@/components/BentoThemeCustomizer';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeStudioPage() {
  const navigate = useNavigate();
  const { setCustomPalette } = useTheme();
  const [saved, setSaved] = useState(false);

  const handlePaletteChange = useCallback((palette: Record<string, string>) => {
    // Save to localStorage and apply as custom theme
    setCustomPalette(palette);
  }, [setCustomPalette]);

  const handleSaveAndReturn = () => {
    setSaved(true);
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <div className="relative">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="gap-2 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to App
        </Button>
      </div>

      {/* Save Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleSaveAndReturn}
          className="gap-2 bg-emerald-600 hover:bg-emerald-700"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            'Apply & Return'
          )}
        </Button>
      </div>

      {/* Bento Theme Customizer */}
      <BentoThemeCustomizer onPaletteChange={handlePaletteChange} />
    </div>
  );
}
