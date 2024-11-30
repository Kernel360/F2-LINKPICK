package techpick.api.application.pick.event;

import java.util.List;

import techpick.event.Event;
import techpick.event.ActionType;

public class PickApiEvent extends Event {

    private final Long id;
    private final List<String> tagNames;

    public PickApiEvent(Long userId, ActionType action, Long pickId, List<String> tagNames) {
        super(userId, action);
        this.id = pickId;
        this.tagNames = tagNames;
    }
}
