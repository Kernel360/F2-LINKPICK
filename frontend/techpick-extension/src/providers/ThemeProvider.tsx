'use client';

import { useThemeStore } from '@/stores';
import { useEffect, useRef } from 'react';
import { lightTheme, darkTheme, commonThemeClass } from 'techpick-shared';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useThemeStore();
  const isLoadFirst = useRef<boolean>(true);
  const getThemeModeFromLocalhost = useThemeStore(
    (state) => state.getThemeModeFromLocalhost
  );

  useEffect(() => {
    if (isLoadFirst.current === true) {
      getThemeModeFromLocalhost();
      isLoadFirst.current = false;
    }
  }, [getThemeModeFromLocalhost]);

  const currentTheme = isDarkMode ? darkTheme : lightTheme;
  return (
    <div className={`${commonThemeClass} ${currentTheme}`}>{children}</div>
  );
};
