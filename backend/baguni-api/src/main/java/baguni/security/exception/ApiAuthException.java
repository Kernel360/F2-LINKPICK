package baguni.security.exception;

import org.springframework.security.core.AuthenticationException;

import baguni.security.handler.BaguniApiAuthExceptionEntrypoint;
import baguni.security.handler.BaguniOAuth2FlowFailureHandler;

/**
 * @author minkyeu kim
 * ApiException 은 Runtime Exception을 상속받기 때문에 Security에서 잡히지 않는다.
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
public class ApiAuthException extends AuthenticationException {

	private final ApiAuthErrorCode errorCode;

	public ApiAuthException(ApiAuthErrorCode errorCode, String message) {
		super(errorCode.toString() + ": " + message);
		this.errorCode = errorCode;
	}

	public ApiAuthException(ApiAuthErrorCode errorCode) {
		super(errorCode.toString());
		this.errorCode = errorCode;
	}

	public static ApiAuthException SOCIAL_TYPE_INVALID() {
		return new ApiAuthException(ApiAuthErrorCode.AUTH_SOCIAL_TYPE_INVALID);
	}

	public static ApiAuthException INVALID_AUTHENTICATION() {
		return new ApiAuthException(ApiAuthErrorCode.AUTH_INVALID_AUTHENTICATION);
	}

	public static ApiAuthException OAUTH_TOKEN_ATTRIBUTE_NOT_FOUND(String targetTokenKey) {
		return new ApiAuthException(ApiAuthErrorCode.AUTH_TOKEN_ATTRIBUTE_NOT_FOUND, targetTokenKey);
	}

	/**
	 * 기본 폴더 생성 실패시 회원 가입 자체를 실패시켜야 하고, <br>
	 * 이를 security에서 잡아서 app.baguni.kr/login/failed 로 리다이렉트 시켜야 하기 때문에 <br>
	 * 사용자 생성 실패를 OAuth2 예외로 처리함.
	 */
	public static ApiAuthException USER_MANDATORY_FOLDER_CREATE_FAILED() {
		return new ApiAuthException(ApiAuthErrorCode.AUTH_USER_MANDATORY_FOLDER_CREATE_FAILED);
	}
}