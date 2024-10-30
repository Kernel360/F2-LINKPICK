import { createTheme } from '@vanilla-extract/css';

export const [commonThemeClass, commonTheme] = createTheme({
  space: {
    px: '1px',
    '4': '0.5rem', // 4px -> 0.5rem
    '8': '1rem', // 8px -> 1rem
    '12': '1.5rem', // 12px -> 1.5rem
    '16': '2rem', // 16px -> 2rem
    '20': '2.5rem', // 20px -> 2.5rem
    '24': '3rem', // 24px -> 3rem
    '28': '3.5rem', // 28px -> 3.5rem
    '32': '4rem', // 32px -> 4rem
    '36': '4.5rem', // 36px -> 4.5rem
    '40': '5rem', // 40px -> 5rem
    '44': '5.5rem', // 44px -> 5.5rem
    '48': '6rem', // 48px -> 6rem
    '52': '6.5rem', // 52px -> 6.5rem
    '56': '7rem', // 56px -> 7rem
    '64': '8rem', // 64px -> 8rem
    '72': '9rem', // 72px -> 9rem
    '80': '10rem', // 80px -> 10rem
    '96': '12rem', // 96px -> 12rem
    '112': '14rem', // 112px -> 14rem
    '128': '16rem', // 128px -> 16rem
    '144': '18rem', // 144px -> 18rem
    '160': '20rem', // 160px -> 20rem
    '176': '22rem', // 176px -> 22rem
    '192': '24rem', // 192px -> 24rem
    '208': '26rem', // 208px -> 26rem
    '224': '28rem', // 224px -> 28rem
    '240': '30rem', // 240px -> 30rem
    '256': '32rem', // 256px -> 32rem
    '272': '34rem', // 272px -> 34rem
    '288': '36rem', // 288px -> 36rem
    '304': '38rem', // 304px -> 38rem
    '320': '40rem', // 320px -> 40rem
  },
  typography: {
    fontColor: '#fff',
    fontSize: {
      /** @description Extra small = 12px */
      xs: '0.75rem',
      /** @description Small = 14px */
      sm: '0.875rem',
      /** @description Medium = 16px */
      md: '1rem',
      /** @description Large = 18px */
      lg: '1.125rem',
      /** @description Extra large = 20px */
      xl: '1.25rem',
      /** @description 2x large = 24px */
      '2xl': '1.5rem',
      /** @description 3x large = 30px */
      '3xl': '1.875rem',
      /** @description 4x large = 36px */
      '4xl': '2.25rem',
      /** @description 5x large = 48px */
      '5xl': '3rem',
      /** @description 6x large = 60px */
      '6xl': '3.75rem',
      /** @description 7x large = 72px */
      '7xl': '4.5rem',
      /** @description 8x large = 96px */
      '8xl': '6rem',
      /** @description 9x large = 128px */
      '9xl': '8rem',
    },
    lineHeight: {
      /** @description Extra small = 16px */
      xs: '1rem',
      /** @description Small = 20px */
      sm: '1.25rem',
      /** @description Medium = 24px */
      md: '1.5rem',
      /** @description Large = 28px */
      lg: '1.75rem',
      /** @description Extra large = 32px */
      xl: '2rem',
    },
    fontWeights: {
      /** @type {string} Font weight for hairline text (100). */
      hairline: '100',
      /** @type {string} Font weight for thin text (200). */
      thin: '200',
      /** @type {string} Font weight for light text (300). */
      light: '300',
      /** @type {string} Font weight for normal text (400). */
      normal: '400',
      /** @type {string} Font weight for medium text (500). */
      medium: '500',
      /** @type {string} Font weight for semi-bold text (600). */
      semibold: '600',
      /** @type {string} Font weight for bold text (700). */
      bold: '700',
      /** @type {string} Font weight for extra-bold text (800). */
      extrabold: '800',
      /** @type {string} Font weight for black text (900). */
      black: '900',
    },
  },
  breakpoints: {
    /** @type {string} Breakpoint for mobile devices (576px). */
    mobile: '576px',
    /** @type {string} Breakpoint for tablet devices (768px). */
    tablet: '768px',
    /** @type {string} Breakpoint for desktop devices (1024px). */
    desktop: '1024px',
  },
  sizes: {
    /** @type {string} Maximum size, set to `max-content`. */
    max: 'max-content',
    /** @type {string} Minimum size, set to `min-content`. */
    min: 'min-content',
    /** @type {string} Full size, set to `100%`. */
    full: '100%',
    /** @type {string} Size for extra extra small screens (14rem, 224px). */
    '3xs': '14rem',
    /** @type {string} Size for extra small screens (16rem, 256px). */
    '2xs': '16rem',
    /** @type {string} Size for small screens (20rem, 320px). */
    xs: '20rem',
    /** @type {string} Size for medium small screens (24rem, 384px). */
    sm: '24rem',
    /** @type {string} Size for medium screens (28rem, 448px). */
    md: '28rem',
    /** @type {string} Size for large screens (32rem, 512px). */
    lg: '32rem',
    /** @type {string} Size for extra large screens (36rem, 576px). */
    xl: '36rem',
    /** @type {string} Size for 2x large screens (42rem, 672px). */
    '2xl': '42rem',
    /** @type {string} Size for 3x large screens (48rem, 768px). */
    '3xl': '48rem',
    /** @type {string} Size for 4x large screens (56rem, 896px). */
    '4xl': '56rem',
    /** @type {string} Size for 5x large screens (64rem, 1024px). */
    '5xl': '64rem',
    /** @type {string} Size for 6x large screens (72rem, 1152px). */
    '6xl': '72rem',
    /** @type {string} Size for 7x large screens (80rem, 1280px). */
    '7xl': '80rem',
    /** @type {string} Size for 8x large screens (90rem, 1440px). */
    '8xl': '90rem',
    container: {
      /** @type {string} Container size for small screens (640px). */
      sm: '640px',
      /** @type {string} Container size for medium screens (768px). */
      md: '768px',
      /** @type {string} Container size for large screens (1024px). */
      lg: '1024px',
      /** @type {string} Container size for extra large screens (1280px). */
      xl: '1280px',
    },
  },
  borderRadius: {
    /** @type {string} No border radius, set to `0px`. */
    none: '0',
    /** @type {string} Small border radius, set to `2px` (0.125rem). */
    sm: '2px',
    /** @type {string} Base border radius, set to `4px` (0.25rem). */
    base: '4px',
    /** @type {string} Medium border radius, set to `6px` (0.375rem). */
    md: '6px',
    /** @type {string} Large border radius, set to `8px` (0.5rem). */
    lg: '8px',
    /** @type {string} Extra large border radius, set to `12px` (0.75rem). */
    xl: '12px',
    /** @type {string} Double extra large border radius, set to `16px` (1rem). */
    '2xl': '16px',
    /** @type {string} Triple extra large border radius, set to `24px` (1.5rem). */
    '3xl': '24px',
    /** @type {string} Full border radius, set to `9999px`, creating a circular shape. */
    full: '9999px',
  },
  zIndex: {
    levelMinus1: ' -1', // 사용되지 않는 요소
    level0: 'auto', // 사용되지 않는 요소
    level1: '0', // 기본 요소
    level2: '10', // 도킹된 요소
    level3: '1000', // 드롭다운
    level4: '1100', // 스티키 요소
    level5: '1200', // 배너
    level6: '1300', // 오버레이
    level7: '1400', // 모달
    level8: '1500', // 팝오버
    level9: '1600', // 스킵 링크
    level10: '1700', // 토스트
    level11: '1800', // 툴팁
  },
});

export const { borderRadius, breakpoints, sizes, space, typography, zIndex } =
  commonTheme;
export const { fontColor, fontSize, fontWeights, lineHeight } = typography;
