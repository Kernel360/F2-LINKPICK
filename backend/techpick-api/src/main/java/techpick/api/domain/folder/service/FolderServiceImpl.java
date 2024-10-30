package techpick.api.domain.folder.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.folder.dto.FolderCommand;
import techpick.api.domain.folder.dto.FolderMapper;
import techpick.api.domain.folder.dto.FolderResult;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.infrastructure.folder.FolderAdaptor;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderType;

@Service
@RequiredArgsConstructor
public class FolderServiceImpl implements FolderService {

	private final FolderAdaptor folderAdaptor;
	private final FolderMapper folderMapper;

	@Override
	@Transactional(readOnly = true)
	public FolderResult getFolder(FolderCommand.Read command) {
		Folder folder = folderAdaptor.getFolder(command.folderId());

		validateFolderAccess(command.userId(), folder);

		return folderMapper.toResult(folder);
	}

	@Override
	@Transactional(readOnly = true)
	public List<FolderResult> getChildFolderList(FolderCommand.Read command) {
		Folder folder = folderAdaptor.getFolder(command.folderId());

		validateFolderAccess(command.userId(), folder);

		return folderAdaptor.getFolderListPreservingOrder(folder.getChildFolderOrderList())
			.stream()
			.map(folderMapper::toResult)
			.toList();
	}

	@Override
	@Transactional(readOnly = true)
	public FolderResult getRootFolder(Long userId) {
		return folderMapper.toResult(folderAdaptor.getRootFolder(userId));
	}

	@Override
	@Transactional(readOnly = true)
	public FolderResult getRecycleBin(Long userId) {
		return folderMapper.toResult(folderAdaptor.getRecycleBin(userId));
	}

	@Override
	@Transactional(readOnly = true)
	public FolderResult getUnclassifiedFolder(Long userId) {
		return folderMapper.toResult(folderAdaptor.getUnclassifiedFolder(userId));
	}

	@Override
	@Transactional
	public FolderResult saveFolder(FolderCommand.Create command) {
		return folderMapper.toResult(folderAdaptor.saveFolder(command));
	}

	@Override
	@Transactional
	public FolderResult updateFolder(FolderCommand.Update command) {

		Folder folder = folderAdaptor.getFolder(command.folderId());

		validateFolderAccess(command.userId(), folder);
		validateBasicFolderChange(folder);

		return folderMapper.toResult(folderAdaptor.updateFolder(command));
	}

	@Override
	@Transactional
	public void moveFolder(FolderCommand.Move command) {

		List<Folder> folderList = folderAdaptor.getFolderList(command.folderIdList());

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
			folderAdaptor.moveFolderWithinParent(command);
		} else {
			folderAdaptor.moveFolderToDifferentParent(command);
		}
	}

	@Override
	@Transactional
	public void deleteFolder(FolderCommand.Delete command) {

		List<Folder> folderList = folderAdaptor.getFolderList(command.folderIdList());

		for (Folder folder : folderList) {
			validateFolderAccess(command.userId(), folder);
			validateBasicFolderChange(folder);
		}

		folderAdaptor.deleteFolderList(command);
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
