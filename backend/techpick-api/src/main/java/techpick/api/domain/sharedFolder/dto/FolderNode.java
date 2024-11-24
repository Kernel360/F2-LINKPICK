package techpick.api.domain.sharedFolder.dto;

import java.util.List;

import lombok.Builder;

@Builder
public record FolderNode(
	Long folderId,
	String name,
	List<FolderNode> folders,
	List<PickNode> picks,
	String createdAt
) {
}
