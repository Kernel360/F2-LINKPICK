package kernel360.techpick.feature.domain.pick.dto;

import java.time.LocalDateTime;
import java.util.List;

import kernel360.techpick.feature.domain.link.dto.LinkInfo;
import lombok.Getter;

public record PickResult(
	Long id,
	String title,
	String memo,
	LinkInfo linkInfo,
	Long parentFolderId,
	List<Long> tagOrderList,
	LocalDateTime createdAt,
	LocalDateTime updatedAt
) {
}
