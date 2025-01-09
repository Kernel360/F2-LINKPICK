import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { baseButtonStyle } from './baseButtonStyle.css';

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const sandSolidButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: colorVars.sand9,
    color: 'white',
    ':hover': { backgroundColor: colorVars.sand10 },
    ':active': { backgroundColor: colorVars.sand11 },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const sandOutlineButtonStyle = style([
  baseButtonStyle,
  {
    border: '1px solid',
    borderColor: colorVars.sand7,
    backgroundColor: 'transparent',
    color: colorVars.sand11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.sand3,
      },
    },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const sandGhostButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: 'transparent',
    color: colorVars.sand11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.sand3,
      },
    },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const sandLinkButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: 'transparent',
    color: colorVars.sand11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.sand3,
        textDecoration: 'underline',
      },
    },
  },
]);
