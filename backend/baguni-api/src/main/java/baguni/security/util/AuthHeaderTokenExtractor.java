package baguni.security.util;

import java.util.Enumeration;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AuthHeaderTokenExtractor {

	public static Optional<String> extractBearerToken(HttpServletRequest request) {
		String TYPE = "Bearer";
		String token = null;

		Enumeration<String> headers = request.getHeaders("Authorization");
		while (headers.hasMoreElements()) {
			String value = headers.nextElement();
			if ((value.toLowerCase().startsWith(TYPE.toLowerCase()))) {
				token = value.substring(TYPE.length()).trim();
				int commaIndex = token.indexOf(',');
				if (commaIndex > 0) {
					token = token.substring(0, commaIndex);
				}
				break;
			}
		}

		return Optional.ofNullable(token);
	}
}
