import { ReactElement } from 'react';
import {
  Pick,
  UiProps,
} from '@/components/PickListViewerPanel/types/common.type';
import {
  ChipItem,
  ChipItemList,
} from '@/components/PickListViewerPanel/ui/SelectedTagItem';
import { recordLayout } from './SimpleRecord.css';

export interface SimpleRecordProps extends UiProps<Pick> {}

export function SimpleRecord({
  uiData: pick,
}: SimpleRecordProps): ReactElement {
  return (
    <div className={recordLayout}>
      {pick.title}
      <ChipItemList>
        {pick.tagList.map((tag, idx) => (
          <ChipItem backgroundColor="#d17699" label={tag.tagName} key={idx} />
        ))}
      </ChipItemList>
    </div>
  );
}
