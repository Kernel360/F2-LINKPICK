package baguni.api.application.ranking.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

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
import baguni.api.application.ranking.dto.LinkInfoWithCount;
import baguni.api.application.ranking.dto.RankingApiMapper;
import baguni.api.application.ranking.dto.RankingResponse;
import baguni.api.domain.link.exception.ApiLinkException;
import baguni.api.domain.link.service.LinkService;
import baguni.api.domain.ranking.service.RankingService;
import baguni.core.annotation.BaguniAnnotation;
import baguni.core.dto.UrlWithCount;

/**
 * baguni-ranking 서버로 부터 데이터를 받아와 뿌려준다.
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/suggestion")
@Tag(name = "추천/소개 API", description = "링크, 픽 등에 대한 소개")
public class RankingApiController {

	private final RankingApiMapper rankingApiMapper;
	private final LinkService linkService;
	private final RankingService rankingService;

	/**
	 * 주별, 일별 조회 수를 기반 으로 추천 한다.
	 * - 조회수 기반 집계
	 */
	@BaguniAnnotation.MeasureTime
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
			urlToLinkInfo(result.dailyUrlViewRanking()),
			urlToLinkInfo(result.weeklyUrlViewRanking()),
			urlToLinkInfo(result.monthlyUrlPickRanking())
		);
		return ResponseEntity.ok(response);
	}

	/**
	 * @author: minkyeu kim
	 * Url만 명시된 랭킹을 Og-Data가 포함된 랭킹 정보로 변환한다.
	 */
	private List<LinkInfoWithCount> urlToLinkInfo(List<UrlWithCount> urlRanking) {
		if (Objects.isNull(urlRanking)) {
			return List.of(/* empty list */);
		}
		var result = new ArrayList<LinkInfoWithCount>();
		for (UrlWithCount urlWithCount : urlRanking) {
			try {
				appendOgDataByUrl(urlWithCount).ifPresent(result::add);
			} catch (ApiLinkException exception) {
				log.error("[랭킹 획득 - 서버에 저장되지 않은 링크가 랭킹에 포함되어 있습니다 : {}", urlWithCount.url(), exception);
			}
		}
		return result;
	}

	/**
	 * OG 태그 제목이 없으면 프론트엔드에서 빈 제목이 보여진다.
	 * 프론트가 추천 리스트에서 제목이 없는 링크는 제외하면 되는데,
	 * 현재 프론트가 바빠 바로 작업할 수 없어서, 임시로 백엔드에서 처리하게 되었다.
	 *
	 * 그러나 링크 자체에 대한 랭킹 데이터는 OG 태그 제목 여부와 관계 없어야 한다.
	 * 따라서 이는 추후 프론트가 처리하도록 하는게 맞다.
	 */
	private Optional<LinkInfoWithCount> appendOgDataByUrl(UrlWithCount urlWithCount) {
		var linkInfo = linkService.getLinkInfo(urlWithCount.url());
		if (linkInfo.title().isBlank()) {
			return Optional.empty();
		}
		return Optional.of(rankingApiMapper.toRankingWithLinkInfo(urlWithCount, linkInfo));
	}
}
