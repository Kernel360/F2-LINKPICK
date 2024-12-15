import { keyframes, style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const importBookmarkDialogButtonStyle = style({
  width: '120px',
  height: '32px',
  border: '1px solid',
  borderColor: colorVars.gold8,
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  color: colorVars.gold11,
  cursor: 'pointer',

  ':hover': {
    backgroundColor: colorVars.gold3,
  },

  ':focus': {
    backgroundColor: colorVars.gold3,
  },
});

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

export const overlayStyle = style({
  position: 'fixed',
  inset: '0',
  animation: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  backgroundColor: colorVars.sand8,
  opacity: 0.5,
});

export const dialogContent = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: 'auto',
  height: 'auto',
  borderRadius: '8px',
  boxShadow: `
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px
  `,
  padding: '24px',
  backgroundColor: colorVars.gold4,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const dialogCloseButtonStyle = style({
  width: '56px',
  height: '32px',
  border: '1px solid',
  borderColor: colorVars.orange8,
  borderRadius: '4px',
  backgroundColor: colorVars.orange1,
  color: colorVars.primary,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',

  ':hover': {
    backgroundColor: colorVars.orange3,
  },

  ':focus': {
    backgroundColor: colorVars.orange3,
  },
});

export const dropzoneStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px dashed',
  borderColor: colorVars.sand8,
  borderRadius: '4px',
  width: '320px',
  height: '160px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
});

export const closeButtonStyle = style({
  position: 'absolute',
  top: 8,
  right: 8,
  cursor: 'pointer',
});

export const submitButtonStyle = style({
  marginTop: '8px',
  width: '100%',
  height: '32px',
  border: '1px solid',
  borderColor: colorVars.green8,
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  color: colorVars.green11,
  cursor: 'pointer',

  selectors: {
    '&:hover, &:focus': {
      backgroundColor: colorVars.green3,
    },
  },
});

export const dragInfoTextStyle = style({
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
});

export const fileDescriptionLayoutStyle = style({
  maxWidth: '320px',
  height: '18px',
  marginTop: '8px',
});

export const fileDescriptionTextStyle = style({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  fontSize: '12px',
});
