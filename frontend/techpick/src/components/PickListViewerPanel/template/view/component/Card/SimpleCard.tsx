import { ReactElement } from 'react';
import { UiProps } from '@/components/PickListViewerPanel/types/common.type';
import { cardLayout } from './SimpleCard.css';
import { ListProps } from '../../ViewTemplate';

export function SimpleCard(props: UiProps<ListProps>): ReactElement {
  console.log('props', props);

  return <div className={cardLayout}>{}</div>;
}
