package baguni.api.infrastructure.sharedFolder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import baguni.api.domain.folder.exception.ApiFolderException;
import baguni.api.domain.sharedFolder.exception.ApiSharedFolderException;
import baguni.api.domain.user.exception.ApiUserException;
import baguni.core.model.folder.Folder;
import baguni.core.model.folder.FolderRepository;
import baguni.core.model.sharedFolder.SharedFolder;
import baguni.core.model.sharedFolder.SharedFolderRepository;
import baguni.core.model.user.User;
import baguni.core.model.user.UserRepository;

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
