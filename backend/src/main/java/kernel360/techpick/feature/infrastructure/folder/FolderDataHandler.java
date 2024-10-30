package kernel360.techpick.feature.infrastructure.folder;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import kernel360.techpick.core.model.folder.Folder;
import kernel360.techpick.core.model.folder.FolderRepository;
import kernel360.techpick.core.model.user.User;
import kernel360.techpick.core.model.user.UserRepository;
import kernel360.techpick.feature.domain.folder.dto.FolderCommand;
import kernel360.techpick.feature.domain.folder.dto.FolderMapper;
import kernel360.techpick.feature.domain.folder.exception.ApiFolderException;
import kernel360.techpick.feature.domain.user.exception.ApiUserException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FolderDataHandler {

	private final FolderRepository folderRepository;
	private final UserRepository userRepository;
	private final FolderMapper folderMapper;

	@Transactional(readOnly = true)
	public Folder getFolder(Long folderId) {
		return folderRepository.findById(folderId).orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
	}

	// idList에 포함된 모든 ID에 해당하는 폴더 리스트 조회, 순서를 보장하지 않음
	@Transactional(readOnly = true)
	public List<Folder> getFolderList(List<Long> idList) {
		return folderRepository.findAllById(idList);
	}

	// idList에 포함된 모든 ID에 해당하는 폴더 리스트 조회, 순서는 idList의 순서를 따름
	@Transactional(readOnly = true)
	public List<Folder> getFolderListPreservingOrder(List<Long> idList) {
		var folderList = folderRepository.findAllById(idList);
		folderList.sort(Comparator.comparing(folder -> idList.indexOf(folder.getId())));
		return folderList;
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

	// TODO: Folder Entity 생성 메서드 활용하도록 변경
	@Transactional
	public Folder saveFolder(FolderCommand.Create command) {
		User user = userRepository.findById(command.userId()).orElseThrow(ApiUserException::USER_NOT_FOUND);
		Folder parentFolder = folderRepository.findById(command.parentFolderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);

		return folderRepository.save(folderMapper.toEntity(command, user, parentFolder));
	}

	@Transactional
	public Folder updateFolder(FolderCommand.Update command) {
		Folder folder = folderRepository.findById(command.folderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
		folder.updateFolderName(command.name());

		return folder;
	}

	@Transactional
	public List<Long> moveFolderWithinParent(FolderCommand.Move command) {
		Folder parentFolder = folderRepository.findById(command.destinationFolderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);

		parentFolder.getChildFolderOrderList().removeAll(command.folderIdList());
		parentFolder.getChildFolderOrderList().addAll(command.orderIdx(), command.folderIdList());

		return parentFolder.getChildFolderOrderList();
	}

	@Transactional
	public List<Long> moveFolderToDifferentParent(FolderCommand.Move command) {
		Folder folder = folderRepository.findById(command.folderIdList().get(0))
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);

		Folder oldParent = folder.getParentFolder();
		oldParent.getChildFolderOrderList().removeAll(command.folderIdList());

		Folder newParent = folderRepository.findById(command.destinationFolderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
		newParent.getChildFolderOrderList().addAll(command.orderIdx(), command.folderIdList());

		folder.updateParentFolder(newParent);

		return newParent.getChildFolderOrderList();
	}

	@Transactional
	public void deleteFolderList(FolderCommand.Delete command) {

		List<Folder> deleteList = new ArrayList<>();

		for (Long id : command.folderIdList()) {
			Folder folder = folderRepository.findById(id)
				.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);

			Folder parentFolder = folder.getParentFolder();
			parentFolder.getChildFolderOrderList().remove(folder.getId());

			deleteList.add(folder);
		}

		folderRepository.deleteAllInBatch(deleteList);
	}
}