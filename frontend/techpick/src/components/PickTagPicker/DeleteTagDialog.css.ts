import { style } from '@vanilla-extract/css';
import { colorVars, zIndex } from 'techpick-shared';

export const dialogContentStyle = style({
  position: 'absolute',
  margin: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: zIndex.level5,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '8px',
  minWidth: '216px',
  border: `1px solid ${colorVars.color.tagBorder}`,
  borderRadius: '4px',
  padding: '16px',
  backgroundColor: colorVars.gold4,
  boxShadow: `
  hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
  hsl(206 22% 7% / 20%) 0px 10px 20px -15px
`,
});

export const dialogOverlayStyle = style({
  zIndex: zIndex.level4,
  position: 'fixed',
  inset: '0',
  animation: ' overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  backgroundColor: colorVars.sand8,
  opacity: 0.5,
});

export const deleteTagButtonStyle = style({
  width: '100%',
  border: '1px solid',
  borderColor: colorVars.red8,
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  color: colorVars.red11,
  cursor: 'pointer',
  fontSize: '14px',

  ':hover': {
    backgroundColor: colorVars.red3,
  },

  ':focus': {
    backgroundColor: colorVars.red3,
    outline: 'none',
  },
});

export const deleteTagCancelButtonStyle = style({
  width: '100%',
  border: '1px solid',
  borderColor: colorVars.sand8,
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  color: colorVars.sand11,
  cursor: 'pointer',
  fontSize: '14px',

  ':hover': {
    backgroundColor: colorVars.sand3,
  },

  ':focus': {
    backgroundColor: colorVars.sand3,
    outline: 'none',
  },
});
