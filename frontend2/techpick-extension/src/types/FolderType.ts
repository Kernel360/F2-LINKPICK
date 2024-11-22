import { components } from '@/schema';
import { ConcreteType } from './ConcreteType';

export type FolderType = ConcreteType<
  components['schemas']['techpick.api.application.folder.dto.FolderApiResponse']
>;
