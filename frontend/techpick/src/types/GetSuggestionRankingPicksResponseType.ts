import type { components } from '@/schema';
import type { ConcreteType } from './ConcreteType';

export interface GetSuggestionRankingPicksResponseType {
  dailyViewRanking: ConcreteType<
    components['schemas']['baguni.api.application.ranking.dto.LinkInfoWithCount']
  >[];
  weeklyViewRanking: ConcreteType<
    components['schemas']['baguni.api.application.ranking.dto.LinkInfoWithCount']
  >[];
  monthlyPickRanking: ConcreteType<
    components['schemas']['baguni.api.application.ranking.dto.LinkInfoWithCount']
  >[];
}
