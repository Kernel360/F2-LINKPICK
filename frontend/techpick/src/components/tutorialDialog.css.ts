import { keyframes, style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { orangeOutlineButtonStyle } from '@/styles/orangeButtonStyle.css';

const contentShow = keyframes({
  from: {
    opacity: '0',
    transform: 'translate(-50%, -48%) scale(0.96)',
  },
  to: {
    opacity: '1',
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

export const overlayStyle = style({
  position: 'fixed',
  inset: '0',
  animation: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  backgroundColor: colorVars.sand8,
  opacity: 0.5,
});

export const dialogContent = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: 'auto',
  height: 'auto',
  borderRadius: '8px',
  boxShadow: `
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px
  `,
  padding: '24px',
  backgroundColor: colorVars.gold4,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const tabListStyle = style({
  position: 'absolute',
  top: '0',
  right: '0px',
});

export const tabTriggerButtonStyle = style([
  orangeOutlineButtonStyle,
  {
    width: '56px',
    height: '32px',

    selectors: {
      '&[data-state="open"]': {
        backgroundColor: colorVars.orange3,
      },
    },
  },
]);

export const tabContentDescriptionStyle = style({
  height: '32px',
  fontSize: '18px',
  textDecoration: 'underline',
  textDecorationColor: colorVars.primary,
  textUnderlineOffset: '4px',
});

export const pointTextStyle = style({ color: colorVars.primary });

export const dialogCloseButtonStyle = style([
  orangeOutlineButtonStyle,
  {
    width: '56px',
    height: '32px',
  },
]);

export const tabContentStyle = style({
  position: 'relative',
});

export const tabTriggerLayoutStyle = style({ display: 'flex', gap: '8px' });
