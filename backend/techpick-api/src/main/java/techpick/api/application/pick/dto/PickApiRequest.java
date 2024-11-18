package techpick.api.application.pick.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import techpick.api.domain.link.dto.LinkInfo;

public class PickApiRequest {

	public record Create(
		@Schema(example = "Record란?") String title,
		@Schema(example = "[4, 5, 2, 1, 3]") List<Long> tagIdOrderedList,
		@Schema(example = "1") Long parentFolderId,
		LinkInfo linkInfo
	) {
	}

	public record Read(
		@Schema(example = "1") @NotNull Long id
	) {
	}

	public record Update(
		@Schema(example = "1") @NotNull Long id,
		@Schema(example = "Record란 뭘까?") String title,
		@Schema(example = "3") Long parentFolderId,
		@Schema(example = "[4, 5, 2, 1]") List<Long> tagIdOrderedList
	) {
	}

	public record Move(
		@Schema(example = "[1, 2]") @NotNull List<Long> idList,
		@Schema(example = "3") @NotNull Long destinationFolderId,
		@Schema(example = "0") int orderIdx
	) {
	}

	public record Delete(
		@Schema(example = "[1]") @NotNull List<Long> idList
	) {
	}
}