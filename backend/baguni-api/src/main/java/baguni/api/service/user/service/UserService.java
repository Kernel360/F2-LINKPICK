package baguni.api.service.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import baguni.domain.infrastructure.folder.FolderDataHandler;
import baguni.api.infrastructure.user.UserDataHandler;
import baguni.domain.infrastructure.user.dto.UserInfo;
import baguni.domain.model.util.IDToken;
import baguni.security.exception.ApiAuthException;
import baguni.security.model.OAuth2UserInfo;
import lombok.RequiredArgsConstructor;
import baguni.common.annotation.MeasureTime;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

	private final UserDataHandler userDataHandler;
	private final FolderDataHandler folderDataHandler;

	@MeasureTime
	@Transactional
	public UserInfo createSocialUser(OAuth2UserInfo oAuthInfo) {
		var user = userDataHandler.createSocialUser(oAuthInfo);
		try {
			folderDataHandler.createMandatoryFolder(user);
			return UserInfo.from(user);
		} catch (Exception e) {
			throw ApiAuthException.AUTHENTICATION_SERVER_FAILURE();
		}
	}

	@Transactional(readOnly = true)
	public boolean isSocialUserExists(OAuth2UserInfo oAuthInfo) {
		return userDataHandler.findSocialUser(oAuthInfo.getProvider(), oAuthInfo.getProviderId())
							  .isPresent();
	}

	@Transactional(readOnly = true)
	public UserInfo getUserInfoByToken(IDToken idToken) {
		var user = userDataHandler.getUser(idToken);
		return UserInfo.from(user);
	}

	@Transactional(readOnly = true)
	public UserInfo getUserInfoById(Long userId) {
		var user = userDataHandler.getUser(userId);
		return UserInfo.from(user);
	}

	@Transactional
	public void deleteUser(Long userId) {
		userDataHandler.deleteUser(userId);
	}
}
