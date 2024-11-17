import { Text } from '@/libs/@components';
import { ToggleThemeButton } from '@/components';
import { BookmarkHeaderLayout, logoSectionLayout } from './BookmarkHeader.css';
import techpickIconLink from '@/assets/pick32.png';
import { PUBLIC_DOMAIN } from '@/constants/publicDomain';

export function BookmarkHeader() {
  return (
    <div className={BookmarkHeaderLayout}>
      <a href={`${PUBLIC_DOMAIN}`} target="_blank">
        <div className={logoSectionLayout}>
          <img src={techpickIconLink} alt="techpick logo icon image" />

          <Text size="2xl" asChild>
            <h1>PICK</h1>
          </Text>
        </div>
      </a>
      <ToggleThemeButton />
    </div>
  );
}
