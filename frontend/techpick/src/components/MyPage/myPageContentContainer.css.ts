import { style } from '@vanilla-extract/css';

export const myPageContentContainer = style({
  display: 'flex',
  width: 'fit-content',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem',
});

export const myPageContentContainerTitle = style({
  fontSize: '1.5rem',
  fontWeight: 'semibold',
});
