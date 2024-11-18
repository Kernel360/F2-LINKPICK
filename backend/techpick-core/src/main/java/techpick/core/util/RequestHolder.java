package techpick.core.util;

import org.springframework.stereotype.Component;

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

