import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type UpdateTagResponseType = ConcreteType<
  components['schemas']['baguni.api.application.tag.dto.TagApiResponse$Create']
>;
