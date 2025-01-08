import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const pickRecordHeaderLayoutStyle = style({
  position: 'sticky',
  top: '0',
  display: 'flex',
  alignItems: 'center',
  width: '1044px',
  height: '24px',
  borderTop: '1px solid ',
  borderBottom: '0.5px solid ',
  borderColor: colorVars.gold7,
  backgroundColor: colorVars.gold2,
  zIndex: '1',
});

export const columnStyle = style({
  lineHeight: '24px',
});
