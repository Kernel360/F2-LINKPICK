import React, { useEffect, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { FilterIcon } from 'lucide-react';
import { useSearchPickStore } from '@/stores/searchPickStore';
import { eventEmitter } from '@/utils/eventEmitter';
import FilterToggleContainer from './FilterToggleContainer';
import HoverCard from './HoverCard';
import * as styles from './searchDialog.css';
import { SearchInfiniteScrollList } from './SearchInfiniteScrollList';
import SearchInput from './SearchInput';

export default function SearchDialog({
  isOpen,
  onOpenChange,
}: SearchDialogProps) {
  const [filterVisible, setFilterVisible] = useState(false);
  const { preFetchSearchPicks, reset } = useSearchPickStore();
  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  useEffect(function prefetching() {
    preFetchSearchPicks();
  }, []);

  /**
   * @description 이벤트를 구독하고, emit으로 발생시킨 이벤트를 받으면 상태를 변경합니다.
   */
  useEffect(() => {
    eventEmitter.on('open-search-dialog', onOpenChange);

    return () => {
      eventEmitter.off('open-search-dialog', onOpenChange);
    };
  }, [isOpen]);

  const handleOnClose = async () => {
    onOpenChange();
    reset();
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOnClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.dialogOverlay} />
        <DialogPrimitive.Content className={styles.dialogContent}>
          <DialogPrimitive.Title>
            <VisuallyHidden>Pick Search</VisuallyHidden>
          </DialogPrimitive.Title>
          <div className={styles.searchBar}>
            <SearchInput />
            <button
              className={styles.iconButtonContainer}
              onClick={toggleFilter}
            >
              <FilterIcon size={20} />
            </button>
          </div>
          <FilterToggleContainer isVisible={filterVisible} />
          <div className={styles.searchListContainer}>
            <SearchInfiniteScrollList onClose={handleOnClose} />
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
