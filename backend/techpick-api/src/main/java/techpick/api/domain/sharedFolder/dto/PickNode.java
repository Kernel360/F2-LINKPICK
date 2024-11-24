package techpick.api.domain.sharedFolder.dto;

import java.util.List;

import lombok.Builder;

@Builder
public record PickNode(
	Long pickId,
	String title,
	String url,
	String imageUrl,
	Long parentFolderId,
	List<TagNode> tags,
	String createdAt
) {
}
