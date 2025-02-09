package baguni.api.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.Paths;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import baguni.security.config.SecurityProperties;

@Configuration
@OpenAPIDefinition(
	security = {@SecurityRequirement(name = "accessToken"), @SecurityRequirement(name = "Test User ID-Token")}
)
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
				.addSecuritySchemes("accessToken", accessTokenScheme())
				.addSecuritySchemes("Test User ID-Token", testUserLoginScheme())
			)
			.servers(List.of(getServer()))
			.paths(getAuthPaths())
			;
	}

	private Info apiInfo() {
		return new Info()
			.title("Baguni API")
			.description("Baguni API 명세서")
			.version("1.0.0");
	}

	/**
	 * Swagger Security 설정 추가
	 *  Authentication 방식을 OpenAPI 에 추가
	 */
	private SecurityScheme accessTokenScheme() {
		return new SecurityScheme()
			.type(SecurityScheme.Type.APIKEY)
			.name("access_token")
			.in(SecurityScheme.In.COOKIE);
	}

	private SecurityScheme testUserLoginScheme() {
		return new SecurityScheme()
			.type(SecurityScheme.Type.HTTP)
			.scheme("bearer")
			.bearerFormat("UUID id token");
	}

	private Server getServer() {
		return new Server().url(properties.getBaseUrl());
	}

	private Paths getAuthPaths() {
		List<String> authTags = List.of("Authorization");
		var kakaoLogin = new PathItem().get(new Operation().summary("카카오 소셜 로그인").tags(authTags));
		var googleLogin = new PathItem().get(new Operation().summary("구글 소셜 로그인").tags(authTags));
		var logout = new PathItem().get(
			new Operation().summary("로그아웃").description("techPickLogin, access_token 쿠키를 삭제합니다.").tags(authTags));

		return new Paths()
			.addPathItem("/api/login/kakao", kakaoLogin)
			.addPathItem("/api/login/google", googleLogin)
			.addPathItem("/api/login/logout", logout)
			;
	}
}
