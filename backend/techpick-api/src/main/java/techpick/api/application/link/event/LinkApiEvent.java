package techpick.api.application.link.event;

import techpick.event.Event;
import techpick.event.ActionType;

public class LinkApiEvent extends Event {

    private final Long id;

    public LinkApiEvent(Long userId, ActionType action, Long id) {
        super(userId, action);
        this.id = id;
    }
}
