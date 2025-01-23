package baguni.common.event.events;

import lombok.Getter;

/**
 * 	필드가 1개인 경우 cannot deserialize from Object value (no delegate- or property-based Creator) 발생
 */
@Getter
public class LinkCreateEvent extends Event {

	private static final String TOPIC = "link.create";
	private final String url;

	public LinkCreateEvent(String url) {
		super(TOPIC);
		this.url = url;
	}
}
