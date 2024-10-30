package kernel360.techpick.feature.domain.pick.dto;

import java.time.LocalDateTime;
import java.util.List;

import kernel360.techpick.feature.domain.link.dto.LinkInfo;

public class PickResult {

	public record Pick(
		Long id,
		String title,
		String memo,
		LinkInfo linkInfo,
		Long parentFolderId,
		List<Long> tagOrderList,
		LocalDateTime createdAt,
		LocalDateTime updatedAt
	) {
	}

	public record PickList(
		Long folderId,
		List<PickResult.Pick> pickList
	) {
	}
}