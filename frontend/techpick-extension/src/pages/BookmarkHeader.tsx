import { BookMarked } from 'lucide-react';
import { colorVars } from 'techpick-shared';
import { Text } from '@/libs/@components';
import { ToggleThemeButton } from '@/components';
import { BookmarkHeaderLayout, logoSectionLayout } from './BookmarkHeader.css';

export function BookmarkHeader() {
  return (
    <div className={BookmarkHeaderLayout}>
      <div className={logoSectionLayout}>
        <BookMarked size={20} color={colorVars.color.font} />
        <Text size="2xl" asChild>
          <h1>PICK</h1>
        </Text>
      </div>
      <ToggleThemeButton />
    </div>
  );
}
