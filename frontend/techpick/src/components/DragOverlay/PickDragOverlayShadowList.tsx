import { stackedItem } from './pickDragOverlayShadowList.css';

export function PickDragOverlayShadowList({
  count,
}: PickDragOverlayShadowListProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={stackedItem}
          style={{
            transform: `translate(${(index + 1) * 4}px, ${(index + 1) * 4}px)`,
            opacity: 0.8,
            zIndex: -index - 1,
          }}
        />
      ))}
    </>
  );
}

interface PickDragOverlayShadowListProps {
  count: number;
}
