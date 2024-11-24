package techpick.api.infrastructure.sharedFolder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.sharedFolder.exception.ApiSharedFolderException;
import techpick.api.domain.user.exception.ApiUserException;
import techpick.core.model.sharedFolder.SharedFolder;
import techpick.core.model.sharedFolder.SharedFolderRepository;
import techpick.core.model.user.User;
import techpick.core.model.user.UserRepository;

@Component
@RequiredArgsConstructor
public class SharedFolderDataHandler {

	private final SharedFolderRepository sharedFolderRepository;
	private final UserRepository userRepository;

	public SharedFolder save(Long userId, String jsonData, LocalDateTime createdAt) {
		User user = userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
		return sharedFolderRepository.save(SharedFolder.createSharedFolder(user, jsonData, createdAt));
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
}
