import { style } from '@vanilla-extract/css';

export const emptyPickRecordImageLayoutStyle = style({
  position: 'relative',
  borderBottomLeftRadius: '16px',
  borderBottomRightRadius: '16px',
});

export const emptyPickRecordImageStyle = style({
  height: '550px',
});

export const emptyPickRecordTextLayoutStyle = style({
  position: 'absolute',
  top: '20%',
  left: '50%',
  minWidth: '600px',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
});

export const titleTextStyle = style({
  fontSize: '32px',
});
