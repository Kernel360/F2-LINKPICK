package kernel360.techpick.feature.api.pick.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import kernel360.techpick.feature.domain.link.dto.LinkInfo;

public class PickApiRequest {

	public record Create(
		String title,
		String memo,
		List<Long> tagOrderList,
		Long parentFolderId,
		LinkInfo linkInfo
	) {
	}

	public record Read(
		@NotNull Long pickId
	) {
	}

	public record Update(
		@NotNull Long pickId,
		String title,
		String memo,
		List<Long> tagIdList
	) {
	}

	public record Move(
		@NotNull List<Long> pickIdList,
		@NotNull Long destinationFolderId,
		int orderIdx
	) {
	}

	public record Delete(
		@NotNull List<Long> pickIdList
	) {
	}
}
