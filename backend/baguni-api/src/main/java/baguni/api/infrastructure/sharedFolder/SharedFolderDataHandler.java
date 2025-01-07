package baguni.api.infrastructure.sharedFolder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Component;

import baguni.entity.model.folder.Folder;
import baguni.entity.model.folder.FolderRepository;
import baguni.entity.model.sharedFolder.SharedFolder;
import baguni.entity.model.sharedFolder.SharedFolderRepository;
import baguni.entity.model.user.User;
import baguni.entity.model.user.UserRepository;
import lombok.RequiredArgsConstructor;
import baguni.api.service.folder.exception.ApiFolderException;
import baguni.api.service.sharedFolder.exception.ApiSharedFolderException;
import baguni.api.service.user.exception.ApiUserException;

@Component
@RequiredArgsConstructor
public class SharedFolderDataHandler {

	private final SharedFolderRepository sharedFolderRepository;
	private final UserRepository userRepository;
	private final FolderRepository folderRepository;

	public SharedFolder save(Long userId, Long folderId) {
		User user = userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
		Folder folder = folderRepository.findById(folderId).orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
		return sharedFolderRepository.save(SharedFolder.createSharedFolder(user, folder));
	}

	public SharedFolder getByUUID(UUID uuid) {
		return sharedFolderRepository.findById(uuid).orElseThrow(ApiSharedFolderException::SHARED_FOLDER_NOT_FOUND);
	}

	public SharedFolder getByFolderId(Long folderId) {
		return sharedFolderRepository
			.findByFolderId(folderId)
			.orElseThrow(ApiSharedFolderException::SHARED_FOLDER_NOT_FOUND);
	}

	public boolean isSharedFolder(Long folderId) {
		return sharedFolderRepository.findByFolderId(folderId).isPresent();
	}

	public List<SharedFolder> getByUserId(Long userId) {
		return sharedFolderRepository.findByUserId(userId);
	}

	public void deleteBySourceFolderId(Long sourceFolderId) {
		sharedFolderRepository.deleteByFolderId(sourceFolderId);
	}

	public Optional<UUID> findUUIDBySourceFolderId(Long sourceFolderId) {
		return sharedFolderRepository.findByFolderId(sourceFolderId).map(SharedFolder::getId);
	}
}
