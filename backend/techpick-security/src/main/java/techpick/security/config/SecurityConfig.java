package techpick.security.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.security.TechPickAuthorizationRequestRepository;
import techpick.security.filter.TokenAuthenticationFilter;
import techpick.security.handler.OAuth2SuccessHandler;
import techpick.security.handler.TechPickLogoutHandler;
import techpick.security.service.CustomOAuth2Service;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

	private final CustomOAuth2Service customOAuth2Service;
	private final OAuth2SuccessHandler oAuth2SuccessHandler;
	private final TokenAuthenticationFilter tokenAuthenticationFilter;
	private final TechPickLogoutHandler techPickLogoutHandler;
	private final TechPickAuthorizationRequestRepository requestRepository;

	@Value("${core.base-url}")
	private String baseUrl;

	@Value("${security.clientUrl}")
	private String clientUrl;

	public static final String ACCESS_TOKEN_KEY = "access_token";
	public static final String LOGIN_FLAG_FOR_FRONTEND = "techPickLogin";
	public static final String OAUTH_SUCCESS_RETURN_URL_TOKEN_KEY = "redirectUrl";

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		// TODO: 이후 설정 추가 필요
		http
			.csrf(AbstractHttpConfigurer::disable) // csrf 비활성화 시 logout 했을 때 GET 메서드로 요청됨. POST로만 보내도록 하기 위해 주석 처리
			// .cors(cors -> cors.configurationSource(corsConfigurationSource()))
			.httpBasic(AbstractHttpConfigurer::disable)
			.formLogin(AbstractHttpConfigurer::disable)
			.logout(config -> {
				config.logoutUrl("/api/logout")
					.addLogoutHandler(techPickLogoutHandler)
					.logoutSuccessHandler(techPickLogoutHandler);
			})
			.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			// TokenAuthenticationFilter 를 UsernamePasswordAuthenticationFilter 앞에 추가
			.addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
			.authorizeHttpRequests(
				authRequest -> authRequest
					.requestMatchers("/api-docs/**").permitAll()
					.requestMatchers("/swagger-ui/**").permitAll()
					.requestMatchers("/api/login/**").permitAll()
					.anyRequest().authenticated()
			)
			.oauth2Login(
				oauth -> oauth
					.authorizationEndpoint(authorization -> authorization
						.baseUri("/api/login") // /* 붙이면 안됨
						.authorizationRequestRepository(requestRepository)
					)
					.redirectionEndpoint(
						redirection -> redirection
							.baseUri("/api/login/oauth2/code/*")
						// 반드시 /* 으로 {registrationId}를 받아야 함 스프링 시큐리티의 문제!!
						// https://github.com/spring-projects/spring-security/issues/13251
					)
					.userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2Service))
					.successHandler(oAuth2SuccessHandler)
			)
		;
		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();

		config.setAllowCredentials(true);
		config.setAllowedOrigins(List.of(
			baseUrl,
			clientUrl
		));
		config.addAllowedOriginPattern("chrome-extension://*");
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setExposedHeaders(List.of("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
}