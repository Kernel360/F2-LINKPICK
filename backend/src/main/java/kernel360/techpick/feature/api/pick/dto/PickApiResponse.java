package kernel360.techpick.feature.api.pick.dto;

import java.time.LocalDateTime;
import java.util.List;

import kernel360.techpick.feature.domain.link.dto.LinkInfo;

public record PickApiResponse(
	Long id,
	String title,
	String memo,
	LinkInfo linkInfo,
	List<Long> tagOrderList,
	LocalDateTime createdAt,
	LocalDateTime updatedAt
) {

}
