package baguni.api.service.ranking.service;

import static org.mockito.BDDMockito.*;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import baguni.common.dto.UrlWithCount;

@DisplayName("랭킹 서비스 - 단위 테스트")
@ExtendWith(MockitoExtension.class)
class RankingServiceUnitTest {

	@Mock
	private RankingApi rankingApi;

	@InjectMocks
	private RankingService rankingService;

	@Test
	@DisplayName("랭킹 데이터 조회")
	void get_ranking() {
		// given
		LocalDate currentDay = LocalDate.now();
		LocalDate before1Day = currentDay.minusDays(1);
		LocalDate before7Days = currentDay.minusDays(7);
		LocalDate before30Days = currentDay.minusDays(30);

		List<UrlWithCount> dailyViewRanking = List.of(
			new UrlWithCount("http://example.com/1", 100L),
			new UrlWithCount("http://example.com/2", 90L)
		);

		List<UrlWithCount> past7DaysViewRanking = List.of(
			new UrlWithCount("http://example.com/3", 300L),
			new UrlWithCount("http://example.com/4", 250L)
		);

		List<UrlWithCount> past30DaysPickRanking = List.of(
			new UrlWithCount("http://example.com/5", 50L),
			new UrlWithCount("http://example.com/6", 45L)
		);

		given(rankingApi.getUrlRankingByViewCount(currentDay, currentDay, 10)).willReturn(ResponseEntity.ok(dailyViewRanking));
		given(rankingApi.getUrlRankingByViewCount(before7Days, before1Day, 10)).willReturn(ResponseEntity.ok(past7DaysViewRanking));
		given(rankingApi.getUrlRankingByPickedCount(before30Days, currentDay, 10)).willReturn(ResponseEntity.ok(past30DaysPickRanking));

		// when
		rankingService.getUrlRanking(10);

		// then
		then(rankingApi).should(times(1)).getUrlRankingByViewCount(currentDay, currentDay, 10);
		then(rankingApi).should(times(1)).getUrlRankingByViewCount(before7Days, before1Day, 10);
		then(rankingApi).should(times(1)).getUrlRankingByPickedCount(before30Days, currentDay, 10);
	}
}