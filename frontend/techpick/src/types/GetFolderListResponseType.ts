import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export interface GetFolderListResponseType
  extends Array<
    ConcreteType<
      components['schemas']['baguni.api.application.folder.dto.FolderApiResponse']
    >
  > {}
