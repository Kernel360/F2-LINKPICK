package techpick.api.application.tag.dto;

public class TagApiResponse {

	public record Create(
		Long id,
		String name,
		Integer colorNumber
	) {
	}

	public record Read(
		Long id,
		String name,
		Integer colorNumber
	) {
	}

	public record Update(
		Long id,
		String name,
		Integer colorNumber
	) {
	}
}
