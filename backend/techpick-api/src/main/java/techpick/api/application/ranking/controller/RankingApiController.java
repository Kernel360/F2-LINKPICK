package techpick.api.application.ranking.controller;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.infrastructure.ranking.RankingRepository;
import techpick.api.application.ranking.dto.RankingByViewCount;

/**
 * techpick-ranking 서버로 부터 데이터를 받아와 뿌려준다.
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/suggestion")
@Tag(name = "추천/소개 API", description = "링크, 픽 등에 대한 소개")
public class RankingApiController {

	private final RankingRepository rankingRepository;

	/**
	 * 주별, 일별 조회 수를 기반 으로 추천 한다.
	 * - 조회수 기반 집계
	 */
	@GetMapping("/view")
	@Operation(summary = "기간 별 인기 링크 Top 10", description = "기간 별 인기 조회수 글을 10개씩 획득 합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공")
	})
	public ResponseEntity<RankingByViewCount> getSuggestionByViewCount(
	) {
		var LIMIT = 10;
		var currentDay = LocalDate.now();
		var before1Day = currentDay.minusDays(1);
		var before7Days = currentDay.minusDays(7);

		var dailyRanking = rankingRepository.getLinkRanking(currentDay, currentDay, LIMIT).getBody();
		var weeklyRanking = rankingRepository.getLinkRanking(before7Days, before1Day, LIMIT).getBody();
		var response = new RankingByViewCount(dailyRanking, weeklyRanking);
		return ResponseEntity.ok(response);
	}
}
