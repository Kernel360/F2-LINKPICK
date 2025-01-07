package baguni.api.service.folder.dto;

import java.time.LocalDateTime;
import java.util.List;

import baguni.entity.model.folder.FolderType;

public record FolderResult(
	Long id,
	String name,
	FolderType folderType,
	Long parentFolderId,
	List<Long> childFolderIdOrderedList,
	List<Long> childPickIdOrderedList,
	LocalDateTime createdAt,
	LocalDateTime updatedAt
) {
}
