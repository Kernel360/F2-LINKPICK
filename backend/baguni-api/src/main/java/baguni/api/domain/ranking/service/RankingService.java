package baguni.api.domain.ranking.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import baguni.api.domain.ranking.dto.RankingResult;
import baguni.api.infrastructure.ranking.RankingApi;

@Service
@RequiredArgsConstructor
public class RankingService {

	private final RankingApi rankingApi;

	public RankingResult getUrlRanking(int limit) {
		var currentDay = LocalDate.now();
		var before1Day = currentDay.minusDays(1);
		var before7Days = currentDay.minusDays(7);
		var before30Days = currentDay.minusDays(30);

		var dailyViewRanking = // 오늘
			rankingApi.getUrlRankingByViewCount(currentDay, currentDay, limit).getBody();

		var past7DaysViewRanking = // 일주일 전 ~ 어제
			rankingApi.getUrlRankingByViewCount(before7Days, before1Day, limit).getBody();

		/**
		 * @author sangwon
		 * 어제가 아닌 오늘로 변경한 이유는 가장 많이 저장한 픽을 즉시 확인하기 위함.
		 * 집계 테이블이 추가되고, 캐싱 처리한다면 오늘 데이터는 즉시 보여줄 필요가 없기 때문에 어제부터로 하는 것은 어떨지? - psh
		 */
		var past30DaysPickRanking = // 한달 전 ~ 오늘
			rankingApi.getUrlRankingByPickedCount(before30Days, currentDay, limit).getBody();

		return new RankingResult(dailyViewRanking, past7DaysViewRanking, past30DaysPickRanking);
	}
}
