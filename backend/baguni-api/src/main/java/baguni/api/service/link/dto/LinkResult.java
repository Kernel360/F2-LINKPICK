package baguni.api.service.link.dto;

public record LinkResult(
	Long id,
	String url,
	String title,
	String description,
	String imageUrl
) {
}
