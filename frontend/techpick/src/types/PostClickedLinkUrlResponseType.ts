import type { Concrete } from './util.type';
import type { components } from '@/schema';

export type PostClickedLinkUrlResponseType = Concrete<
  components['schemas']['techpick.api.application.link.dto.LinkApiResponse']
>;
