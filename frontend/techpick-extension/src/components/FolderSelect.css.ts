import { style } from '@vanilla-extract/css';
import { colorVars, sizes, space } from 'techpick-shared';

export const folderSelectTriggerButtonStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['4'],
  width: sizes['5xs'],
  height: sizes['12xs'],

  padding: space['4'],
  outline: 'none',
  backgroundColor: colorVars.backgroundNeutral,
});

export const selectTextStyle = style({
  width: sizes['5xs'],
  height: '24px',
  lineHeight: '24px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'start',
});

export const folderSelectContentStyle = style({
  width: sizes['5xs'],
  border: '1px solid black',
  boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
});

export const selectItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['4'],
  width: sizes['5xs'],
  height: sizes['12xs'],
  outline: 'none',
  padding: `${space['4']} ${space['8']}`,
  backgroundColor: colorVars.lightGray,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',

  selectors: {
    '&:focus': {
      backgroundColor: colorVars.primary,
    },
  },
});
