import { useSearchPickStore } from '@/stores/searchPickStore';
import {
  contentScrollableSectionStyle,
  drawerContentInnerStyle,
  drawerHandleStyle,
  drawerOverlayStyle,
} from '@/styles/drawerStyle.css';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Drawer } from 'vaul';
import SearchInput from '../Search2/SearchInput';
import { MobileSearchInfiniteScrollList } from './MobileSearchInfiniteScrollList';
import { contentStyle } from './searchDrawer.css';

export function SearchDrawer({ isOpen, onOpenChange }: SearchDrawerProps) {
  const { reset } = useSearchPickStore();

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset();
        }

        onOpenChange(open);
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className={drawerOverlayStyle} />
        <Drawer.Content className={contentStyle}>
          <div className={drawerContentInnerStyle}>
            <div className={contentScrollableSectionStyle}>
              <div aria-hidden className={drawerHandleStyle} />
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
