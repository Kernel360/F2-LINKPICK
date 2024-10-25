package kernel360.techpick.feature.api.folder.dto;

import java.util.List;

public class FolderApiRequest {

	public record Create(
		Long folderId,
		String name,
		Long parentFolderId
	) {
	}

	public record Read(
		Long folderId
	) {
	}

	public record Update(
		Long folderId,
		String name
	) {
	}

	public record Move(
		List<Long> folderIdList,
		Long destinationFolderId,
		int orderIdx
	) {
	}

	public record Delete(
		List<Long> folderIdList
	) {
	}
}
