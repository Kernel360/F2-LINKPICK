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
import techpick.security.config.SecurityConfig;
import techpick.security.model.OAuth2UserInfo;
import techpick.security.util.CookieUtil;
import techpick.security.util.JwtUtil;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JwtUtil jwtUtil;
	private final UserRepository userRepository;
	private static final Duration ACCESS_TOKEN_DURATION = Duration.ofDays(1);

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {

		var oAuth2UserInfo = (OAuth2UserInfo)authentication.getPrincipal();
		// TODO: custom exception 으로 변경 필요
		User user = userRepository.findBySocialProviderId(oAuth2UserInfo.getName()).orElseThrow();

		String accessToken = jwtUtil.getToken(user, ACCESS_TOKEN_DURATION);
		addAccessTokenToCookie(request, response, accessToken);

		// Frontend Local
		// response.sendRedirect("https://local.minlife.me:3000/login");

		// Frontend Test Server
		response.sendRedirect("https://app.minlife.me/login");

		super.clearAuthenticationAttributes(request);
		super.onAuthenticationSuccess(request, response, authentication);

	}

	private void addAccessTokenToCookie(HttpServletRequest request, HttpServletResponse response,
		String token) {

		int cookieMaxAge = (int)ACCESS_TOKEN_DURATION.toSeconds();

		CookieUtil.deleteCookie(request, response, SecurityConfig.ACCESS_TOKEN_KEY);
		CookieUtil.addAccessToken(response, token, cookieMaxAge);
	}
}