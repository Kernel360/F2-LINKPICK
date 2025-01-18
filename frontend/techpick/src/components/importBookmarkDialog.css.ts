import {
  dialogContentBackgroundColorStyle,
  dialogContentLayoutStyle,
} from '@/styles/dialogStyle.css';
import { goldOutlineButtonStyle } from '@/styles/goldButtonStyle.css';
import { greenOutlineButtonStyle } from '@/styles/greenButtonStyle.css';
import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const importBookmarkDialogButtonStyle = style([
  goldOutlineButtonStyle,
  {
    width: '120px',
    height: '32px',
  },
]);

export const dialogContent = style([
  dialogContentLayoutStyle,
  dialogContentBackgroundColorStyle,
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 'auto',
    height: 'auto',
    padding: '24px',
  },
]);

export const dropzoneStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px dashed',
  borderColor: colorVars.sand8,
  borderRadius: '4px',
  width: '320px',
  height: '160px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
});

export const closeButtonStyle = style({
  position: 'absolute',
  top: 8,
  right: 8,
  cursor: 'pointer',
});

export const submitButtonStyle = style([
  greenOutlineButtonStyle,
  {
    marginTop: '8px',
    width: '100%',
    height: '32px',
  },
]);

export const dragInfoTextStyle = style({
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
});

export const fileDescriptionLayoutStyle = style({
  maxWidth: '320px',
  height: '18px',
  marginTop: '8px',
});

export const fileDescriptionTextStyle = style({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  fontSize: '12px',
});
