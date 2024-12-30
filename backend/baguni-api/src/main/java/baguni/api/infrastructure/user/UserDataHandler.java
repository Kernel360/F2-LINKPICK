package baguni.api.infrastructure.user;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import baguni.entity.model.folder.FolderRepository;
import baguni.entity.model.pick.PickRepository;
import baguni.entity.model.pick.PickTagRepository;
import baguni.entity.model.sharedFolder.SharedFolderRepository;
import baguni.entity.model.tag.TagRepository;
import baguni.entity.model.user.SocialType;
import lombok.RequiredArgsConstructor;
import baguni.api.service.user.exception.ApiUserException;
import baguni.entity.model.user.User;
import baguni.entity.model.user.UserRepository;

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
	public boolean existsBySocialProviderId(String socialProviderId) {
		return this.userRepository.existsBySocialProviderId(socialProviderId);
	}

	@Transactional(readOnly = true)
	public User getUser(Long userId) {
		return userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
	}

	@Transactional
	public User createUser(SocialType type, String name, String email) {
		return userRepository.save(User.SocialUser(type, name, email));
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
