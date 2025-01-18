import type { components } from '@/schema';

export type FolderClassificationType = NonNullable<
  components['schemas']['baguni.api.application.folder.dto.FolderApiResponse']['folderType']
>;
