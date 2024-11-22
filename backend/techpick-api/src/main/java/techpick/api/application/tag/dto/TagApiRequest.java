package techpick.api.application.tag.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class TagApiRequest {

	public record Create(
		@Schema(example = "SpringBoot") @NotBlank(message = "{tag.name.notBlank}") String name,
		@Schema(example = "12") @NotNull(message = "{tag.colorNumber.notNull}") Integer colorNumber) {
	}

	public record Read(
		@Schema(example = "2") @NotNull(message = "{id.notNull}") Long id) {
	}

	public record Update(
		@Schema(example = "2") @NotNull(message = "{id.notNull}") Long id,
		@Schema(example = "new tag name") @NotEmpty(message = "{tag.name.notBlank}") String name,
		@Schema(example = "7") @NotNull(message = "{tag.colorNumber.notNull}") Integer colorNumber) {
	}

	public record Move(
		@Schema(example = "3") @NotNull(message = "{id.notNull}") Long id,
		@Schema(example = "1") int orderIdx
	) {
	}

	public record Delete(
		@Schema(example = "4") @NotNull(message = "{id.notNull}") Long id
	) {
	}
}
