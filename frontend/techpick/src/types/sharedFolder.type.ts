import type { Concrete } from './util.type';
import type { components } from '@/schema';

export type ShareFolderRequestType = number;

export type ShareFolderResponseType = Concrete<
  components['schemas']['techpick.api.application.sharedFolder.dto.SharedFolderApiResponse$Create']
>;

export type ShareFolderReadFolderFullResponseType = Concrete<
  components['schemas']['techpick.api.application.sharedFolder.dto.SharedFolderApiResponse$ReadFolderFull']
>;

export type ShareFolderReadFolderPartialResponseType = Concrete<
  components['schemas']['techpick.api.application.sharedFolder.dto.SharedFolderApiResponse$ReadFolderPartial']
>;
