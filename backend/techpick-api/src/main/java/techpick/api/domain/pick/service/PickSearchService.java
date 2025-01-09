package techpick.api.domain.pick.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.dto.PickResult;
import techpick.api.domain.tag.exception.ApiTagException;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.api.infrastructure.pick.PickQuery;
import techpick.api.infrastructure.tag.TagDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderType;
import techpick.core.model.tag.Tag;

@Service
@RequiredArgsConstructor
public class PickSearchService {

	private final PickQuery pickQuery;
	private final FolderDataHandler folderDataHandler;
	private final TagDataHandler tagDataHandler;

	@Transactional(readOnly = true)
	public Slice<PickResult.Pick> searchPick(PickCommand.Search command) {
		List<Long> folderIdList = command.folderIdList();
		List<Long> tagIdList = command.tagIdList();

		if (ObjectUtils.isNotEmpty(folderIdList)) {
			for (Long folderId : folderIdList) {
				validateFolderAccess(command.userId(), folderId);
				validateFolderRootSearch(folderId);
			}
		}

		if (ObjectUtils.isNotEmpty(tagIdList)) {
			for (Long tagId : tagIdList) {
				validateTagAccess(command.userId(), tagId);
			}
		}

		return pickQuery.searchPick(command.userId(), folderIdList,
			command.searchTokenList(), command.tagIdList(),
			command.cursor(), command.size());
	}

	private void validateFolderAccess(Long userId, Long folderId) {
		Folder parentFolder = folderDataHandler.getFolder(folderId); // 존재하지 않으면, FOLDER_NOT_FOUND
		if (ObjectUtils.notEqual(userId, parentFolder.getUser().getId())) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
	}

	private void validateFolderRootSearch(Long folderId) {
		Folder parentFolder = folderDataHandler.getFolder(folderId); // 존재하지 않으면, FOLDER_NOT_FOUND
		if (Objects.equals(parentFolder.getFolderType(), FolderType.ROOT)) {
			throw ApiFolderException.ROOT_FOLDER_SEARCH_NOT_ALLOWED();
		}
	}

	private void validateTagAccess(Long userId, Long tagId) {
		Tag tag = tagDataHandler.getTag(tagId); // 존재하지 않으면, TAG_NOT_FOUND
		if (!userId.equals(tag.getUser().getId())) {
			throw ApiTagException.UNAUTHORIZED_TAG_ACCESS();
		}
	}
}
