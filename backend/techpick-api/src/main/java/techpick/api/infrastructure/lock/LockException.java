package techpick.api.infrastructure.lock;

public class LockException extends RuntimeException {

	public LockException(String message) {
		super(message);
	}
}
