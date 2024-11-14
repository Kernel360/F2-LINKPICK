import type { ReactNode } from 'react';
import { PickDnDCard } from './PickDnDCard';
import { PickDnDCardListLayout } from './PickDnDCardListLayout';
import type {
  PickViewItemComponentProps,
  PickViewItemListLayoutComponentProps,
} from './PickListViewer';
import type { PickInfoType } from '@/types';

export function DraggablePickListViewer({
  pickList,
  viewType = 'card',
  folderId,
}: PickListViewerProps) {
  const { PickViewItemComponent, PickViewItemListLayoutComponent } =
    DND_PICK_LIST_VIEW_TEMPLATES[viewType];

  return (
    <PickViewItemListLayoutComponent folderId={folderId}>
      {pickList.map((pickInfo) => (
        <PickViewItemComponent key={pickInfo.id} pickInfo={pickInfo} />
      ))}
    </PickViewItemListLayoutComponent>
  );
}

interface PickListViewerProps {
  pickList: PickInfoType[];
  folderId: number;
  viewType?: DnDViewTemplateType;
}

const DND_PICK_LIST_VIEW_TEMPLATES: Record<
  DnDViewTemplateType,
  DnDViewTemplateValueType
> = {
  card: {
    PickViewItemComponent: PickDnDCard,
    PickViewItemListLayoutComponent: PickDnDCardListLayout,
  },
};

/**
 * @description DnDViewTemplateType은 Drag&Drop이 가능한 UI 중 무엇을 보여줄지 나타냅니다. ex) card, list
 */
type DnDViewTemplateType = 'card';

interface DnDViewTemplateValueType {
  PickViewItemListLayoutComponent: (
    props: PickViewDnDItemListLayoutComponentProps
  ) => ReactNode;
  PickViewItemComponent: (props: PickViewDnDItemComponentProps) => ReactNode;
}

export type PickViewDnDItemListLayoutComponentProps =
  PickViewItemListLayoutComponentProps<{ folderId: number }>;

export type PickViewDnDItemComponentProps = PickViewItemComponentProps;
