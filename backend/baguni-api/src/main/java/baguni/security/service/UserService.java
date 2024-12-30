package baguni.security.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import baguni.domain.infrastructure.user.UserDataHandler;
import baguni.security.exception.ApiAuthException;
import baguni.security.handler.BaguniOAuth2FlowFailureHandler;
import lombok.RequiredArgsConstructor;
import baguni.common.annotation.BaguniAnnotation;
import baguni.domain.model.folder.Folder;
import baguni.domain.model.folder.FolderRepository;
import baguni.domain.model.user.User;
import baguni.domain.model.user.UserRepository;
import baguni.security.model.OAuth2UserInfo;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

	private final UserDataHandler userDataHandler;
	private final UserRepository userRepository;
	private final FolderRepository folderRepository;

	/**
	 *  기본 폴더 생성 실패시 롤백, 회원 가입 무효 처리
	 *  이후 {@link BaguniOAuth2FlowFailureHandler} 에서
	 *  클라이언ㅌ 에러 페이지로 리다이렉트
	 */
	@Transactional
	@BaguniAnnotation.MeasureTime
	public User createUser(OAuth2UserInfo userInfo) {
		var user = User.createSocialUser(
			userInfo.getProvider(),
			userInfo.getName(),
			userInfo.getEmail()
		);
		var savedUser = userRepository.save(user);
		createMandatoryFolder(savedUser);
		return savedUser;
	}

	public boolean isUserExist(String socialProviderId) {
		return userRepository.existsBySocialProviderId(socialProviderId);
	}

	@Transactional
	public void deleteUser(Long userId) {
		userDataHandler.deleteUser(userId);
	}

	private void createMandatoryFolder(User user) {
		try {
			folderRepository.save(Folder.createEmptyUnclassifiedFolder(user));
			folderRepository.save(Folder.createEmptyRecycleBinFolder(user));
			folderRepository.save(Folder.createEmptyRootFolder(user));
		} catch (Exception e) {
			throw ApiAuthException.USER_MANDATORY_FOLDER_CREATE_FAILED();
		}
	}
}
