'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';

export function ToggleThemeButton() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <div>
      <div onClick={toggleTheme}>
        {isDarkMode ? <Moon strokeWidth={1} /> : <Sun strokeWidth={1} />}
      </div>
    </div>
  );
}
