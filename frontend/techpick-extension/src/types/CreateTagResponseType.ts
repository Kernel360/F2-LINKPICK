import { components } from '@/schema';
import { ConcreteType } from './ConcreteType';

export type CreateTagResponseType = ConcreteType<
  components['schemas']['techpick.api.application.tag.dto.TagApiResponse$Create']
>;
