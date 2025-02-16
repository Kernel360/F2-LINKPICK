package baguni.security.exception;

import org.springframework.security.core.AuthenticationException;

import baguni.common.exception.base.ErrorCode;
import baguni.security.handler.BaguniApiAuthExceptionEntrypoint;
import baguni.security.handler.BaguniOAuth2FlowFailureHandler;

/**
 * @author minkyeu kim
 * ServiceException 은 Runtime Exception을 상속받기 때문에 Security에서 잡히지 않는다.
 * 따라서 Security를 통하기 위해 AuthenticationException을 상속 받도록 한다.
 *
 * 1. OAuth 흐름 이전 / 이후 부터는 프론트가 주도권을 받기 때문에 에러 코드를 받을 수 있다.
 *    이 경우는 {@link BaguniApiAuthExceptionEntrypoint}
 *    에서 에러 코드 반환을 처리한다.
 *
 * 2. OAuth 로그인 버튼을 클릭하면, 현재 구현상 모든 주도권이 서버에게 넘어간다.
 *    (모듈로는 Spring OAuth2Client 라이브러리가 주도)
 *    따라서 여기부터는 프론트엔드가 에러 코드를 받지 못한다.
 *    이 경우 OAuth 흐름을 시작한 후를 전담하는 {@link BaguniOAuth2FlowFailureHandler}
 *    에서 페이지 리다이렉션을 처리한다.
 *
 * - 참고 시큐리티 설정
 *   {@link baguni.security.config.SecurityConfig} 에 두 핸들러가 명시된 위치를 참고 바랍니다.
 */
public class SecurityException extends AuthenticationException {

	private final ErrorCode errorCode;

	public SecurityException(ErrorCode errorCode) {
		super(errorCode.toString());
		this.errorCode = errorCode;
	}

	public SecurityException(ErrorCode errorCode, String additionalHint) {
		super(errorCode.toString() + ": " + additionalHint);
		this.errorCode = errorCode;
	}
}