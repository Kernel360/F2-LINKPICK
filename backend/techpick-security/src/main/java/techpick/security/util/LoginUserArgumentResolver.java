package techpick.security.util;

import org.springframework.core.MethodParameter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import techpick.security.annotation.LoginUserId;
import techpick.security.config.SecurityConfig;
import techpick.security.exception.ApiOAuth2Exception;

public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {

	private final String ACCESS_TOKEN = "access_token";
	private final String TECHPICK_Login = "techPickLogin";

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.hasParameterAnnotation(LoginUserId.class) &&
			Long.class.isAssignableFrom(parameter.getParameterType());
	}

	@Override
	public Object resolveArgument(
		MethodParameter parameter,
		ModelAndViewContainer mavContainer,
		NativeWebRequest webRequest,
		WebDataBinderFactory binderFactory
	) {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.getPrincipal() instanceof Long) {
			return authentication.getPrincipal();
		}

		HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
		HttpServletResponse response = webRequest.getNativeResponse(HttpServletResponse.class);
		CookieUtil.deleteCookie(request, response, SecurityConfig.ACCESS_TOKEN_KEY);
		CookieUtil.deleteCookie(request, response, SecurityConfig.LOGIN_FLAG_FOR_FRONTEND);

		throw ApiOAuth2Exception.INVALID_AUTHENTICATION();
	}
}
