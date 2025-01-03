package baguni.api.service.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import baguni.api.infrastructure.folder.FolderDataHandler;
import baguni.api.infrastructure.user.UserDataHandler;
import baguni.api.service.user.dto.UserInfo;
import baguni.entity.model.util.IDToken;
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

	@Transactional
	public void renewIdToken(IDToken prevToken) {
		var newToken = userDataHandler.getUser(prevToken).renewIdToken();
		log.info("Renewing user id token. prev: {}, new: {}", prevToken, newToken);
	}

	@Transactional
	public void deleteUser(Long userId) {
		userDataHandler.deleteUser(userId);
	}
}
