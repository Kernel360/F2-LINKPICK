import { styleVariants } from '@vanilla-extract/css';

export const verticalGapVariants = styleVariants({
  gap0: { paddingTop: '0px', paddingBottom: '0px' },
  gap4: { paddingTop: '2px', paddingBottom: '2px' },
  gap8: { paddingTop: '4px', paddingBottom: '4px' },
  gap12: { paddingTop: '6px', paddingBottom: '6px' },
  gap16: { paddingTop: '8px', paddingBottom: '8px' },
  gap20: { paddingTop: '10px', paddingBottom: '10px' },
  gap24: { paddingTop: '12px', paddingBottom: '12px' },
  gap32: { paddingTop: '16px', paddingBottom: '16px' },
});

export const horizontalGapVariants = styleVariants({
  gap0: { paddingLeft: '0px', paddingRight: '0px' }, // 합계: 0px
  gap4: { paddingLeft: '2px', paddingRight: '2px' }, // 합계: 4px
  gap8: { paddingLeft: '4px', paddingRight: '4px' }, // 합계: 8px
  gap12: { paddingLeft: '6px', paddingRight: '6px' }, // 합계: 12px
  gap16: { paddingLeft: '8px', paddingRight: '8px' }, // 합계: 16px
  gap20: { paddingLeft: '10px', paddingRight: '10px' }, // 합계: 20px
  gap24: { paddingLeft: '12px', paddingRight: '12px' }, // 합계: 24px
  gap32: { paddingLeft: '16px', paddingRight: '16px' }, // 합계: 32px
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
