package baguni.api.application.extension.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ExtensionApiResponse {

	public record Pick(
		Long id,
		String title,
		Long parentFolderId,
		List<Long> tagIdOrderedList,
		String url,
		LocalDateTime createdAt,
		LocalDateTime updatedAt
	){
	}
}
