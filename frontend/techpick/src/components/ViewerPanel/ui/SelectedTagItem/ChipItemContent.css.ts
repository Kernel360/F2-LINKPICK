import { style } from '@vanilla-extract/css';
import { color } from 'techpick-shared';
import { ChipCommonStyle } from './ChipItemCommonStyle';

export const ChipContentStyle = style({
  boxSizing: 'border-box',
  padding: '0 4px',
  maxWidth: `calc(${ChipCommonStyle.width} - 36px)`, // 20px은 버튼의 영역, 16px는 패딩
  height: '14px',
  fontSize: '14px',
  whiteSpace: 'nowrap', // 줄 바꿈 방지
  overflow: 'hidden', // 넘치는 내용 숨김
  textOverflow: 'ellipsis', // 생략 부호 추가
  color: color.font,
});
