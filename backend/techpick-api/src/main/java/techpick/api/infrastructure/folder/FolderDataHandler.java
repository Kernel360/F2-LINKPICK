package techpick.api.infrastructure.folder;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.folder.dto.FolderCommand;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.domain.user.exception.ApiUserException;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderRepository;
import techpick.core.model.user.User;
import techpick.core.model.user.UserRepository;

@Component
@RequiredArgsConstructor
public class FolderDataHandler {

	private final FolderRepository folderRepository;
	private final UserRepository userRepository;

	@Transactional(readOnly = true)
	public Folder getFolder(Long folderId) {
		return folderRepository.findById(folderId).orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
	}

	// idList에 포함된 모든 ID에 해당하는 폴더 리스트 조회, 순서를 보장하지 않음
	@Transactional(readOnly = true)
	public List<Folder> getFolderList(List<Long> folderIdList) {
		List<Folder> folderList = folderRepository.findAllById(folderIdList);
		// 조회리스트에 존재하지 않는 태그id가 존재하면 예외 발생
		if (folderList.size() != folderIdList.size()) {
			throw ApiFolderException.FOLDER_NOT_FOUND();
		}
		return folderList;
	}

	// idList에 포함된 모든 ID에 해당하는 폴더 리스트 조회, 순서는 idList의 순서를 따름
	@Transactional(readOnly = true)
	public List<Folder> getFolderListPreservingOrder(List<Long> folderIdList) {
		List<Folder> folderList = folderRepository.findAllById(folderIdList);
		// 조회리스트에 존재하지 않는 태그id가 존재하면 예외 발생
		if (folderList.size() != folderIdList.size()) {
			throw ApiFolderException.FOLDER_NOT_FOUND();
		}
		folderList.sort(Comparator.comparing(folder -> folderIdList.indexOf(folder.getId())));
		return folderList;
	}

	@Transactional(readOnly = true)
	public List<Folder> getFolderListByUserId(Long userId) {
		return folderRepository.findByUserId(userId);
	}

	@Transactional(readOnly = true)
	public Folder getRootFolder(Long userId) {
		return folderRepository.findRootByUserId(userId);
	}

	@Transactional(readOnly = true)
	public Folder getRecycleBin(Long userId) {
		return folderRepository.findRecycleBinByUserId(userId);
	}

	@Transactional(readOnly = true)
	public Folder getUnclassifiedFolder(Long userId) {
		return folderRepository.findUnclassifiedByUserId(userId);
	}

	@Transactional
	public Folder saveFolder(FolderCommand.Create command) {
		User user = userRepository.findById(command.userId()).orElseThrow(ApiUserException::USER_NOT_FOUND);
		Folder parentFolder = folderRepository.findById(command.parentFolderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);

		Folder folder = folderRepository.save(Folder.createEmptyGeneralFolder(user, parentFolder, command.name()));
		folder.getParentFolder().addChildFolderIdOrdered(folder.getId());
		return folder;
	}

	@Transactional
	public Folder updateFolder(FolderCommand.Update command) {
		Folder folder = folderRepository.findById(command.id())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
		folder.updateFolderName(command.name());

		return folder;
	}

	@Transactional
	public List<Long> moveFolderWithinParent(FolderCommand.Move command) {
		Folder parentFolder = folderRepository.findById(command.parentFolderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);

		parentFolder.updateChildFolderIdOrderedList(command.idList(), command.orderIdx());
		return parentFolder.getChildFolderIdOrderedList();
	}

	@Transactional
	public List<Long> moveFolderToDifferentParent(FolderCommand.Move command) {
		Folder folder = folderRepository.findById(command.idList().get(0))
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);

		Folder oldParent = folder.getParentFolder();
		oldParent.getChildFolderIdOrderedList().removeAll(command.idList());

		Folder newParent = folderRepository.findById(command.destinationFolderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
		newParent.addChildFolderIdOrderedList(command.idList(), command.orderIdx());

		List<Folder> folderList = getFolderList(command.idList());
		for (Folder moveFolder : folderList) {
			moveFolder.updateParentFolder(newParent);
		}

		return newParent.getChildFolderIdOrderedList();
	}

	@Transactional
	public void deleteFolderList(FolderCommand.Delete command) {

		List<Folder> deleteList = new ArrayList<>();

		for (Long id : command.idList()) {
			Folder folder = folderRepository.findById(id)
				.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);

			Folder parentFolder = folder.getParentFolder();
			parentFolder.getChildFolderIdOrderedList().remove(folder.getId());

			deleteList.add(folder);
		}

		folderRepository.deleteAllInBatch(deleteList);
	}
}
