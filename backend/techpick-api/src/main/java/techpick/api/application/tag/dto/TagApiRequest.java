package techpick.api.application.tag.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class TagApiRequest {

	public record Create(
		@Schema(example = "SpringBoot") @NotBlank String name,
		@Schema(example = "12") @NotNull Integer colorNumber) {
	}

	public record Read(
		@Schema(example = "2") @NotNull Long tagId) {
	}

	public record Update(
		@Schema(example = "2") @NotNull Long tagId,
		@Schema(example = "new tag name") @NotEmpty String name,
		@Schema(example = "7") @NotNull Integer colorNumber) {
	}

	public record Move(
		@Schema(example = "3") @NotNull Long tagId,
		@Schema(example = "1") @NotNull int orderIdx
	) {
	}

	public record Delete(
		@Schema(example = "4") @NotNull Long tagId
	) {
	}
}
