package baguni.security.service;

import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.Map;
import java.util.Queue;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import baguni.api.service.user.service.UserService;
import baguni.api.service.user.service.strategy.StarterFolderStrategy;
import baguni.security.exception.ApiAuthException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.security.config.OAuth2AttributeConfigProvider;
import baguni.security.model.OAuth2UserInfo;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2Service extends DefaultOAuth2UserService {

	private final OAuth2AttributeConfigProvider configProvider;
	private final StarterFolderStrategy starterFolderStrategy;
	private final UserService userService;

	/**
	 * [ 구글 사용 예시 ]
	 * --------------------------------------
	 * 1) authorization_code를 구글에게 받는다.
	 * 2) code를 구글에게 제출한다.
	 * 3) 구글에게 사용자 정보 획득용 토큰을 받는다.
	 * 4) 토큰으로 사용자 정보를 다시 구글에게 요청한다.
	 * 5) 구글이 사용자 정보 필드를 보내준다.
	 * 6) 이 필드를 이용해서 사용자 정보를 획득한다.
	 *    (사용자 정보 필드 : https://developers.google.com/identity/openid-connect/openid-connect?hl=ko#obtainuserinfo)
	 *    ('sub' 필드는 모든 Google 계정에서 고유하며 재사용되지 않습니다.)
	 * 7) 사용자 정보를 통해 `sub`, `email`을 획득한다.
	 * -
	 * [ 카카오 예시 ]
	 * --------------------------------------
	 * 1) 카카오의 userInfo 응답 필드
	 *    id = 회원 번호
	 *    https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info-response-body
	 */
	@Override
	public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
		var provider = request.getClientRegistration().getRegistrationId();
		var oAuthUser = super.loadUser(request);
		var oAuthInfo = new OAuth2UserInfo(provider, getAttributes(oAuthUser, provider));

		if (false == userService.isSocialUserExists(oAuthInfo)) {
			var newUser = userService.createSocialUser(oAuthInfo);
			starterFolderStrategy.initRootFolder(newUser);
		}
		return oAuthInfo;
	}

	private Map<String, Object> getAttributes(OAuth2User oAuth2User, String provider) {
		Map<String, String> config = configProvider.getAttributeConfig(provider);
		Map<String, Object> attributes = new HashMap<>();
		for (String key : config.keySet()) {
			Object value = searchAttribute(config.get(key), oAuth2User.getAttributes());
			attributes.put(key, value);
		}
		return attributes;
	}

	// TODO: 응답 body 에서 직접 값을 받아오는 형식으로 리팩토링 필요
	// BFS 로 nested map 구조를 탐색
	private Object searchAttribute(String targetKey, Map<String, Object> map) {
		Queue<Map<String, Object>> queue = new ArrayDeque<>();
		queue.add(map);
		while (!queue.isEmpty()) {
			var curMap = queue.poll();
			for (String key : curMap.keySet()) {
				Object value = curMap.get(key);
				if (key.equals(targetKey)) {
					return value;
				} else if (value instanceof Map<?, ?>) {
					queue.add((Map<String, Object>)value);
				}
			}
		}
		throw ApiAuthException.OAUTH_TOKEN_ATTRIBUTE_NOT_FOUND(targetKey);
	}
}
