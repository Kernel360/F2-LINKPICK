package techpick.api.application.folder.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FolderApiRequest {

	public record Create(
		@Schema(example = "backend") @NotBlank(message = "{folder.name.notBlank}") String name,
		@Schema(example = "3") @NotNull(message = "{parentFolderId.notNull}") Long parentFolderId
	) {
	}

	public record Update(
		@Schema(example = "3") @NotNull(message = "{id.notNull}") Long id,
		@Schema(example = "SpringBoot") @NotBlank(message = "{folder.name.notBlank}") String name
	) {
	}

	public record Move(
		@Schema(example = "[12, 11, 4, 5, 1, 6]") @NotNull(message = "{idList.notNull}") List<Long> idList,
		@Schema(example = "7") @NotNull(message = "{parentFolderId.notNull}") Long parentFolderId,
		@Schema(example = "3") @NotNull(message = "{destinationFolderId.notNull}") Long destinationFolderId,
		@Schema(example = "2") int orderIdx
	) {
	}

	public record Delete(
		@Schema(example = "[12, 11, 4, 5, 1, 6]") @NotNull(message = "{idList.notNull}") List<Long> idList
	) {
	}
}
