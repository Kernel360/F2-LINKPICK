import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ThemeState = {
  isDarkMode: boolean;
};

type ThemeAction = {
  toggleTheme: () => void;
};

const initialState: ThemeState = {
  isDarkMode: false,
};

export const useThemeStore = create<ThemeState & ThemeAction>()(
  immer((set) => ({
    ...initialState,
    toggleTheme: () =>
      set((state) => {
        state.isDarkMode = !state.isDarkMode;
      }),
  }))
);
