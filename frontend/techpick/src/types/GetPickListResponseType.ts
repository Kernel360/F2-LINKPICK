import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type GetPickListResponseType = {
  content: ConcreteType<
    components['schemas']['baguni.api.application.pick.dto.PickApiResponse$Pick']
  >[];
  lastCursor: number;
  size: number;
  hasNext: boolean;
};
