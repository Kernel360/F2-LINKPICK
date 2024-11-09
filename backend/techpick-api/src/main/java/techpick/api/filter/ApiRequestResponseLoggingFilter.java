package techpick.api.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ApiRequestResponseLoggingFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {

		long startTime = System.currentTimeMillis();

		try {
			filterChain.doFilter(request, response);
		} finally {
			long executionTime = System.currentTimeMillis() - startTime;
			String url = request.getRequestURI();
			String method = request.getMethod();

			if (url.startsWith("/api/")) {
				var logInfo = new RequestResponseLogInfo(url, method, executionTime);
				log.info(logInfo.toString());
			}
		}
	}

	@Getter
	@AllArgsConstructor
	private static class RequestResponseLogInfo {
		private String url;
		private String httpMethod;
		private Long executionTime;

		@Override
		public String toString() {
			ObjectMapper objectMapper = new ObjectMapper();
			try {
				return objectMapper.writeValueAsString(this);
			} catch (JsonProcessingException e) {
				return e.getMessage();
			}
		}
	}
}

