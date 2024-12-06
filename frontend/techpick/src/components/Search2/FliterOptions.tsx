import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { SearchSelectOption } from '@/types';

type MultiValue<Option> = readonly Option[];

export default function FilterOptions({
  title,
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
    <div>
      <label>{title}</label>
      <Select
        isMulti
        options={options}
        closeMenuOnSelect={false}
        onChange={onChange}
      />
    </div>
  );
}

interface TagFilterOptionsProps {
  title: string;
  options: SearchSelectOption[];
  updateSearchState: (queryString: number[]) => void;
}
