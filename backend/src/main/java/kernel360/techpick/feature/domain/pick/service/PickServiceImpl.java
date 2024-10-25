package kernel360.techpick.feature.domain.pick.service;

import java.util.List;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kernel360.techpick.core.model.folder.Folder;
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
import kernel360.techpick.feature.infrastructure.user.UserAdaptor;
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
		var pick = pickAdaptor.getPick(command.pickId());
		checkPickUserAuthorization(command.userId(), pick);
		return pickMapper.toReadResult(pick);
	}

	@Override
	@Transactional
	public PickResult saveNewPick(PickCommand.Create command) {
		var pick = pickAdaptor.savePick(command);
		// folderAdaptor.readFolder();
		// checkFolderUserAuthorization(command.userId(), )
		// 링크가 본인 폴더인지 검증 필요
		// 링크가 본인 링크인지 검증 필요

		List<Long> tagOrderList = pick.getTagOrder();
		List<Tag> tagList = tagAdaptor.getTagList(tagOrderList);
		for (Tag tag : tagList) {
			if (ObjectUtils.notEqual(tag.getUser(), pick.getUser())) {
				throw ApiTagException.UNAUTHORIZED_TAG_ACCESS();
			}
			pickAdaptor.savePickTag(pick, tag);
		}

		return pickMapper.toCreateResult(pick);
	}

	@Override
	@Transactional
	public PickResult updatePick(PickCommand.Update command) {
		var pick = pickAdaptor.getPick(command.pickId());
		checkPickUserAuthorization(command.userId(), pick);
		return pickMapper.toUpdateResult(pickAdaptor.updatePick(command));
	}

	@Override
	@Transactional
	public void movePick(PickCommand.Move command) {
		var pick = pickAdaptor.getPick(command.pickId());
		checkPickUserAuthorization(command.userId(), pick);
		if (isParentFolderChanged(pick.getParentFolder().getId(), command.destinationFolderId())) {
			pickAdaptor.movePickToOtherFolder(command);
			return;
		}
		pickAdaptor.movePickToCurrentFolder(command);
	}

	@Override
	@Transactional
	public void deletePick(PickCommand.Delete command) {
		var pick = pickAdaptor.getPick(command.pickId());
		checkPickUserAuthorization(command.userId(), pick);
		pickAdaptor.deletePick(command);
	}

	/**
	 * Internal Helper Functions
	 **/
	private boolean isParentFolderChanged(Long originalFolderId, Long destinationFolderId) {
		return ObjectUtils.notEqual(originalFolderId, destinationFolderId);
	}

	private void checkPickUserAuthorization(Long userId, Pick pick) {
		if (ObjectUtils.notEqual(userId, pick.getUser().getId())) {
			throw ApiPickException.PICK_UNAUTHORIZED_ACCESS();
		}
	}

	private void checkFolderUserAuthorization(Long userId, Folder folder) {
		if (ObjectUtils.notEqual(userId, folder.getUser().getId())) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
	}

}
