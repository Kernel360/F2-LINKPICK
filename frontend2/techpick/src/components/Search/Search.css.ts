import { style } from '@vanilla-extract/css';
import { colorVars, space } from 'techpick-shared';

export const searchWidgetWidth = '100%';

export const listItemStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  padding: space['8'],
  cursor: 'pointer',
  // ----------------------------- 선택된 상태일 때 ---------------------
  selectors: {
    '&:hover': {
      backgroundColor: colorVars.yellow3, // TODO: 적용 되는지 체크
    },
  },
});

export const searchWidgetLayoutStyle = style({
  position: 'relative',
  width: '300px',
});

export const inputLayoutStyle = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colorVars.gold3,
  borderRadius: '4px',
  border: '1px solid transparent',
  selectors: {
    '&:hover, &:focus-within': {
      border: `1px solid ${colorVars.secondary}`,
      boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
    },
  },
});

export const inputIconStyle = style({
  margin: `0 ${space['8']}`,
});

export const autoCompleteLayoutStyle = style({
  position: 'absolute',
  backgroundColor: colorVars.gray4,
  width: '100%',
  zIndex: 1,
});
