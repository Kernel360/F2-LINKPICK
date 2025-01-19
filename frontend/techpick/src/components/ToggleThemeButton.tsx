'use client';

import { useThemeStore } from '@/stores/themeStore';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

export function ToggleThemeButton() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <div>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div onClick={toggleTheme}>
        {isDarkMode ? <Moon strokeWidth={1} /> : <Sun strokeWidth={1} />}
      </div>
    </div>
  );
}
