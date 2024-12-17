import React from 'react';
import { FolderIcon, Tags } from 'lucide-react';
import { useTreeStore, useTagStore } from '@/stores';
import { useSearchPickStore } from '@/stores/searchPickStore';
import { createSearchSelectOptions } from '@/utils';
import FilterOptions from './FilterOptions';
import * as styles from './searchDialog.css';

export default function FilterContainer() {
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
    <div className={`${styles.filterContainer} ${styles.showFilterContainer}`}>
      <FilterOptions
        title="폴더"
        icon={<FolderIcon size={18} />}
        options={folderOptions}
        updateSearchState={(queryString: number[]) =>
          updateSearchState(queryString, setSearchFolder)
        }
      />
      <FilterOptions
        title="태그"
        icon={<Tags size={20} />}
        options={tagOptions}
        updateSearchState={(queryString: number[]) =>
          updateSearchState(queryString, setSearchTag)
        }
      />
    </div>
  );
}
