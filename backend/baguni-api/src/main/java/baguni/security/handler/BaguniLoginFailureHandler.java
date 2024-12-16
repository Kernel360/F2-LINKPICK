package baguni.security.handler;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import baguni.core.exception.level.ErrorLevel;
import baguni.security.config.SecurityProperties;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BaguniLoginFailureHandler implements AuthenticationFailureHandler {

	private final SecurityProperties properties;

	@Override
	public void onAuthenticationFailure(
		HttpServletRequest request, HttpServletResponse response,
		AuthenticationException exception
	) throws IOException {
		final String loginErrorPagePath = "/login/failed";
		ErrorLevel.SHOULD_NOT_HAPPEN().handleError(exception);
		response.sendRedirect(properties.getDefaultRedirectUrl() + loginErrorPagePath);
	}
}