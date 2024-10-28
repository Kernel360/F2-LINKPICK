package kernel360.techpick.core.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	@Value("${api.base-url}")
	private String baseUrl;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// TODO: 이후 설정 추가 필요
		http
			.csrf(AbstractHttpConfigurer::disable)
			.cors(cors -> cors.configurationSource(corsConfigurationSource()))
			.httpBasic(AbstractHttpConfigurer::disable)
			.formLogin(AbstractHttpConfigurer::disable)
			.logout(AbstractHttpConfigurer::disable)
			.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests(
				authRequest -> authRequest
					.anyRequest().permitAll()
			)
			.oauth2Login(
				oauth -> oauth
					.authorizationEndpoint(authorization -> authorization
							.baseUri("/api/login")
						// /* 붙이면 안됨
					)
					.redirectionEndpoint(
						redirection -> redirection
							.baseUri("/api/login/oauth2/code/*")
						// 반드시 /* 으로 {registrationId}를 받아야 함 스프링 시큐리티의 문제!!
						// https://github.com/spring-projects/spring-security/issues/13251
					)
				// .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2Service))
				// .successHandler(oAuth2SuccessHandler)
			)
		;
		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();

		config.setAllowCredentials(true);
		config.setAllowedOrigins(List.of(
			baseUrl, /* from env */
			"https://local.minlife.me:3000" /* Frontend Local */,
			"chrome-extension://nijonkmmpngclkmeddmgjgdhjefmnmbm" /* Chrome Extension */
		));
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setExposedHeaders(List.of("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
}
