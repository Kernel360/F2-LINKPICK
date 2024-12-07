package techpick.api.application.ranking.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import techpick.core.dto.LinkInfoWithViewCount;

public record RankingByViewCount(
	// today's hot pick
	@Schema(description = "오늘 하루 동안 인기 있는 링크 Top 10")
	List<LinkInfoWithViewCount> daily,

	// weekly hot pick
	@Schema(description = "지난 7일동안 인기 있던 링크 Top 10")
	List<LinkInfoWithViewCount> weekly
) {
}
