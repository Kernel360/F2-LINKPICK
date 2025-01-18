import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type CreateTagResponseType = ConcreteType<
  components['schemas']['baguni.api.application.tag.dto.TagApiResponse$Create']
>;
