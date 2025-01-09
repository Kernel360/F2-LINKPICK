import { style } from '@vanilla-extract/css';
import {
  orangeGhostButtonStyle,
  orangeOutlineButtonStyle,
  orangeSolidButtonStyle,
} from '@/styles/orangeButtonStyle.css';

export const buttonSectionStyle = style({
  display: 'flex',
  gap: '12px',
  padding: '16px',
});

export const sharedPageButtonStyle = style({
  width: '100px',
  height: '32px',
});

export const homeNavigateButtonStyle = style([
  sharedPageButtonStyle,
  orangeGhostButtonStyle,
]);

export const loginButtonStyle = style([
  sharedPageButtonStyle,
  orangeOutlineButtonStyle,
]);

export const signUpButtonStyle = style([
  sharedPageButtonStyle,
  orangeSolidButtonStyle,
]);
