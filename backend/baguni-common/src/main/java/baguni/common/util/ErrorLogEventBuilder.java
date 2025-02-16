package baguni.common.util;

import java.util.Arrays;

import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import baguni.common.event.events.ErrorLogEvent;
import baguni.common.exception.base.ServiceException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 *    @author sangwon
 * 	ExceptionHandler에서 슬랙 알림 이벤트를 발행하기 위한 클래스
 * 	Exception, GlobalServiceException 오버로딩을 통해 에러 메세지 형식을 맞춤.
 * 	요청, 응답에 대한 데이터를 메세지 큐에 전달
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ErrorLogEventBuilder {

	private final Environment environment; // Profile 정보 얻기 위한 클래스

	public ErrorLogEvent buildWithException(Exception e) {
		return new ErrorLogEvent(
			e.getClass().getCanonicalName(),
			e.getMessage(),
			null, null, null,
			Arrays.toString(environment.getActiveProfiles()),
			0, null
		);
	}

	public ErrorLogEvent buildWithException(
		Exception e,
		CachedHttpServletRequest request,
		HttpStatus responseStatus
	) {
		return new ErrorLogEvent(
			e.getClass().getCanonicalName(),
			e.getMessage(),
			request.getRequestURI(),
			request.getMethod(),
			request.getRemoteAddr(),
			Arrays.toString(environment.getActiveProfiles()),
			responseStatus.value(),
			responseStatus.name()
		);
	}

	public ErrorLogEvent buildWithServiceException(ServiceException e) {
		var status = e.getErrorCode().getHttpStatus();
		return new ErrorLogEvent(
			e.getClass().getCanonicalName(),
			e.getMessage(),
			null, null, null,
			Arrays.toString(environment.getActiveProfiles()),
			status.value(),
			status.name()
		);
	}

	public ErrorLogEvent buildWithServiceException(
		ServiceException e,
		CachedHttpServletRequest request
	) {
		var status = e.getErrorCode().getHttpStatus();
		return new ErrorLogEvent(
			e.getClass().getCanonicalName(),
			e.getMessage(),
			request.getRequestURI(),
			request.getMethod(),
			request.getRemoteAddr(),
			Arrays.toString(environment.getActiveProfiles()),
			status.value(),
			status.name()
		);
	}
}
