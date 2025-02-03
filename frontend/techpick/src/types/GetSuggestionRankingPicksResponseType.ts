import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export interface GetSuggestionRankingPicksResponseType {
  dailyViewRanking: ConcreteType<
    components['schemas']['baguni.api.application.suggestion.dto.LinkInfoWithCount']
  >[];
  weeklyViewRanking: ConcreteType<
    components['schemas']['baguni.api.application.suggestion.dto.LinkInfoWithCount']
  >[];
  monthlyPickRanking: ConcreteType<
    components['schemas']['baguni.api.application.suggestion.dto.LinkInfoWithCount']
  >[];
}
