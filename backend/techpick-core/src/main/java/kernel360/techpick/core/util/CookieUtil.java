package kernel360.techpick.core.util;

import java.util.Base64;

import org.springframework.http.ResponseCookie;
import org.springframework.util.SerializationUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtil {

	//요청값(이름,값,만료기간)을 바탕으로 쿠키추가
	public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
		ResponseCookie responseCookie = ResponseCookie.from(name, value)
			.maxAge(maxAge)
			.path("/")
			.httpOnly(true)
			.secure(true)
			.domain("minlife.me")
			// .sameSite("None")
			.build();
		response.addHeader("Set-Cookie", responseCookie.toString());

		// 로그인 확인용 쿠키 (techPickLogin = true) 추가
		ResponseCookie techPickLoginCookie = ResponseCookie.from("techPickLogin", "true")
			.maxAge(maxAge)
			.path("/")
			.secure(true)
			.domain("minlife.me")
			// .sameSite("None")
			.build();
		response.addHeader("Set-Cookie", techPickLoginCookie.toString());

	}

	//쿠키의 이름을 입력받아 쿠키 삭제
	public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
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

	//객체를 직렬화해 쿠키의 값으로 변환
	public static String serialize(Object obj) {
		return Base64.getUrlEncoder()
			.encodeToString(SerializationUtils.serialize(obj));
	}

	//쿠키를 역직렬화해 객체로 변환
	public static <T> T deserialize(Cookie cookie, Class<T> cls) {
		return cls.cast(
			SerializationUtils.deserialize(
				Base64.getUrlDecoder().decode(cookie.getValue())
			)
		);
	}
}
