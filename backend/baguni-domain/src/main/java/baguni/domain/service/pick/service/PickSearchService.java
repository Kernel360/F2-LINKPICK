package baguni.domain.service.pick.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import baguni.domain.service.folder.exception.ApiFolderException;
import baguni.domain.service.pick.dto.PickCommand;
import baguni.domain.service.pick.dto.PickResult;
import baguni.domain.service.tag.exception.ApiTagException;
import baguni.domain.infrastructure.folder.FolderDataHandler;
import baguni.domain.infrastructure.pick.PickQuery;
import baguni.domain.infrastructure.tag.TagDataHandler;
import baguni.domain.model.folder.Folder;
import baguni.domain.model.folder.FolderType;
import baguni.domain.model.tag.Tag;

@Service
@RequiredArgsConstructor
public class PickSearchService {

	private final PickQuery pickQuery;
	private final FolderDataHandler folderDataHandler;
	private final TagDataHandler tagDataHandler;

	@Transactional(readOnly = true)
	public Slice<PickResult.Pick> searchPickPagination(PickCommand.SearchPagination command) {

		List<Long> folderIdList = command.folderIdList();
		if (ObjectUtils.isNotEmpty(folderIdList)) {
			folderIdList.removeAll(Collections.singletonList(null));
			for (Long folderId : folderIdList) {
				validateFolderAccess(command.userId(), folderId);
				validateFolderRootSearch(folderId);
			}
		}

		List<Long> tagIdList = command.tagIdList();
		if (ObjectUtils.isNotEmpty(tagIdList)) {
			tagIdList.removeAll(Collections.singletonList(null));
			for (Long tagId : tagIdList) {
				validateTagAccess(command.userId(), tagId);
			}
		}

		List<String> searchTokenList = command.searchTokenList();
		if (ObjectUtils.isNotEmpty(searchTokenList)) {
			searchTokenList.removeAll(Arrays.asList("", null));
		}

		return pickQuery.searchPickPagination(
			command.userId(),
			folderIdList, searchTokenList, tagIdList,
			command.cursor(), command.size()
		);
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
