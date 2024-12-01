package techpick.core.rabbitmq;

public interface ResponseToEvent {
    Event toEvent(EventType eventType);
}
