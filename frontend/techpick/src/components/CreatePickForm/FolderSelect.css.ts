import { style } from '@vanilla-extract/css';
import { colorVars, sizes, space } from 'techpick-shared';

export const folderSelectTriggerButtonStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['4'],
  width: '200px',
  height: '34px',

  padding: space['4'],
  outline: 'none',
  backgroundColor: colorVars.backgroundNeutral,
  border: '1px solid transparent',

  ':focus': {
    border: `1px solid ${colorVars.color.inputBorderFocus}`,
    outline: 'none',
    backgroundColor: colorVars.lightGray,
    transition: 'border 0.3s ease',
    boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
  },
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

  selectors: {
    '&[data-state="open"]': {
      border: `1px solid ${colorVars.color.inputBorderFocus}`,
      outline: 'none',
      backgroundColor: colorVars.lightGray,
      transition: 'border 0.3s ease',
      boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
    },
  },
});

export const folderSelectViewport = style({
  zIndex: '500',
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
      backgroundColor: colorVars.softPoint,
    },
  },
});
