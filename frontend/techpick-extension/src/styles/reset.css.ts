import { globalStyle, globalFontFace } from '@vanilla-extract/css';

globalStyle('*', {
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
});

globalStyle('*::-webkit-scrollbar', {
  display: 'none',
});

globalStyle(
  `
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video,button
`,
  {
    margin: 0,
    padding: 0,
    border: 0,
    fontSize: '100%',
    font: 'inherit',
    verticalAlign: 'baseline',
    boxSizing: 'border-box',
  }
);

globalStyle(
  `
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section
`,
  {
    display: 'block',
  }
);

globalStyle('body', {
  lineHeight: 1,
  fontSize: '16px',
});

globalStyle('ol, ul', {
  listStyle: 'none',
});

globalStyle('blockquote, q', {
  quotes: 'none',
});

globalStyle('blockquote:before, blockquote:after, q:before, q:after', {
  content: '',
});

globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
});

export const notoSansKR = 'notoSansKR';

globalFontFace(notoSansKR, {
  src: 'url("./../assets/NotoSansKR-Regular.ttf") format("truetype")',
  fontWeight: 'normal',
  fontStyle: 'normal',
});

globalStyle('body', {
  fontFamily: notoSansKR,
});
