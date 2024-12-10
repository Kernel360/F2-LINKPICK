// eslint-disable-next-line import/named
import { StylesConfig, ControlProps, CSSObjectWithLabel } from 'react-select';
import { colorVars } from 'techpick-shared';
import { SearchSelectOption } from '@/types';

const customSelectStyles: StylesConfig<SearchSelectOption, true> = {
  control: (
    base: CSSObjectWithLabel,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    props: ControlProps<SearchSelectOption, true>
  ) => ({
    ...base,
    borderRadius: '24px',
    minHeight: '24px',
    minWidth: '100px',
    fontSize: '12px',
    border: `1px solid ${colorVars.gray4}`,
    boxShadow: 'none',
    ':hover': {
      border: `1px solid ${colorVars.gray6}`,
    },
    ':focus': {
      border: `1px solid ${colorVars.gray4}`,
      outline: 'none',
      boxShadow: 'none',
    },
    padding: '0px',
  }),
  option: (base: CSSObjectWithLabel, state) => ({
    ...base,
    fontSize: '12px',
    backgroundColor: state.isFocused ? `${colorVars.gold3}` : 'white',
    ':active': {
      backgroundColor: `${colorVars.gold4}`,
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  multiValue: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: `${colorVars.gold4}`,
    borderRadius: '100px',
    padding: '0px 2px',
  }),
  multiValueLabel: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: '12px',
    color: '#555',
  }),
  multiValueRemove: (base: CSSObjectWithLabel) => ({
    ...base,
    color: '#777',
    ':hover': {
      color: `${colorVars.warning}`,
    },
  }),
  placeholder: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: '14px',
    textAlign: 'center',
  }),
  clearIndicator: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: '0px',
    fontSize: '12px',
    ':hover': {
      color: `${colorVars.warning}`,
    },
  }),
  dropdownIndicator: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: '0px 2px',
    fontSize: '12px',
  }),
};

export default customSelectStyles;
