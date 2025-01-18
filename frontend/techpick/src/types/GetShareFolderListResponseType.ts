import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type GetShareFolderListResponseType = ConcreteType<
  components['schemas']['baguni.api.application.sharedFolder.dto.SharedFolderApiResponse$ReadFolderFull']
>;
