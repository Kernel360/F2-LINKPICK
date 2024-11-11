import { ReactElement } from 'react';
import { UiProps } from '@/components/PickListViewerPanel/types/common.type';
import { recordLayout } from './SimpleRecord.css';
import { ListProps } from '../../ViewTemplate';

export function SimpleRecord(props: UiProps<ListProps>): ReactElement {
  console.log(props);

  return <div className={recordLayout}></div>;
}
