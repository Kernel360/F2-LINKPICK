import { ReactElement } from 'react';
import {
  Pick,
  UiProps,
} from '@/components/PickListViewerPanel/types/common.type';
import { ChipItemList } from '@/components/PickListViewerPanel/ui/SelectedTagItem';
import { cardLayout } from './SimpleCard.css';

interface CardProps extends UiProps<Pick> {}

export function SimpleCard({ uiData: pick }: CardProps): ReactElement {
  return (
    <div className={cardLayout}>
      {pick.title}
      <ChipItemList>
        {/*{pick.tagOrderList.map((tag, idx) => (*/}
        {/*  <ChipItem backgroundColor="#d17699" label={tag.tagName} key={idx} />*/}
        {/*))}*/}
      </ChipItemList>
    </div>
  );
}
