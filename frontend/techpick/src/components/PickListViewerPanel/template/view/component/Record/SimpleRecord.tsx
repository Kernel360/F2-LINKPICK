import { ReactElement } from 'react';
import { UiProps } from '@/components/PickListViewerPanel/types/common.type';
import { ChipItemList } from '@/components/PickListViewerPanel/ui/SelectedTagItem';
import { recordLayout } from './SimpleRecord.css';
import { ListProps } from '../../ViewTemplate';

export function SimpleRecord(props: UiProps<ListProps>): ReactElement {
  console.log(props);

  return (
    <div className={recordLayout}>
      <ChipItemList></ChipItemList>
    </div>
  );
}
