import { components } from '@/schema';
import { ConcreteType } from './ConcreteType';

export type GetPickByUrlResponseType =
  | {
      exist: true;
      pick: ConcreteType<
        components['schemas']['baguni.api.application.pick.dto.PickApiResponse$Pick']
      >;
    }
  | {
      exist: false;
      pick: null;
    };
