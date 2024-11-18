import { style } from '@vanilla-extract/css';
import { borderRadius, colorVars, sizes, space } from 'techpick-shared';

export const folderSelectTriggerButtonStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['4'],
  width: sizes['2xs'],
  height: sizes['12xs'],
  borderRadius: borderRadius['md'],
  padding: space['4'],
  outline: 'none',
  backgroundColor: colorVars.backgroundNeutral,
});

export const selectTextStyle = style({
  width: sizes['5xs'],
  height: sizes['12xs'],
  lineHeight: sizes['12xs'],
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'start',
});

export const folderSelectContentStyle = style({
  width: sizes['2xs'],
  border: '1px solid black',
  borderRadius: borderRadius['md'],
});

export const selectItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['4'],
  width: sizes['2xs'],
  height: sizes['12xs'],
  outline: 'none',
  padding: space['4'],
  backgroundColor: colorVars.backgroundNeutral,
  borderRadius: borderRadius['md'],
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',

  selectors: {
    '&:focus': {
      backgroundColor: colorVars.primary,
    },
  },
});
