package baguni.security.util;

import java.util.Objects;
import java.util.Optional;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import baguni.security.config.JwtProperties;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import baguni.security.config.SecurityProperties;

/**
 * minkyeu kim
 * 아래 CookieUtil로 전체적인 리팩토링이 필요합니다.
 */
@Component
@RequiredArgsConstructor
public class CookieUtil {

	private final SecurityProperties securityProps;
	private final JwtProperties jwtProps;

	/**
	 * response에 쿠키를 등록하는 메소드
	 * 쿠키의 도메인은 application-security.yaml에서 읽어와서 설정
	 *
	 * @author Gyaak
	 *
	 * @param response 쿠키를 추가하려는 응답
	 * @param name 쿠키 이름
	 * @param value 쿠키 값
	 * @param maxAge 쿠키 유효기간
	 * @param httpOnly httpOnly 설정 : true / false
	 *
	 * */
	public void addCookie(
		HttpServletResponse response,
		String name,
		String value,
		int maxAge,
		boolean httpOnly
	) {
		ResponseCookie responseCookie = ResponseCookie.from(name, value)
													  .maxAge(maxAge)
													  .path("/")
													  .httpOnly(httpOnly)
													  .secure(true)
													  .domain(securityProps.getCookieDomain())
													  .build();
		response.addHeader("Set-Cookie", responseCookie.toString());

	}

	/**
	 * 쿠키 삭제를 위한 메소드
	 * 삭제하려는 쿠키를 덮어씌워 삭제함
	 * @author Gyaak
	 *
	 * @param response
	 * @param name 삭제하려는 쿠키 이름
	 */
	public void deleteCookie(HttpServletResponse response, String name) {
		this.addCookie(response, name, "", 0, true);
	}

	/**
	 * @author sangwon
	 * 쿠키 삭제 메서드 분리 (공통으로 사용하기 위함)
	 * 시큐리티, 쿠키를 제거해주고 싶은 컨트롤러에서 사용하기 위해 분리
	 */
	public void clearCookies(HttpServletResponse response) {
		deleteCookie(response, securityProps.ACCESS_TOKEN_KEY);
		deleteCookie(response, securityProps.OAUTH_RETURN_URL_KEY);
		deleteCookie(response, "JSESSIONID");
	}

	public Optional<String> findCookieValue(Cookie[] cookies, String name) {
		if (cookies == null)
			return Optional.empty();

		for (Cookie cookie : cookies) {
			if (name.equals(cookie.getName()) && !cookie.getValue().isEmpty()) {
				return Optional.of(cookie.getValue());
			}
		}
		return Optional.empty();
	}

	public Optional<AccessToken> findAccessTokenFrom(HttpServletRequest request) {
		return findCookieValueByKey(
			request.getCookies(), securityProps.ACCESS_TOKEN_KEY
		).map(rawValue -> AccessToken.fromString(jwtProps, rawValue));
	}

	private Optional<String> findCookieValueByKey(Cookie[] cookies, String key) {
		if (Objects.isNull(cookies) || cookies.length < 1) {
			return Optional.empty();
		}
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(key)) {
				return Optional.of(cookie.getValue());
			}
		}
		return Optional.empty();
	}
}
