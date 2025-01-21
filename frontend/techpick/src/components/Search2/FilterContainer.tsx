import { useFetchTagList } from '@/queries/useFetchTagList';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { useSearchPickStore } from '@/stores/searchPickStore';
import { createSearchSelectOptions } from '@/utils/createSearchSelectOptions';
import { FolderIcon, Tags } from 'lucide-react';
import { useEffect, useState } from 'react';
import FilterOptions from './FilterOptions';
import * as styles from './searchDialog.css';

export default function FilterContainer({
  setIsSelectMenuOpen,
}: FilterContainerProps) {
  const { getFolderList } = useTreeStore();
  const folderList = getFolderList();
  const { setSearchFolder, setSearchTag } = useSearchPickStore();
  const { data: tagList = [] } = useFetchTagList();
  const [isFolderFilterOpen, setIsFolderFilterOpen] = useState(false);
  const [isTagFilterOpen, setIsTagFilterOpen] = useState(false);

  const folderOptions = createSearchSelectOptions(
    folderList,
    (folder) => folder.folderType !== 'ROOT',
  );
  const tagOptions = createSearchSelectOptions(tagList);

  const updateSearchState = (
    queryString: number[],
    setSearchState: (value: string) => void,
  ) => {
    setSearchState(queryString.length === 0 ? '' : queryString.join(','));
  };

  useEffect(
    function isFilterOpen() {
      if (isFolderFilterOpen || isTagFilterOpen) {
        setIsSelectMenuOpen(true);
      } else {
        setIsSelectMenuOpen(false);
      }
    },
    [isFolderFilterOpen, isTagFilterOpen, setIsSelectMenuOpen],
  );

  return (
    <div className={`${styles.filterContainer} ${styles.showFilterContainer}`}>
      <FilterOptions
        title="폴더"
        icon={<FolderIcon size={18} />}
        options={folderOptions}
        updateSearchState={(queryString: number[]) =>
          updateSearchState(queryString, setSearchFolder)
        }
        setIsSelectMenuOpen={setIsFolderFilterOpen}
      />
      <FilterOptions
        title="태그"
        icon={<Tags size={20} />}
        options={tagOptions}
        updateSearchState={(queryString: number[]) =>
          updateSearchState(queryString, setSearchTag)
        }
        setIsSelectMenuOpen={setIsTagFilterOpen}
      />
    </div>
  );
}

interface FilterContainerProps {
  setIsSelectMenuOpen: (isOpen: boolean) => void;
}
