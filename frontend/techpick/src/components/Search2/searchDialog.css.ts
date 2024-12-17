import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const dialogOverlay = style({
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  position: 'fixed',
  inset: 0,
});

export const dialogContent = style({
  background: 'white',
  borderRadius: '8px',
  padding: '16px',
  width: '100%',
  minWidth: '300px',
  maxWidth: '800px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'fixed',
});

export const searchListContainer = style({
  display: 'flex',
  flexDirection: 'row',
  height: 'auto',
  margin: 'auto',
  justifyContent: 'space-between',
  gap: '16px',
});

export const searchBar = style({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '4px',
  marginBottom: '8px',
  borderBottom: `1px solid ${colorVars.gray4}`,
});

export const iconButtonContainer = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colorVars.gray8,
  ':hover': {
    backgroundColor: colorVars.gray2,
  },
});

export const searchInput = style({
  flexGrow: 1,
  padding: '8px',
  fontSize: '14px',
});

export const filterContainer = style({
  gap: '16px',
  marginBottom: '8px',
});

export const showFilterContainer = style({
  display: 'flex',
});

export const filterGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const filterLabel = style({
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#555',
});

export const filterSelect = style({
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
});

export const searchResultContainer = style({
  maxHeight: '300px',
  overflowY: 'auto',
  marginTop: '16px',
});

export const searchResultItem = style({
  padding: '8px 0',
  borderBottom: '1px solid #eee',
});

export const noResult = style({
  textAlign: 'center',
  color: '#aaa',
  marginTop: '16px',
});
