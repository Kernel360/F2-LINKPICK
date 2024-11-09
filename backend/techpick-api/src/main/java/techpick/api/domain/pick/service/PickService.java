package techpick.api.domain.pick.service;

import java.util.List;
import java.util.Objects;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.dto.PickMapper;
import techpick.api.domain.pick.dto.PickResult;
import techpick.api.domain.pick.exception.ApiPickException;
import techpick.api.domain.tag.exception.ApiTagException;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.api.infrastructure.pick.PickDataHandler;
import techpick.api.infrastructure.tag.TagDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderType;
import techpick.core.model.pick.Pick;
import techpick.core.model.tag.Tag;

@Slf4j
@Service
@RequiredArgsConstructor
public class PickService {

	private final TagDataHandler tagDataHandler;
	private final PickDataHandler pickDataHandler;
	private final FolderDataHandler folderDataHandler;
	private final PickMapper pickMapper;

	@Transactional(readOnly = true)
	public PickResult.Pick getPick(PickCommand.Read command) {
		validatePickAccess(command.userId(), command.id());
		var pick = pickDataHandler.getPick(command.id());
		return pickMapper.toPickResult(pick);
	}

	@Transactional(readOnly = true)
	public PickResult.Pick getPickUrl(Long userId, String url) {
		Pick pick = pickDataHandler.getPickUrl(userId, url);
		validatePickAccess(userId, pick.getId());
		return pickMapper.toPickResult(pick);
	}

	// 폴더 내에 있는 픽 리스트 조회
	// 구현은 해두었지만, 추후 사용되지 않을 때 삭제 예정
	@Transactional(readOnly = true)
	public List<PickResult.Pick> getFolderChildPickList(Long userId, Long folderId) {
		validateFolderAccess(userId, folderId);
		Folder folder = folderDataHandler.getFolder(folderId);
		List<Pick> pickList = pickDataHandler.getPickListPreservingOrder(folder.getChildPickIdOrderedList());

		return pickList.stream()
			.map(pickMapper::toPickResult)
			.toList();
	}

	// 폴더 리스트가 넘어오면, 각 폴더 내부에 있는 픽 리스트 조회
	@Transactional(readOnly = true)
	public List<PickResult.FolderPickList> getFolderListChildPickList(PickCommand.Search command) {
		// TODO: 검색 조건에 따라 바뀌는 부분은 동적 쿼리 발생 예정, QueryDSL 도입 필요
		List<String> searchTokenList = command.searchTokenList();

		return command.folderIdList().stream()
			.peek(folderId -> validateFolderAccess(command.userId(), folderId))  // 폴더 접근 유효성 검사
			.map(this::getFolderChildPickResultList)
			.toList();
	}

	@Transactional
	public PickResult.Pick saveNewPick(PickCommand.Create command) {
		validateRootAccess(command.parentFolderId());
		validateFolderAccess(command.userId(), command.parentFolderId());
		var pick = pickDataHandler.savePick(command);
		pick.getParentFolder().getChildPickIdOrderedList().add(pick.getId());

		List<Long> tagOrderList = pick.getTagIdOrderedList();
		List<Tag> tagList = tagDataHandler.getTagList(tagOrderList);
		for (Tag tag : tagList) {
			if (ObjectUtils.notEqual(tag.getUser(), pick.getUser())) {
				throw ApiTagException.UNAUTHORIZED_TAG_ACCESS();
			}
			pickDataHandler.savePickTag(pick, tag);
		}

		return pickMapper.toPickResult(pick);
	}

	@Transactional
	public PickResult.Pick updatePick(PickCommand.Update command) {
		validatePickAccess(command.userId(), command.id());
		return pickMapper.toPickResult(pickDataHandler.updatePick(command));
	}

	@Transactional
	public void movePick(PickCommand.Move command) {
		validateRootAccess(command.destinationFolderId());
		List<Pick> pickList = pickDataHandler.getPickListPreservingOrder(command.idList());
		for (Pick pick : pickList) {
			validatePickAccess(command.userId(), pick.getId());
		}

		if (isParentFolderChanged(pickList.get(0).getParentFolder().getId(), command.destinationFolderId())) {
			pickDataHandler.movePickToOtherFolder(command);
			return;
		}
		pickDataHandler.movePickToCurrentFolder(command);
	}

	@Transactional
	public void deletePick(PickCommand.Delete command) {
		List<Pick> pickList = pickDataHandler.getPickList(command.idList());
		for (Pick pick : pickList) {
			validatePickAccess(command.userId(), pick.getId());
			if (pick.getParentFolder().getFolderType() != FolderType.RECYCLE_BIN) {
				throw ApiPickException.PICK_DELETE_NOT_ALLOWED();
			}
		}

		pickDataHandler.deletePickList(command);
	}

	/**
	 * Internal Helper Functions
	 **/
	private PickResult.FolderPickList getFolderChildPickResultList(Long folderId) {
		Folder folder = folderDataHandler.getFolder(folderId);
		List<Pick> pickList = pickDataHandler.getPickListPreservingOrder(folder.getChildPickIdOrderedList());
		List<PickResult.Pick> pickResultList = pickList.stream()
			.map(pickMapper::toPickResult)
			.toList();
		return pickMapper.toPickResultList(folderId, pickResultList);
	}

	private boolean isParentFolderChanged(Long originalFolderId, Long destinationFolderId) {
		return ObjectUtils.notEqual(originalFolderId, destinationFolderId);
	}

	private void validatePickAccess(Long userId, Long pickId) {
		var pick = pickDataHandler.getPick(pickId);
		if (ObjectUtils.notEqual(userId, pick.getUser().getId())) {
			throw ApiPickException.PICK_UNAUTHORIZED_USER_ACCESS();
		}
	}

	private void validateFolderAccess(Long userId, Long folderId) {
		Folder parentFolder = folderDataHandler.getFolder(folderId);
		if (ObjectUtils.notEqual(userId, parentFolder.getUser().getId())) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
	}

	private void validateRootAccess(Long parentFolderId) {
		if (Objects.isNull(parentFolderId)) {
			throw ApiPickException.PICK_UNAUTHORIZED_ROOT_ACCESS();
		}
	}
}
