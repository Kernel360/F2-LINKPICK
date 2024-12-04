import { style } from '@vanilla-extract/css';
import { colorVars, fontSize } from 'techpick-shared';

export const tagInfoEditFormLayout = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  zIndex: '3',
  border: '1px solid',
  borderColor: colorVars.gold8,
  borderRadius: '4px',
  padding: '8px',
  backgroundColor: colorVars.gold4,
  boxShadow: `
  hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
  hsl(206 22% 7% / 20%) 0px 10px 20px -15px
`,
});

export const tagInputStyle = style({
  outline: 'none',
  margin: 0,
  border: `1px solid ${colorVars.gold8}`,
  fontSize: fontSize['sm'],
});

export const popoverOverlayStyle = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 2,
  backgroundColor: 'rgba(0, 0, 0, 0)',
});
