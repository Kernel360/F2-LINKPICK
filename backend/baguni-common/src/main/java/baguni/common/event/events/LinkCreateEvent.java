package baguni.common.event.events;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;

@Getter
public class LinkCreateEvent extends Event {

	private static final String TOPIC = "link.create";
	private final String url;

	@JsonCreator
	public LinkCreateEvent(String url) {
		super(TOPIC);
		this.url = url;
	}
}
