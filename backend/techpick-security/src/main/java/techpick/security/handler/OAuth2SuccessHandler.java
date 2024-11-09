package techpick.security.handler;

import java.io.IOException;
import java.time.Duration;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import techpick.core.model.user.User;
import techpick.core.model.user.UserRepository;
import techpick.security.config.SecurityProperties;
import techpick.security.exception.ApiOAuth2Exception;
import techpick.security.model.OAuth2UserInfo;
import techpick.security.util.CookieUtil;
import techpick.security.util.JwtUtil;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final CookieUtil cookieUtil;
	private final JwtUtil jwtUtil;
	private final UserRepository userRepository;
	private static final Duration ACCESS_TOKEN_DURATION = Duration.ofDays(1);
	private final SecurityProperties properties;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {

		var oAuth2UserInfo = (OAuth2UserInfo)authentication.getPrincipal();

		User user = userRepository.findBySocialProviderId(oAuth2UserInfo.getName())
			.orElseThrow(ApiOAuth2Exception::INVALID_AUTHENTICATION);

		String accessToken = jwtUtil.getToken(user, ACCESS_TOKEN_DURATION);

		var redirectUrl = cookieUtil.findCookieValue(request.getCookies(),
			properties.OAUTH_SUCCESS_RETURN_URL_TOKEN_KEY).orElse(properties.getDefaultRedirectUrl());

		addAccessTokenToCookie(request, response, accessToken);
		cookieUtil.deleteCookie(request, response, properties.OAUTH_SUCCESS_RETURN_URL_TOKEN_KEY);
		response.sendRedirect(redirectUrl);

		super.clearAuthenticationAttributes(request);
		super.onAuthenticationSuccess(request, response, authentication);
	}

	private void addAccessTokenToCookie(HttpServletRequest request, HttpServletResponse response,
		String token) {

		int cookieMaxAge = (int)ACCESS_TOKEN_DURATION.toSeconds();

		cookieUtil.deleteCookie(request, response, properties.ACCESS_TOKEN_KEY);
		cookieUtil.addCookie(
			response,
			properties.ACCESS_TOKEN_KEY,
			token,
			cookieMaxAge,
			true
		);
		cookieUtil.addCookie(
			response,
			properties.LOGIN_FLAG_FOR_FRONTEND,
			"true",
			cookieMaxAge,
			false
		);
	}
}