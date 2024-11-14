import type { Concrete } from '@/types/util.type';
import type { components } from '@/schema';

export type GetPickResponseType = Concrete<
  components['schemas']['techpick.api.application.pick.dto.PickApiResponse$Pick']
>;
export type UpdatePickRequestType = Concrete<
  components['schemas']['techpick.api.application.pick.dto.PickApiRequest$Update']
>;
