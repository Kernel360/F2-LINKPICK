package techpick.core.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import techpick.core.util.CachedHttpServletRequest;
import techpick.core.util.RequestHolder;

@Component
@RequiredArgsConstructor
public class RequestLoggingFilter extends OncePerRequestFilter {

	private final RequestHolder requestHolder;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		try {
			CachedHttpServletRequest cachedRequest = new CachedHttpServletRequest(request);
			requestHolder.setRequest(cachedRequest);
			filterChain.doFilter(cachedRequest, response);
		} finally {
			requestHolder.clearRequest();
		}
	}
}
