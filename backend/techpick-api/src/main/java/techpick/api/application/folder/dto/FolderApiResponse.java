package techpick.api.application.folder.dto;

import techpick.core.model.folder.FolderType;

public record FolderApiResponse(
	Long folderId,
	String name,
	FolderType folderType,
	Long parentFolderId
) {
}
