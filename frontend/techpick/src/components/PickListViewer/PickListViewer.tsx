import type { PropsWithChildren, ReactNode } from 'react';
import { PickCard } from './PickCard';
import { PickCardListLayout } from './PickCardListLayout';
import { PickListItem } from './PickListItem';
import { PickListItemLayout } from './PickListItemLayout';
import type { PickInfoType, PickRenderModeType } from '@/types';

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
  viewType?: PickRenderModeType;
}

const NORMAL_PICK_LIST_VIEW_TEMPLATES: Record<
  PickRenderModeType,
  ViewTemplateValueType
> = {
  card: {
    PickViewItemListLayoutComponent: PickCardListLayout,
    PickViewItemComponent: PickCard,
  },
  list: {
    PickViewItemListLayoutComponent: PickListItemLayout,
    PickViewItemComponent: PickListItem,
  },
};

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
