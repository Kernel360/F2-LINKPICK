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

import baguni.api.domain.user.service.strategy.StarterFolderStrategy;
import baguni.core.model.user.User;
import baguni.security.exception.ApiOAuth2Exception;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.api.domain.user.service.UserService;
import baguni.security.config.OAuth2AttributeConfigProvider;
import baguni.security.model.OAuth2UserInfo;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2Service extends DefaultOAuth2UserService {

	private final OAuth2AttributeConfigProvider configProvider;
	private final StarterFolderStrategy starterFolderStrategy;
	private final UserService userService;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		String provider = userRequest.getClientRegistration().getRegistrationId();
		var oAuth2User = super.loadUser(userRequest);
		Map<String, Object> attributes = getAttributes(oAuth2User, provider);
		OAuth2UserInfo oAuth2UserInfo = new OAuth2UserInfo(provider, attributes);

		if (!userService.isUserExist(oAuth2UserInfo.getName())) {
			User user = userService.createUser(oAuth2UserInfo);
			starterFolderStrategy.initRootFolder(user);
		}
		return oAuth2UserInfo;
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
		throw ApiOAuth2Exception.OAUTH_TOKEN_ATTRIBUTE_NOT_FOUND(targetKey);
	}
}
