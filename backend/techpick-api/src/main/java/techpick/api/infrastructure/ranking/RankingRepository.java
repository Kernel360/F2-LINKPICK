package techpick.api.infrastructure.ranking;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;

import techpick.core.dto.LinkInfoWithViewCount;

public interface RankingRepository {

	/**
	 * @author minkyeu kim
	 * 랭킹 서버와 통신하기 위한 Http Interface. <br>
	 * 형식은 techpick-api 모듈의 컨트롤러와 일치합니다.
	 */
	@GetExchange("/ranking/link")
	ResponseEntity<List<LinkInfoWithViewCount>> getLinkRanking(
		@RequestParam("date_begin") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateBegin,
		@RequestParam("date_end") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateEnd,
		@RequestParam(required = false, defaultValue = "5") Integer limit
	);
}
