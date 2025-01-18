import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

interface ExistingPick {
  exist: true;
  pick: ConcreteType<
    components['schemas']['baguni.api.application.pick.dto.PickApiResponse$Pick']
  >;
}

interface NonExistingPick {
  exist: false;
  pick: null;
}

export type GetPickByUrlResponseType = ExistingPick | NonExistingPick;
