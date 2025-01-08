package baguni.api.application.user.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;

public record UserInfoApiResponse(

	@NotEmpty
	@Schema(description = "사용자 식별 토큰")
	String idToken,

	@NotEmpty
	@Schema(description = "사용자 이메일")
	String email,

	// Nullable
	@Schema(description = "사용자 이름")
	String name
) {
}
