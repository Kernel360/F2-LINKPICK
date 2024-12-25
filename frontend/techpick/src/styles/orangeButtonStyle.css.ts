import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { baseButtonStyle } from './baseButtonStyle.css';

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const orangeSolidButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: colorVars.orange9,
    color: 'white',
    ':hover': { backgroundColor: colorVars.orange10 },
    ':active': { backgroundColor: colorVars.orange11 },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const orangeOutlineButtonStyle = style([
  baseButtonStyle,
  {
    border: '1px solid',
    borderColor: colorVars.orange7,
    backgroundColor: 'transparent',
    color: colorVars.orange11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.orange3,
      },
    },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const orangeGhostButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: 'transparent',
    color: colorVars.orange11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.orange3,
      },
    },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const orangeLinkButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: 'transparent',
    color: colorVars.orange11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.orange3,
        textDecoration: 'underline',
      },
    },
  },
]);
