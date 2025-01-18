import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type GetMyShareFolderResponseType = ConcreteType<
  components['schemas']['baguni.api.application.sharedFolder.dto.SharedFolderApiResponse$ReadFolderPartial']
>;
