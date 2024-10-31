package techpick.api.application.pick.dto;

import java.time.LocalDateTime;
import java.util.List;

import techpick.api.domain.link.dto.LinkInfo;
import techpick.api.domain.pick.dto.PickResult;

public class PickApiResponse {

	public record Pick(
		Long id,
		String title,
		String memo,
		LinkInfo linkInfo,
		List<Long> tagOrderList,
		LocalDateTime createdAt,
		LocalDateTime updatedAt
	) {
	}

	public record Fetch(
		List<PickResult.PickList> pickResponseList
	) {
	}

}
