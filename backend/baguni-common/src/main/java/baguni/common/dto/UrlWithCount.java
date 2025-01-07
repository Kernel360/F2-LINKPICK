package baguni.common.dto;

/**
 * api 서버와 ranking 서버가 통신할 때 쓰이는 DTO
 * 양쪽 모듈에서 모두 사용되므로 core에 위치.
 */
public record UrlWithCount(
	String url,
	Long count
) {
}
