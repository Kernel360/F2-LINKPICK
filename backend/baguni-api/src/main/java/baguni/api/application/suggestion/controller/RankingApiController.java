package baguni.api.application.suggestion.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import baguni.domain.infrastructure.link.dto.LinkInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.api.application.suggestion.dto.RankingResponse;
import baguni.api.service.link.service.LinkService;
import baguni.api.service.ranking.service.RankingService;
import baguni.common.dto.UrlWithCount;

/**
 * baguni-ranking 서버로 부터 데이터를 받아와 뿌려준다.
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/suggestion")
@Tag(name = "추천/소개 API", description = "링크, 픽 등에 대한 소개")
public class RankingApiController {

	private final LinkService linkService;
	private final RankingService rankingService;

	/**
	 * 주별, 일별 조회 수를 기반 으로 추천 한다.
	 * - 조회수 기반 집계
	 */
	@GetMapping("/ranking")
	@Operation(
		summary = "인기 픽 Top 10",
		description = """
				각 주제 별로 인기 조회수 글을 10개씩 획득 합니다.
				1. 오늘 하루에 대한 실시간 링크 조회수 랭킹
				2. 지난 7일 동안 링크 조회수 랭킹
				3. 지난 한달간 픽된 (=북마크된) 링크 랭킹
			"""
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공")
	})
	public ResponseEntity<RankingResponse> getSuggestionByViewCount(
	) {
		int LIMIT = 10;
		var result = rankingService.getUrlRanking(LIMIT);
		var response = new RankingResponse(
			rankingDataToLinkInfo(result.dailyUrlViewRanking()),
			rankingDataToLinkInfo(result.weeklyUrlViewRanking()),
			rankingDataToLinkInfo(result.monthlyUrlPickRanking())
		);
		return ResponseEntity.ok(response);
	}

	private List<LinkInfo> rankingDataToLinkInfo(List<UrlWithCount> urlRanking) {
		var urlList = urlRanking.stream().map(UrlWithCount::url).toList();
		return linkService.getLinkInfoList(urlList);
	}
}
