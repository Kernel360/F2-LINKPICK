package baguni.api.infrastructure.ranking;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;

import baguni.core.dto.UrlWithCount;

/**
 * @author minkyeu kim
 * 랭킹 서버와 통신하기 위한 Http Interface. <br>
 * 형식은 baguni-api 모듈의 컨트롤러와 일치합니다.
 */
public interface RankingApi {

	/**
	 * 조회수 기반 링크 랭킹
	 */
	@GetExchange("/ranking/link/view")
	ResponseEntity<List<UrlWithCount>> getUrlRankingByViewCount(
		@RequestParam("date_begin") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateBegin,
		@RequestParam("date_end") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateEnd,
		@RequestParam(required = false, defaultValue = "5") Integer limit
	);

	/**
	 * 픽된 횟수 기반 링크 랭킹
	 */
	@GetExchange("/ranking/link/picked")
	ResponseEntity<List<UrlWithCount>> getUrlRankingByPickedCount(
		@RequestParam("date_begin") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateBegin,
		@RequestParam("date_end") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateEnd,
		@RequestParam(required = false, defaultValue = "5") Integer limit
	);
}
