import type { PickRenderModeType } from '@/types/PickRenderModeType';

export type PickRenderModeState = {
  pickRenderMode: PickRenderModeType;
};

export type PickRenderModeAction = {
  setPickRenderMode: (newPickRenderMode: PickRenderModeType) => void;
};
