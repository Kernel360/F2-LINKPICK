import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type GetBasicFolderListType = ConcreteType<
  components['schemas']['baguni.api.application.folder.dto.FolderApiResponse']
>[];
