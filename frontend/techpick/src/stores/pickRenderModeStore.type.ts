import type { PickRenderModeType } from '@/types';

export type PickRenderModeState = {
  pickRenderMode: PickRenderModeType;
};

export type PickRenderModeAction = {
  setPickRenderMode: (newPickRenderMode: PickRenderModeType) => void;
};
