package techpick.ranking.application;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import techpick.ranking.domain.pick.PickRankingService;
import techpick.core.dto.UrlWithCount;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ranking")
@Tag(name = "Rank API", description = "랭킹 API")
public class RankingController {

	private final PickRankingService pickRankingService;

	@GetMapping("/link/view")
	@Operation(summary = "링크 조회수 기반 Top N{:limit}개 조회", description = "조회수가 높은 순부터 N{:limit} 개를 반환합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회수 랭킹 획득 성공"),
		@ApiResponse(responseCode = "404", description = "유효하지 않는 날짜입니다.")
	})
	public ResponseEntity<List<UrlWithCount>> getLinkViewRank(
		@Parameter(description = "범위 시작 날짜 (결과에 포함됩니다)", example = "2024-12-08")
		@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date_begin,
		@Parameter(description = "범위 종료 날짜 (결과에 포함됩니다)", example = "2024-12-10")
		@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date_end,
		@Parameter(description = "랭킹 개수, 명시 안할 경우 5개를 반환", example = "10")
		@RequestParam(required = false, defaultValue = "5") Integer limit
	) {
		var result = pickRankingService.getLinksOrderByViewCount(date_begin, date_end, limit);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/link/picked")
	@Operation(summary = "링크가 픽된 횟수 기반 Top N{:limit}개 조회", description = "조회수가 높은 순부터 N{:limit} 개를 반환합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽된 횟수 기반 랭킹 획득 성공"),
		@ApiResponse(responseCode = "404", description = "유효하지 않는 날짜입니다.")
	})
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
