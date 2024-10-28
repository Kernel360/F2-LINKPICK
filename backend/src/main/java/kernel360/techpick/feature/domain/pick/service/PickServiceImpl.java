package kernel360.techpick.feature.domain.pick.service;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kernel360.techpick.core.model.folder.Folder;
import kernel360.techpick.core.model.folder.FolderType;
import kernel360.techpick.core.model.pick.Pick;
import kernel360.techpick.core.model.tag.Tag;
import kernel360.techpick.feature.domain.folder.exception.ApiFolderException;
import kernel360.techpick.feature.domain.pick.dto.PickCommand;
import kernel360.techpick.feature.domain.pick.dto.PickMapper;
import kernel360.techpick.feature.domain.pick.dto.PickResult;
import kernel360.techpick.feature.domain.pick.exception.ApiPickException;
import kernel360.techpick.feature.domain.tag.exception.ApiTagException;
import kernel360.techpick.feature.infrastructure.folder.FolderAdaptor;
import kernel360.techpick.feature.infrastructure.pick.PickAdaptor;
import kernel360.techpick.feature.infrastructure.tag.TagAdaptor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PickServiceImpl implements PickService {

	private final TagAdaptor tagAdaptor;
	private final PickAdaptor pickAdaptor;
	private final PickMapper pickMapper;
	private final FolderAdaptor folderAdaptor;

	@Override
	@Transactional(readOnly = true)
	public PickResult getPick(PickCommand.Read command) {
		checkPickUserAuthorization(command.userId(), command.pickId());
		var pick = pickAdaptor.getPick(command.pickId());
		return pickMapper.toPickResult(pick);
	}

	@Override
	@Transactional
	public PickResult saveNewPick(PickCommand.Create command) {
		checkFolderUserAuthorization(command.userId(), command.parentFolderId());
		var pick = pickAdaptor.savePick(command);
		pick.getParentFolder().getChildPickOrderList().add(pick.getId());

		List<Long> tagOrderList = pick.getTagOrderList();
		List<Tag> tagList = tagAdaptor.getTagList(tagOrderList);
		for (Tag tag : tagList) {
			if (ObjectUtils.notEqual(tag.getUser(), pick.getUser())) {
				throw ApiTagException.UNAUTHORIZED_TAG_ACCESS();
			}
			pickAdaptor.savePickTag(pick, tag);
		}

		return pickMapper.toPickResult(pick);
	}

	@Override
	@Transactional
	public PickResult updatePick(PickCommand.Update command) {
		checkPickUserAuthorization(command.userId(), command.pickId());
		return pickMapper.toPickResult(pickAdaptor.updatePick(command));
	}

	@Override
	@Transactional
	public List<Long> movePick(PickCommand.Move command) {
		List<Pick> pickList = pickAdaptor.getPickList(command.pickIdList());
		for (Pick pick : pickList) {
			checkPickUserAuthorization(command.userId(), pick.getId());
		}

		if (isParentFolderChanged(pickList.get(0).getParentFolder().getId(), command.destinationFolderId())) {
			pickAdaptor.movePickToOtherFolder(command);
		} else {
			pickAdaptor.movePickToCurrentFolder(command);
		}

		// 테스트를 위해 반환
		return pickList.get(0).getParentFolder().getChildPickOrderList();
	}

	@Override
	@Transactional
	public void deletePick(PickCommand.Delete command) {
		List<Pick> pickList = pickAdaptor.getPickList(command.pickIdList());
		for (Pick pick : pickList) {
			checkPickUserAuthorization(command.userId(), pick.getId());
			if (pick.getParentFolder().getFolderType() != FolderType.RECYCLE_BIN) {
				throw ApiPickException.PICK_DELETE_NOT_ALLOWED();
			}
		}

		pickAdaptor.deletePickList(command);
	}

	/**
	 * Internal Helper Functions
	 **/
	private boolean isParentFolderChanged(Long originalFolderId, Long destinationFolderId) {
		return ObjectUtils.notEqual(originalFolderId, destinationFolderId);
	}

	private void checkPickUserAuthorization(Long userId, Long pickId) {
		var pick = pickAdaptor.getPick(pickId);
		if (ObjectUtils.notEqual(userId, pick.getUser().getId())) {
			throw ApiPickException.PICK_UNAUTHORIZED_ACCESS();
		}
	}

	private void checkFolderUserAuthorization(Long userId, Long folderId) {
		Folder parentFolder = folderAdaptor.getFolder(folderId);
		if (ObjectUtils.notEqual(userId, parentFolder.getUser().getId())) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
	}

}
