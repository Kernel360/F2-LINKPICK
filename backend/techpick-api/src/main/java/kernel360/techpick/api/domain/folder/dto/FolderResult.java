package kernel360.techpick.api.domain.folder.dto;

import java.util.List;

import kernel360.techpick.core.model.folder.FolderType;

public record FolderResult(
	Long folderId,
	String name,
	FolderType folderType,
	Long parentFolderId,
	Long userId,
	List<Long> childFolderOrderList,
	List<Long> childPickOrderList
) {
}
