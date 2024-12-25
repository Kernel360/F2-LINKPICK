import { style } from '@vanilla-extract/css';
import { zIndex } from 'techpick-shared';
import {
  dialogOverlayStyle as baseDialogOverlayStyle,
  dialogContentStyle as baseDialogContentStyle,
} from '@/styles/dialogStyle.css';
import { redOutlineButtonStyle } from '@/styles/redButtonStyle.css';
import { sandOutlineButtonStyle } from '@/styles/sandButtonStyle.css';

export const dialogContentStyle = style([
  baseDialogContentStyle,
  {
    margin: 'auto',
    zIndex: zIndex.level5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '8px',
    minWidth: '216px',
    padding: '16px',
  },
]);

export const dialogOverlayStyle = style([
  baseDialogOverlayStyle,
  {
    zIndex: zIndex.level4,
  },
]);

export const deleteTagButtonStyle = style([
  redOutlineButtonStyle,
  {
    width: '100%',
    fontSize: '14px',
  },
]);

export const deleteTagCancelButtonStyle = style([
  sandOutlineButtonStyle,
  {
    width: '100%',
    fontSize: '14px',
  },
]);
