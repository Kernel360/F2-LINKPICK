package techpick.api.application.folder.dto;

import java.time.LocalDateTime;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import techpick.core.model.folder.FolderType;

public record FolderApiResponse(
	Long id,
	String name,
	@Schema(example = "GENERAL")
	FolderType folderType,
	Long parentFolderId,
	List<Long> childFolderIdOrderedList,
	LocalDateTime createdAt,
	LocalDateTime updatedAt
) {
}
