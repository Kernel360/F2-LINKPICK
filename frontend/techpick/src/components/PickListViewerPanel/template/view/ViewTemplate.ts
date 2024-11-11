import type { ReactNode } from 'react';
import { ListBulletIcon, ViewGridIcon } from '@radix-ui/react-icons';
import { SimpleCard } from './component/Card/SimpleCard';
import { SimpleRecord } from './component/Record/SimpleRecord';
import { gridLayout } from './layout/GridLayout.css';
import { listLayout } from './layout/ListLayout.css';
import { UiIcon, UiLabel, UiListComponent } from '../../types/common.type';

export interface ListProps {
  pickId: number;
  children: ReactNode;
}

// 여기
export type ViewTemplate = UiIcon & UiLabel & UiListComponent<ListProps>;

// ViewTemplateType을 가져간다.
export type ViewTemplateType = 'GRID' | 'LIST';

/**
 * @description
 *  픽을 렌더링할 방식을 정의합니다.
 */
export const VIEW_TEMPLATES: Record<ViewTemplateType, ViewTemplate> = {
  GRID: {
    label: '갤러리',
    description: '픽 내용을 상세하게 볼 수 있습니다.',
    icon: ViewGridIcon,
    listLayoutStyle: gridLayout,
    renderComponent: SimpleCard,
  },
  LIST: {
    label: '리스트',
    description: '간략한 요약으로 픽들을 모아볼 수 있습니다.',
    icon: ListBulletIcon,
    listLayoutStyle: listLayout,
    renderComponent: SimpleRecord,
  },
} as const;
