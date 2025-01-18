import type { PickInfoType } from './PickInfoType';

export interface PickInfoRecordType {
  [pickId: string]: PickInfoType | null | undefined;
}
