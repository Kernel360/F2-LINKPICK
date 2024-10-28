package kernel360.techpick.feature.domain.pick.dto;

import java.util.List;

import kernel360.techpick.feature.domain.link.dto.LinkInfo;

public class PickCommand {

	public record Read(Long userId, Long pickId) {
	}

	public record Create(Long userId, String title, String memo, List<Long> tagOrderList, Long parentFolderId,
						 LinkInfo linkInfo) {
	}

	public record Update(Long userId, Long pickId, String title, String memo, List<Long> tagIdList) {
	}

	public record Move(Long userId, List<Long> pickIdList, Long destinationFolderId, int orderIdx) {
	}

	public record Delete(Long userId, List<Long> pickIdList) {
	}
}
