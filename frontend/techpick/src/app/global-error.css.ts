import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const errorBody = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: colorVars.gold2,
});

export const errorHeading = style({
  fontSize: '24px',
  color: '#e74c3c',
  marginBottom: '20px',
});

export const retryButton = style({
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  ':hover': {
    backgroundColor: '#2980b9',
  },
});
