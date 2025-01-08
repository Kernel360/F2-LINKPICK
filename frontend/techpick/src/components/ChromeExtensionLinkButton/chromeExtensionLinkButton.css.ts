import { style } from '@vanilla-extract/css';
import { orangeOutlineButtonStyle } from '@/styles/orangeButtonStyle.css';

export const chromeExtensionLinkButtonStyle = style([
  orangeOutlineButtonStyle,
  {
    display: 'flex',
    flexShrink: 0,
    gap: '4px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '112px',
    height: '24px',
    fontSize: '12px',
    cursor: 'pointer',
  },
]);
