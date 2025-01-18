import type { SearchSelectOptionType } from '@/types/SearchSelectOptionType';
import type React from 'react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import customSelectStyles from './customSelectStyles';
import * as styles from './filterOptions.css';

type MultiValue<Option> = readonly Option[];

export default function FilterOptions({
  title,
  icon,
  options,
  updateSearchState,
  setIsSelectMenuOpen,
}: TagFilterOptionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    updateSearchState(selectedOptions);
  }, [selectedOptions]);

  function onChange(selectedOptions: MultiValue<SearchSelectOptionType>) {
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
        onMenuClose={() => {
          setIsSelectMenuOpen(false);
        }}
        onMenuOpen={() => {
          setIsSelectMenuOpen(true);
        }}
      />
    </div>
  );
}

interface TagFilterOptionsProps {
  title: string;
  icon: React.ReactNode;
  options: SearchSelectOptionType[];
  updateSearchState: (queryString: number[]) => void;
  setIsSelectMenuOpen: (isOpen: boolean) => void;
}
