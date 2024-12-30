package baguni.common.exception.base;

public record ApiErrorBody(
	String code,
	String message
) {
}
