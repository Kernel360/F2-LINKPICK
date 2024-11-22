import type { CSSProperties } from 'react';
import { style } from '@vanilla-extract/css';
import { sizes, space } from 'techpick-shared';

export const RECORD_HEIGHT = 100;

export const pickRecordListLayoutInlineStyle: CSSProperties = {};

export const pickRecordListLayoutStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space['12'],
  width: sizes['full'],
  height: sizes['full'],
  overflowY: 'scroll',
});
