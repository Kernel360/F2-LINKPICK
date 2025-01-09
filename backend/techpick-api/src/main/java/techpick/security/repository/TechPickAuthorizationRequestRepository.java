package techpick.security.repository;

import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import techpick.security.config.SecurityProperties;
import techpick.security.util.CookieUtil;

/**
 * OAuth2AuthorizationRequestRepository 란?
 * Reference: https://tech.kakao.com/posts/565
 */
@Component
@RequiredArgsConstructor
public class TechPickAuthorizationRequestRepository
	implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

	private final CookieUtil cookieUtil;
	private final SecurityProperties properties;
	private final AuthorizationRequestRepository<OAuth2AuthorizationRequest> defaultRepository
		= new HttpSessionOAuth2AuthorizationRequestRepository();

	@Override
	public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
		return defaultRepository.loadAuthorizationRequest(request);
	}

	/**
	 * 클라이언트가 query param으로 보낸 return_url을
	 * 시큐리티 인증 성공 시 유지하고자, 쿠키에 180초 동안 잠시 저장합니다.
	 *
	 * @author Minky
	 * */
	@Override
	public void saveAuthorizationRequest(
		OAuth2AuthorizationRequest authorizationRequest,
		HttpServletRequest request,
		HttpServletResponse response
	) {
		String returnUrl = request.getParameter(properties.OAUTH_SUCCESS_RETURN_URL_TOKEN_KEY);
		cookieUtil.addCookie(response, properties.OAUTH_SUCCESS_RETURN_URL_TOKEN_KEY, returnUrl, 180, true);
		defaultRepository.saveAuthorizationRequest(authorizationRequest, request, response);
	}

	@Override
	public OAuth2AuthorizationRequest removeAuthorizationRequest(
		HttpServletRequest request,
		HttpServletResponse response
	) {
		// save token cookie here.
		return defaultRepository.removeAuthorizationRequest(request, response);
	}
}