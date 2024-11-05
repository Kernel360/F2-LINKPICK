package techpick.api.domain.folder.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.folder.dto.FolderCommand;
import techpick.api.domain.folder.dto.FolderMapper;
import techpick.api.domain.folder.dto.FolderResult;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderType;

@Service
@RequiredArgsConstructor
public class FolderService {

	private final FolderDataHandler folderDataHandler;
	private final FolderMapper folderMapper;

	@Transactional(readOnly = true)
	public FolderResult getFolder(FolderCommand.Read command) {
		Folder folder = folderDataHandler.getFolder(command.id());

		validateFolderAccess(command.userId(), folder);

		return folderMapper.toResult(folder);
	}

	@Transactional(readOnly = true)
	public List<FolderResult> getChildFolderList(FolderCommand.Read command) {
		Folder folder = folderDataHandler.getFolder(command.id());

		validateFolderAccess(command.userId(), folder);

		return folderDataHandler.getFolderListPreservingOrder(folder.getChildFolderOrderList())
			.stream()
			.map(folderMapper::toResult)
			.toList();
	}

	// TODO: 현재는 1depth만 반환하고 있지만, 추후 ~3depth까지 반환할 예정
	@Transactional(readOnly = true)
	public List<FolderResult> getAllRootFolderList(Long userId) {
		Folder rootFolder = folderDataHandler.getRootFolder(userId);

		List<FolderResult> folderList = new ArrayList<>();
		folderList.add(folderMapper.toResult(rootFolder));

		rootFolder.getChildFolderOrderList().stream()
			.map(folderDataHandler::getFolder)
			.map(folderMapper::toResult)
			.forEach(folderList::add);

		return folderList;
	}

	@Transactional(readOnly = true)
	public List<FolderResult> getBasicFolderList(Long userId) {
		return Stream.of(
				folderDataHandler.getRootFolder(userId),
				folderDataHandler.getUnclassifiedFolder(userId),
				folderDataHandler.getRecycleBin(userId)
			)
			.map(folderMapper::toResult)
			.toList();
	}

	@Transactional
	public FolderResult saveFolder(FolderCommand.Create command) {
		return folderMapper.toResult(folderDataHandler.saveFolder(command));
	}

	@Transactional
	public FolderResult updateFolder(FolderCommand.Update command) {

		Folder folder = folderDataHandler.getFolder(command.id());

		validateFolderAccess(command.userId(), folder);
		validateBasicFolderChange(folder);

		return folderMapper.toResult(folderDataHandler.updateFolder(command));
	}

	@Transactional
	public void moveFolder(FolderCommand.Move command) {

		List<Folder> folderList = folderDataHandler.getFolderList(command.idList());

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

		List<Folder> folderList = folderDataHandler.getFolderList(command.idList());

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
