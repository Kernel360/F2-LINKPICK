package techpick.api.application.pick.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import techpick.api.domain.link.dto.LinkInfo;

public class PickApiRequest {

	public record Create(
		@Schema(example = "Record란?") String title,
		@Schema(example = "[4, 5, 2, 1, 3]") List<Long> tagIdOrderedList,
		@Schema(example = "1") Long parentFolderId,
		LinkInfo linkInfo
	) {
	}

	public record Read(
		@Schema(example = "1") @NotNull(message = "{id.notNull}") Long id
	) {
	}

	public record Search(
		@Schema(description = "조회할 폴더 ID 목록", example = "3, 4, 5") List<Long> folderIdList,
		@Schema(description = "검색 토큰 목록", example = "Record, 스프링") List<String> searchTokenList,
		@Schema(description = "검색 태그 ID 목록", example = "1, 2, 3") List<Long> tagIdList
	) {
	}

	public record SearchPagination(
		@Schema(description = "조회할 폴더 ID 목록", example = "3, 4, 5") List<Long> folderIdList,
		@Schema(description = "검색 토큰 목록", example = "Record, 스프링") List<String> searchTokenList,
		@Schema(description = "검색 태그 ID 목록", example = "1, 2, 3") List<Long> tagIdList,
		@Schema(description = "픽 시작 id 조회", example = "0", defaultValue = "0") Long cursor,
		@Schema(description = "한 페이지에 가져올 픽 개수", example = "20", defaultValue = "20") Integer size
	) {
		public Integer size() {
			return size == null || size <= 0 ? 20 : size;
		}
	}

	public record Update(
		@Schema(example = "1") @NotNull(message = "{id.notNull}") Long id,
		@Schema(example = "Record란 뭘까?") String title,
		@Schema(example = "3") Long parentFolderId,
		@Schema(example = "[4, 5, 2, 1]") List<Long> tagIdOrderedList
	) {
	}

	public record Move(
		@Schema(example = "[1, 2]") @NotNull(message = "{idList.notNull}") List<Long> idList,
		@Schema(example = "3") @NotNull(message = "{destinationFolderId.notNull}") Long destinationFolderId,
		@Schema(example = "0") int orderIdx
	) {
	}

	public record Delete(
		@Schema(example = "[1]") @NotNull(message = "{idList.notNull}") List<Long> idList
	) {
	}
}