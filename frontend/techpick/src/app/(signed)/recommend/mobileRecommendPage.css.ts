import { style } from '@vanilla-extract/css';

export const suggestionDescriptionTitle = style({
  marginTop: '8px',
  marginBottom: '12px',
});

export const carouselViewPort = style({
  overflow: 'hidden',
});

export const carouselContainer = style({
  display: 'flex',
  touchAction: 'pan-y pinch-zoom',
});

export const carouselSlide = style({
  flex: '0 0 90%',
  display: 'flex',
  gap: '10',
  justifyContent: 'center',
  minWidth: 0,
});

export const folderNavigationItemListLayoutStyle = style({
  marginTop: '12px',
});
