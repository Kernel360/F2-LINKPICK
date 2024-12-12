package baguni.core.util;

import java.io.IOException;
import java.util.UUID;

import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

/**
 * 요청을 로깅하기 위한 Filter<br>
 * UUID 를 MDC에 저장하여 Logback에서 활용<br>
 * 요청 내용을 RequestHolder에 저장
 * @author psh
 * */
@Component
@RequiredArgsConstructor
public class RequestLoggingFilter extends OncePerRequestFilter {

	private final RequestHolder requestHolder;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		try {
			MDC.put("requestId", UUID.randomUUID().toString()); // for logback
			CachedHttpServletRequest cachedRequest = new CachedHttpServletRequest(request);
			requestHolder.setRequest(cachedRequest);
			filterChain.doFilter(cachedRequest, response);
		} finally {
			// 요청이 마무리되면 무조건 ThreadLocal에 저장한 요청정보를 초기화
			requestHolder.clearRequest();
			MDC.remove("requestId"); // MDC 또한 ThreadLocal 기반이므로 반드시 해제해줘야함
		}
	}
}
