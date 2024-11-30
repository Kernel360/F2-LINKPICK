package techpick.event;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import techpick.api.application.link.event.LinkApiEvent;
import techpick.api.application.pick.event.PickApiEvent;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = LinkApiEvent.class, name = "link"),
    @JsonSubTypes.Type(value = PickApiEvent.class, name = "pick")
})
public abstract class Event {

    private final Long userId;
    private final LocalDateTime time = LocalDateTime.now();
    private final ActionType actionType;

    protected Event(Long userId, ActionType actionType) {
        this.userId = userId;
        this.actionType = actionType;
    }

    public ActionType getActionType() {
        return this.actionType;
    }

    public LocalDateTime getTime() {
        return this.time;
    }

    public Long getUserId() {
        return this.userId;
    }
}
