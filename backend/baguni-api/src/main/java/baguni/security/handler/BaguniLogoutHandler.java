package baguni.security.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import baguni.security.config.SecurityProperties;
import baguni.security.util.CookieUtil;

@Component
@RequiredArgsConstructor
public class BaguniLogoutHandler implements LogoutHandler, LogoutSuccessHandler {

	private final CookieUtil cookieUtil;
	private final SecurityProperties properties;

	@Override
	public void logout(
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication
	) {
		clearCookies(response);
	}

	@Override
	public void onLogoutSuccess(
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication
	) {
		response.setStatus(HttpServletResponse.SC_OK);
	}

	/**
	 * @author sangwon
	 * 쿠키 삭제 메서드 분리 (공통으로 사용하기 위함)
	 * 시큐리티, 쿠키를 제거해주고 싶은 컨트롤러에서 사용하기 위해 분리
	 */
	public void clearCookies(HttpServletResponse response) {
		cookieUtil.deleteCookie(response, properties.ACCESS_TOKEN_KEY);
		cookieUtil.deleteCookie(response, "JSESSIONID");
	}
}