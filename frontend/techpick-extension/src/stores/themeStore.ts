import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  GET_THEME_FROM_LOCALHOST_PORT_NAME,
  REQUEST_THEME_STATE_FROM_LOCALHOST_MESSAGE,
  DARK_THEME_STATE,
  LIGHT_THEME_STATE,
  CHANGE_THEME_STATE_TO_LOCALHOST_PORT_NAME,
} from '@/constants';

type ThemeState = {
  isDarkMode: boolean;
};

type ThemeAction = {
  toggleTheme: () => void;
  getThemeModeFromLocalhost: () => void;
};

const initialState: ThemeState = {
  isDarkMode: false,
};

export const useThemeStore = create<ThemeState & ThemeAction>()(
  immer((set, get) => ({
    ...initialState,
    toggleTheme: () => {
      // 먼저 메세지 보내고.
      // 값 바꾸자

      const port = chrome.runtime.connect({
        name: CHANGE_THEME_STATE_TO_LOCALHOST_PORT_NAME,
      });

      const nextThemeState = get().isDarkMode
        ? LIGHT_THEME_STATE
        : DARK_THEME_STATE;

      port.postMessage(nextThemeState);
      port.disconnect();

      set((state) => {
        state.isDarkMode = !state.isDarkMode;
      });
    },
    getThemeModeFromLocalhost: () => {
      const port = chrome.runtime.connect({
        name: GET_THEME_FROM_LOCALHOST_PORT_NAME,
      });
      port.postMessage(REQUEST_THEME_STATE_FROM_LOCALHOST_MESSAGE);

      port.onMessage.addListener(function (msg: string) {
        if (msg === DARK_THEME_STATE) {
          set((state) => {
            state.isDarkMode = true;
          });
        }
        port.disconnect();
      });
    },
  }))
);
