package techpick.api.domain.ranking.dto;

import java.util.List;

import techpick.core.dto.UrlWithCount;

public record RankingResult(
	List<UrlWithCount> dailyUrlViewRanking,
	List<UrlWithCount> weeklyUrlViewRanking,
	List<UrlWithCount> monthlyUrlPickRanking
) {
}
