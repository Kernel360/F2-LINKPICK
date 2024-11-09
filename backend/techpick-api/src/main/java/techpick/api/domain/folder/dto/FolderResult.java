package techpick.api.domain.folder.dto;

import java.util.List;

import techpick.core.model.folder.FolderType;

public record FolderResult(
	Long id,
	String name,
	FolderType folderType,
	Long parentFolderId,
	Long userId,
	List<Long> childFolderIdOrderedList,
	List<Long> childPickIdOrderedList
) {
}
