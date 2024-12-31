import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import {
  dialogContentLayoutStyle,
  dialogContentBackgroundColorStyle,
} from '@/styles/dialogStyle.css';
import { redOutlineButtonStyle } from '@/styles/redButtonStyle.css';
import { sandOutlineButtonStyle } from '@/styles/sandButtonStyle.css';

export const moveRecycleDialogContent = style([
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

export const moveRecycleBinDialogTitleStyle = style({
  display: 'block',
  fontSize: '16px',
  fontWeight: '500',
});

export const moveRecycleBinDialogDescriptionStyle = style({
  margin: '8px 0px',
  fontSize: '14px',
});

export const moveRecycleBinDialogShareFolderWarningDescriptionStyle = style({
  marginTop: '8px',
  fontSize: '14px',
  color: colorVars.orange11,
  whiteSpace: 'pre-wrap',
});

export const moveRecycleBinDialogCloseButton = style({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '8px',
  cursor: 'pointer',
});

export const moveRecycleBinConfirmButtonStyle = style([
  redOutlineButtonStyle,
  {
    width: '100%',
    height: '32px',
  },
]);

export const moveRecycleBinCancelButtonStyle = style([
  sandOutlineButtonStyle,
  {
    marginTop: '8px',
    width: '100%',
    height: '32px',
  },
]);
