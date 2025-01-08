import React, { useEffect, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { OPEN_SEARCH_DIALOG_EVENT } from '@/constants';
import { useSearchPickStore } from '@/stores/searchPickStore';
import { dialogOverlayStyle } from '@/styles/dialogStyle.css';
import { eventEmitter } from '@/utils/eventEmitter';
import FilterContainer from './FilterContainer';
import HoverCard from './HoverCard';
import {
  dialogContent,
  searchBar,
  searchListContainer,
} from './searchDialog.css';
import { SearchInfiniteScrollList } from './SearchInfiniteScrollList';
import SearchInput from './SearchInput';

export default function SearchDialog({
  isOpen,
  onOpenChange,
}: SearchDialogProps) {
  const { preFetchSearchPicks, reset } = useSearchPickStore();
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);

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
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOnClose} modal>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={dialogOverlayStyle} />
        <DialogPrimitive.Content
          className={dialogContent}
          onEscapeKeyDown={(e) => {
            if (isSelectMenuOpen) {
              e.preventDefault();
            }
          }}
        >
          <VisuallyHidden>
            <DialogPrimitive.Title>Pick Search</DialogPrimitive.Title>
            <DialogPrimitive.Description>
              Pick Search Dialog
            </DialogPrimitive.Description>
          </VisuallyHidden>
          <div className={searchBar}>
            <SearchInput />
          </div>
          <FilterContainer setIsSelectMenuOpen={setIsSelectMenuOpen} />
          <div className={searchListContainer}>
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
