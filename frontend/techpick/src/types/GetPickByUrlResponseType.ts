import type { Concrete } from './util.type';
import type { components } from '@/schema';

export type GetPickByUrlResponseType =
  | {
      exist: true;
      pick: Concrete<
        components['schemas']['baguni.api.application.pick.dto.PickApiResponse$Pick']
      >;
    }
  | {
      exist: false;
      pick: null;
    };
