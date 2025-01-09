package baguni.api.application.event.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public class EventApiRequest {

	public record SuggestionView(
		@NotNull @Schema(description = "조회된 링크 url") String url
	) {
	}

	public record BookmarkView(
		@NotNull @Schema(description = "조회된 링크 url") String url,
		@NotNull @Schema(description = "조회되는 픽의 id") Long pickId
	) {
	}

	public record SharedBookmarkView(
		@NotNull @Schema(description = "조회된 링크 url") String url,
		@NotNull @Schema(description = "조회된 공개 폴더 접근용 토큰") String folderAccessToken
	) {
	}
}
