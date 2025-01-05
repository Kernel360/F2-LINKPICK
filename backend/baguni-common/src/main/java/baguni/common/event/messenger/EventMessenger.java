package baguni.common.event.messenger;

import baguni.common.event.events.Event;

public interface EventMessenger {

	void send(Event event);
}
