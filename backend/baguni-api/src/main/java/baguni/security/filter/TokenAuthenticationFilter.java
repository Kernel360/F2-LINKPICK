package baguni.security.filter;

import java.io.IOException;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import baguni.security.util.AccessToken;
import baguni.security.util.CookieUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {

	private final CookieUtil cookieUtil;

	@Override
	protected void doFilterInternal(
		HttpServletRequest request,
		HttpServletResponse response,
		FilterChain filterChain
	) throws ServletException, IOException {
		var securityContext = SecurityContextHolder.getContext();

		cookieUtil.findAccessTokenFrom(request)
				  .map(AccessToken::toAuthenticationToken)
				  .ifPresent(securityContext::setAuthentication);

		filterChain.doFilter(request, response);
	}
}
