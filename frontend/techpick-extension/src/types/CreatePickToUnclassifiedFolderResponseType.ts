import { components } from '@/schema';
import { ConcreteType } from './ConcreteType';

export type CreatePickToUnclassifiedFolderResponseType = ConcreteType<
  Omit<
    components['schemas']['baguni.api.application.pick.dto.PickApiResponse$Extension'],
    'linkInfo'
  >
>;
