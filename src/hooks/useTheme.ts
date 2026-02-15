import { useState, useEffect, useCallback } from 'react';

export type Theme = 
  | 'light' 
  | 'dark' 
  | 'high-contrast' 
  | 'colorful' 
  | 'sepia' 
  | 'midnight'
  | 'forest';

interface ThemeConfig {
  name: string;
  description: string;
  icon: string;
  colors: {
    primary: string;
    background: string;
    accent: string;
  };
}

export const themes: Record<Theme, ThemeConfig> = {
  light: {
    name: 'Light',
    description: 'Clean and crisp light theme',
    icon: '☀️',
    colors: {
      primary: '#6366f1',
      background: '#ffffff',
      accent: '#8b5cf6',
    },
  },
  dark: {
    name: 'Dark',
    description: 'Easy on the eyes dark theme',
    icon: '🌙',
    colors: {
      primary: '#818cf8',
      background: '#0f172a',
      accent: '#a78bfa',
    },
  },
  'high-contrast': {
    name: 'High Contrast',
    description: 'Maximum accessibility and readability',
    icon: '👁️',
    colors: {
      primary: '#0000ff',
      background: '#ffffff',
      accent: '#ff0000',
    },
  },
  colorful: {
    name: 'Colorful',
    description: 'Vibrant and energetic colors',
    icon: '🎨',
    colors: {
      primary: '#9333ea',
      background: '#faf5ff',
      accent: '#f59e0b',
    },
  },
  sepia: {
    name: 'Sepia',
    description: 'Warm, paper-like reading experience',
    icon: '📜',
    colors: {
      primary: '#92400e',
      background: '#faf6ed',
      accent: '#d97706',
    },
  },
  midnight: {
    name: 'Midnight',
    description: 'Deep blue professional theme',
    icon: '🌃',
    colors: {
      primary: '#3b82f6',
      background: '#0a0f1c',
      accent: '#8b5cf6',
    },
  },
  forest: {
    name: 'Forest',
    description: 'Natural green calming theme',
    icon: '🌲',
    colors: {
      primary: '#15803d',
      background: '#f0fdf4',
      accent: '#16a34a',
    },
  },
};

const STORAGE_KEY = 'phave-theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme;
    if (stored && themes[stored]) {
      setThemeState(stored);
      applyTheme(stored);
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setThemeState(initialTheme);
      applyTheme(initialTheme);
    }
    setIsLoaded(true);
  }, []);

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove all theme data attributes
    Object.keys(themes).forEach(t => {
      root.removeAttribute(`data-theme-${t}`);
    });
    
    // Set new theme
    root.setAttribute('data-theme', newTheme);
    
    // Also set class for Tailwind dark mode
    if (newTheme === 'dark' || newTheme === 'midnight') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  const cycleTheme = useCallback(() => {
    const themeKeys = Object.keys(themes) as Theme[];
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  }, [theme]);

  const getThemeColors = useCallback(() => {
    return themes[theme].colors;
  }, [theme]);

  return {
    theme,
    setTheme,
    cycleTheme,
    themes,
    isLoaded,
    getThemeColors,
    currentTheme: themes[theme],
  };
}
