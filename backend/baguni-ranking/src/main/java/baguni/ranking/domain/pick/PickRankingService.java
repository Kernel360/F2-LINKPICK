package baguni.ranking.domain.pick;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.common.annotation.MeasureTime;
import baguni.common.dto.UrlWithCount;
import baguni.common.lib.cache.CacheType;
import baguni.ranking.infra.pick.LinkPickedCountRepository;
import baguni.ranking.infra.pick.LinkViewCountRepository;
import baguni.common.util.MapUtil;
import baguni.ranking.infra.pick.UrlCount;

@Slf4j
@Service
@RequiredArgsConstructor
public class PickRankingService {

	private final LinkViewCountRepository linkViewCountRepository;
	private final LinkPickedCountRepository linkPickedCountRepository;

	/**
	 * Spring Data Mongo 는 Between 쿼리가 GT / LT 입니다.
	 * 따라서 오늘 하루만 얻고 싶다면, 인자에 오늘을 넣어야 합니다.
	 * ex. getDailyLinksOrderByViewCount( today , today );
	 *
	 * @author minkyeu kim
	 *     ---------------------------------------------
	 *     지금은 단순히 A~B 기간을 조회 후 연산을 해서 랭크표를 반환한다.
	 *     1달 이상은 미리 집계해서 Monthy 테이블에 넣을 거나,
	 *     저장 방식을 다르게 하도록 고민해야 함.
	 *     ---------------------------------------------
	 *     Ex. 일별 집계, 월별 집계, 연별 집계 테이블을 나눠서 미리 연산.
	 *         API 호출은 일별, 월별, 연별을 나눠서 호출하도록 변경하면 해결 가능.
	 *
	 *    @author sangwon
	 * 		 		1시간마다 캐싱하도록 처리
	 * 		 	    CacheType Enum 참고
	 */
	@MeasureTime
	@Cacheable(cacheNames = CacheType.CACHE_NAME.DAILY_LINK_RANK)
	public List<UrlWithCount> getDailyLinksOrderByViewCount(LocalDate today, int limit) {
		// today : 12/19 (Between = GT / LT)
		// 12/18 < ? < 12/20 로 조회해야 오늘 데이터를 받아올 수 있습니다.
		var pickViewCountList = linkViewCountRepository.findByDateBetween(
			today.minusDays(1), today.plusDays(1)
		);
		return MapUtil.sortByValue(toUrlCountPair(pickViewCountList), MapUtil.SortBy.DESCENDING)
					  .entrySet().stream()
					  .map(v -> new UrlWithCount(v.getKey(), v.getValue()))
					  .limit(limit)
					  .toList();
	}

	/**
	 * @author sangwon
	 * 	 		24시간마다 캐싱하도록 처리
	 * 	 	    CacheType Enum 참고
	 */
	@MeasureTime
	@Cacheable(cacheNames = CacheType.CACHE_NAME.WEEKLY_LINK_RANK)
	public List<UrlWithCount> getWeeklyLinksOrderByViewCount(LocalDate startDate, LocalDate endDate, int limit) {
		var pickViewCountList = linkViewCountRepository.findByDateBetween(
			startDate.minusDays(1), endDate.plusDays(1)
		);
		return MapUtil.sortByValue(toUrlCountPair(pickViewCountList), MapUtil.SortBy.DESCENDING)
					  .entrySet().stream()
					  .map(v -> new UrlWithCount(v.getKey(), v.getValue()))
					  .limit(limit)
					  .toList();
	}

	/**
	 * @author minkyeu kim
	 *       링크가 픽된 횟수에 대한 순위표 반환
	 *
	 * @author sangwon
	 * 		3시간마다 캐싱하도록 처리
	 * 	    CacheType Enum 참고
	 * 	    https://techblog.uplus.co.kr/%EB%A1%9C%EC%BB%AC-%EC%BA%90%EC%8B%9C-%EC%84%A0%ED%83%9D%ED%95%98%EA%B8%B0
	 * 	    -e394202d5c87
	 */
	@MeasureTime
	@Cacheable(cacheNames = CacheType.CACHE_NAME.MONTHLY_PICK_RANK)
	public List<UrlWithCount> getLinksOrderByPickedCount(LocalDate startDate, LocalDate endDate, int limit) {
		var pickCreateCountList = linkPickedCountRepository.findByDateBetween(
			startDate.minusDays(1), endDate.plusDays(1)
		);
		return MapUtil.sortByValue(toUrlCountPair(pickCreateCountList), MapUtil.SortBy.DESCENDING)
					  .entrySet().stream()
					  .map(v -> new UrlWithCount(v.getKey(), v.getValue()))
					  .limit(limit)
					  .toList();
	}

	private <T extends UrlCount> Map<String, Long> toUrlCountPair(List<T> list) {
		Map<String, Long> tmp = new HashMap<>();
		for (var pickView : list) {
			var url = pickView.getUrl();
			Long prev = 0L;
			if (tmp.containsKey(url)) {
				prev = tmp.get(url);
			}
			var sum = prev + pickView.getCount();
			tmp.put(url, sum);
		}
		return tmp;
	}
}
