import { style } from '@vanilla-extract/css';
import { color } from 'techpick-shared';

export const selectedTagContentStyle = style({
  boxSizing: 'border-box',
  padding: '0 4px',
  maxWidth: '228px',
  height: '14px',
  fontSize: '14px',
  whiteSpace: 'nowrap', // 줄 바꿈 방지
  overflow: 'hidden', // 넘치는 내용 숨김
  textOverflow: 'ellipsis', // 생략 부호 추가
  color: color.font,
});
