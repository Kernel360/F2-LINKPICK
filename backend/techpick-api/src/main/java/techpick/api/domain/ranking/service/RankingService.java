package techpick.api.domain.ranking.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.ranking.dto.RankingResult;
import techpick.api.infrastructure.ranking.RankingApi;

@Service
@RequiredArgsConstructor
public class RankingService {

	private final RankingApi rankingApi;

	public RankingResult getUrlRanking(int limit) {
		var currentDay = LocalDate.now();
		var before1Day = currentDay.minusDays(1);
		var before7Days = currentDay.minusDays(7);
		var before30Days = currentDay.minusDays(30);

		var dailyViewRanking = // 오늘 + 어제
			rankingApi.getUrlRankingByViewCount(before1Day, currentDay, limit).getBody();

		var past7DaysViewRanking = // 일주일 전 ~ 어제
			rankingApi.getUrlRankingByViewCount(before7Days, before1Day, limit).getBody();

		var past30DaysPickRanking = // 한달 전 ~ 오늘
			rankingApi.getUrlRankingByPickedCount(before30Days, currentDay, limit).getBody();

		return new RankingResult(dailyViewRanking, past7DaysViewRanking, past30DaysPickRanking);
	}
}
