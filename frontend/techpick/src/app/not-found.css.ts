import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const notFoundPageLayout = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  padding: '32px',
  background: colorVars.gold2,
});

export const notFoundPageImageStyle = style({
  position: 'relative',
});

export const notFoundPageTitleStyle = style({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '20px',
  fontWeight: '600',
});
