package techpick.api.domain.pick.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.dto.PickResult;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.api.infrastructure.pick.PickQuery;
import techpick.core.model.folder.Folder;

@Service
@RequiredArgsConstructor
public class PickSearchService {

	private final PickQuery pickQuery;
	private final FolderDataHandler folderDataHandler;

	@Transactional(readOnly = true)
	public Slice<PickResult.Pick> searchPick(PickCommand.Search command) {
		List<Long> folderIdList = command.folderIdList();
		for (Long folderId : folderIdList) {
			validateFolderAccess(command.userId(), folderId);
		}

		return pickQuery.searchPick(command.userId(), folderIdList,
			command.searchTokenList(), command.tagIdList(),
			command.cursor(), command.size());
	}

	private void validateFolderAccess(Long userId, Long folderId) {
		Folder parentFolder = folderDataHandler.getFolder(folderId);
		if (ObjectUtils.notEqual(userId, parentFolder.getUser().getId())) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
	}
}
