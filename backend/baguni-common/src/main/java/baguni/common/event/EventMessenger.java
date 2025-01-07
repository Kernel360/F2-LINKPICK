package baguni.common.event;

import baguni.common.event.events.Event;

public interface EventMessenger {

	void send(Event message);
}
