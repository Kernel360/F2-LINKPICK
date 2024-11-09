import { style } from '@vanilla-extract/css';
import { colorThemeContract } from 'techpick-shared';

const { color } = colorThemeContract;

export const SEARCH_WIDGET_WIDTH = '264px';

export const optionWidgetLayout = style({
  display: 'flex',
  borderWidth: '10px',
  border: '1px solid red', // test
});

export const viewWidgetLayout = style({});

export const inputStyle = style({
  width: '100%',
  height: '40px',
  border: '1px solid transparent',
  borderRadius: '4px',
  padding: '8px',
  backgroundColor: color.inputBackground,
  fontSize: '1rem',
  color: color.font,

  ':focus': {
    border: `1px solid ${color.inputBorderFocus}`,
    outline: 'none',
    backgroundColor: color.inputBackground,
    transition: 'border 0.3s ease',
  },
});

export const buttonLayout = style({
  marginLeft: 'auto',
});

export const appliedFilterListLayout = style({
  display: 'flex',
  gap: '4px',
  flexWrap: 'wrap',
  padding: '4px',
  width: '264px',
});
