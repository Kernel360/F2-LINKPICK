package baguni.ranking.application;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.ranking.domain.pick.PickRankingService;
import baguni.common.dto.UrlWithCount;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ranking")
@Tag(name = "Rank API", description = "랭킹 API")
public class RankingController {

	private final PickRankingService pickRankingService;

	/**
	 * 링크 조회수 기반 Top N{:limit}개 조회
	 * 조회수가 높은 순부터 N{:limit} 개를 반환합니다.
	 */
	@GetMapping("/link/view")
	public ResponseEntity<List<UrlWithCount>> getLinkViewRank(
		@Parameter(description = "범위 시작 날짜 (결과에 포함됩니다)", example = "2024-12-08")
		@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date_begin,
		@Parameter(description = "범위 종료 날짜 (결과에 포함됩니다)", example = "2024-12-10")
		@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date_end,
		@Parameter(description = "랭킹 개수, 명시 안할 경우 5개를 반환", example = "10")
		@RequestParam(required = false, defaultValue = "5") Integer limit
	) {
		int days = Period.between(date_begin, date_end).getDays();
		List<UrlWithCount> result;
		if (days == 0) {
			result = pickRankingService.getDailyLinksOrderByViewCount(date_begin, limit);
		} else {
			result = pickRankingService.getWeeklyLinksOrderByViewCount(date_begin, date_end, limit);
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 링크가 픽된 횟수 기반 Top N{:limit}개 조회
	 * 조회수가 높은 순부터 N{:limit} 개를 반환합니다.
	 */
	@GetMapping("/link/picked")
	public ResponseEntity<List<UrlWithCount>> getLinkPickedRank(
		@Parameter(description = "범위 시작 날짜 (결과에 포함됩니다)", example = "2024-12-08")
		@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date_begin,
		@Parameter(description = "범위 종료 날짜 (결과에 포함됩니다)", example = "2024-12-10")
		@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date_end,
		@Parameter(description = "랭킹 개수, 명시 안할 경우 5개를 반환", example = "10")
		@RequestParam(required = false, defaultValue = "5") Integer limit
	) {
		var result = pickRankingService.getLinksOrderByPickedCount(date_begin, date_end, limit);
		return ResponseEntity.ok(result);
	}
}
