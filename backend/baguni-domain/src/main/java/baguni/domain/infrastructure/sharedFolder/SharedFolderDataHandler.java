package baguni.domain.infrastructure.sharedFolder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Component;

import baguni.domain.model.folder.Folder;
import baguni.domain.infrastructure.folder.FolderRepository;
import baguni.domain.model.sharedFolder.SharedFolder;
import baguni.domain.model.user.User;
import baguni.domain.infrastructure.user.UserRepository;
import lombok.RequiredArgsConstructor;
import baguni.domain.exception.folder.ApiFolderException;
import baguni.domain.exception.sharedFolder.ApiSharedFolderException;
import baguni.domain.exception.user.ApiUserException;

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
