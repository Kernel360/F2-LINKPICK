package techpick.api.infrastructure.sharedFolder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.domain.sharedFolder.exception.ApiSharedFolderException;
import techpick.api.domain.user.exception.ApiUserException;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderRepository;
import techpick.core.model.sharedFolder.SharedFolder;
import techpick.core.model.sharedFolder.SharedFolderRepository;
import techpick.core.model.user.User;
import techpick.core.model.user.UserRepository;

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

    public List<SharedFolder> getByUserId(Long userId) {
        return sharedFolderRepository.findByUserId(userId);
    }

    public void deleteByUUID(UUID uuid) {
        sharedFolderRepository.deleteById(uuid);
    }

    public Optional<UUID> findUUIDBySourceFolderId(Long sourceFolderId) {
        return sharedFolderRepository.findByFolderId(sourceFolderId).map(SharedFolder::getId);
    }
}
