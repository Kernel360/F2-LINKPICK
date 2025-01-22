package baguni.api.application.suggestion.dto;

import jakarta.validation.constraints.NotNull;
import baguni.common.dto.UrlWithCount;

/**
 * 랭킹 서버로 부터 얻은 URL 정보 {@link UrlWithCount} 에 Opengraph Tag를 추가한 DTO
 */
public record LinkInfoWithCount(
	@NotNull String url,
	String title,
	String description,
	String imageUrl,
	Long count
) {
}
