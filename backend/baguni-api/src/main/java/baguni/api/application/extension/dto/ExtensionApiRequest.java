package baguni.api.application.extension.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class ExtensionApiRequest {

	public record Create(
		@Schema(example = "GitHub Actions를 이용한 코드 리뷰 문화 개선기") @NotEmpty String title,
		@Schema(example = "[4, 5, 2, 1, 3]") List<Long> tagIdOrderedList,
		@Schema(example = "1") @NotNull Long parentFolderId,
		@Schema(example = "https://d2.naver.com/helloworld/8149881") @NotNull String url,
		@Schema(example = "GitHub Actions를 이용한 코드 리뷰 문화 개선기") @NotEmpty String linkTitle
	){}
}
