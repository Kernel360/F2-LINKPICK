package techpick.core.util;

import org.springframework.stereotype.Component;

/**
 * Request에 대한 정보를 저장해두기 위한 클래스
 * 각 Request는 스레드와 1:1 매칭되므로, 캐싱한 요청정보를 ThreadLocal에 저장
 * */
@Component
public class RequestHolder {

	private final ThreadLocal<CachedHttpServletRequest> requestHolder = new ThreadLocal<>();

	public void setRequest(CachedHttpServletRequest request) {
		requestHolder.set(request);
	}

	public CachedHttpServletRequest getRequest() {
		return requestHolder.get();
	}

	public void clearRequest() {
		requestHolder.remove();
	}
}

