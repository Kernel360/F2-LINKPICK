import { createTheme } from '@vanilla-extract/css';
import {
  bronzeDark,
  goldDark,
  brownDark,
  orangeDark,
  tomatoDark,
  redDark,
  rubyDark,
  crimsonDark,
  pinkDark,
  plumDark,
  purpleDark,
  violetDark,
  irisDark,
  indigoDark,
  blueDark,
  cyanDark,
  tealDark,
  jadeDark,
  greenDark,
  grassDark,
  skyDark,
  mintDark,
  limeDark,
  yellowDark,
  amberDark,
  grayDark,
  mauveDark,
  slateDark,
  sageDark,
  oliveDark,
  sandDark,
} from '@radix-ui/colors';
import { colorVars } from './lightTheme.css';

export const darkTheme = createTheme(colorVars, {
  color: {
    primary: '#00306e',
    secondary: '#95004d',
    border: '#3e3e3e',
    background: '#000',
    font: '#fff',
    buttonPrimary: '#888F95',
    buttonSecondary: '#888888',
    buttonWarning: '#CC4C4C',
    buttonPrimaryFocus: '#6A7B7D',
    buttonWarningFocus: '#FF5C5C',
    inputBackground: '#1a1a1a', // 입력 필드 기본 배경색
    inputBorderFocus: '#444C52', // 입력 필드 포커스 시 경계 색상
    inputBackgroundFocus: '#333333', // 입력 필드 포커스 시 배경색,
    tagSelectedBackground: '#2e3236', // 조정된 태그 선택된 상태 배경색
    tagBackground: '#2a2a2a', // 기본 태그 배경색
    tagBorder: '#3a3a3a',
    popoverButtonHover: '#3a3f42',
  },

  primary: '#1a73e8',
  secondary: '#b0bec5',
  critical: '#ff1744',
  warning: '#ffa726',
  positive: '#66bb6a',
  neutral: '#757575',
  disabled: '#424242',
  onMedia: '#ffffff',
  primaryFaded: 'rgba(26, 115, 232, 0.7)',
  neutralFaded: 'rgba(117, 117, 117, 0.5)',

  borderNeutral: '#757575',
  borderNeutralFaded: 'rgba(117, 117, 117, 0.5)',
  borderPrimary: '#1a73e8',
  borderPrimaryFaded: 'rgba(26, 115, 232, 0.5)',
  borderCritical: '#ff1744',
  borderCriticalFaded: 'rgba(255, 23, 68, 0.5)',
  borderWarning: '#ffa726',
  borderWarningFaded: 'rgba(255, 167, 38, 0.5)',
  borderPositive: '#66bb6a',
  borderPositiveFaded: 'rgba(102, 187, 106, 0.5)',

  backgroundNeutral: 'rgb(50, 50, 50)',
  backgroundNeutralFaded: 'rgba(50, 50, 50, 0.6)',

  backgroundPrimary: 'rgb(0, 90, 200)',
  backgroundPrimaryFaded: 'rgba(0, 90, 200, 0.6)',

  backgroundPositive: 'rgb(0, 150, 80)',
  backgroundPositiveFaded: 'rgba(0, 150, 80, 0.5)',

  backgroundCritical: 'rgb(200, 30, 30)',
  backgroundCriticalFaded: 'rgba(200, 30, 30, 0.4)',

  backgroundDisabled: 'rgb(80, 80, 80)',
  backgroundDisabledFaded: 'rgba(80, 80, 80, 0.3)',

  backgroundPage: 'rgb(20, 20, 20)',
  backgroundPageFaded: 'rgba(20, 20, 20, 0.7)',

  backgroundBase: 'rgb(30, 30, 30)',
  backgroundElevated: 'rgb(40, 40, 40)',

  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255)',

  textPrimary: 'rgb(255, 255, 255)', // 다크 모드에서는 흰색 텍스트
  textSecondary: 'rgb(180, 180, 180)',
  textOnMedia: 'rgb(255, 255, 255)', // 미디어 위 텍스트는 동일하게 흰색

  elevationBase: '#1a1a1a', // 어두운 배경
  elevationRaised: '#2a2a2a', // 약간 떠 있는 요소
  elevationOverlay: '#333333', // 어두운 오버레이
  elevationOverlayHeavy: '#444444', // 강조된 어두운 오버레이
  elevationOverlayDimmed: 'rgba(255, 255, 255, 0.1)', // 흐린 흰색 배경
  elevationOverlayBlurred: 'rgba(255, 255, 255, 0.2)', // 강한 블러 효과

  borderDisabled: '#4a4a4a', // 어두운 회색 테두리
  foregroundDisabled: '#6b6b6b', // 텍스트 포그라운드 (밝은 회색)

  ...bronzeDark,
  ...goldDark,
  ...brownDark,
  ...orangeDark,
  ...tomatoDark,
  ...redDark,
  ...rubyDark,
  ...crimsonDark,
  ...pinkDark,
  ...plumDark,
  ...purpleDark,
  ...violetDark,
  ...irisDark,
  ...indigoDark,
  ...blueDark,
  ...cyanDark,
  ...tealDark,
  ...jadeDark,
  ...greenDark,
  ...grassDark,
  ...skyDark,
  ...mintDark,
  ...limeDark,
  ...yellowDark,
  ...amberDark,
  ...grayDark,
  ...mauveDark,
  ...slateDark,
  ...sageDark,
  ...oliveDark,
  ...sandDark,
});
