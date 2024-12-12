package baguni.api.domain.ranking.dto;

import java.util.List;

import baguni.core.dto.UrlWithCount;

public record RankingResult(
	List<UrlWithCount> dailyUrlViewRanking,
	List<UrlWithCount> weeklyUrlViewRanking,
	List<UrlWithCount> monthlyUrlPickRanking
) {
}
