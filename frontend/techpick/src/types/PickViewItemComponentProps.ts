import type { PickInfoType } from './PickInfoType';

export type PickViewItemComponentProps<ExtraProps = unknown> = {
  pickInfo: PickInfoType;
} & ExtraProps;
