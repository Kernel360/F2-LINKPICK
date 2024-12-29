package baguni.security.handler;

import java.io.IOException;
import java.util.Objects;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.fasterxml.jackson.databind.ObjectMapper;

import baguni.core.exception.base.ApiErrorResponse;
import baguni.security.exception.ApiAuthErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * @author minkyeu kim
 * @description
 * - 기존에는 인증 정보가 없으면 security 기본 로그인 페이지를 응답했었습니다.
 *   이젠, 프론트가 에러코드 기반으로 페이지를 처리합니다. </br>
 *
 * - /api/** 경로로 요청이 왔는데, JWT 엑세스 토큰이 없거나 위조되었을 경우 아래 EntryPoint로 진입합니다. </br>
 *     case 1. 쿠키가 만료된 요청이 온 경우 </br>
 *     case 2. 변조된 JWT를 가진 요청인 경우
 */
public class BaguniApiAuthExceptionEntrypoint implements AuthenticationEntryPoint {

	/**
	 * 시큐리티의 HttpServletResponse를 바구니 API ErrorResponse로 변환한다.
	 * Security에서 서비스 에러 코드를 보내야 프론트가 UI를 처리할 수 있기 때문이다.
	 */
	@Override
	public void commence(
		HttpServletRequest request,
		HttpServletResponse response,
		AuthenticationException arg2
	) throws IOException {
		var errorResponse = ApiErrorResponse.of(ApiAuthErrorCode.AUTH_INVALID_AUTHENTICATION);
		var errorStatus = errorResponse.getStatusCode().value();
		var body = errorResponse.getBody();

		response.setStatus(errorStatus);
		if (Objects.nonNull(body)) {
			var errorResponseJson = new ObjectMapper().writeValueAsString(body);
			response.setContentType("application/json; charset=UTF-8"); // UTF 설정 안하면 한글 깨짐
			response.getWriter().write(errorResponseJson);
		}
	}
}

