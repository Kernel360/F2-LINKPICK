import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import customSelectStyles from './customSelectStyles';
import * as styles from './filterOptions.css';
import { SearchSelectOption } from '@/types';

type MultiValue<Option> = readonly Option[];

export default function FilterOptions({
  title,
  icon,
  options,
  updateSearchState,
}: TagFilterOptionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  useEffect(() => {
    updateSearchState(selectedOptions);
  }, [selectedOptions]);

  function onChange(selectedOptions: MultiValue<SearchSelectOption>) {
    setSelectedOptions(selectedOptions.map((option) => option.value));
  }

  return (
    <div className={styles.filterOptionContainer}>
      <div className={styles.icon}> {icon} </div>
      <Select
        placeholder={title}
        isMulti
        options={options}
        closeMenuOnSelect={false}
        onChange={onChange}
        styles={customSelectStyles}
      />
    </div>
  );
}

interface TagFilterOptionsProps {
  title: string;
  icon: React.ReactNode;
  options: SearchSelectOption[];
  updateSearchState: (queryString: number[]) => void;
}
