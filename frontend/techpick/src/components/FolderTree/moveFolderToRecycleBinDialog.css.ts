import { keyframes, style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

const contentShow = keyframes({
  from: {
    opacity: '0',
    transform: 'translate(-50%, -48%) scale(0.96)',
  },
  to: {
    opacity: '1',
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

export const moveRecycleBinOverlayStyle = style({
  position: 'fixed',
  inset: '0',
  animation: ' overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  backgroundColor: colorVars.sand8,
  opacity: 0.5,
});

export const moveRecycleDialogContent = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '320px',
  height: '160px',
  borderRadius: '8px',
  boxShadow: `
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px
  `,
  padding: '16px',
  backgroundColor: colorVars.gold4,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const moveRecycleBinDialogTitleStyle = style({
  display: 'block',
  fontSize: '16px',
  fontWeight: '500',
});

export const moveRecycleBinDialogDescriptionStyle = style({
  marginTop: '8px',
  fontSize: '14px',
});

export const moveRecycleBinDialogCloseButton = style({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '8px',
  cursor: 'pointer',
});

export const moveRecycleBinConfirmButtonStyle = style({
  width: '100%',
  height: '32px',
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

export const moveRecycleBinCancelButtonStyle = style({
  marginTop: '8px',
  width: '100%',
  height: '32px',
  border: '1px solid',
  borderColor: colorVars.sand8,
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  color: colorVars.sand11,
  cursor: 'pointer',

  ':hover': {
    backgroundColor: colorVars.sand3,
  },
});
