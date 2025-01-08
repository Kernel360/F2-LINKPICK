import { components } from '@/schema';
import { ConcreteType } from './ConcreteType';

export type UpdatePickFromExtensionResponseType = ConcreteType<
  Omit<
    components['schemas']['baguni.api.application.pick.dto.PickApiResponse$Pick'],
    'linkInfo'
  >
>;
