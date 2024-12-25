import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { baseButtonStyle, outlineButtonStyle } from './baseButtonStyle.css';

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const greenSolidButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: colorVars.green9,
    color: 'white',
    ':hover': { backgroundColor: colorVars.green10 },
    ':active': { backgroundColor: colorVars.green11 },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const greenOutlineButtonStyle = style([
  baseButtonStyle,
  outlineButtonStyle,
  {
    borderColor: colorVars.green7,
    backgroundColor: 'transparent',
    color: colorVars.green11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.green3,
      },
    },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const greenGhostButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: 'transparent',
    color: colorVars.green11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.green3,
      },
    },
  },
]);

/**
 * @description color만 설정했습니다. width, height, padding 등은 직접 설정하셔야합니다.
 */
export const greenLinkButtonStyle = style([
  baseButtonStyle,
  {
    backgroundColor: 'transparent',
    color: colorVars.green11,
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: colorVars.green3,
        textDecoration: 'underline',
      },
    },
  },
]);
