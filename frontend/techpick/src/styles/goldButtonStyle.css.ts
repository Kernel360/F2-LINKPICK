import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { baseButtonStyle, outlineButtonStyle } from './baseButtonStyle.css';

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const goldSolidButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: colorVars.gold9,
    color: 'white',
    ':hover': { backgroundColor: colorVars.gold10 },
    ':active': { backgroundColor: colorVars.gold11 },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const goldOutlineButtonStyle = style([
  baseButtonStyle,
  outlineButtonStyle,
  {
    borderColor: colorVars.gold7,
    backgroundColor: 'transparent',
    color: colorVars.gold11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.gold3,
      },
    },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const goldGhostButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: 'transparent',
    color: colorVars.gold11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.gold3,
      },
    },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const goldLinkButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: 'transparent',
    color: colorVars.gold11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.gold3,
        textDecoration: 'underline',
      },
    },
  },
]);
