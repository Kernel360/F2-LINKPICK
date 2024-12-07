package techpick.core.event;

import techpick.core.event.events.Event;

public interface EventMessenger {

	void send(Event message);
}
