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

	@Override
	public void logout(
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication
	) {
		cookieUtil.clearCookies(response);
	}

	@Override
	public void onLogoutSuccess(
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication
	) {
		response.setStatus(HttpServletResponse.SC_OK);
	}
}