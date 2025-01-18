import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type UpdatePickFromExtensionResponseType = ConcreteType<
  Omit<
    components['schemas']['baguni.api.application.pick.dto.PickApiResponse$Pick'],
    'linkInfo'
  >
>;
