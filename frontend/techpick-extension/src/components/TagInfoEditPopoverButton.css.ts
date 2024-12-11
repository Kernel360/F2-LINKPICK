import { style } from '@vanilla-extract/css';
import { colorVars, zIndex } from 'techpick-shared';

export const tagInfoEditFormLayout = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  borderRadius: '4px',
  padding: '8px',
  backgroundColor: colorVars.color.background,
  boxShadow:
    'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px',
});

export const tagInputStyle = style({
  outline: 'none',
  border: `1px solid ${colorVars.text}`,
  color: colorVars.text,
});

export const floatingOverlayStyle = style({
  zIndex: zIndex.level2,
});
