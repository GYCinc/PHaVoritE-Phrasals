import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Check, 
  Sun, 
  Moon, 
  Eye, 
  Sparkles, 
  Coffee,
  Trees,
  Mountain,
  Sunset,
  Monitor,
  Settings2,
  Paintbrush
} from 'lucide-react';
import { useTheme, themes, type Theme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeSwitcherProps {
  variant?: 'dialog' | 'dropdown' | 'buttons';
  showPreview?: boolean;
  className?: string;
}

const themeIcons: Record<Theme, React.ReactNode> = {
  light: <Sun className="w-4 h-4" />,
  dark: <Moon className="w-4 h-4" />,
  'high-contrast': <Eye className="w-4 h-4" />,
  colorful: <Sparkles className="w-4 h-4" />,
  sepia: <Coffee className="w-4 h-4" />,
  forest: <Trees className="w-4 h-4" />,
  midnight: <Mountain className="w-4 h-4" />,
};

function ThemePreview({ themeKey, isActive }: { themeKey: Theme; isActive: boolean }) {
  const config = themes[themeKey];
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg border-2 transition-all duration-200",
        isActive ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-border"
      )}
    >
      {/* Mini Preview */}
      <div 
        className="h-20 p-3"
        style={{ backgroundColor: config.colors.background }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: config.colors.primary }}
          />
          <div 
            className="w-16 h-2 rounded"
            style={{ backgroundColor: config.colors.accent }}
          />
        </div>
        <div 
          className="w-full h-2 rounded mb-1"
          style={{ backgroundColor: config.colors.primary + '40' }}
        />
        <div 
          className="w-2/3 h-2 rounded"
          style={{ backgroundColor: config.colors.primary + '40' }}
        />
      </div>
      
      {/* Theme Info */}
      <div className="p-3 bg-card border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {themeIcons[themeKey]}
            <span className="font-medium">{config.name}</span>
          </div>
          {isActive && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              <Check className="w-3 h-3 mr-1" />
              Active
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{config.description}</p>
      </div>
    </div>
  );
}

export function ThemeSwitcher({ 
  variant = 'dialog', 
  showPreview = true,
  className 
}: ThemeSwitcherProps) {
  const { theme, setTheme, themes: themeConfigs, currentTheme } = useTheme();
  const [open, setOpen] = useState(false);

  if (variant === 'dropdown') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className={className}>
            <Palette className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(Object.keys(themeConfigs) as Theme[]).map((themeKey) => (
            <DropdownMenuItem
              key={themeKey}
              onClick={() => setTheme(themeKey)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {themeIcons[themeKey]}
                <span>{themeConfigs[themeKey].name}</span>
              </div>
              {theme === themeKey && <Check className="w-4 h-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'buttons') {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {(Object.keys(themeConfigs) as Theme[]).map((themeKey) => (
          <Button
            key={themeKey}
            variant={theme === themeKey ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme(themeKey)}
            className="gap-2"
          >
            {themeIcons[themeKey]}
            {themeConfigs[themeKey].name}
          </Button>
        ))}
      </div>
    );
  }

  // Dialog variant (default)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("gap-2", className)}>
          <Paintbrush className="w-4 h-4" />
          <span className="hidden sm:inline">Theme</span>
          <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
            {currentTheme.name}
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="w-5 h-5" />
            Customize Appearance
          </DialogTitle>
          <DialogDescription>
            Choose a theme or customize colors to match your preference
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 py-4">
            {/* Current Theme Info */}
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: currentTheme.colors.primary }}
              >
                {themeIcons[theme]}
              </div>
              <div>
                <h4 className="font-semibold">{currentTheme.name}</h4>
                <p className="text-sm text-muted-foreground">{currentTheme.description}</p>
              </div>
            </div>

            {/* Theme Grid */}
            <div>
              <h4 className="text-sm font-medium mb-3">Choose Theme</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(Object.keys(themeConfigs) as Theme[]).map((themeKey) => (
                  <button
                    key={themeKey}
                    onClick={() => setTheme(themeKey)}
                    className="text-left"
                  >
                    <ThemePreview themeKey={themeKey} isActive={theme === themeKey} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Color Customization */}
            <div>
              <h4 className="text-sm font-medium mb-3">Quick Color Adjustments</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => document.documentElement.classList.add('primary-indigo')} className="gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  Indigo
                </Button>
                <Button variant="outline" size="sm" onClick={() => document.documentElement.classList.add('primary-blue')} className="gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  Blue
                </Button>
                <Button variant="outline" size="sm" onClick={() => document.documentElement.classList.add('primary-green')} className="gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  Green
                </Button>
                <Button variant="outline" size="sm" onClick={() => document.documentElement.classList.add('primary-purple')} className="gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  Purple
                </Button>
                <Button variant="outline" size="sm" onClick={() => document.documentElement.classList.add('primary-orange')} className="gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  Orange
                </Button>
                <Button variant="outline" size="sm" onClick={() => document.documentElement.classList.add('primary-pink')} className="gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500" />
                  Pink
                </Button>
              </div>
            </div>

            {/* Advanced Options */}
            <div>
              <h4 className="text-sm font-medium mb-3">Advanced Options</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => document.documentElement.classList.toggle('vibrant')}>
                  Toggle Vibrant Colors
                </Button>
                <Button variant="outline" size="sm" onClick={() => document.documentElement.classList.toggle('muted')}>
                  Toggle Muted Colors
                </Button>
                <Button variant="outline" size="sm" onClick={() => document.documentElement.classList.toggle('high-contrast')}>
                  Toggle High Contrast
                </Button>
                <Button variant="outline" size="sm" onClick={() => document.documentElement.classList.toggle('radius-none')}>
                  Toggle Sharp Corners
                </Button>
                <Button variant="outline" size="sm" onClick={() => document.documentElement.classList.toggle('shadow-intensity-none')}>
                  Toggle No Shadows
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
