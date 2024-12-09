package techpick.api.application.ranking.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
import techpick.api.application.ranking.dto.LinkInfoWithViewCount;
import techpick.api.application.ranking.dto.RankingApiMapper;
import techpick.api.domain.link.exception.ApiLinkException;
import techpick.api.domain.link.service.LinkService;
import techpick.api.infrastructure.ranking.RankingApi;
import techpick.api.application.ranking.dto.RankingByViewCount;
import techpick.core.dto.UrlWithCount;

/**
 * techpick-ranking 서버로 부터 데이터를 받아와 뿌려준다.
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/suggestion")
@Tag(name = "추천/소개 API", description = "링크, 픽 등에 대한 소개")
public class RankingApiController {

	private final RankingApi rankingApi;
	private final RankingApiMapper rankingApiMapper;
	private final LinkService linkService;

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
	public ResponseEntity<RankingByViewCount> getSuggestionByViewCount(
	) {
		Integer LIMIT = 10;
		var currentDay = LocalDate.now();
		var before1Day = currentDay.minusDays(1);
		var before7Days = currentDay.minusDays(7);
		var before30Days = currentDay.minusDays(30);

		var dailyViewRanking = // 오늘 + 어제
			mapToLinkInfoRanking(rankingApi.getUrlRankingByViewCount(before1Day, currentDay, LIMIT).getBody());

		var past7DaysViewRanking = // 일주일 전 ~ 어제
			mapToLinkInfoRanking(rankingApi.getUrlRankingByViewCount(before7Days, before1Day, LIMIT).getBody());

		var past30DaysPickRanking = // 한달 전 ~ 어제
			mapToLinkInfoRanking(
				rankingApi.getUrlRankingByPickedCount(before30Days, before1Day, LIMIT).getBody());

		var response = new RankingByViewCount(dailyViewRanking, past7DaysViewRanking, past30DaysPickRanking);
		return ResponseEntity.ok(response);
	}

	private List<LinkInfoWithViewCount> mapToLinkInfoRanking(List<UrlWithCount> urlWithCountList) {
		if (Objects.isNull(urlWithCountList)) {
			return List.of(/* empty list */);
		}
		var result = new ArrayList<LinkInfoWithViewCount>();
		for (UrlWithCount urlWithCount : urlWithCountList) {
			try {
				var linkInfo = linkService.getLinkInfo(urlWithCount.url());
				var rankingInfo = rankingApiMapper.toRankingWithLinkInfo(urlWithCount, linkInfo);
				result.add(rankingInfo);
			} catch (ApiLinkException exception) {
				log.error("[랭킹 획득 - 서버에 저장되지 않은 링크가 랭킹에 포함되어 있습니다! ={}", urlWithCount.url(), exception);
			}
		}
		return result;
	}
}
