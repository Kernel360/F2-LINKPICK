package techpick.api.application.link.dto;

import lombok.Getter;
import techpick.core.rabbitmq.Event;
import techpick.core.rabbitmq.EventType;
import techpick.core.rabbitmq.ResponseToEvent;

@Getter
public class LinkApiResponse implements ResponseToEvent {

    private final String url;
    private final String title;
    private final String description;
    private final String imageUrl;

    public LinkApiResponse(String url, String title, String description, String imageUrl) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    @Override
    public Event toEvent(EventType eventType) {
        return new Event(url, eventType);
    }
}

