import React from 'react';
import { useTreeStore, useTagStore } from '@/stores';
import { useSearchPickStore } from '@/stores/searchPickStore';
import { createSearchSelectOptions } from '@/utils';
import FilterOptions from './FliterOptions';
import * as styles from './searchDialog.css';

export default function FilterToggleContainer({
  isVisible,
}: FilterToggleContainerProps) {
  const { getFolderList } = useTreeStore();
  const folderList = getFolderList();
  const { setSearchFolder, setSearchTag } = useSearchPickStore();
  const { tagList } = useTagStore();

  const folderOptions = createSearchSelectOptions(
    folderList,
    (folder) => folder.folderType !== 'ROOT'
  );
  const tagOptions = createSearchSelectOptions(tagList);

  const updateSearchState = (
    queryString: number[],
    setSearchState: (value: string) => void
  ) => {
    setSearchState(queryString.length === 0 ? '' : queryString.join(','));
  };

  return (
    <div
      className={`${styles.filterContainer} ${
        isVisible ? styles.showFilterContainer : styles.hideFilterContainer
      }`}
    >
      <FilterOptions
        title="폴더"
        options={folderOptions}
        updateSearchState={(queryString: number[]) =>
          updateSearchState(queryString, setSearchFolder)
        }
      />
      <FilterOptions
        title="태그"
        options={tagOptions}
        updateSearchState={(queryString: number[]) =>
          updateSearchState(queryString, setSearchTag)
        }
      />
    </div>
  );
}

interface FilterToggleContainerProps {
  isVisible: boolean;
}
