import { components } from '@/schema';
import { ConcreteType } from './ConcreteType';

export type GetBasicFolderListType = ConcreteType<
  components['schemas']['baguni.api.application.folder.dto.FolderApiResponse']
>[];
