package techpick.api.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {

	@Value("${core.base-url}")
	private String baseUrl;

	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI()
			.info(apiInfo())
			.components(new Components()
				.addSecuritySchemes("basicAuth", securityScheme())
			)
			.servers(List.of(getServer()));
	}

	private Info apiInfo() {
		return new Info()
			.title("TechPick API")
			.description("TechPick API 명세서")
			.version("1.0.0");
	}

	/**
	 * Swagger Security 설정 추가
	 *  Authentication 방식을 OpenAPI 에 추가
	 */
	private SecurityScheme securityScheme() {
		return new SecurityScheme()
			.type(SecurityScheme.Type.APIKEY)
			.name("access_token")
			.in(SecurityScheme.In.COOKIE);
	}

	private Server getServer() {
		// TODO: AWS배포 이후 local prod에 따라 다른 url 적용하도록 리팩토링 필요
		// 현재는 홈서버 반환
		return new Server().url(baseUrl);
	}
}
