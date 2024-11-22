package techpick.api.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import techpick.security.config.SecurityProperties;

@Configuration
public class SwaggerConfig {

	private final SecurityProperties properties;

	public SwaggerConfig(SecurityProperties properties) {
		this.properties = properties;
	}

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
		return new Server().url(properties.getBaseUrl());
	}
}
