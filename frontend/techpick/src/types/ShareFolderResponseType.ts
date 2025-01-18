import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type ShareFolderResponseType = ConcreteType<
  components['schemas']['baguni.api.application.sharedFolder.dto.SharedFolderApiResponse$Create']
>;
