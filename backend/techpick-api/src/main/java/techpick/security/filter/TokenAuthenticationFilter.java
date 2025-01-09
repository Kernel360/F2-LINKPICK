package techpick.security.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import techpick.core.model.user.Role;
import techpick.security.config.SecurityProperties;
import techpick.security.util.CookieUtil;
import techpick.security.util.JwtUtil;

@Component
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {

	private final CookieUtil cookieUtil;
	private final JwtUtil jwtUtil;
	private final SecurityProperties properties;

	@Override
	protected void doFilterInternal(
		HttpServletRequest request,
		HttpServletResponse response,
		FilterChain filterChain
	) throws ServletException, IOException {
		String token = getTokenFromCookie(request);

		if (jwtUtil.isValidToken(token)) {
			Authentication authentication = convertToAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		} else {
			// 인증 실패시 techPickLogin 쿠키 삭제
			cookieUtil.deleteCookie(request, response, properties.LOGIN_FLAG_FOR_FRONTEND);
		}

		filterChain.doFilter(request, response);
	}

	private String getTokenFromCookie(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return null;
		}
		return findCookieByKey(cookies);
	}

	private String findCookieByKey(Cookie[] cookies) {
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(properties.ACCESS_TOKEN_KEY)) {
				return cookie.getValue();
			}
		}
		return null;
	}

	private Authentication convertToAuthentication(String token) {

		Long id = jwtUtil.getUserId(token);
		Role role = jwtUtil.getRole(token);

		return new UsernamePasswordAuthenticationToken(
			id,
			token,
			List.of(new SimpleGrantedAuthority(role.toString()))
		);
	}
}
