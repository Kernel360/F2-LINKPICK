import { style } from '@vanilla-extract/css';

// 드래그 가능 아이템 스타일
export const draggableItem = style({
  padding: '8px 12px',
  margin: '4px 0',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#fff',
  cursor: 'grab',
  transition: 'background-color 0.2s',
  selectors: {
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    '&:active': {
      cursor: 'grabbing',
    },
  },
});

// 드래그 중인 아이템 스타일
export const draggingItem = style({
  opacity: 0.8,
});

// 드래그 영역 스타일
export const dragContainer = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const treePageWrapper = style({
  width: '400px',
  margin: 'auto',
  marginTop: '250px',
});
