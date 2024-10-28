package kernel360.techpick.api.domain.tag.dto;

public record TagResult(
	Long id,
	String name,
	Integer colorNumber,
	Long userId
) {
}
