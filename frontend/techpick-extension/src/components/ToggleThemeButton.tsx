import { useThemeStore } from '@/stores';

export function ToggleThemeButton() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <div>
      <button onClick={toggleTheme}>{isDarkMode ? 'Dark' : 'Light'}</button>
    </div>
  );
}
