package baguni.core.exception.base;

public record ApiErrorBody(
	String code,
	String message
) {
}
