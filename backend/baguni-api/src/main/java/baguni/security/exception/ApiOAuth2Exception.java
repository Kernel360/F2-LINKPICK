package baguni.security.exception;

import org.springframework.security.oauth2.core.OAuth2AuthenticationException;

import lombok.extern.slf4j.Slf4j;

/**
 * @author minkyeu kim
 * ApiException 은 Runtime Exception을 상속받기 때문에 Security에서 잡히지 않는다. <br>
 * Security를 통하기 위해 AuthenticationException을 상속 받도록 하며, <br>
 * {@link baguni.security.handler.BaguniLoginFailureHandler} 에서 해당 예외를 처리한다.
 */
@Slf4j
public class ApiOAuth2Exception extends OAuth2AuthenticationException {

	public ApiOAuth2Exception(String message) {
		super(message);
	}

	public static ApiOAuth2Exception SOCIAL_TYPE_INVALID() {
		return new ApiOAuth2Exception("SOCIAL_TYPE_INVALID");
	}

	public static ApiOAuth2Exception INVALID_AUTHENTICATION() {
		return new ApiOAuth2Exception("INVALID_AUTHENTICATION");
	}

	public static ApiOAuth2Exception OAUTH_TOKEN_ATTRIBUTE_NOT_FOUND(String targetTokenKey) {
		log.error("Attribute of {} is not found", targetTokenKey);
		return new ApiOAuth2Exception("OAUTH_TOKEN_ATTRIBUTE_NOT_FOUND: " + targetTokenKey);
	}

	/**
	 * 기본 폴더 생성 실패시 회원 가입 자체를 실패시켜야 하고, <br>
	 * 이를 security에서 잡아서 app.baguni.kr/login/failed 로 리다이렉트 시켜야 하기 때문에 <br>
	 * 사용자 생성 실패를 OAuth2 예외로 처리함.
	 */
	public static ApiOAuth2Exception USER_MANDATORY_FOLDER_CREATE_FAILED() {
		log.error("User mandatory folder create failed");
		return new ApiOAuth2Exception("USER_MANDATORY_FOLDER_CREATE_FAILED");
	}
}