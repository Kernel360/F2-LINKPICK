import { style } from '@vanilla-extract/css';

export const breadcrumbItemLayout = style({
  display: 'inline-flex',
  alignItems: 'center',
  overflow: 'hidden',
});

export const breadcrumbItemStyle = style({
  display: 'inline-flex',
  maxWidth: '100%',
  minWidth: 0, // 추가
});

export const breadcrumbLinkStyle = style({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});
