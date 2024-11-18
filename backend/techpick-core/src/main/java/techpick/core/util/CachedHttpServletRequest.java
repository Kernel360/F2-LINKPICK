package techpick.core.util;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import lombok.Getter;

@Getter
public class CachedHttpServletRequest extends HttpServletRequestWrapper {

	private final String cachedBody;
	private final Map<String, Object> infoMap = new HashMap<>();
	private final ObjectMapper mapper = new ObjectMapper();

	@Override
	public String toString() {
		try {
			return mapper.writeValueAsString(infoMap);
		} catch (JsonProcessingException e) {
			return e.getMessage();
		}
	}

	public CachedHttpServletRequest(HttpServletRequest request) throws IOException {
		super(request);
		cachedBody = readBodyFromRequest(request);
		infoMap.put("requestURI", request.getRequestURI());
		infoMap.put("method", request.getMethod());
		infoMap.put("requestBody", cachedBody);
		infoMap.put("requestTime", LocalDateTime.now().toString());
		Map<String, String> cookieMap = new HashMap<>();
		for (Cookie cookie : request.getCookies()) {
			cookieMap.put(cookie.getName(), cookie.getValue());
		}
		if (!cookieMap.isEmpty()) {
			infoMap.put("cookies", cookieMap);
		}
	}

	private String readBodyFromRequest(HttpServletRequest request) throws IOException {
		try (BufferedReader reader = new BufferedReader(
			new InputStreamReader(request.getInputStream(), StandardCharsets.UTF_8))) {
			return reader.lines().collect(Collectors.joining(System.lineSeparator()));
		}
	}

	@Override
	public BufferedReader getReader() throws IOException {
		return new BufferedReader(new InputStreamReader(
			new ByteArrayInputStream(cachedBody.getBytes(StandardCharsets.UTF_8))));
	}

	@Override
	public ServletInputStream getInputStream() throws IOException {
		ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(
			cachedBody.getBytes(StandardCharsets.UTF_8));
		return new ServletInputStream() {
			@Override
			public boolean isFinished() {
				return byteArrayInputStream.available() == 0;
			}

			@Override
			public boolean isReady() {
				return true;
			}

			@Override
			public void setReadListener(ReadListener readListener) {
				// Not required for this implementation
			}

			@Override
			public int read() throws IOException {
				return byteArrayInputStream.read();
			}
		};
	}
}

