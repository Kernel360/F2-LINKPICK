package baguni.api.service.pick.dto;

import java.util.List;

import baguni.api.service.link.dto.LinkInfo;

public class PickCommand {

	public record Read(Long userId, Long id) {
	}

	public record ReadList(Long userId, List<Long> folderIdList) {
	}

	public record SearchPagination(Long userId, List<Long> folderIdList, List<String> searchTokenList,
								   List<Long> tagIdList, Long cursor, int size) {
	}

	public record Create(Long userId, String title, List<Long> tagIdOrderedList, Long parentFolderId,
						 LinkInfo linkInfo) {
	}

	public record Extension(Long userId, String title, LinkInfo linkInfo) {
	}

	public record Update(Long userId, Long id, String title, List<Long> tagIdOrderedList) {
	}

	/**
	 * @deprecated
	 * 구 버전 익스텐션의 폴더 이동 기능을 위한 임시 DTO. 추후 익스텐션 버전 업과 동시에 삭제 예정
	 */
	public record UpdateXXX(Long userId, Long id, String title, Long parentFolderId, List<Long> tagIdOrderedList) {
	}

	public record Move(Long userId, List<Long> idList, Long destinationFolderId, int orderIdx) {
	}

	public record Delete(Long userId, List<Long> idList) {
	}
}
