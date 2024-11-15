import { style } from '@vanilla-extract/css';
import { color } from 'techpick-shared';

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
  minWidth: '216px',
  border: `1px solid ${color.tagBorder}`,
  borderRadius: '4px',
  padding: '16px',
  backgroundColor: color.background,
  boxShadow:
    'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px',
});

export const dialogOverlayStyle = style({
  zIndex: '4',
  backgroundColor: 'rgba(0,0,0,0.3)',
  position: 'fixed',
  inset: 0,
});
