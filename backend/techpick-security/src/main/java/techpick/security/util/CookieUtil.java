package techpick.security.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CookieUtil {

	@Value("${cookie.domain}")
	private String COOKIE_DOMAIN;

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
	 * @param secure secure 설정 : true - secure , false - non-secure
	 *
	 * */
	public void addCookie(
		HttpServletResponse response,
		String name,
		String value,
		int maxAge,
		boolean secure
	) {
		ResponseCookie responseCookie = ResponseCookie.from(name, value)
			.maxAge(maxAge)
			.path("/")
			.httpOnly(true)
			.secure(secure)
			.domain(COOKIE_DOMAIN)
			.build();
		response.addHeader("Set-Cookie", responseCookie.toString());

	}

	/**
	 * 쿠키 삭제를 위한 메소드
	 *
	 * @author Gyaak
	 *
	 * @param request
	 * @param response
	 * @param name 삭제하려는 쿠키 이름
	 */
	public void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
		if (request == null || response == null) {
			return;
		}

		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return;
		}

		for (Cookie cookie : cookies) {
			if (name.equals(cookie.getName())) {
				cookie.setValue("");
				cookie.setPath("/");
				cookie.setMaxAge(0);
				cookie.setHttpOnly(true);
				response.addCookie(cookie);
			}
		}
	}
}
