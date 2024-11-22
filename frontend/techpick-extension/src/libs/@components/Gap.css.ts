import { styleVariants } from '@vanilla-extract/css';

export const verticalGapVariants = styleVariants({
  gap0: { paddingTop: '0px' },
  gap4: { paddingTop: '4px' },
  gap8: { paddingTop: '8px' },
  gap12: { paddingTop: '12px' },
  gap16: { paddingTop: '16px' },
  gap20: { paddingTop: '20px' },
  gap24: { paddingTop: '24px' },
  gap32: { paddingTop: '32px' },
});

export const horizontalGapVariants = styleVariants({
  gap0: { paddingLeft: '0px' },
  gap4: { paddingLeft: '4px' },
  gap8: { paddingLeft: '8px' },
  gap12: { paddingLeft: '12px' },
  gap16: { paddingLeft: '16px' },
  gap20: { paddingLeft: '20px' },
  gap24: { paddingLeft: '24px' },
  gap32: { paddingLeft: '32px' },
});

export type GapSize =
  | 'gap0'
  | 'gap4'
  | 'gap8'
  | 'gap12'
  | 'gap16'
  | 'gap20'
  | 'gap24'
  | 'gap32';
