import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const dialogContentStyle = style({
  position: 'absolute',
  margin: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '4',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '8px',
  minWidth: '224px',
  border: `1px solid ${colorVars.color.tagBorder}`,
  borderRadius: '4px',
  padding: '16px',
  backgroundColor: colorVars.color.background,
  boxShadow:
    'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px',
});

export const dialogOverlayStyle = style({
  zIndex: '4',
  backgroundColor: 'rgba(0,0,0,0.3)',
  position: 'fixed',
  inset: 0,
});

export const deleteTagDialogButtonStyle = style({
  width: '100%',
  border: '1px solid',
  borderColor: colorVars.red8,
  borderRadius: '4px',
  padding: '2px 0',
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

export const deleteTagDialogCancelButtonStyle = style({
  width: '100%',
  border: '1px solid',
  borderColor: colorVars.sand8,
  borderRadius: '4px',
  padding: '2px 0',
  color: colorVars.sand11,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontSize: '14px',

  ':hover': {
    backgroundColor: colorVars.sand3,
  },

  ':focus': {
    backgroundColor: colorVars.sand3,
    outline: 'none',
  },
});
