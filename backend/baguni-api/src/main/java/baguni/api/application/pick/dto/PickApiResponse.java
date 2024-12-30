package baguni.api.application.pick.dto;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import baguni.api.service.link.dto.LinkInfo;
import baguni.api.service.pick.dto.PickResult;

public class PickApiResponse {

	public record Pick(
		Long id,
		String title,
		LinkInfo linkInfo,
		Long parentFolderId,
		List<Long> tagIdOrderedList,
		LocalDateTime createdAt,
		LocalDateTime updatedAt
	) {
	}

	public record PickWithViewCount(
		Long id,
		String title,
		LinkInfo linkInfo,
		Long parentFolderId,
		List<Long> tagIdOrderedList,
		LocalDateTime createdAt,
		LocalDateTime updatedAt,
		// 프론트엔드에서 깔끔하게 처리하기 위한 힌트
		@NotNull Boolean isHot,
		// 랭킹 정보에 표시된 최근 7일간 조회수
		Long weeklyViewCount
	) {
	}

	public record FolderPickList(
		Long folderId,
		List<PickApiResponse.Pick> pickList
	) {
	}

	public record FolderPickListWithViewCount(
		Long folderId,
		List<PickApiResponse.PickWithViewCount> pickList
	) {
	}

	public record PickExists(
		@NotNull Boolean exist,
		PickApiResponse.Pick pick
	) {
	}

	public record CreateFromRecommend(
		boolean exist,
		PickResult.Pick pick
	) {
	}
}
