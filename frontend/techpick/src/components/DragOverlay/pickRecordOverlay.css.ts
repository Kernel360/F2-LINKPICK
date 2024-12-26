import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { pickRecordLayoutStyle } from '../PickRecord/pickRecord.css';

export const pickRecordOverlayLayoutStyle = style([
  pickRecordLayoutStyle,
  {
    background: colorVars.gold3,
    opacity: '0.8',
  },
]);
