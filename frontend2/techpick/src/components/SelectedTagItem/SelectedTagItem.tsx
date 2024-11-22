import { CSSProperties } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { numberToRandomColor } from '@/utils';
import { SelectedTagContent } from './SelectedTagContent';
import { SelectedTagLayout } from './SelectedTagLayout';
import { TagType } from '@/types';

export function SelectedTagItem({ tag, children }: SelectedTagItemProps) {
  const { isDarkMode } = useThemeStore();
  const backgroundColor = numberToRandomColor(
    tag.colorNumber,
    isDarkMode ? 'dark' : 'light'
  );
  const style: CSSProperties = { backgroundColor };

  return (
    <SelectedTagLayout style={style}>
      <SelectedTagContent>{tag.name}</SelectedTagContent>
      {children}
    </SelectedTagLayout>
  );
}

interface SelectedTagItemProps {
  tag: TagType;
  children?: React.ReactNode;
}
