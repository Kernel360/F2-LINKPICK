import { style } from '@vanilla-extract/css';

/* --------------- Dialog --------------- */
export const dialogOverlay = style({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  inset: 0,
});

export const dialogContent = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '32px 24px',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
});

export const dialogTitle = style({
  fontWeight: 'bold',
  fontSize: '1.5rem',
});

export const dialogDescription = style({
  fontSize: '1rem',
  color: 'gray',
  marginTop: '1rem',
  marginBottom: '1rem',
  display: 'inline-flex',
  alignItems: 'center',
});

/* --------------- myLinkPage Link --------------- */
export const myLinkPageLinkText = style({
  color: '#0070f3',
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
