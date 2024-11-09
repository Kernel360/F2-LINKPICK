package techpick.security.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "security")
public class SecurityProperties {

	public final String ACCESS_TOKEN_KEY = "access_token";

	public final String LOGIN_FLAG_FOR_FRONTEND = "techPickLogin";

	public final String OAUTH_SUCCESS_RETURN_URL_TOKEN_KEY = "redirectUrl";

	private final List<String> corsPatterns;

	private final String cookieDomain;

	private final String defaultRedirectUrl;

}
