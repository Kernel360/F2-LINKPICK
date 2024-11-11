import type { PropsWithChildren, ReactNode } from 'react';
import { PickCard } from './PickCard';
import { PickCardListLayout } from './PickCardListLayout';
import type { PickInfoType } from '@/types';

export function PickListViewer({
  pickList,
  viewType = 'card',
}: PickListViewerProps) {
  const { PickViewItemComponent, PickViewItemListLayoutComponent } =
    NORMAL_PICK_LIST_VIEW_TEMPLATES[viewType];

  return (
    <PickViewItemListLayoutComponent>
      {pickList.map((pickInfo) => (
        <PickViewItemComponent key={pickInfo.id} pickInfo={pickInfo} />
      ))}
    </PickViewItemListLayoutComponent>
  );
}

interface PickListViewerProps {
  pickList: PickInfoType[];
  viewType?: ViewTemplateType;
}

const NORMAL_PICK_LIST_VIEW_TEMPLATES: Record<
  ViewTemplateType,
  ViewTemplateValueType
> = {
  card: {
    PickViewItemListLayoutComponent: PickCardListLayout,
    PickViewItemComponent: PickCard,
  },
};

/**
 * @description ViewTemplateType은 pickInfo를 어떤 UI로 보여줄지 나타냅니다. ex) card, list
 */
type ViewTemplateType = 'card';

interface ViewTemplateValueType {
  PickViewItemListLayoutComponent: (
    props: PickViewItemListLayoutComponentProps
  ) => ReactNode;
  PickViewItemComponent: (props: PickViewItemComponentProps) => ReactNode;
}

export type PickViewItemListLayoutComponentProps<ExtraProps = unknown> =
  PropsWithChildren<ExtraProps>;

export type PickViewItemComponentProps<ExtraProps = unknown> = {
  pickInfo: PickInfoType;
} & ExtraProps;

export type PickViewDnDItemComponentProps = PickViewItemComponentProps;
