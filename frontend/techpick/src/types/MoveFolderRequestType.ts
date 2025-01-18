import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type MoveFolderRequestType = ConcreteType<
  components['schemas']['baguni.api.application.folder.dto.FolderApiRequest$Move']
>;
