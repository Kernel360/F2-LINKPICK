import { OPEN_SEARCH_DIALOG_EVENT } from '@/constants/openSearchDialogEvent';
import { useSearchPickStore } from '@/stores/searchPickStore';
import { dialogOverlayStyle } from '@/styles/dialogStyle.css';
import { eventEmitter } from '@/utils/eventEmitter';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useEffect, useState } from 'react';
import FilterContainer from './FilterContainer';
import HoverCard from './HoverCard';
import { SearchInfiniteScrollList } from './SearchInfiniteScrollList';
import SearchInput from './SearchInput';
import { dialogContent, searchListContainer } from './searchDialog.css';

export default function SearchDialog({
  isOpen,
  onOpenChange,
}: SearchDialogProps) {
  const { reset } = useSearchPickStore();
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);

  /**
   * @description 이벤트를 구독하고, emit으로 발생시킨 이벤트를 받으면 상태를 변경합니다.
   */

  useEffect(() => {
    eventEmitter.on(OPEN_SEARCH_DIALOG_EVENT, onOpenChange);

    return () => {
      eventEmitter.off(OPEN_SEARCH_DIALOG_EVENT, onOpenChange);
    };
  }, [onOpenChange]);

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
          <SearchInput />
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
