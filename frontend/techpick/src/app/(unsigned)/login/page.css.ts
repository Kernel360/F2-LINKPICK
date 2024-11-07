import { style } from '@vanilla-extract/css';

export const loginContainer = style({
  width: '100%',
  height: '100vh',
  position: 'relative',
});

export const logoContainer = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  left: 'calc(50% - 150px)',
  width: '300px',
  height: '380px',
  top: 220,
  border: `1px solid #e3e3e3`,
  borderRadius: '8px',
  flexDirection: 'column',
});

export const loginLink = style({
  textDecoration: 'none',
  height: '40px',
  color: 'inherit',
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  alignItems: 'center',
});

export const googleLoginContainer = style({
  backgroundColor: '#ffffff',
  border: '1px solid #e3e3e3',
  borderRadius: '4px',
  width: '220px',
  marginBottom: '8px',
  bottom: 0,
});

export const kakaoLoginContainer = style({
  backgroundColor: '#FEE500',
  borderRadius: '4px',
  width: '220px',
});
