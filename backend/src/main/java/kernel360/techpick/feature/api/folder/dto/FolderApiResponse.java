package kernel360.techpick.feature.api.folder.dto;

import kernel360.techpick.core.model.folder.FolderType;

public record FolderApiResponse(
	Long folderId,
	String name,
	FolderType folderType,
	Long parentFolderId
) {
}
