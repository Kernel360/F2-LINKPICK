import { style } from '@vanilla-extract/css';
import { fontSize } from 'techpick-shared';

export const myPageContentContainerHeader = style({
  display: 'grid',
  gridTemplateColumns: '15% 85%',
  alignItems: 'center',
  fontWeight: 500,
  fontSize: fontSize.md,
  padding: '8px',
});

export const cell = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: '0 8px',
});
