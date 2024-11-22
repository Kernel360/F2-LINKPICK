import { X } from 'lucide-react';
import { useTagStore } from '@/stores';
import { TagType } from '@/types';
import { DeselectTagButtonStyle } from './DeselectTagButton.css';

export function DeselectTagButton({
  tag,
  onClick = () => {},
}: DeselectTagButtonProps) {
  const { deselectTag } = useTagStore();

  return (
    <button
      type="button"
      className={DeselectTagButtonStyle}
      onClick={() => {
        deselectTag(tag.id);
        onClick();
      }}
    >
      <X size={8} />
    </button>
  );
}

interface DeselectTagButtonProps {
  tag: TagType;
  onClick?: () => void;
}
