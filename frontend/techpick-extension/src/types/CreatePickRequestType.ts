import { components } from '@/schema';
import { ConcreteType } from './ConcreteType';

export type CreatePickRequestType = ConcreteType<
  components['schemas']['baguni.api.application.pick.dto.PickApiRequest$Create']
>;
