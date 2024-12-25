import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { dialogContentStyle } from '@/styles/dialogStyle.css';
import { orangeOutlineButtonStyle } from '@/styles/orangeButtonStyle.css';

export const dialogContent = style([
  dialogContentStyle,
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 'auto',
    height: 'auto',
    padding: '24px',
  },
]);

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
    backgroundColor: colorVars.orange1,
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
    backgroundColor: colorVars.orange1,
    width: '56px',
    height: '32px',
  },
]);

export const tabContentStyle = style({
  position: 'relative',
});

export const tabTriggerLayoutStyle = style({ display: 'flex', gap: '8px' });
