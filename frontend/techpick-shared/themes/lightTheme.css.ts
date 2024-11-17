import { createTheme } from '@vanilla-extract/css';
import {
  bronze,
  gold,
  brown,
  orange,
  tomato,
  red,
  ruby,
  crimson,
  pink,
  plum,
  purple,
  violet,
  iris,
  indigo,
  blue,
  cyan,
  teal,
  jade,
  green,
  grass,
  sky,
  mint,
  lime,
  yellow,
  amber,
  gray,
  mauve,
  slate,
  sage,
  olive,
  sand,
} from '@radix-ui/colors';

export const [lightTheme, colorVars] = createTheme({
  /**
   * @deprecated 더이상 사용되지 않습니다. 가급적 colorVars에서 직접 color를 선택하세요
   *
   */
  color: {
    primary: '#0070f3',
    secondary: '#ff0080',
    border: '#d3d3d3',
    background: '#ffffff',
    font: '#000',
    buttonPrimary: '#444C52',
    buttonSecondary: '#666666',
    buttonWarning: '#CC4C4C',
    buttonPrimaryFocus: 'black',
    buttonWarningFocus: '#FF5C5C',
    inputBackground: '#f9f9f9', // 입력 필드 기본 배경색
    inputBorderFocus: '#444C52', // 입력 필드 포커스 시 경계 색상
    inputBackgroundFocus: '#ffffff', // 입력 필드 포커스 시 배경색
    tagSelectedBackground: '#f5f5f4', // 태그 선택된 상태 배경색
    tagBackground: 'transparent', // 기본 태그 배경색
    tagBorder: 'none',
    popoverButtonHover: '#e0e0e0',
  },

  primary: '#8ab4f8',
  secondary: '#c2c2c2',
  critical: '#e53935',
  warning: '#fb8c00',
  positive: '#2e7d32',
  neutral: '#9e9e9e',
  disabled: '#616161',
  onMedia: '#ffffff',
  primaryFaded: 'rgba(138, 180, 248, 0.7)',
  neutralFaded: 'rgba(158, 158, 158, 0.5)',

  borderNeutral: '#bdbdbd',
  borderNeutralFaded: 'rgba(189, 189, 189, 0.5)',
  borderPrimary: '#8ab4f8',
  borderPrimaryFaded: 'rgba(138, 180, 248, 0.5)',
  borderCritical: '#e53935',
  borderCriticalFaded: 'rgba(229, 57, 53, 0.5)',
  borderWarning: '#fb8c00',
  borderWarningFaded: 'rgba(251, 140, 0, 0.5)',
  borderPositive: '#2e7d32',
  borderPositiveFaded: 'rgba(46, 125, 50, 0.5)',

  backgroundNeutral: '#F9F9F9',
  backgroundNeutralFaded: 'rgba(240, 240, 240, 0.6)',

  backgroundPrimary: 'rgb(0, 120, 255)',
  backgroundPrimaryFaded: 'rgba(0, 120, 255, 0.6)',

  backgroundPositive: 'rgb(0, 200, 100)',
  backgroundPositiveFaded: 'rgba(0, 200, 100, 0.5)',

  backgroundCritical: 'rgb(255, 50, 50)',
  backgroundCriticalFaded: 'rgba(255, 50, 50, 0.4)',

  backgroundDisabled: 'rgb(180, 180, 180)',
  backgroundDisabledFaded: 'rgba(180, 180, 180, 0.3)',

  backgroundPage: 'rgb(250, 250, 255)',
  backgroundPageFaded: 'rgba(250, 250, 255, 0.7)',

  backgroundBase: 'rgb(255, 255, 255)',
  backgroundElevated: 'rgb(245, 245, 245)',

  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255)',

  textPrimary: 'rgb(0, 0, 0)', // 라이트 모드에서는 검은색 텍스트
  textSecondary: 'rgb(80, 80, 80)',
  textOnMedia: 'rgb(255, 255, 255)', // 미디어 위 텍스트는 항상 흰색

  elevationBase: '#ffffff', // 기본 배경 (화이트)
  elevationRaised: '#f5f5f5', // 약간 떠 있는 요소 배경
  elevationOverlay: '#e0e0e0', // 기본 오버레이 배경
  elevationOverlayHeavy: '#d6d6d6', // 강조 오버레이
  elevationOverlayDimmed: 'rgba(0, 0, 0, 0.3)', // 배경 흐림 효과
  elevationOverlayBlurred: 'rgba(0, 0, 0, 0.5)', // 강한 블러 효과

  borderDisabled: '#c4c4c4', // 연한 회색 테두리
  foregroundDisabled: '#9e9e9e', // 텍스트 포그라운드 (중간 회색)

  text: 'rgb(0, 0, 0)', // 라이트 모드에서는 검은색 텍스트

  ...bronze,
  ...gold,
  ...brown,
  ...orange,
  ...tomato,
  ...red,
  ...ruby,
  ...crimson,
  ...pink,
  ...plum,
  ...purple,
  ...violet,
  ...iris,
  ...indigo,
  ...blue,
  ...cyan,
  ...teal,
  ...jade,
  ...green,
  ...grass,
  ...sky,
  ...mint,
  ...lime,
  ...yellow,
  ...amber,
  ...gray,
  ...mauve,
  ...slate,
  ...sage,
  ...olive,
  ...sand,
});
