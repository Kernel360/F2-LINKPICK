package techpick.api.application.pick.dto;

import java.time.LocalDateTime;
import java.util.List;

import techpick.api.domain.link.dto.LinkInfo;

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
