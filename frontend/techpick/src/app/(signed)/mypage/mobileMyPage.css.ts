import { style } from '@vanilla-extract/css';

export const flexCenterStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignContent: 'center',
  gap: '4px',
});

export const mobilePageButtonStyle = style([
  flexCenterStyle,
  {
    width: '100%',
    height: '32px',
    marginTop: '12px',
  },
]);
