package techpick.core.rabbitmq;

public class EventProcessingError extends RuntimeException {

    public EventProcessingError(String message) {
        super(message);
    }
}