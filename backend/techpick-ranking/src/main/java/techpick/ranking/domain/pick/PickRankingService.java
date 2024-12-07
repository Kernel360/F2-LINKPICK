package techpick.ranking.domain.pick;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.core.annotation.TechpickAnnotation;
import techpick.ranking.exeption.ApiRankException;
import techpick.ranking.infra.PickViewCount;
import techpick.ranking.infra.PickViewCountRepository;
import techpick.core.util.MapUtil;

@Slf4j
@Service
@RequiredArgsConstructor
public class PickRankingService {

	private final PickViewCountRepository pickViewCountRepository;

	/**
	 * @author minkyeu kim
	 *     ---------------------------------------------
	 *     지금은 단순히 A~B 기간을 조회 후 연산을 해서 랭크표를 반환한다.
	 *     1달 이상은 미리 집계해서 Monthy 테이블에 넣을 거나,
	 *     저장 방식을 다르게 하도록 고민해야 함.
	 *     ---------------------------------------------
	 *     Ex. 일별 집계, 월별 집계, 연별 집계 테이블을 나눠서 미리 연산.
	 *         API 호출은 일별, 월별, 연별을 나눠서 호출하도록 변경하면 해결 가능.
	 */
	@TechpickAnnotation.MeasureTime
	public List<PickViewRankingResult> getLinksOrderByViewCount(LocalDate startDate, LocalDate endDate, int limit) {
		if (startDate == null || endDate == null)
			throw ApiRankException.INVALID_DATE_RANGE();
		if (startDate.isAfter(endDate))
			throw ApiRankException.INVALID_DATE_RANGE();
		if (startDate.isAfter(LocalDate.now()))
			throw ApiRankException.INVALID_DATE_RANGE();

		var pickViewCountList = pickViewCountRepository.findByDateBetween(
			startDate.minusDays(1), endDate.plusDays(1)
		);
		return MapUtil.sortByValue(toUrlCountPair(pickViewCountList), MapUtil.SortBy.DESCENDING)
					  .entrySet().stream()
					  .map(v -> new PickViewRankingResult(v.getKey(), v.getValue()))
					  .toList();
	}

	private Map<String, Long> toUrlCountPair(List<PickViewCount> list) {
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
