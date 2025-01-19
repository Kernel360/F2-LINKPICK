import type { FetchRequestType } from './FetchRequestType';
import type { PickRecordValueType } from './PickRecordValueType';

export interface PickRecordType {
  [folderId: string]: FetchRequestType<PickRecordValueType> | undefined;
}
