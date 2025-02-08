import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Drawer } from 'vaul';
import SearchInput from '../Search2/SearchInput';
import { MobileSearchInfiniteScrollList } from './MobileSearchInfiniteScrollList';
import {
  contentInnerStyle,
  contentScrollableSectionStyle,
  contentStyle,
  handleStyle,
  overlayStyle,
} from './searchDrawer.css';

export function SearchDrawer({ isOpen, onOpenChange }: SearchDrawerProps) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className={overlayStyle} />
        <Drawer.Content className={contentStyle}>
          <div className={contentInnerStyle}>
            <div className={contentScrollableSectionStyle}>
              <div aria-hidden className={handleStyle} />
              <VisuallyHidden.Root>
                <Drawer.Title>검색창</Drawer.Title>
                <Drawer.Description>원하는 걸 검색하세요.</Drawer.Description>
              </VisuallyHidden.Root>

              <SearchInput />
              <MobileSearchInfiniteScrollList />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

interface SearchDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
