package techpick.api.domain.pick.dto;

import java.time.LocalDateTime;
import java.util.List;

import techpick.api.domain.link.dto.LinkInfo;

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

	public record FolderPickList(
		Long folderId,
		List<PickResult.Pick> pickList
	) {
	}
}