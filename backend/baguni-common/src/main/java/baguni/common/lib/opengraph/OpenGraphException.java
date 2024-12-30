package baguni.common.lib.opengraph;

public class OpenGraphException extends Exception {
	public OpenGraphException(String message) {
		super(message);
	}

	public OpenGraphException(String message, Exception exception) {
		super(message, exception);
	}
}
