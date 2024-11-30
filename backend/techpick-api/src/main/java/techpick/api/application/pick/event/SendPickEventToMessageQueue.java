package techpick.api.application.pick.event;

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
public @interface SendPickEventToMessageQueue {
    /**
     * type of event
     * (CREATE | READ | UPDATE | DELETE) */
    ActionType actionType();
}
