import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const mainColor = '#1a1a1a';
export const subColor = '#f1f1f1';

export const screenContainer = style({
  width: '100%',
  height: '100vh',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: mainColor,
});

export const dividerStyle = style({
  // margin: `${space['12']} 0`,
  width: '100%',
});

export const loginBlockContainer = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  left: 'calc(50% - 150px)',
  width: '300px',
  height: '300px',
  border: `1px solid ${subColor}`,
  backgroundColor: mainColor,
  boxShadow: `4px 4px 0px 0px ${subColor}`,
  flexDirection: 'column',
  // gap: '8px',
  // padding: '36px 0',
});

export const pickBrandContainerWithText = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
  alignItems: 'center',
});

export const pickBrandContainer = style({
  display: 'flex',
  alignItems: 'center',
  width: '220px',
  height: '100%',
  color: subColor,
  fontSize: '40px',
  fontWeight: 'bold',
  gap: '12px',
});

export const pickIconContainer = style({
  width: '36px',
  height: '36px',
  position: 'relative',
});

export const loginLink = style({
  textDecoration: 'none',
  height: '40px',
  color: 'inherit',
  display: 'flex',
  gap: '12px',
  marginLeft: '16px',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export const googleLoginContainer = style({
  color: subColor,
  border: `1px solid ${subColor}`,
  boxShadow: `2px 2px 0px 0px ${subColor}`,
  width: '220px',
  marginBottom: '18px',
  bottom: 0,
  ':hover': {
    transition: '0.3s ease',
    backgroundColor: colorVars.primary,
    border: `1px solid ${colorVars.primary}`,
  },
});

export const kakaoLoginContainer = style({
  color: subColor,
  border: `1px solid ${subColor}`,
  boxShadow: `2px 2px 0px 0px ${subColor}`,
  width: '220px',
  marginBottom: '12px',
  ':hover': {
    transition: '0.3s ease',
    backgroundColor: colorVars.primary,
    border: `1px solid ${colorVars.primary}`,
  },
});
