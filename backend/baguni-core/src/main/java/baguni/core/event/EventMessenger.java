package baguni.core.event;

import baguni.core.event.events.Event;

public interface EventMessenger {

	void send(Event message);
}
