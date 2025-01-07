package baguni.security.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "security")
public class SecurityProperties {

	public final String ACCESS_TOKEN_KEY = "access_token";

	/**
	 * 프론트엔드에서 넘겨준 리다이렉트 대상 주소.
	 * 쿠키에 임시로 저장해두었다가, 로그인 성공 시 해당 값을 꺼내서 리다이렉트
	 */
	public final String OAUTH_RETURN_URL_KEY = "redirect_url";

	private final List<String> corsPatterns;

	private final String cookieDomain;

	private final String defaultRedirectUrl;

	private final String baseUrl;
}
