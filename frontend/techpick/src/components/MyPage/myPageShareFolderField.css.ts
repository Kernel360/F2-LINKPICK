import { style } from '@vanilla-extract/css';
import { colorVars, fontSize } from 'techpick-shared';

export const myPageContentContainer = style({
  display: 'grid',
  gridTemplateColumns: '15% 75% 10%',
  alignItems: 'center',
  padding: '8px',
  fontSize: fontSize.sm,
});

export const cell = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: '0 8px',
});

export const cancelButton = style({
  minWidth: '70px',
  padding: '4px',
  border: '1px solid',
  borderColor: colorVars.red8,
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  color: colorVars.red11,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: colorVars.red3,
  },
});
