package baguni.common.event.events;

import lombok.Getter;

@Getter
public class LinkEvent extends Event {

	private final String url;

	public LinkEvent(String url) {
		this.url = url;
	}
}
