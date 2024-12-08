package techpick.api.lib.opengraph;

import java.time.Duration;

import lombok.Getter;

@Getter
public class OpenGraphOption {
	private final String userAgent;
	private final Duration httpRequestTimeoutyDuration;
	private final String httpResponseDefaultCharsetName;

	public OpenGraphOption(int timeoutSecond) {
		httpRequestTimeoutyDuration = Duration.ofSeconds(timeoutSecond);
		userAgent = "facebookexternalhit/1.1";
		httpResponseDefaultCharsetName = "UTF-8";
	}
}
