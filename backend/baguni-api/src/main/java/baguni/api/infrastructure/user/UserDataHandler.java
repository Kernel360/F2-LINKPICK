package baguni.api.infrastructure.user;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import baguni.core.model.folder.FolderRepository;
import baguni.core.model.pick.PickRepository;
import baguni.core.model.pick.PickTagRepository;
import baguni.core.model.sharedFolder.SharedFolderRepository;
import baguni.core.model.tag.TagRepository;
import lombok.RequiredArgsConstructor;
import baguni.api.domain.user.exception.ApiUserException;
import baguni.core.model.user.User;
import baguni.core.model.user.UserRepository;

@Component
@RequiredArgsConstructor
public class UserDataHandler {

	private final UserRepository userRepository;
	private final FolderRepository folderRepository;
	private final SharedFolderRepository sharedFolderRepository;
	private final PickRepository pickRepository;
	private final PickTagRepository pickTagRepository;
	private final TagRepository tagRepository;

	@Transactional(readOnly = true)
	public User getUser(Long userId) {
		return userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
	}

	/**
	 * @author sangwon
	 * 회원 탈퇴 기능
	 */
	@Transactional
	public void deleteUser(Long userId) {
		List<Long> pickIdList = pickRepository.findIdAllByUserId(userId);
		pickTagRepository.deleteAllByPickList(pickIdList);
		pickRepository.deleteAllByIdInBatch(pickIdList);
		tagRepository.deleteByUserId(userId);
		sharedFolderRepository.deleteByUserId(userId);
		folderRepository.deleteByUserId(userId);
		userRepository.deleteById(userId);
	}
}