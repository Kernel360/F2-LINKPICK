package techpick.api.domain.link.dto;

public record LinkResult(
    Long id,
    String title,
    String description,
    String imageUrl
) {
}
