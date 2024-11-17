import { style } from '@vanilla-extract/css';
// import { SelectedTagCommonStyle } from '@/entities/tag';
import { colorVars } from 'techpick-shared';

export const tagDialogPortalLayout = style({
  position: 'absolute',
  top: '0',
  zIndex: '1',
  backgroundColor: colorVars.color.inputBackground,
});

export const commandInputStyle = style({
  display: 'flex',
  flex: '1 1 60px',
  minWidth: '64px',
  height: '20px',
  outline: 'none',
  border: 'none',
  padding: '0 4px',
  color: colorVars.color.font,
});

export const tagListStyle = style({
  border: `1px solid ${colorVars.color.tagBorder}`,
  borderRadius: '4px',
  padding: '4px 0',
  boxShadow:
    'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px',
  overflowY: 'auto',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const tagListLoadingStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20px',
});

export const tagListItemStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  padding: '4px',

  // 선택된 상태일 때
  selectors: {
    '&[data-selected="true"]': {
      backgroundColor: colorVars.color.tagSelectedBackground,
    },
    '&[data-disabled="true"]': {
      display: 'none',
    },
  },
});

export const tagListItemContentStyle = style({
  maxWidth: `calc('264px' - 34px)`, // 26px은 생성 텍스트의 영역 8px는 패딩
  height: '20px',
  lineHeight: '20px',
  borderRadius: '4px',
  padding: '0 4px',
  fontSize: '14px',
  whiteSpace: 'nowrap', // 줄 바꿈 방지
  overflow: 'hidden', // 넘치는 내용 숨김
  textOverflow: 'ellipsis', // 생략 부호 추가
  color: colorVars.color.font,
});

export const tagCreateTextStyle = style({
  width: '26px',
  fontSize: '14px',
  color: colorVars.color.font,
});
