import { style } from '@vanilla-extract/css';
import { colorVars, zIndex } from 'techpick-shared';
import { redOutlineButtonStyle } from '@/styles/redButtonStyle.css';
import { sandOutlineButtonStyle } from '@/styles/sandButtonStyle.css';

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

export const deleteTagButtonStyle = style([
  redOutlineButtonStyle,
  {
    width: '100%',
    fontSize: '14px',
  },
]);

export const deleteTagCancelButtonStyle = style([
  sandOutlineButtonStyle,
  {
    width: '100%',
    fontSize: '14px',
  },
]);
