import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type GetTagListResponseType = ConcreteType<
  components['schemas']['baguni.api.application.tag.dto.TagApiResponse$Read']
>[];
