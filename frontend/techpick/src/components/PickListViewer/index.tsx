import type { PropsWithChildren, ReactNode } from 'react';
import { UNKNOWN_FOLDER_ID } from '@/constants';
import { PickCard } from './PickCard';
import { PickCardListLayout } from './PickCardListLayout';
import { PickDnDCard } from './PickDnDCard';
import { PickDnDCardListLayout } from './PickDnDCardListLayout';
import type { PickInfoType } from '@/types';

export function PickListViewer({
  pickList,
  viewType = 'card',
  dnd: isDnD = false,
  folderId,
}: PickListViewerProps) {
  const PICK_LIST_VIEW_TEMPLATES = isDnD
    ? DND_PICK_LIST_VIEW_TEMPLATES
    : NORMAL_PICK_LIST_VIEW_TEMPLATES;

  const { PickViewItemComponent, PickViewItemListLayoutComponent } =
    PICK_LIST_VIEW_TEMPLATES[viewType];

  return (
    <PickViewItemListLayoutComponent
      folderId={folderId ? folderId : UNKNOWN_FOLDER_ID}
    >
      {pickList.map((pickInfo) => (
        <PickViewItemComponent key={pickInfo.id} pickInfo={pickInfo} />
      ))}
    </PickViewItemListLayoutComponent>
  );
}

type PickListViewerProps =
  | {
      pickList: PickInfoType[];
      dnd?: false;
      folderId?: never;
      viewType?: ViewTemplateType;
    }
  | {
      pickList: PickInfoType[];
      dnd: true;
      folderId: number;
      viewType?: DnDViewTemplateType;
    };

const NORMAL_PICK_LIST_VIEW_TEMPLATES: Record<
  ViewTemplateType,
  ViewTemplateValueType
> = {
  card: {
    PickViewItemListLayoutComponent: PickCardListLayout,
    PickViewItemComponent: PickCard,
  },
};

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
 * @description ViewTemplateType은 pickInfo를 어떤 UI로 보여줄지 나타냅니다. ex) card, list
 */
type ViewTemplateType = 'card';

/**
 * @description DnDViewTemplateType은 Drag&Drop이 가능한 UI 중 무엇을 보여줄지 나타냅니다. ex) card, list
 */
type DnDViewTemplateType = 'card';

interface ViewTemplateValueType {
  PickViewItemListLayoutComponent: (
    props: PickViewItemListLayoutComponentProps
  ) => ReactNode;
  PickViewItemComponent: (props: PickViewItemComponentProps) => ReactNode;
}

interface DnDViewTemplateValueType {
  PickViewItemListLayoutComponent: (
    props: PickViewDnDItemListLayoutComponentProps
  ) => ReactNode;
  PickViewItemComponent: (props: PickViewDnDItemComponentProps) => ReactNode;
}

export type PickViewItemListLayoutComponentProps<ExtraProps = unknown> =
  PropsWithChildren<ExtraProps>;

export type PickViewItemComponentProps<ExtraProps = unknown> = {
  pickInfo: PickInfoType;
} & ExtraProps;

export type PickViewDnDItemListLayoutComponentProps =
  PickViewItemListLayoutComponentProps<{ folderId: number }>;

export type PickViewDnDItemComponentProps = PickViewItemComponentProps;
