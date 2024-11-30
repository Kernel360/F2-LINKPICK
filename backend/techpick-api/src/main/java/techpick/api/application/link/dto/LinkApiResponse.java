package techpick.api.application.link.dto;

public record LinkApiResponse(
    Long id,
    String title,
    String description,
    String imageUrl
) {
}
