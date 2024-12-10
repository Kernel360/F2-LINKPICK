import { Concrete } from './util.type';
import { components } from '@/schema';

export type RecommendPickType = Concrete<
  components['schemas']['techpick.api.application.ranking.dto.LinkInfoWithCount']
>;
