package baguni.api.service.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import baguni.api.infrastructure.folder.FolderDataHandler;
import baguni.api.infrastructure.user.UserDataHandler;
import baguni.entity.model.user.SocialType;
import baguni.api.service.user.dto.UserInfo;
import baguni.api.service.user.exception.ApiUserException;
import baguni.security.exception.ApiAuthException;
import lombok.RequiredArgsConstructor;
import baguni.common.annotation.BaguniAnnotation;
import baguni.entity.model.user.User;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

	private final UserDataHandler userDataHandler;
	private final FolderDataHandler folderDataHandler;

	@Transactional
	@BaguniAnnotation.MeasureTime
	public UserInfo createUser(SocialType socialType, String username, String email) {
		var user = userDataHandler.createUser(socialType, username, email);
		try {
			folderDataHandler.createMandatoryFolder(user);
			return UserInfo.from(user);
		} catch (Exception e) {
			throw ApiAuthException.AUTHENTICATION_SERVER_FAILURE();
		}
	}

	public boolean isUserExist(String socialProviderId) {
		return userDataHandler.existsBySocialProviderId(socialProviderId);
	}

	@Transactional
	public void deleteUser(Long userId) {
		userDataHandler.deleteUser(userId);
	}
}
