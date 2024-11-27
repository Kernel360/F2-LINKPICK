import { style } from '@vanilla-extract/css';

export const pickDraggableListLayoutStyle = style({
  width: 'fit-content',
  overflowY: 'scroll',
  /**paddingBottom이 없다면 TagPicker가 짤리게 됩니다.*/
  paddingBottom: '160px',
});
