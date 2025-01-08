package baguni.domain.infrastructure.pick.dto;

import java.time.LocalDateTime;
import java.util.List;

import baguni.domain.infrastructure.link.dto.LinkInfo;

public class PickResult {

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

	public record Unclassified(
		Long id,
		String title,
		Long linkId,
		String url,
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
		Boolean isHot,
		// 랭킹 정보에 표시된 최근 7일간 조회수
		Long weeklyViewCount
	) {
	}

	public record FolderPickList(
		Long folderId,
		List<PickResult.Pick> pickList
	) {
	}

	public record FolderPickWithViewCountList(
		Long folderId,
		List<PickResult.PickWithViewCount> pickList
	) {
	}
}