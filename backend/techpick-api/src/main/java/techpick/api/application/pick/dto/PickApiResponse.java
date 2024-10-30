package kernel360.techpick.feature.api.pick.dto;

import java.time.LocalDateTime;
import java.util.List;

import kernel360.techpick.feature.domain.link.dto.LinkInfo;
import kernel360.techpick.feature.domain.pick.dto.PickResult;

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
