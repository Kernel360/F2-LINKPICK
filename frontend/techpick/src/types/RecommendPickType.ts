import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export type RecommendPickType = ConcreteType<
  Omit<
    components['schemas']['baguni.api.application.suggestion.dto.LinkInfoWithCount'],
    'count'
  >
>;
