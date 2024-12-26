import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { dialogContentStyle } from '@/styles/dialogStyle.css';

/* --------------- Dialog --------------- */

export const dialogContent = style([
  dialogContentStyle,
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '16px',
  },
]);

export const dialogTitle = style({
  fontWeight: 'normal',
  fontSize: '16px',
});

export const dialogDescription = style({
  fontSize: '14px',
  color: 'gray',
  display: 'inline-flex',
  alignItems: 'center',
});

/* --------------- myLinkPage Link --------------- */
export const myLinkPageLinkText = style({
  color: colorVars.primary,
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  ':hover': {
    textDecoration: 'underline',
  },
});

export const linkContent = style({
  display: 'flex',
  alignItems: 'center',
});

export const icon = style({
  fontSize: '0.875rem',
});

/* --------------- Shared Folder Link --------------- */
export const sharedFolderLink = style({
  backgroundColor: '#f9f9f9',
  padding: '0.5rem',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  userSelect: 'text',
  cursor: 'text',
  display: 'block',
  width: '300px',
  whiteSpace: 'nowrap',
  overflow: 'auto',
});

/* Copy Button */
export const copyButton = style({
  marginLeft: '1rem',
  padding: '0.5rem',
  fontSize: '1rem',
  backgroundColor: '#f9f9f9',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer',
});

export const closeIcon = style({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  cursor: 'pointer',
});

export const popoverStyle = style({
  fontSize: '0.875rem',
});
