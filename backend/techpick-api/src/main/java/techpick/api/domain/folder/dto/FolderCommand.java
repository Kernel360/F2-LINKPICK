package techpick.api.domain.folder.dto;

import java.util.List;

public class FolderCommand {

	public record Create(
		Long userId,
		String name,
		Long parentFolderId) {
	}

	public record Read(
		Long userId,
		Long folderId) {
	}

	public record Update(
		Long userId,
		Long folderId,
		String name
	) {
	}

	public record Move(
		Long userId,
		List<Long> folderIdList,
		Long destinationFolderId,
		int orderIdx
	) {
	}

	public record Delete(
		Long userId,
		List<Long> folderIdList
	) {
	}
}
