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

/**
 * TODO: 프론트엔드가 인증 로직을 주도하는 쪽으로 변경될 예정이며
 *       이에 따라 아래 핸들러 역시 삭제될 예정입니다.
 */
@Component
@RequiredArgsConstructor
public class BaguniOAuth2FlowFailureHandler implements AuthenticationFailureHandler {

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