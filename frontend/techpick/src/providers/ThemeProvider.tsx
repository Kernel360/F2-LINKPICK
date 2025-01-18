'use client';
import { useThemeStore } from '@/stores/themeStore';
import type { PropsWithChildren } from 'react';
import { commonThemeClass, darkTheme, lightTheme } from 'techpick-shared';

export const ThemeProvider = ({
  classname = '',
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const { isDarkMode } = useThemeStore();

  const currentTheme = isDarkMode ? darkTheme : lightTheme;
  return (
    <body className={`${classname} ${commonThemeClass} ${currentTheme}`}>
      {children}
    </body>
  );
};

interface ThemeProviderProps {
  classname?: string;
}
