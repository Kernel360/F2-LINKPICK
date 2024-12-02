'use client';
import { PropsWithChildren } from 'react';
import { lightTheme, darkTheme, commonThemeClass } from 'techpick-shared';
import { useThemeStore } from '@/stores/themeStore';

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
