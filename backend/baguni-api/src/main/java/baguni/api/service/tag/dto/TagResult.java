package baguni.api.service.tag.dto;

public record TagResult(
	Long id,
	String name,
	Integer colorNumber,
	Long userId
) {
}
