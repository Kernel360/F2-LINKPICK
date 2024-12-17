import React, { useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { OPEN_SEARCH_DIALOG_EVENT } from '@/constants';
import { useSearchPickStore } from '@/stores/searchPickStore';
import { eventEmitter } from '@/utils/eventEmitter';
import FilterContainer from './FilterContainer';
import HoverCard from './HoverCard';
import * as styles from './searchDialog.css';
import { SearchInfiniteScrollList } from './SearchInfiniteScrollList';
import SearchInput from './SearchInput';

export default function SearchDialog({
  isOpen,
  onOpenChange,
}: SearchDialogProps) {
  const { preFetchSearchPicks, reset } = useSearchPickStore();

  useEffect(function prefetching() {
    preFetchSearchPicks();
  }, []);

  /**
   * @description 이벤트를 구독하고, emit으로 발생시킨 이벤트를 받으면 상태를 변경합니다.
   */
  useEffect(() => {
    eventEmitter.on(OPEN_SEARCH_DIALOG_EVENT, onOpenChange);

    return () => {
      eventEmitter.off(OPEN_SEARCH_DIALOG_EVENT, onOpenChange);
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
          </div>
          <FilterContainer />
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
