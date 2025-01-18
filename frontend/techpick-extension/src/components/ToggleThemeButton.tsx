import { useThemeStore } from '@/stores/themeStore';
import { Sun as SunIcon } from 'lucide-react';
import { Moon as MoonIcon } from 'lucide-react';
import { toggleThemeButtonStyle } from './ToggleThemeButton.css';

export function ToggleThemeButton() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <div>
      <button
        type="button"
        onClick={toggleTheme}
        className={toggleThemeButtonStyle}
      >
        {isDarkMode ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
}
