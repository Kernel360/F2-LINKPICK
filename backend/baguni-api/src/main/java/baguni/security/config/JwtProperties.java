package baguni.security.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Getter
@Configuration
public class JwtProperties {
	@Value("${spring.jwt.issuer}")
	private String issuer;

	@Value("${spring.jwt.secret}")
	private String secret;
}
