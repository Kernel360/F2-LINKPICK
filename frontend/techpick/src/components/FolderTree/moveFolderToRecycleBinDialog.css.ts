import { keyframes, style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { redOutlineButtonStyle } from '@/styles/redButtonStyle.css';
import { sandOutlineButtonStyle } from '@/styles/sandButtonStyle.css';

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

export const moveRecycleBinDialogTitleStyle = style({
  display: 'block',
  fontSize: '16px',
  fontWeight: '500',
});

export const moveRecycleBinDialogDescriptionStyle = style({
  margin: '8px 0px',
  fontSize: '14px',
});

export const moveRecycleBinDialogShareFolderWarningDescriptionStyle = style({
  marginTop: '8px',
  fontSize: '14px',
  color: colorVars.orange11,
  whiteSpace: 'pre-wrap',
});

export const moveRecycleBinDialogCloseButton = style({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '8px',
  cursor: 'pointer',
});

export const moveRecycleBinConfirmButtonStyle = style([
  redOutlineButtonStyle,
  {
    width: '100%',
    height: '32px',
  },
]);

export const moveRecycleBinCancelButtonStyle = style([
  sandOutlineButtonStyle,
  {
    marginTop: '8px',
    width: '100%',
    height: '32px',
  },
]);
