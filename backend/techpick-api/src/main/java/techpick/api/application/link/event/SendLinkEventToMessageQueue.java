package techpick.api.application.link.event;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import techpick.event.ActionType;

/**
 * Produce Event to Message Queue
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface SendLinkEventToMessageQueue {
    /**
     * type of event
     * (CREATE | READ | UPDATE | DELETE) */
    ActionType actionType();
}
