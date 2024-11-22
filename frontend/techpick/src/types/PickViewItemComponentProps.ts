import { PickInfoType } from './pick.type';

export type PickViewItemComponentProps<ExtraProps = unknown> = {
  pickInfo: PickInfoType;
} & ExtraProps;
