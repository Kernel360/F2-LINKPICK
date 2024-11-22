import { components } from '@/schema';
import { ConcreteType } from './ConcreteType';

export type GetBasicFolderListType = ConcreteType<
  components['schemas']['techpick.api.application.folder.dto.FolderApiResponse']
>[];
