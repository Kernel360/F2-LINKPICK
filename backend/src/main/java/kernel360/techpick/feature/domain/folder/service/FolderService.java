package kernel360.techpick.feature.domain.folder.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kernel360.techpick.core.model.folder.Folder;
import kernel360.techpick.core.model.folder.FolderType;
import kernel360.techpick.feature.domain.folder.dto.FolderCommand;
import kernel360.techpick.feature.domain.folder.dto.FolderMapper;
import kernel360.techpick.feature.domain.folder.dto.FolderResult;
import kernel360.techpick.feature.domain.folder.exception.ApiFolderException;
import kernel360.techpick.feature.infrastructure.folder.FolderDataHandler;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FolderService {

	private final FolderDataHandler folderDataHandler;
	private final FolderMapper folderMapper;

	@Transactional(readOnly = true)
	public FolderResult getFolder(FolderCommand.Read command) {
		Folder folder = folderDataHandler.getFolder(command.folderId());

		validateFolderAccess(command.userId(), folder);

		return folderMapper.toResult(folder);
	}

	@Transactional(readOnly = true)
	public List<FolderResult> getChildFolderList(FolderCommand.Read command) {
		Folder folder = folderDataHandler.getFolder(command.folderId());

		validateFolderAccess(command.userId(), folder);

		return folderDataHandler.getFolderListPreservingOrder(folder.getChildFolderOrderList())
			.stream()
			.map(folderMapper::toResult)
			.toList();
	}

	@Transactional(readOnly = true)
	public FolderResult getRootFolder(Long userId) {
		return folderMapper.toResult(folderDataHandler.getRootFolder(userId));
	}

	@Transactional(readOnly = true)
	public FolderResult getRecycleBin(Long userId) {
		return folderMapper.toResult(folderDataHandler.getRecycleBin(userId));
	}

	@Transactional(readOnly = true)
	public FolderResult getUnclassifiedFolder(Long userId) {
		return folderMapper.toResult(folderDataHandler.getUnclassifiedFolder(userId));
	}

	@Transactional
	public FolderResult saveFolder(FolderCommand.Create command) {
		return folderMapper.toResult(folderDataHandler.saveFolder(command));
	}

	@Transactional
	public FolderResult updateFolder(FolderCommand.Update command) {

		Folder folder = folderDataHandler.getFolder(command.folderId());

		validateFolderAccess(command.userId(), folder);
		validateBasicFolderChange(folder);

		return folderMapper.toResult(folderDataHandler.updateFolder(command));
	}

	@Transactional
	public void moveFolder(FolderCommand.Move command) {

		List<Folder> folderList = folderDataHandler.getFolderList(command.folderIdList());

		for (Folder folder : folderList) {
			validateFolderAccess(command.userId(), folder);
			validateBasicFolderChange(folder);
		}

		// 부모가 다른 폴더들을 동시에 이동할 수 없음.
		Long parentFolderId = folderList.get(0).getParentFolder().getId();
		for (int i = 1; i < folderList.size(); i++) {
			if (parentFolderId.equals(folderList.get(i).getParentFolder().getId())) {
				throw ApiFolderException.INVALID_MOVE_TARGET();
			}
		}

		if (isParentFolderNotChanged(command, parentFolderId)) {
			folderDataHandler.moveFolderWithinParent(command);
		} else {
			folderDataHandler.moveFolderToDifferentParent(command);
		}
	}

	@Transactional
	public void deleteFolder(FolderCommand.Delete command) {

		List<Folder> folderList = folderDataHandler.getFolderList(command.folderIdList());

		for (Folder folder : folderList) {
			validateFolderAccess(command.userId(), folder);
			validateBasicFolderChange(folder);
		}

		folderDataHandler.deleteFolderList(command);
	}

	private boolean isParentFolderNotChanged(FolderCommand.Move command, Long parentFolderId) {
		return (command.destinationFolderId() == null || parentFolderId.equals(command.destinationFolderId()));
	}

	private void validateFolderAccess(Long userId, Folder folder) {
		if (!folder.getUser().getId().equals(userId)) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
	}

	private void validateBasicFolderChange(Folder folder) {
		if (FolderType.GENERAL != folder.getFolderType()) {
			throw ApiFolderException.BASIC_FOLDER_CANNOT_CHANGED();
		}
	}
}
