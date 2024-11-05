package techpick.api.application.folder.dto;

import java.util.List;

import techpick.core.model.folder.FolderType;

public record FolderApiResponse(
	Long id,
	String name,
	FolderType folderType,
	Long parentFolderId,
	List<Long> childFolderIdOrderedList
) {
}
