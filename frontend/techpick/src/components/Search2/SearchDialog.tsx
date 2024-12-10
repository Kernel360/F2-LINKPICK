import React, { useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { SearchIcon, FilterIcon, Loader } from 'lucide-react';
import { useSearchPickStore } from '@/stores/searchPickStore';
import FilterToggleContainer from './FilterToggleContainer';
import HoverCard from './HoverCard';
import * as styles from './searchDialog.css';
import { SearchInfiniteScrollList } from './SearchInfiniteScrollList';
import SearchInput from './SearchInput';

export default function SearchDialog({
  isOpen,
  onOpenChange,
}: SearchDialogProps) {
  const { isLoading } = useSearchPickStore();
  const [filterVisible, setFilterVisible] = useState(false);

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.dialogOverlay} />
        <DialogPrimitive.Content className={styles.dialogContent}>
          <DialogPrimitive.Title>
            <VisuallyHidden>Pick Search</VisuallyHidden>
          </DialogPrimitive.Title>
          <div className={styles.searchBar}>
            {isLoading ? <Loader size={20} /> : <SearchIcon size={20} />}
            <SearchInput />
            <button className={styles.filterButton} onClick={toggleFilter}>
              <FilterIcon size={20} />
            </button>
          </div>
          <FilterToggleContainer isVisible={filterVisible} />
          <div className={styles.searchListContainer}>
            <SearchInfiniteScrollList onClose={onOpenChange} />
            <HoverCard />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

interface SearchDialogProps {
  isOpen: boolean;
  onOpenChange: () => void;
}
