import type { ConcreteType } from './ConcreteType';
import type { components } from '@/schema';

export type TagType = ConcreteType<
  components['schemas']['baguni.api.application.tag.dto.TagApiResponse$Read']
>;
