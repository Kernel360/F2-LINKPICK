import { keyframes, style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

const contentShow = keyframes({
  from: {
    opacity: '0',
    transform: 'translate(-50%, -48%) scale(0.96)',
  },
  to: {
    opacity: '1',
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

/* --------------- Dialog --------------- */
export const dialogOverlay = style({
  position: 'fixed',
  inset: '0',
  animation: ' overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  backgroundColor: colorVars.sand8,
  opacity: 0.5,
});

export const dialogContent = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  // width: '320px',
  // height: '160px',
  gap: '12px',
  borderRadius: '8px',
  boxShadow: `
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px
  `,
  padding: '16px',
  backgroundColor: colorVars.gold4,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

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
