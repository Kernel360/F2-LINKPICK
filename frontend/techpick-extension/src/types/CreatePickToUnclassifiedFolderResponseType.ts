import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type CreatePickToUnclassifiedFolderResponseType = ConcreteType<
  Omit<
    components['schemas']['baguni.api.application.pick.dto.PickApiResponse$Extension'],
    'linkInfo'
  >
>;
